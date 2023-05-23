const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const path = require('path')
const mysql = require('mysql')
require('dotenv').config();


//Conecção com BD MySQL
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

connection.connect(function (err) {
  if (err) {
    console.error('Erro ao conectar ao banco de dados: ' + err.stack);
    return;
  }

  console.log('Conexão estabelecida com o banco de dados.');
});

connection.query('SELECT * FROM users', function (err, rows, fields) {
  if (!err) {
    console.log(`Resultado: ${JSON.stringify(rows)}`)
  } else {
    console.log(`Error ao realizar a consulta`)
  }
})


app.use(bodyParser.json())

app.post('/generate-code', (req, res) => {
  var generatedCode = generateRandomCode()
  console.log(`Código gerado: ${generatedCode}`);
  res.send(generatedCode);
});

app.post('/confirm-code', (req, res) => {
  const { codigo } = req.body;
  console.log(`Código recebido: ${codigo}`);

  if (codigo === generatedCode) {
    res.sendStatus(200); // OK
  } else {
    res.sendStatus(401); // Unauthorized
  }
});

app.use(express.static(path.join(__dirname, "public")))

app.post('/usuarios', (req, res) => {
  const { nome, matricula } = req.body;
  const novoUsuario = { nome, matricula };

  connection.query('INSERT INTO users SET ?', novoUsuario, (err, result) => {
    if (err) {
      console.error('Erro ao cadastrar o usuário:', err);
      res.status(500).json({ error: 'Erro ao cadastrar o usuário' });
    } else {
      console.log('Usuário cadastrado com sucesso!');
      res.status(201).json({ message: 'Usuário cadastrado com sucesso' });
    }
  });
});


app.listen(8081, () => {
  console.log('Server running in http://localhost:8081')
})


function generateRandomCode() {
  return Math.random().toString(36).substr(2, 6).toUpperCase()
}