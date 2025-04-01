require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/applications', require('./src/routes/applications'));

app.listen(process.env.PORT, () => console.log(`API running on port ${process.env.PORT}`));
