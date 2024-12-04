--tablas

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    tipo ENUM('Gerente', 'Empleado') NOT NULL,
    contrasena VARCHAR(255) NOT NULL,
    card_uid VARCHAR(50) NOT NULL UNIQUE,
    usuario VARCHAR(50) NOT NULL UNIQUE,
    fecha_eliminacion TIMESTAMP NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


CREATE TABLE tarjeta (
    id INT AUTO_INCREMENT PRIMARY KEY,
    card_uid VARCHAR(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


CREATE TABLE puerta (
    id INT AUTO_INCREMENT PRIMARY KEY,
    hora_marca TIMESTAMP NULL DEFAULT NULL,
    tipo VARCHAR(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


CREATE TABLE control_entrada (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    hora_marca TIMESTAMP NULL DEFAULT NULL,
    tipo VARCHAR(20) NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE alarma (
    id INT AUTO_INCREMENT PRIMARY KEY,
    hora_activar TIMESTAMP NULL DEFAULT NULL,
    hora_desactivar TIMESTAMP NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE puerta_estado (
    id INT AUTO_INCREMENT PRIMARY KEY,
    estado TINYINT(1) NOT NULL CHECK (estado IN (0, 1))
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Insertar el primer valor en la tabla
INSERT INTO puerta_estado (estado) VALUES (0);


CREATE TABLE alarma_estado (
    id INT AUTO_INCREMENT PRIMARY KEY,
    estado TINYINT(1) NOT NULL CHECK (estado IN (0, 1))
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Insertar el primer valor en la tabla
INSERT INTO alarma_estado (estado) VALUES (0);
