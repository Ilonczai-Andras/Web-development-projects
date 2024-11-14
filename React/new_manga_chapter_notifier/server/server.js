require('dotenv').config()

const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const PORT = 8080;

// Enable CORS for requests from http://localhost:3000
app.use(cors({
    origin: 'http://localhost:3000',
    methods: 'POST'
}));

app.use(express.json());

app.get('/api/test', (req, res) => {
    res.send('Server is working!');
});

app.post('/api/token', async (req, res) => {
    const { authorizationCode, codeVerifier } = req.body;

    const CLIENT_ID = process.env.CLIENT_ID;
    const CLIENT_SECRET = process.env.CLIENT_SECRET;
    
    const url = 'https://myanimelist.net/v1/oauth2/token';
    const data = new URLSearchParams({
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    code: authorizationCode,
    code_verifier: codeVerifier,
    grant_type: 'authorization_code'});

  try {
    const response = await axios.post(url, data);
    const token = response.data;

    console.log('Token generated successfully!');

    res.json(token);
  } catch (error) {
    console.error('Error generating token:', error.response ? error.response.data : error.message);
    throw error;
  }
});

app.post('/api/myanimelist/user', async (req, res) => {
  
  const { accessToken } = req.body;
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'https://api.myanimelist.net/v2/users/@me',
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  };

  try {
    const response = await axios.request(config);
    res.json(response.data);
  } catch (error) {
    res.status(error.response ? error.response.status : 500).json(
      error.response ? error.response.data : { message: "An error occurred" }
    );
  }
});

app.listen(PORT, () => {
    console.log(`Proxy server running on http://localhost:${PORT}`);
});
