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

-- 🔹 Creación de la tabla entrenadores
CREATE TABLE entrenadores (
    Id BIGINT AUTO_INCREMENT PRIMARY KEY,
    DNI INT NOT NULL UNIQUE,
    Nombre VARCHAR(50) NOT NULL,
    Apellido VARCHAR(50) NOT NULL,
    Direccion VARCHAR(100),
    Telefono VARCHAR(30),
    Correo VARCHAR(100),
    Especialidad VARCHAR(100),
    Experiencia_Anios INT DEFAULT 0,
    Fecha_Nacimiento DATE,
    Fecha_Alta DATETIME DEFAULT CURRENT_TIMESTAMP,
    Sueldo DECIMAL(10,2) DEFAULT 0.00,
    Hora_Inicio TIME DEFAULT '08:00:00',
    Hora_Fin TIME DEFAULT '18:00:00',
    Activo BOOLEAN DEFAULT 1
);

-- 🔹 Tabla de Pagos
CREATE TABLE pagos (
    Id BIGINT AUTO_INCREMENT PRIMARY KEY,
    ClienteId BIGINT NOT NULL,
    Monto DECIMAL(10,2) NOT NULL,
    MetodoPago ENUM('Efectivo', 'Transferencia', 'MercadoPago', 'Tarjeta', 'Otro') DEFAULT 'Efectivo',
    FechaPago DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FechaVencimiento DATE NOT NULL,
    Observaciones VARCHAR(255),
    
    RegistradoPor VARCHAR(100),
    
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    -- 🔹 Relación con tabla clientes
    CONSTRAINT fk_pago_cliente FOREIGN KEY (ClienteId) 
        REFERENCES clientes(Id)
        ON DELETE CASCADE
);


-- 🔹 Inserción de datos en la tabla clientes
INSERT INTO clientes 
(DNI, Nombre, Apellido, Direccion, Telefono, Correo, Fecha_Alta, Activo)
VALUES
(40123456, 'Juan', 'Pérez', 'Av. Rivadavia 1520', '1165239874', 'juanperez@gmail.com', NOW(), 1),
(38987654, 'Carla', 'Rodríguez', 'Calle Mitre 820', '1156987452', 'carlarodriguez@hotmail.com', NOW(), 1),
(41222333, 'Matías', 'López', 'San Martín 1040', '1178901234', 'matiaslopez@outlook.com', NOW(), 1),
(37777444, 'Lucía', 'Fernández', 'Av. Belgrano 2250', '1145678901', 'luciaf@gmail.com', NOW(), 0),
(39555111, 'Diego', 'Gómez', 'Lavalle 1780', '1133345678', 'diegogomez@gmail.com', NOW(), 1);

-- 🔹 Inserción de datos de ejemplo
INSERT INTO entrenadores 
(DNI, Nombre, Apellido, Direccion, Telefono, Correo, Especialidad, Experiencia_Anios, Fecha_Nacimiento, Sueldo, Hora_Inicio, Hora_Fin, Activo)
VALUES
(30544221, 'Lucas', 'Gómez', 'Av. Corrientes 1234', '1165478923', 'lucasgomez@titangym.com', 'Entrenamiento Funcional', 5, '1990-03-12', 250000.00, '07:00:00', '15:00:00', 1),
(29123345, 'María', 'Fernández', 'Calle San Martín 567', '1153342211', 'mariaf@titangym.com', 'Musculación y Fuerza', 8, '1987-07-25', 270000.00, '10:00:00', '18:00:00', 1),
(32450987, 'Andrés', 'Pérez', 'Belgrano 999', '1170012345', 'andresperez@titangym.com', 'CrossFit', 6, '1992-01-10', 260000.00, '08:00:00', '16:00:00', 1),
(31500555, 'Sofía', 'Martínez', 'Av. Cabildo 321', '1145567890', 'sofiam@titangym.com', 'Yoga y Pilates', 4, '1995-11-18', 240000.00, '12:00:00', '20:00:00', 1),
(33222001, 'Diego', 'Ruiz', 'Lavalle 888', '1138876543', 'diegoruiz@titangym.com', 'Boxeo y Cardio', 7, '1989-09-02', 265000.00, '09:00:00', '17:00:00', 1);

INSERT INTO pagos
(ClienteId, Monto, MetodoPago, FechaPago, FechaVencimiento, Observaciones, RegistradoPor)
VALUES
-- Juan Pérez (Id 1)
(1, 15000.00, 'Efectivo', '2025-01-05 10:32:00', '2025-01-30', 'Cuota mensual enero', 'Lucas Gómez'),
(1, 15000.00, 'MercadoPago', '2025-02-03 18:15:00', '2025-02-28', 'Pago con QR', 'María Fernández'),
(1, 15000.00, 'Transferencia', '2025-03-01 09:40:00', '2025-03-30', 'Comprobante enviado por WhatsApp', 'Andrés Pérez'),

-- Carla Rodríguez (Id 2)
(2, 18000.00, 'Tarjeta', '2025-01-12 14:20:00', '2025-02-10', 'Plan musculación', 'Sofía Martínez'),
(2, 18000.00, 'MercadoPago', '2025-02-11 11:05:00', '2025-03-10', 'Pagó justo antes del vencimiento', 'Diego Ruiz'),
(2, 18000.00, 'Efectivo', '2025-03-08 17:32:00', '2025-04-10', NULL, 'Lucas Gómez'),

-- Matías López (Id 3)
(3, 16000.00, 'Transferencia', '2025-01-03 09:12:00', '2025-01-31', 'Pago inicial', 'María Fernández'),
(3, 16000.00, 'Efectivo', '2025-02-01 16:44:00', '2025-02-28', NULL, 'Andrés Pérez'),
(3, 16000.00, 'Tarjeta', '2025-03-02 08:50:00', '2025-03-31', 'Pago automático', 'Sofía Martínez'),

-- Lucía Fernández (Id 4, cliente inactivo pero con historial)
(4, 14000.00, 'MercadoPago', '2024-12-20 15:22:00', '2025-01-20', 'Último pago antes de darse de baja', 'Diego Ruiz'),
(4, 14000.00, 'Efectivo', '2024-11-18 11:00:00', '2024-12-18', NULL, 'Lucas Gómez'),
(4, 14000.00, 'Transferencia', '2024-10-15 09:45:00', '2024-11-15', 'Retraso de 3 días', 'María Fernández'),

-- Diego Gómez (Id 5)
(5, 17000.00, 'Tarjeta', '2025-01-09 13:25:00', '2025-02-05', 'Inscripción + cuota', 'Andrés Pérez'),
(5, 17000.00, 'MercadoPago', '2025-02-06 19:10:00', '2025-03-05', 'Pago rápido con QR', 'Sofía Martínez'),
(5, 17000.00, 'Efectivo', '2025-03-05 12:55:00', '2025-04-05', 'Pidió comprobante impreso', 'Diego Ruiz');



USE titangymapp;
drop database titangymapp;

select * from clientes;
select * from entrenadores;