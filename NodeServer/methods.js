'use strict';

const url = require('url');
const querystring = require('querystring');
const SQL = require('./SQLAuth.js');
const mysql = require('mysql');
const session = require('./session.js');
const cookie = require('cookie');
const child_process = require('child_process');

let methods = {};
let requiredParams = {};

function call(req, res){
	let parsed = url.parse(req.url);
	let methodname = parsed.pathname.substring(8);
	if (!parsed.search) {
		parsed.search = '';
	}
	let params = querystring.parse(parsed.search.substring(1));
	if (params.map)
		params.map( e => e.replace(/[\\/{}();.'"]/g, ''));
	if (methods[methodname] && 
	requiredParams[methodname].every( e => params[e] ))
	{
		methods[methodname](
			params, 
			res,
			req
		);
	}
	else
		res.end();
}

module.exports.call = call;

function exception(err, res){
	res.write('Oh no:'+err.message)
	res.end();
}

function executeQuery(queryString, res, callback, keepConnection, conn){
	let queryFunc = 
		function(err,result){
			if (err) {
				conn.end();
				exception(err, res); 
				return;
			}
			if (!keepConnection) 
				conn.end();
			callback(result, conn);
		};
	if (!conn){
		conn = SQL.get();
		conn.connect(function(err) {
			if (err) {
				exception(err, res); 
				return;
			}
			conn.query(queryString,	queryFunc);
		});
	}else{
		conn.query(queryString, queryFunc);
	}
}

function getUserID(req, res, callback){
	let cookies = cookie.parse(req.headers.cookie || '');
	session.getID(cookies.session, (userID) => {
		if (!userID) {
			res.writeHead(403, {'Content-Type': 'text/html'});
			res.end();
			return;
		}
		res.writeHead(200, {'Content-Type': 'text/html'});
		callback(userID);
	});
}

function login(params, res){
	executeQuery('CALL signIn(\'' + params.login + '\',\'' + 
				params.pass + '\',@a,@b);',res, 
		function(result, conn){
			executeQuery('SELECT @a AS Time,'+
			'CAST(@b AS CHAR(100)) AS Hash;', res, 
				function(result){
					res.writeHead(200, {'Content-Type': 'text/html', 'Set-Cookie': 
					'session=\'' + 
					(result[0].Time?params.login:'') + 
					'\',\'' + result[0].Time + 
					'\',\'' + result[0].Hash + '\'; Path=/'});
					res.write(Buffer.from('\'' + 
					(result[0].Time?params.login:'') + 
					'\',\'' + result[0].Time + 
					'\',\'' + result[0].Hash + '\''));
					res.end();
				}, 0, conn
			);
		}, 1
	);
};

methods['login'] = login;
requiredParams['login'] = ['login','pass'];

function regUser(params, res){
	res.writeHead(200, {'Content-Type': 'text/html'});
	executeQuery('SELECT regUser(\'' + params.login + 
		'\',\'' + params.pass + '\') as state', res, 
		function(result){
			res.write(''+result[0].state);
			res.end();
		}
	);
}

methods['regUser'] = regUser;
requiredParams['regUser'] = ['login','pass'];

function checkSession(params, res){
	res.writeHead(200, {'Content-Type': 'text/html'});
	session.check(params.session, (ans) => {
		res.write(''+ans);
		res.end();
	});
}

methods['checkSession'] = checkSession;
requiredParams['checkSession'] = ['session'];

function selectSongs(params, res, req){
// returns JSON
// only return songs user have access to
// check depends on users cookies
// returns nothing if user not authenticated
	getUserID(req, res, (userID) => {
		executeQuery('SELECT ID, SongName, Artist, AlbumID,' +
			' Length, concat(\'http:\/\/138.68.69.43/music/\',Adress) AS Adress, Cover FROM Songs WHERE ID IN (' +
			params.ids + ') AND ( Owner IS NULL OR Owner = ' + 
			userID + ' )', res,
			function(result){
				res.write(JSON.stringify(result));
				res.end();
			}
		);
	});
}

methods['selectSongs'] = selectSongs;
requiredParams['selectSongs'] = ['ids'];

function getRandomSongs(params, res, req){
// returns JSON
// only return songs user have access to
// check depends on users cookies
// returns nothing if user not authenticated
	getUserID(req, res, (userID) => {
		executeQuery('CALL getRandomSongs(20,' + userID + ')', res,
			function(result){
				res.write(JSON.stringify(result[0]));
				res.end();
			}
		);
	});
}

methods['getRandomSongs'] = getRandomSongs;
requiredParams['getRandomSongs'] = [];

function getRecomendations(params, res, req){
	getUserID(req, res, (userID) => {
		let MLAPICall = child_process.exec('python3 ml_api.py --user_id ' + 
		userID,
			{cwd: '../ML'},
			(err, stdout, stderr) => {
				if (err){
					console.log(err);
					res.end();
					return;
				}
				res.write(''+stdout);
				res.end();
			}
		);
	});
}

methods['getRecomendations'] = getRecomendations;
requiredParams['getRecomendations'] = [];

function deleteSong(params, res, req){
	getUserID(req, res, (userID) => {
		executeQuery('SELECT deleteSong(' + params.id + 
		',' + userID + ') AS res;', res, 
			function(result){
				res.write(''+result[0].res);
				res.end();
			}
		);
	});
}

methods['deleteSong'] = deleteSong;
requiredParams['deleteSong'] = ['id'];

function registerListen(params, res, req){
	getUserID(req, res, (userID) => {
		executeQuery('CALL registerListen(' + userID + ',' 
			+ params.id + ');', res,
			function(result){
				res.end();
			}
		);
	});
}

methods['registerListen'] = registerListen;
requiredParams['registerListen'] = ['id'];

function createPlaylist(params, res, req){
	getUserID(req, res, (userID) => {
		executeQuery('SELECT createPlaylist(\'' + params.name + 
			'\',' + userID + ') as res;', res,
			function(result){
				res.write(''+result[0].res);
				res.end();
			}
		);
	});
}

methods['createPlaylist'] = createPlaylist;
requiredParams['createPlaylist'] = ['name'];

function insertInPlaylist(params, res, req){
	getUserID(req, res, (userID) => {
		executeQuery('SELECT insertInPlaylist(' + params.playlist +
			',' + params.song + ',' + params.prevPos + ',' + 
			params.nextPos + ',' + userID + ') as res;', res,
			function(result){
				res.write(''+result[0].res);
				res.end();
			}
		);
	});
}

methods['insertInPlaylist'] = insertInPlaylist;
requiredParams['insertInPlaylist'] = ['playlist','song','prevPos','nextPos'];

function deletePlaylist(params, res, req){
	getUserID(req, res, (userID) => {
		executeQuery('SELECT deletePlaylist(' + params.playlist + 
			',' + userID + ') as res;', res,
			function(result){
				res.write(''+result[0].res);
				res.end();
			}
		);
	});
}

methods['deletePlaylist'] = deletePlaylist;
requiredParams['deletePlaylist'] = ['playlist'];

function deleteFromPlaylist(params, res, req){
	getUserID(req, res, (userID) => {
		executeQuery('SELECT deleteFromPlaylist(' + params.playlist + 
		',' + params.song + ',' + params.pos + ',' + 
		userID + ') as res;', res,
			function(result){
				res.write(''+result[0].res);
				res.end();
			}
		);
	});
}

methods['deleteFromPlaylist'] = deleteFromPlaylist;
requiredParams['deleteFromPlaylist'] = ['playlist','song','pos'];

function movePlaylistSong(params, res, req){
	getUserID(req, res, (userID) => {
		executeQuery('SELECT movePlaylistSong(' + params.playlist + 
		',' + params.song + ',' + params.oldPos + ',' + 
		params.newPos + ',' + userID + ') as res;', res,
			function(result){
				res.write(''+result[0].res);
				res.end();
			}
		);
	});
}

methods['movePlaylistSong'] = movePlaylistSong;
requiredParams['movePlaylistSong'] = ['playlist','song','oldPos','newPos'];

function getPlaylistSongs(params, res, req){
	getUserID(req, res, (userID) => {
		executeQuery('CALL getPlaylistSongs(' + 
			params.playlist + ',' + userID + ');', res,
			function(result){
				res.write(JSON.stringify(result[0]));
				res.end();
			}
		);
	});
}

methods['getPlaylistSongs'] = getPlaylistSongs;
requiredParams['getPlaylistSongs'] = ['playlist'];

function listPlaylists(params, res, req){
	getUserID(req, res, (userID) => {
		executeQuery('CALL listPlaylists(' + userID + ');', res,
			function(result){
				res.write(JSON.stringify(result[0]));
				res.end();
			}
		);
	});
}

methods['listPlaylists'] = listPlaylists;
requiredParams['listPlaylists'] = [];
