
INSERT INTO `admin` VALUES 
	('jan.kowalski@gmail.com','janek321','Kowalski','Jan'),
	('adam.nowak@xd.com','adam098','Nowak','Adam');

INSERT INTO `cinema` VALUES 
	('Kino Breslau','ul. Zamoyskiego 34, 62-342 Wrocław'),
	('Kino Czewa','ul. Gaudiego 52, 42-200 Częstochowa');

INSERT INTO `client` VALUES 
	('jan2137@papiez.com','kremowki',0),
	('lukasz.lukasz@gmail.com','luk27',50),
    ('zuzia.jakas@gmail.com','zuzia999',100);


INSERT INTO `display` VALUES 
	(1,1,'2019-01-20 17:00:00'),
	(1,2,'2019-01-21 19:00:00'),
    (1,6,'2019-01-22 15:00:00'),
    (2,1,'2019-01-20 17:00:00'),
    (2,2,'2019-01-20 14:00:00'),
    (2,3,'2019-01-22 13:30:00'),
    (3,5,'2019-01-20 19:00:00'),
    (3,2,'2019-01-21 21:00:00'),
    (3,8,'2019-01-20 12:00:00'),
    (3,3,'2019-01-21 16:15:00'),
    (3,5,'2019-01-20 13:00:00'),
    (4,1,'2019-01-21 17:00:00'),
    (4,8,'2019-01-20 18:00:00'),
    (4,7,'2019-01-21 18:00:00'),
    (5,5,'2019-01-20 19:00:00'),
    (5,3,'2019-01-21 20:00:00'),
    (5,1,'2019-01-20 15:00:00'),
    (5,2,'2019-01-22 14:00:00'),
    (6,8,'2019-01-20 17:00:00'),
    (6,6,'2019-01-22 16:00:00'),
    (7,4,'2019-01-20 14:45:00'),
    (7,3,'2019-01-22 19:00:00'),
    (8,2,'2019-01-20 22:00:00'),
    (8,1,'2019-01-21 11:00:00'),
    (8,4,'2019-01-20 10:00:00'),
    (9,8,'2019-01-22 13:00:00'),
    (9,3,'2019-01-20 17:00:00');

INSERT INTO `film` VALUES 
	('The Godfather',175,'16','action'),
    ('Bohemian Rhapsody',134,'12','documentary'),
    ('Manchaster by the Sea',137,'12','comedy'),
    ('Gladiator',155,'12','action'),
    ('Frozen',108,'0','animation'),
    ('Widows',128,'16','action'),
    ('Krzysiu, gdzie jesteś?',104,'0','comedy'),
    ('To tylko koniec świata',97,'16','criminal'),
    ('Requiem for a dream',102,'16','thriller'),
    ('Pretty Woman',119,'12','romantic'),
    ('Projektantka',118,'7','comedy');

INSERT INTO `manager` VALUES 
	('hannasuchocka@kino.com','hania001122','Kino Breslau','Suchocka','Hanna'),
    ('joanna.manager@kino.com','haslo','Kino Breslau','Odra','Joanna'),
    ('pawel_krupski@kino.com','anal69','Kino Czewa','Krupski','Paweł'),
    ('tymek4545@kino.com','tymon23','Kino Breslau','Krzak','Tymon'),
    ('zygixd@kino.com','nosiema','Kino Czewa','Śmiesszek','Zygmunt');

INSERT INTO `room` VALUES (1,'Kino Breslau',15,30),
	(2,'Kino Breslau',10,20),
	(3,'Kino Breslau',30,30),
	(4,'Kino Breslau',40,20),
	(5,'Kino Czewa',15,30),
	(6,'Kino Czewa',20,30),
	(7,'Kino Czewa',30,20),
	(8,'Kino Czewa',40,40);
