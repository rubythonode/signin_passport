CREATE DATABASE my_db;

USE my_db;

CREATE TABLE USERS
(
email varchar(255),
password varchar(255)
);

INSERT INTO USERS (email, password)
VALUES ('ungmo2@gmail.com','1111');

SELECT * FROM USERS;