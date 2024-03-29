CREATE DATABASE cinemas;
USE cinemas;

CREATE TABLE client(
	email varchar(50) NOT NULL check(email REGEXP ".+@.+[.]{1}.+"),
    password varchar(255) NOT NULL,
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
    ticket_price int unsigned default(10),
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
    password varchar(255),
    cinema varchar(30),
    name varchar(30),
    surname varchar(30),
    PRIMARY KEY (email),
    FOREIGN KEY (cinema) REFERENCES cinema(name)
);

CREATE TABLE admin(
	email varchar(50) check(email REGEXP ".+@.+[.]{1}.+"),
    password varchar(255),
    name varchar(30),
    surname varchar(30)
);

CREATE TABLE display_log(
  entry_id INT AUTO_INCREMENT,
	id INT,
    old_room INT,
    new_room INT,
    old_start_time DATETIME,
    new_start_time DATETIME,
    FOREIGN KEY (id) REFERENCES display(id),
    PRIMARY KEY (entry_id)

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

CREATE TRIGGER log_displays_after_insert AFTER INSERT ON display
FOR EACH ROW
  BEGIN
    INSERT INTO display_log(id, new_room, new_start_time) 
      VALUES (
        NEW.id,
        NEW.room,
        NEW.start_time
      );
END$$

CREATE TRIGGER log_displays_after_update AFTER UPDATE ON display
FOR EACH ROW
  BEGIN
    INSERT INTO display_log(id, old_room, new_room, old_start_time, new_start_time) 
      VALUES (
        NEW.id,
        OLD.room,
        NEW.room,
        OLD.start_time,
        NEW.start_time
      );
END$$

CREATE TRIGGER log_displays_after_delete AFTER DELETE ON display
FOR EACH ROW
  BEGIN
      INSERT INTO display_log(id, old_room, old_start_time) 
      VALUES (
        OLD.id,
        OLD.room,
        OLD.start_time
      );
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE reserve_tickets (IN arg_list VARCHAR(255))
BEGIN
  SET autocommit = 0;

  SET @params = arg_list;

  -- client,display,col,row,col,row,...
  -- first param is client id
  SELECT SUBSTR(@params from 1 for instr(@params, ',') - 1) INTO @client;
  -- shift list to next comma
  SELECT SUBSTR(@params from instr(@params, ',') + 1) INTO @params;
  SELECT SUBSTR(@params from 1 for instr(@params, ',') - 1) INTO @display;
  -- shift list to next comma
  SELECT SUBSTR(@params from instr(@params, ',') + 1) INTO @params;

  INSERT INTO mass_reservation(client) VALUES (@client);
  SELECT LAST_INSERT_ID() INTO @mass_id;

  WHILE @params != '' DO
    SELECT SUBSTR(@params from 1 for instr(@params, ',') - 1) INTO @seat_row;
    SELECT SUBSTR(@params from instr(@params, ',') + 1) INTO @params;
    SELECT SUBSTR(@params from 1 for instr(@params, ',') - 1) INTO @seat_col;
    SELECT SUBSTR(@params from instr(@params, ',') + 1) INTO @params;

    -- check if place is taken
    SELECT COUNT(*) FROM reservation 
      WHERE seat_row=@seat_row AND seat_col=@seat_col INTO @existing_reservation;
    IF (@existing_reservation>0) THEN
      ROLLBACK;
    END IF;

    -- add reservation
    INSERT INTO reservation(mass_reservation, display, seat_row, seat_col)
      VALUES (
        @mass_id,
        @display,
        @seat_row,
        @seat_col
      );

    SELECT ticket_price 
      FROM display JOIN room ON display.room=room.id 
        JOIN cinema ON room.cinema=cinema.name 
      WHERE display.id=@display INTO @price;
    UPDATE client SET credits=credits-@price WHERE id=@client;
  END WHILE;

  COMMIT;

END$$
DELIMITER ;





