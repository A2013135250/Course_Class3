# Sistema SOA - Venta de Plásticos

Proyecto académico desarrollado con arquitectura orientada a servicios (SOA) para la gestión de una empresa distribuidora de productos plásticos.

## Descripción

El sistema implementa una arquitectura SOA utilizando servicios independientes que gestionan distintas áreas del negocio:

- Inventario de productos plásticos
- Gestión de clientes
- Gestión de ventas
- Persistencia de datos con MySQL
- Contenerización mediante Docker

Cada servicio funciona de manera independiente y puede ser consumido mediante APIs REST.

---

## Arquitectura del sistema

```text
                        +----------------------+
                        | Aplicación Cliente   |
                        | (Panel Web/API)      |
                        +----------+-----------+
                                   |
                            +------+------+
                            | ESB / BUS   |
                            | Apache Camel|
                            +---+------+--+
                                |      |
            +-------------------+------+-------------------+
            |                                          |
+-----------+---------+                +-----------------+--------+
| Inventario           |                | Clientes                 |
| Productos plásticos  |                | Registro de clientes     |
+-----------+---------+                +-----------------+--------+
            |                                          |
            +----------------+-------------------------+
                             |
                  +----------+----------+
                  | Ventas              |
                  | Registro pedidos    |
                  +----------+----------+
                             |
                      +------+------+
                      | MySQL       |
                      +-------------+
```

---

## Tecnologías utilizadas

- Node.js
- Express
- MySQL
- Sequelize ORM
- Docker
- Docker Compose
- Apache Camel (ESB)

---

## Estructura del proyecto

```text
proyecto-soa-plasticos/

├── clientes/
│   ├── config/
│   ├── models/
│   ├── app.js
│   └── Dockerfile
│
├── inventario/
│   ├── config/
│   ├── models/
│   ├── app.js
│   └── Dockerfile
│
├── ventas/
│   ├── config/
│   ├── models/
│   ├── app.js
│   └── Dockerfile
│
├── database/
│   └── init.sql
│
├── docker-compose.yml
│
└── README.md
```

---

## Servicios implementados

### Servicio Inventario

Permite administrar productos plásticos disponibles.

Endpoints:

```http
GET /productos
POST /productos
```

Ejemplo:

```json
{
    "nombre":"PVC",
    "tipo":"Tubo",
    "precio":22.50,
    "stock":40
}
```

---

### Servicio Clientes

Permite registrar y consultar clientes.

Endpoints:

```http
GET /clientes
POST /clientes
```

Ejemplo:

```json
{
    "nombre":"Carlos Ruiz",
    "empresa":"Constructora Perú SAC",
    "telefono":"999888777",
    "correo":"carlos@empresa.com"
}
```

---

### Servicio Ventas

Permite registrar pedidos y ventas.

Endpoints:

```http
GET /ventas
POST /ventas
```

Ejemplo:

```json
{
    "cliente_id":1,
    "producto_id":1,
    "cantidad":10,
    "total":225
}
```

---

## Instalación

### Clonar repositorio

```bash
git clone https://github.com/usuario/proyecto-soa-plasticos.git
```

Entrar al proyecto:

```bash
cd proyecto-soa-plasticos
```

---

## Ejecutar con Docker

Construir contenedores:

```bash
docker compose up --build
```

Ejecutar en segundo plano:

```bash
docker compose up -d
```

Detener contenedores:

```bash
docker compose down
```

---

## Puertos utilizados

| Servicio | Puerto |
|-----------|---------|
| MySQL | 3306 |
| Inventario | 3001 |
| Clientes | 3002 |
| Ventas | 3003 |

---

## Base de datos

Motor utilizado:

MySQL

Configuración:

```env
MYSQL_ROOT_PASSWORD=123456
MYSQL_DATABASE=soa_db
```

---

## Autor

Proyecto desarrollado para práctica académica de Arquitectura SOA.

