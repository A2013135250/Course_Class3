# PlastiSOA — Sistema SOA para Distribuidora de Plásticos

Sistema basado en **Arquitectura Orientada a Servicios (SOA)** para gestionar inventario, clientes y ventas de productos plásticos.

---

## Arquitectura

```
┌─────────────┐
│  Cliente Web │  :8888  (nginx + HTML/JS)
└──────┬──────┘
       │  HTTP
┌──────▼──────────────────────────────────┐
│         ESB — Apache Camel  :8080        │
│                                          │
│  /api/productos  ──►  inventario:3001    │
│  /api/clientes   ──►  clientes:3002      │
│  /api/ventas GET ──►  ventas:3003        │
│  /api/ventas POST ► orquestación:        │
│    1. Valida cliente  (GET clientes)     │
│    2. Valida producto (GET inventario)   │
│    3. Verifica stock                     │
│    4. Registra venta  (POST ventas)      │
│    5. Descuenta stock (PATCH inventario) │
└──────┬───────────────────────────────────┘
       │
┌──────▼───────────────────────────────────┐
│                 MySQL :3306               │
│  db_inventario │ db_clientes │ db_ventas  │
└──────────────────────────────────────────┘
```

---

## Servicios

| Servicio    | Puerto | Schema MySQL  | Responsabilidad              |
|-------------|--------|---------------|------------------------------|
| Inventario  | 3001   | db_inventario | CRUD de productos y stock    |
| Clientes    | 3002   | db_clientes   | CRUD de clientes             |
| Ventas      | 3003   | db_ventas     | Registro de ventas           |
| ESB         | 8080   | —             | Enrutamiento y orquestación  |
| Cliente Web | 8888   | —             | Interfaz de usuario          |

---

## Endpoints disponibles

### A través del ESB (uso normal)

```
GET  http://localhost:8080/api/productos
POST http://localhost:8080/api/productos
GET  http://localhost:8080/api/clientes
POST http://localhost:8080/api/clientes
GET  http://localhost:8080/api/ventas
POST http://localhost:8080/api/ventas    ← orquestado
GET  http://localhost:8080/health
```

### Acceso directo por servicio (desarrollo/Postman)

```
GET  http://localhost:3001/productos
POST http://localhost:3001/productos
PATCH http://localhost:3001/productos/:id/stock

GET  http://localhost:3002/clientes
POST http://localhost:3002/clientes

GET  http://localhost:3003/ventas
POST http://localhost:3003/ventas
```

---

## Requisitos

- Docker Desktop ≥ 24
- Docker Compose v2

---

## Levantar el sistema

```bash
# 1. Clonar el repositorio
git clone <url> proyecto-soa-plasticos
cd proyecto-soa-plasticos

# 2. Construir y levantar todos los contenedores
docker compose up --build

# 3. Esperar a que MySQL esté listo (~30s la primera vez)
#    Los servicios Node.js esperan el healthcheck de MySQL

# 4. Abrir el cliente web
open http://localhost:8888
```

### Solo levantar servicios Node.js (sin ESB)

```bash
docker compose up mysql inventario clientes ventas
```

---

## Ejemplos de uso con curl

### Registrar un producto
```bash
curl -X POST http://localhost:8080/api/productos \
  -H "Content-Type: application/json" \
  -d '{"nombre":"PVC Rígido","tipo":"Tubo","precio":22.50,"stock":40}'
```

### Registrar un cliente
```bash
curl -X POST http://localhost:8080/api/clientes \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Carlos Ruiz","empresa":"Constructora Perú SAC","telefono":"999888777","correo":"carlos@empresa.com"}'
```

### Registrar una venta (orquestada por el ESB)
```bash
curl -X POST http://localhost:8080/api/ventas \
  -H "Content-Type: application/json" \
  -d '{"cliente_id":1,"producto_id":1,"cantidad":10,"total":225.00}'
```

El ESB valida cliente, producto y stock antes de registrar. Si el stock es insuficiente devuelve HTTP 409.

---

## Estructura del proyecto

```
proyecto-soa-plasticos/
├── inventario/
│   ├── config/database.js
│   ├── models/Producto.js
│   ├── routes/productos.js
│   ├── app.js
│   ├── package.json
│   └── Dockerfile
├── clientes/
│   ├── config/database.js
│   ├── models/Cliente.js
│   ├── routes/clientes.js
│   ├── app.js
│   ├── package.json
│   └── Dockerfile
├── ventas/
│   ├── config/database.js
│   ├── models/Venta.js
│   ├── routes/ventas.js
│   ├── app.js
│   ├── package.json
│   └── Dockerfile
├── esb/
│   ├── src/main/java/com/soaplasticos/
│   │   ├── EsbMain.java
│   │   └── XmlRoutesLoader.java
│   ├── routes.xml
│   ├── pom.xml
│   └── Dockerfile
├── cliente-web/
│   ├── index.html
│   └── Dockerfile
├── database/
│   └── init.sql
├── docker-compose.yml
└── README.md
```

---

## Principios SOA aplicados

- **Bajo acoplamiento**: cada servicio tiene su propia base de datos y no accede directamente a la de otro.
- **Contrato de servicio**: cada servicio expone una API REST documentada con modelos definidos.
- **ESB como mediador**: el cliente web nunca llama directamente a los servicios; todo pasa por el ESB.
- **Orquestación en el ESB**: la lógica de negocio compleja (validar → descontar stock → registrar venta) vive en el ESB, no en los servicios individuales.
- **Health checks**: cada servicio expone `/health` para monitoreo.
- **Schemas separados**: `db_inventario`, `db_clientes`, `db_ventas` garantizan independencia de datos.

---

## Tecnologías

| Capa        | Tecnología                    |
|-------------|-------------------------------|
| Servicios   | Node.js 18 + Express 4        |
| ORM         | Sequelize 6                   |
| Base datos  | MySQL 8.0                     |
| ESB         | Apache Camel 4.4 (standalone) |
| Contenedores| Docker + Docker Compose v2    |
| Cliente web | HTML5 + CSS3 + JavaScript     |
| Servidor web| Nginx Alpine                  |
