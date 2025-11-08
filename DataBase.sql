CREATE DATABASE titangymapp;
USE titangymapp;

CREATE TABLE clientes (
    Id BIGINT AUTO_INCREMENT PRIMARY KEY,
    DNI INT NOT NULL,
    Nombre VARCHAR(50),
    Apellido VARCHAR(50),
    Direccion VARCHAR(100),
    Telefono VARCHAR(30),
    Correo VARCHAR(100),
    Fecha_Alta DATETIME DEFAULT CURRENT_TIMESTAMP,
    Activo BOOLEAN DEFAULT 1
);