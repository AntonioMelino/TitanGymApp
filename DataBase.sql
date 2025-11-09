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

USE titangymapp;

INSERT INTO clientes (DNI, Nombre, Apellido, Direccion, Telefono, Correo, Fecha_Alta, Activo)
VALUES (12345678, 'Antonio', 'Melino', 'Calle Falsa 123', '1122334455', 'antonio@email.com', '2025-11-07 00:00:00', 1);

select * from clientes;