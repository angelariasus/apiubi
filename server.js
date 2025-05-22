const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

let lastLocation = null;

app.post('/location', (req, res) => {
  const { lat, lon, time } = req.body;
  if (
    typeof lat === 'number' &&
    typeof lon === 'number' &&
    typeof time === 'string'
  ) {
    lastLocation = { lat, lon, time };
    return res.status(200).json({ message: 'Ubicación recibida' });
  }
  return res.status(400).json({ message: 'Datos inválidos' });
});

app.get('/location', (req, res) => {
  if (lastLocation) {
    return res.json(lastLocation);
  }
  res.status(404).json({ message: 'No hay ubicación disponible' });
});

app.listen(port, () => {
  console.log(`API escuchando en http://localhost:${port}`);
});
