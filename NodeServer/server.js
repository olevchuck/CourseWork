'use strict';

const http = require('http');
const fs = require('fs');
const methods = require('./methods.js');
const cookie = require('cookie');
const session = require('./session.js');

let httpRoot = '../angular2/dist';
let musicRoot = '../..';

function giveFile(req, res) {
	let fullPath = httpRoot + req.url;
	if (fs.existsSync(fullPath)){
		let file = fs.readFileSync(fullPath);
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.write(Buffer.from(file));
	}else{
		res.writeHead(404, {'Content-Type': 'text/html'});
	}
	res.end();
}

function giveMusicFile(req, res) {
	let fullPath = musicRoot + req.url;
	if (fs.existsSync(fullPath)){
		let file = fs.readFileSync(fullPath);
		res.writeHead(206, {'Content-Type': 'audio/mpeg', 'Content-Range': 'bytes 0-' + (file.length-1) + '\/' + file.length});
		res.write(Buffer.from(file));
	}else{
		res.writeHead(404, {'Content-Type': 'text/html'});
	}
	res.end();
}

let server = http.createServer(function (req, res) {
	if (req.url.slice(-1) == '/') req.url += 'index.html';
	if (req.url.substring(0,8) === '/method/')
	{
		methods.call(req,res);
	}else
	if (req.url.substring(0,7) === '/music/')
	{
		let cookies = cookie.parse(req.headers.cookie || '');
		session.check(cookies.session, (ans) => {
			if (ans)
				giveMusicFile(req, res);
			else{
				res.writeHead(403, {'Content-Type': 'text/html'});
				res.end();
			}
		});
		return;
	}else
	{
		giveFile(req, res);
	}
}).listen(80);
