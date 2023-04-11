const express = require('express');
const axios = require('axios');
const app = express();
const path = require('path');
var parser = require('xml2json');
var cors = require('cors')

app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())

function view(name) {
  return path.join(__dirname, 'views', name);
}

app.get('/', async (req, res) => {
  res.sendFile(view('index.html'));
});

app.get('/api/feed', async (req, res) => {
  try {
    const url = new URL(req.get('url')).href;
    var feed = await axios.get(url)
    var json = parser.toJson(feed.data);

    res.setHeader('Content-Type', 'application/json');
    res.end(json)
  } catch {
    res.status(400)
    res.send('<h1>Error 400</h1>invalid URL')
  }  
})


app.listen(process.env.port || 3000);

console.log('Running at Port 3000');