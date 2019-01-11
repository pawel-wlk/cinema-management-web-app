CREATE DATABASE cinemas;
USE cinemas;

CREATE TABLE client(
	email varchar(50) NOT NULL check(email REGEXP ".+@.+[.]{1}.+"),
    password varchar(50) NOT NULL,
    credits int unsigned,
    PRIMARY KEY (email)
);

CREATE TABLE mass_reservation(
		id INT AUTO_INCREMENT,
        client varchar(50),
        PRIMARY KEY(id),
        FOREIGN KEY(client) REFERENCES client(email)
);

CREATE TABLE film(
	id INT AUTO_INCREMENT,
    title varchar(50),
    duration INT,
    category ENUM('0', '7', '12', '16', '18'),
    genre ENUM('comedy', 'action', 'thriller', 'horror', 'musical', 'romantic', 
		'animation', 'sci-fi', 'fantasy', 'documentary', 'criminal'),
	PRIMARY KEY (id)
);

CREATE TABLE cinema(
	name varchar(30) NOT NULL,
    address varchar(255) NOT NULL,
    PRIMARY KEY (name)
);

CREATE TABLE room(
	id INT AUTO_INCREMENT,
    cinema varchar(30),
    rows_number INT UNSIGNED,
    columns_number INT UNSIGNED,
    PRIMARY KEY (id),
    FOREIGN KEY (cinema) REFERENCES cinema(name)
);

CREATE TABLE display(
	id INT AUTO_INCREMENT,
    film INT,
    room INT,
    start_time DATETIME,
	PRIMARY KEY(id),
    FOREIGN KEY(film) REFERENCES film(id),
    FOREIGN KEY(room) REFERENCES room(id)
);

CREATE TABLE reservation(
	mass_reservation INT,
    display INT,
    seat_row INT UNSIGNED,
    seat_column INT UNSIGNED,
    FOREIGN KEY (mass_reservation) REFERENCES mass_reservation(id),
    FOREIGN KEY (display) REFERENCES display(id)
);


CREATE TABLE manager(
	email varchar(50) check(email REGEXP ".+@.+[.]{1}.+"),
    password varchar(50),
    cinema varchar(30),
    name varchar(30),
    surname varchar(30),
    PRIMARY KEY (email),
    FOREIGN KEY (cinema) REFERENCES cinema(name)
);

CREATE TABLE admin(
	email varchar(50) check(email REGEXP ".+@.+[.]{1}.+"),
    password varchar(50),
    name varchar(30),
    surname varchar(30)
);

CREATE TABLE display_log(
	id INT,
    old_room INT,
    new_room INT,
    old_start_time DATETIME,
    new_start_time DATETIME,
    FOREIGN KEY (id) REFERENCES display(id)
);


DELIMITER $$
CREATE TRIGGER check_reservation_room_size BEFORE INSERT ON reservation
FOR EACH ROW
  BEGIN
    IF (NEW.seat_row >=  (SELECT rows_number FROM room 
      JOIN display ON room.id=display.room WHERE display.id=NEW.display)) 
    THEN
     SIGNAL SQLSTATE '22003' SET MESSAGE_TEXT="Invalid seat row."; 
    END IF;
    IF (NEW.seat_column >= (SELECT columns_number FROM room 
      JOIN display ON room.id=display.room WHERE display.id=NEW.display)) 
    THEN
     SIGNAL SQLSTATE '22003' SET MESSAGE_TEXT="Invalid seat column."; 
    END IF;
END$$
DELIMITER ;

	
