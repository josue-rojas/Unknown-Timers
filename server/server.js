const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;
const app = express();
const parser = require('body-parser');
app.use(parser.json());
const { Pool, Client } = require('pg');
var connectionString = process.env.DATABASE_URL;
const pool = new Pool({
  connectionString: connectionString,
});

pool.query("CREATE TABLE IF NOT EXISTS utimers(id SERIAL UNIQUE PRIMARY KEY, expiration timestamptz, color VARCHAR(8), name VARCHAR(255))")

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, '../timer-ui/build')));

app.get('/timers', (req, res) => {
  pool.query('SELECT * FROM utimers where expiration > now() ORDER BY expiration')
  .then(results => {
    res.end(JSON.stringify(results.rows))
  })
  .catch(e => console.error(e.stack))
})

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../timer-ui/build', 'index.html'));
});

app.post('/timer', (req, res)=>{
  pool.query('INSERT INTO utimers(id, expiration, color, name) values(DEFAULT, $1, $2, $3)', [req.body.expiration, req.body.color, req.body.name])
  .then(()=> res.status(200).send({success : "Updated Successfully"}))
  .catch(()=> res.status(500).send({ error: 'Something failed!' }))
})

app.listen(PORT, function () {
  console.error(`Node cluster worker ${process.pid}: listening on port ${PORT}`);
});
