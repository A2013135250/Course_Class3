-- ============================================================
-- SOA Plasticos - Inicialización de Base de Datos
-- Cada servicio tiene su propio schema (principio SOA)
-- ============================================================

CREATE DATABASE IF NOT EXISTS db_inventario CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE DATABASE IF NOT EXISTS db_clientes  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE DATABASE IF NOT EXISTS db_ventas    CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Usuario con acceso a los tres schemas
CREATE USER IF NOT EXISTS 'soa_user'@'%' IDENTIFIED BY 'soa_password';
GRANT ALL PRIVILEGES ON db_inventario.* TO 'soa_user'@'%';
GRANT ALL PRIVILEGES ON db_clientes.*  TO 'soa_user'@'%';
GRANT ALL PRIVILEGES ON db_ventas.*    TO 'soa_user'@'%';
FLUSH PRIVILEGES;

-- ============================================================
-- Schema: Inventario
-- ============================================================
USE db_inventario;

CREATE TABLE IF NOT EXISTS productos (
  id      INT AUTO_INCREMENT PRIMARY KEY,
  nombre  VARCHAR(100) NOT NULL,
  tipo    VARCHAR(80)  NOT NULL,
  precio  DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  stock   INT NOT NULL DEFAULT 0,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO productos (nombre, tipo, precio, stock) VALUES
  ('PVC Rígido',       'Tubo',     22.50, 40),
  ('Polietileno HD',   'Lámina',   15.00, 80),
  ('Polipropileno',    'Granulo',   8.75, 200),
  ('Acrílico Claro',   'Plancha',  45.00, 25),
  ('PVC Flexible',     'Manguera', 18.30, 60);

-- ============================================================
-- Schema: Clientes
-- ============================================================
USE db_clientes;

CREATE TABLE IF NOT EXISTS clientes (
  id        INT AUTO_INCREMENT PRIMARY KEY,
  nombre    VARCHAR(120) NOT NULL,
  empresa   VARCHAR(150),
  telefono  VARCHAR(20),
  correo    VARCHAR(120),
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO clientes (nombre, empresa, telefono, correo) VALUES
  ('Carlos Ruiz',    'Constructora Perú SAC',  '999888777', 'carlos@empresa.com'),
  ('Ana Torres',     'Plásticos del Norte SRL','987654321', 'ana@norte.com'),
  ('Luis Mendoza',   'Ferretería Central E.I.R.L.','976543210','luis@ferreteria.com');

-- ============================================================
-- Schema: Ventas
-- ============================================================
USE db_ventas;

CREATE TABLE IF NOT EXISTS ventas (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  cliente_id  INT NOT NULL,
  producto_id INT NOT NULL,
  cantidad    INT NOT NULL DEFAULT 1,
  total       DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  createdAt   DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt   DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO ventas (cliente_id, producto_id, cantidad, total) VALUES
  (1, 1, 10, 225.00),
  (2, 3,  5,  43.75),
  (3, 2,  8, 120.00);
