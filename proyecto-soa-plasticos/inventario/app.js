const express  = require('express');
const cors     = require('cors');
const sequelize = require('./config/database');
const productosRouter = require('./routes/productos');

const app  = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Health check — usado por Docker y el ESB
app.get('/health', (req, res) => res.json({ service: 'inventario', status: 'ok' }));

app.use('/productos', productosRouter);

// Sincronizar modelos y arrancar
sequelize.authenticate()
  .then(() => {
    console.log('[Inventario] Conexión a MySQL OK');
    return sequelize.sync({ alter: false });
  })
  .then(() => {
    app.listen(PORT, () => console.log(`[Inventario] Escuchando en puerto ${PORT}`));
  })
  .catch(err => {
    console.error('[Inventario] Error de conexión:', err.message);
    process.exit(1);
  });
