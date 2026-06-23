Arquitectura propuesta 
                        +----------------------+
                        | Aplicación Cliente   |
                        | (Panel Web/Ventas)   |
                        +----------+-----------+
                                   |
                                   |
                            +------+------+
                            | ESB / BUS   |
                            | SOA Router  |
                            +---+------+--+
                                |      |
             +------------------+      +------------------+
             |                                         |
+------------+---------+             +------------------+----------+
| Servicio Inventario  |             | Servicio Clientes           |
| Productos plásticos  |             | Clientes y empresas         |
+------------+---------+             +------------------+----------+
             |                                         |
             +------------------+----------------------+
                                |
                     +----------+-----------+
                     | Servicio Ventas      |
                     | Pedidos y facturas   |
                     +----------+-----------+
                                |
                         +------+------+
                         | MySQL       |
                         +-------------+

Proyecto SOA venta de plásticos
Los tres servicios (contratos) quedarían así:

Servicio 1: Inventario de Plásticos

Responsabilidad:

Registrar productos plásticos
Consultar stock
Actualizar cantidades

Tabla:
Ejemplos de datos:

id	nombre	tipo	precio	stock
1	Polietileno	Bolsa industrial	10.50	100
2	PVC	Tubo	22.30	50
3	Polipropileno	Lámina	15.20	80

API:

GET /productos
GET /productos/:id
POST /productos
PUT /productos/:id
Ejecutar:
docker compose up --build

Servicios:
GET/POST http://localhost:3001/productos
GET/POST http://localhost:3002/clientes
GET/POST http://localhost:3003/ventas

Servicio 2: Clientes

Responsabilidad:

Registrar clientes
Consultar clientes

Tabla:

CREATE TABLE clientes(

id INT AUTO_INCREMENT PRIMARY KEY,
nombre VARCHAR(100),
empresa VARCHAR(100),
telefono VARCHAR(30),
correo VARCHAR(100)

);
