'use strict';

const SQL = require('./SQLAuth.js');

function check(session, callback){
	let conn = SQL.get();
	conn.connect(function(err) {
		if (err) {
			callback(0);
			throw err;
		}
		let queryString = 'SELECT checkSession('+session+') AS Status;'
		conn.query(queryString,
			function(err,result){
				if (err) {
					conn.end();
					callback(0);
					return;
				}
				conn.end();
				callback(result[0].Status);
				return;
			}
		);
	});
}

module.exports.check = check;

function getID(session, callback){
	check(session, (ans) => {
		if (!ans) {
			callback(0);
			return;
		}
		let conn = SQL.get();
		let userID = 0;
		conn.connect(function(err) {
			if (err) throw err;
			let queryString = 'SELECT ID FROM Users WHERE Email = \'' + 
			session.split(',')[0].replace(/'/g,'') +'\'';
			conn.query(queryString,
				function(err,result){
					if (err) throw err;
					conn.end();
					userID = result[0].ID ? result[0].ID : 0;
					callback(userID);
				}
			);
		});
	});
}

module.exports.getID = getID;