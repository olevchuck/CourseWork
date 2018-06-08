DROP DATABASE MusicRecommendationService;

CREATE DATABASE MusicRecommendationService;

USE MusicRecommendationService;

CREATE TABLE Users(
	ID int NOT NULL AUTO_INCREMENT PRIMARY KEY,
	Email varchar(150) NOT NULL UNIQUE,
	Salt int NOT NULL , -- Convert to char(11) where neccecary
	PassHash binary(64) NOT NULL -- SHA2(Salt+Pass)
);

CREATE TABLE UsersSongs(
	ID int PRIMARY KEY,
	songsCount int NOT NULL,
	FOREIGN KEY(ID) REFERENCES Users(ID)
);

CREATE TABLE Albums( 
-- Only for automatic scripts usage
-- Albums can only be added automaticaly from metadata
	ID int NOT NULL AUTO_INCREMENT PRIMARY KEY,
	AlbumName varchar(150) NOT NULL,
	Artist varchar(150) NOT NULL,
	AlbumYear int,
	Owner int, 
	-- NULL - available for everyone, 
	-- otherwise - available to user with specified ID
	SongCount int NOT NULL DEFAULT 0
);

CREATE TABLE Songs(
	ID int NOT NULL AUTO_INCREMENT PRIMARY KEY,
	SongName varchar(150) NOT NULL,
	Artist varchar(150),
	Owner int, 
	-- NULL - available for everyone, 
	-- otherwise - available to user with specified ID
	AlbumID int, 
	-- NULL - no album specified, 
	-- otherwise - song is from album with specified ID
	Length int NOT NULL, -- int seconds
	Adress varchar(150), -- url adress of song?
	Cover varchar(150), -- url of cover?
	FOREIGN KEY(AlbumID) REFERENCES Albums(ID)
);

CREATE TABLE SongsMetadata(
	ID int NOT NULL PRIMARY KEY,
	Genre varchar(150),
	SongYear int,
	AlbumIndex int, -- index%100 + 1 - is disk index for multi disk albums
	FOREIGN KEY(ID) REFERENCES Songs(ID)
);

CREATE TABLE SongNeuralNetworkData( -- most is floaats
	ID int NOT NULL PRIMARY KEY,
	song_artist_familiarity float NOT NULL, 
	song_artist_hotttnesss float NOT NULL,
	song_duration float NOT NULL,
	song_key int NOT NULL, -- ---------------- int
	song_key_confidence float NOT NULL,
	song_loudness float NOT NULL,
	song_hotttnesss float NOT NULL,
	song_tempo float NOT NULL,
	song_end_of_fade_in_relative float NOT NULL,
	song_start_of_fade_out_relative float NOT NULL,
	FOREIGN KEY(ID) REFERENCES Songs(ID)
);

CREATE TABLE UserListens(
	UserID int,
	SongID int,
	ListenCount int,
	FOREIGN KEY(UserID) REFERENCES Users(ID),
	FOREIGN KEY(SongID) REFERENCES Songs(ID)
);

CREATE INDEX UserListens_Index
ON UserListens (UserID,SongID);

CREATE TABLE Playlists(
	ID int NOT NULL AUTO_INCREMENT PRIMARY KEY,
	PlaylistName varchar(150) NOT NULL,
	OwnerID int NOT NULL,
	FOREIGN KEY(OwnerID) REFERENCES Users(ID)
);

CREATE TABLE PlaylistSongs(
	PlaylistID int NOT NULL,
	SongID int NOT NULL,
	Pos float NOT NULL,
	-- you can make it 2.5 to put between songs 2 and 3, 
	-- and you can sort Playlist that way
	FOREIGN KEY(PlaylistID) REFERENCES Playlists(ID),
	FOREIGN KEY(SongID) REFERENCES Songs(ID)
);

CREATE INDEX PlaylistID_Index
ON PlaylistSongs (PlaylistID);

DELIMITER //
CREATE FUNCTION regUser(
	inEmail varchar(150),
	inPass varchar(150)
)
RETURNS BOOL
BEGIN
	IF EXISTS
	(
		SELECT * FROM Users WHERE Users.Email = inEmail
	)
	THEN
		RETURN 0;
	ELSE
		SET @Rnd = FLOOR(RAND()*2147483647); -- Generate random non negative int
		INSERT INTO Users(Users.Email,Users.Salt,Users.PassHash) Values 
			(inEmail,
			@Rnd,
			binary( SHA2 ( CONCAT ( CONVERT ( @Rnd , char(11) ) ,inPass ),256)));
		INSERT INTO UsersSongs(ID, songsCount) VALUES (LAST_INSERT_ID(), 0);
		RETURN 1;
	END IF;
END
//
DELIMITER ; 

SELECT regUser('admin','1');
-- Has to be executed exaclty once to register admin

DELIMITER //
CREATE PROCEDURE signIn(
	IN Email varchar(150),
	IN Pass varchar(150),
	OUT SessionExpire DATETIME,
	OUT SessionToken binary(64)
)
BEGIN
	IF EXISTS
	(
		SELECT 1 FROM Users	
		WHERE Users.Email = Email 
		AND Users.PassHash = 
		(
			@Hash:=binary( SHA2 ( CONCAT ( CONVERT ( Users.Salt , char(11) ) ,Pass ),0))
		)
	)
	THEN
		SELECT ADDTIME(NOW(), '14 00:00:00') INTO SessionExpire;
		SELECT SHA2 (CONCAT(SessionExpire,@Hash),0) INTO SessionToken;
	END IF;
END
//
DELIMITER ; 

DELIMITER //
CREATE FUNCTION checkSession(
	Email varchar(150),
	SessionExpire DATETIME,
	SessionToken binary(64)
)
RETURNS BOOL
BEGIN
	IF ((SELECT 1 
		 FROM Users 
		 WHERE Users.Email=Email AND
		       SHA2(CONCAT(SessionExpire,Users.PassHash),0)=SessionToken)
		AND
		SessionExpire >= NOW()
		)
	THEN
	RETURN 1;
	ELSE
	RETURN 0;
	END IF;
END
//
DELIMITER ; 

DELIMITER //
CREATE FUNCTION insertSong(	
	in_SongName varchar(150),
	in_Artist varchar(150),
	in_Owner int,
	in_Length int, 
	in_Genre varchar(150),
	in_Year int, 
	-- ignored for album if album with specified name and artist exists
	in_AlbumIndex int,
	in_AlbumName varchar(150),
	in_Adress varchar(250),
	in_Cover varchar(250)
)
RETURNS BOOL
BEGIN
	IF EXISTS
	(
		SELECT songsCount FROM UsersSongs 
		WHERE UsersSongs.ID = in_Owner AND songsCount >= 100
	)  
	OR ISNULL(in_SongName) 
	OR ISNULL(in_Length) 
	-- check if song limit reached, 
	-- won't affect generally availbale songs because NULL != NULL
	-- also do other checks
	THEN
	RETURN 0;
	END IF;
	UPDATE UsersSongs	SET songsCount = songsCount + 1	
	WHERE UsersSongs.ID = in_Owner;
	
	-- user added songs won't be added to generally available albums 
	-- new album will be created instead
	SET @AlbumID = 
	(
		SELECT ID FROM Albums 
		WHERE STRCMP(Albums.Artist, in_Artist) = 0 
		AND STRCMP(Albums.AlbumName, in_AlbumName) = 0 
		AND (
			Albums.Owner = in_Owner 
			OR ISNULL(Albums.Owner) = ISNULL(in_Owner)
		)
	);
	-- if artist or album name not specified album won't be created
	IF NOT ISNULL(in_AlbumName) AND NOT ISNULL(in_Artist) AND ISNULL(@AlbumID)
	
	THEN INSERT INTO 
	Albums(Albums.AlbumName,	Albums.Artist, Albums.AlbumYear, Albums.Owner) 
	VALUES (in_AlbumName, in_Artist, in_Year, in_Owner);
	
	SET @AlbumID = LAST_INSERT_ID();
  
	END IF;
	
	UPDATE Albums SET SongCount = SongCount + 1	WHERE Albums.ID = @AlbumID;
	
	INSERT INTO 
	Songs(Songs.SongName,Songs.Artist,Songs.Owner,Songs.AlbumID,
	Songs.Length,Songs.Adress,Songs.Cover) 
	Values 
	(in_SongName,in_Artist,in_Owner,@AlbumID,in_Length,in_Adress,in_Cover);
	
	INSERT INTO 
	SongsMetadata(SongsMetadata.ID, SongsMetadata.Genre, SongsMetadata.SongYear,
	SongsMetadata.AlbumIndex) 
	VALUES
	(LAST_INSERT_ID(), in_Genre, in_Year, in_AlbumIndex);
	
	RETURN 1;
END;
//
DELIMITER ; 

DELIMITER //
CREATE FUNCTION insertSongWithNeuralData(	
	in_SongName varchar(150),
	in_Artist varchar(150),
	in_Owner int,
	in_Length int, 
	in_Genre varchar(150),
	in_Year int, 
	-- ignored for album if album with specified name and artist exists
	in_AlbumIndex int,
	in_AlbumName varchar(150),
	in_Adress varchar(250),
	in_Cover varchar(250),
	in_song_artist_familiarity float, 
	in_song_artist_hotttnesss float,
	in_song_duration float,
	in_song_key int,
	in_song_key_confidence float,
	in_song_loudness float,
	in_song_hotttnesss float,
	in_song_tempo float,
	in_song_end_of_fade_in_relative float,
	in_song_start_of_fade_out_relative float
)
RETURNS BOOL
BEGIN
	IF EXISTS
	(
		SELECT songsCount FROM UsersSongs 
		WHERE UsersSongs.ID = in_Owner AND songsCount >= 100
	)  
	OR ISNULL(in_SongName) 
	OR ISNULL(in_Length) 
	-- check if song limit reached, 
	-- won't affect generally availbale songs because NULL != NULL
	-- also do other checks
	THEN
	RETURN 0;
	END IF;
	UPDATE UsersSongs	SET songsCount = songsCount + 1	
	WHERE UsersSongs.ID = in_Owner;
	
	-- user added songs won't be added to generally available albums 
	-- new album will be created instead
	SET @AlbumID = 
	(
		SELECT ID FROM Albums 
		WHERE STRCMP(Albums.Artist, in_Artist) = 0 
		AND STRCMP(Albums.AlbumName, in_AlbumName) = 0 
		AND (
			Albums.Owner = in_Owner 
			OR ISNULL(Albums.Owner) = ISNULL(in_Owner)
		)
	);
	-- if artist or album name not specified album won't be created
	IF NOT ISNULL(in_AlbumName) AND NOT ISNULL(in_Artist) AND ISNULL(@AlbumID)
	
	THEN INSERT INTO 
	Albums(Albums.AlbumName,	Albums.Artist, Albums.AlbumYear, Albums.Owner) 
	VALUES (in_AlbumName, in_Artist, in_Year, in_Owner);
	
	SET @AlbumID = LAST_INSERT_ID();
	END IF;
	
	UPDATE Albums SET SongCount = SongCount + 1	WHERE Albums.ID = @AlbumID;
	
	INSERT INTO 
	Songs(Songs.SongName,Songs.Artist,Songs.Owner,Songs.AlbumID,
	Songs.Length,Songs.Adress,Songs.Cover) 
	Values 
	(in_SongName,in_Artist,in_Owner,@AlbumID,in_Length,in_Adress,in_Cover);
	
	INSERT INTO 
	SongsMetadata(SongsMetadata.ID, SongsMetadata.Genre, SongsMetadata.SongYear,
	SongsMetadata.AlbumIndex) 
	VALUES
	(LAST_INSERT_ID(), in_Genre, in_Year, in_AlbumIndex);
	
	INSERT INTO SongNeuralNetworkData VALUES
	(LAST_INSERT_ID(), in_song_artist_familiarity, in_song_artist_hotttnesss,
	in_song_duration, in_song_key, in_song_key_confidence,	in_song_loudness,
	in_song_hotttnesss, in_song_tempo, in_song_end_of_fade_in_relative,
	in_song_start_of_fade_out_relative);
	
	RETURN 1;
END;
//
DELIMITER ; 

DELIMITER //
CREATE FUNCTION deleteSong(	
	InSongID int,
	InOwnerID int
)
RETURNS BOOL
BEGIN
	IF NOT EXISTS(
		SELECT * 
		FROM Songs 
		WHERE Songs.ID = InSongID AND
				Songs.Owner = InOwnerID
	) 
	THEN
	RETURN 0;
	END IF;
	
	UPDATE UsersSongs	SET songsCount = songsCount - 1 
	WHERE UsersSongs.ID = (SELECT Owner FROM Songs WHERE Songs.ID = InSongID);
	
	SET @InAlbumID = (SELECT AlbumID FROM Songs WHERE ID = InSongID);
	
	UPDATE Albums SET SongCount = SongCount - 1 
	WHERE Albums.ID = @InAlbumID;
	
	DELETE FROM UserListens WHERE SongID = InSongID;
	DELETE FROM PlaylistSongs WHERE SongID = InSongID;
	DELETE FROM SongsMetadata WHERE ID = InSongID;
	DELETE FROM SongNeuralNetworkData WHERE ID = InSongID;
	DELETE FROM Songs WHERE ID = InSongID;
	DELETE FROM Albums WHERE ID = @InAlbumID AND SongCount = 0;
	RETURN 1;
END;
//
DELIMITER ; 

DELIMITER //
CREATE PROCEDURE registerListen(	
	IN InUserID int,
	IN InSongID int
)
BEGIN
	IF EXISTS(
		SELECT * FROM UserListens 
		WHERE
			UserID = InUserID AND
			SongID = InSongID
	)
	THEN
		UPDATE UserListens 
		SET ListenCount = ListenCount + 1
		WHERE 
			UserID = InUserID AND
			SongID = InSongID;
	ELSE
		INSERT INTO UserListens(UserID, SongID, ListenCount) VALUES
		(InUserID,InSongID,1);
	END IF;
END;
//
DELIMITER ; 

DELIMITER //
CREATE PROCEDURE getRandomSongs(
	IN InCount int,
	IN InOwnerID int
)
BEGIN
	SELECT ID, SongName, Artist, AlbumID, Length, CONCAT('http://138.68.69.43/music/',Adress) AS Adress , Cover 
	FROM Songs
	WHERE Owner IS NULL OR Owner = InOwnerID
	ORDER BY RAND()
	LIMIT InCount;
END;
//
DELIMITER ; 

DELIMITER //
CREATE FUNCTION createPlaylist(	
	InPlaylistName varchar(150),
	InOwnerID int
)
RETURNS BOOL
BEGIN
	INSERT INTO Playlists(PlaylistName,OwnerID) 
	VALUES (InPlaylistName,InOwnerID);
	RETURN LAST_INSERT_ID();
END;
//
DELIMITER ; 

DELIMITER //
CREATE FUNCTION insertInPlaylist(
	InPlaylistID int,	
	InSongID int,
	InPrevSongPos float,
	InNextSongPos float,
	InOwnerID int
)
RETURNS BOOL
BEGIN
	IF EXISTS (
		SELECT * FROM Songs 
		WHERE 
			ID = InSongID AND
			(
				Owner = InOwnerID OR
				Owner IS NULL
			)
		)
		AND
		EXISTS (
			SELECT * FROM Playlists 
			WHERE 
				OwnerID = InOwnerID
		)
	THEN
		INSERT INTO PlaylistSongs(PlaylistID,SongID,Pos)
		VALUES (InPlaylistID,InSongID,(InPrevSongPos+InNextSongPos) / 2.0);
		RETURN 1;
	END IF;
	RETURN 0;
END;
//
DELIMITER ; 

DELIMITER //
CREATE FUNCTION deletePlaylist(
	InPlaylistID int,
	InOwnerID int
)
RETURNS BOOL
BEGIN
	IF NOT EXISTS(
		SELECT * 
		FROM Playlists 
		WHERE ID = InPlaylistID AND
				OwnerID = InOwnerID
	)
	THEN
	RETURN 0;
	END IF;
	DELETE FROM PlaylistSongs
	WHERE PlaylistID = InPlaylistID;
	DELETE FROM Playlists 
	WHERE ID = InPlaylistID;
	RETURN ROW_COUNT();
END;
//
DELIMITER ; 

DELIMITER //
CREATE FUNCTION deleteFromPlaylist(
	InPlaylistID int,	
	InSongID int,
	InSongPos float,
	InOwnerID int
)
RETURNS BOOL
BEGIN	
	IF NOT EXISTS(
		SELECT * 
		FROM Playlists 
		WHERE ID = InPlaylistID AND
				OwnerID = InOwnerID
	)
	THEN
	RETURN 0;
	END IF;
	DELETE FROM PlaylistSongs
	WHERE
		PlaylistID = InPlaylistID AND
		SongID = InSongID AND
		Pos = InSongPos;
	RETURN ROW_COUNT();
END;
//
DELIMITER ; 

DELIMITER //
CREATE FUNCTION movePlaylistSong(
	InPlaylistID int,	
	InSongID int,
	InOldPos float,
	InNewPos float,
	InOwnerID int
)
RETURNS BOOL
BEGIN
	IF NOT EXISTS(
		SELECT * 
		FROM Playlists 
		WHERE ID = InPlaylistID AND
				OwnerID = InOwnerID
	)
	THEN
	RETURN 0;
	END IF;
	UPDATE PlaylistSongs
	SET Pos = InNewPos
	WHERE
		PlaylistID = InPlaylistID AND
		SongID = InSongID AND
		Pos = InOldPos;
	RETURN ROW_COUNT();
END;
//
DELIMITER ; 

DELIMITER //
CREATE PROCEDURE getPlaylistSongs(
	IN InPlaylistID int,	
	IN InOwnerID int
)
BEGIN
	IF EXISTS(
		SELECT * 
		FROM Playlists 
		WHERE ID = InPlaylistID AND
				OwnerID = InOwnerID
	)
	THEN
		SELECT Songs.ID, Songs.SongName, Songs.Artist, Songs.AlbumID, Songs.Length, 
		CONCAT('http://138.68.69.43/music/',Songs.Adress) AS Adress , Songs.Cover, PlaylistSongs.Pos
		FROM PlaylistSongs
		JOIN Songs ON PlaylistSongs.SongID = Songs.ID
		WHERE PlaylistSongs.PlaylistID = InPlaylistID
		ORDER BY PlaylistSongs.Pos ASC;
	END IF;
END;
//
DELIMITER ; 

DELIMITER //
CREATE PROCEDURE listPlaylists(
	IN InOwnerID int
)
BEGIN
	SELECT ID, PlaylistName
	FROM Playlists 
	WHERE OwnerID = InOwnerID;
END;
//
DELIMITER ;
