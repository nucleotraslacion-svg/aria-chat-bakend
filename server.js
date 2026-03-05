const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const ARIABebe = require('./src/ARIA_Bebe.js');

const app = express();
const port = process.env.PORT || 3000;
const aria = new ARIABebe();

app.use(bodyParser.json());
app.use(express.static(__dirname)); // Para servir chat.html

app.post('/chat', (req, res) => {
  const { mensaje } = req.body;
  if (!mensaje) return res.status(400).json({ error: 'Falta el mensaje' });
  const respuesta = aria.responder_maestro(mensaje);
  res.json({ respuesta, memoria: aria.obtener_estado() });
});

app.listen(port, () => {
  console.log(`Servidor ARIA-BEBE activo en el puerto ${port}`);
});
