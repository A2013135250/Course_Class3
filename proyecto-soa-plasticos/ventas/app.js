const express   = require('express');
const cors      = require('cors');
const sequelize = require('./config/database');
const ventasRouter = require('./routes/ventas');

const app  = express();
const PORT = process.env.PORT || 3003;

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => res.json({ service: 'ventas', status: 'ok' }));

app.use('/ventas', ventasRouter);

sequelize.authenticate()
  .then(() => {
    console.log('[Ventas] Conexión a MySQL OK');
    return sequelize.sync({ alter: false });
  })
  .then(() => {
    app.listen(PORT, () => console.log(`[Ventas] Escuchando en puerto ${PORT}`));
  })
  .catch(err => {
    console.error('[Ventas] Error de conexión:', err.message);
    process.exit(1);
  });
