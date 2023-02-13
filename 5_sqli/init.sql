DROP DATABASE IF EXISTS `sqlidb`;
CREATE DATABASE `sqlidb`;
USE `sqlidb`;

CREATE TABLE `user` (
    `id` INT PRIMARY KEY NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `age` INT NOT NULL,
    `password` VARCHAR(255) NOT NULL
);

INSERT INTO `user` (`id`, `name`, `age`, `password`) VALUES 
    (1, "Alexandre Astier", 45, "C'estPasFaux"),    
    (2, "Louis Debroglie", 128, "Borh avait tort 1967"),
    (3, "Alain Chabat", 62, "ODIL_1001"),
    (4, "Lord Farquaad ", 35, "LaveTesPiedsLaveTonNez");