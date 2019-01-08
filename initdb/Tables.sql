CREATE TABLE client(
	email varchar(50) NOT NULL,
    password varchar(50) NOT NULL,
    PRIMARY KEY (email)
);

CREATE TABLE mass_reservation(
		id INT AUTO_INCREMENT,
        client varchar(50),
        PRIMARY KEY(id),
        FOREIGN KEY(client) REFERENCES client(email)
);

CREATE TABLE reservation(
	mass_reservation INT,
    display INT,
    seat_row INT CHECK(seat_row>0),
    seat_column INT CHECK(seat_column>0),
    FOREIGN KEY (mass_reservation) REFERENCES mass_reservation(id),
    FOREIGN KEY (display) REFERENCES display(id)
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

CREATE TABLE room(
	id INT AUTO_INCREMENT,
    cinema varchar(30),
    rows_number INT CHECK(rows_number>0),
    columns_number INT CHECK(columns_number>0),
    PRIMARY KEY (id),
    FOREIGN KEY (cinema) REFERENCES cinema(name)
);

CREATE TABLE cinema(
	name varchar(30) NOT NULL,
    address varchar(255) NOT NULL,
    PRIMARY KEY (name)
);

CREATE TABLE cinema_manager(
	email varchar(50),
    password varchar(50),
    cinema varchar(30),
    name varchar(30),
    surname varchar(30),
    PRIMARY KEY (email),
    FOREIGN KEY (cinema) REFERENCES cinema(name)
);

CREATE TABLE admins(
	email varchar(50),
    password varchar(50),
    name varchar(30),
    surname varchar(30)
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

CREATE TABLE display_log(
	id INT,
    old_room INT,
    new_room INT,
    old_start_time DATETIME,
    new_start_time DATETIME,
    FOREIGN KEY (id) REFERENCES display(id)
);
	