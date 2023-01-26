const express = require('express');
const app = express();
const cors = require('cors');
const dbService = require('./views/database');

app.use(express.json());
app.use(express.urlencoded({extended: false}));

//create
app.post('/insert', (req, res, next) => {
  const { name } = req.body.name;
  const { email } = req.body.email;
  const { phone } = req.body.phone;
  
  const db = dbService.getDbServiceInstance();

  const result = db.insertNewName(data);

  result
  .then(data => response.json({ data: data}))
  .catch(err => console.log(err));
});

//read
app.get('/getAll', (req, res, next) => {
  const db = dbService.getDbServiceInstance();
  const result = db.getAllData();
  result
  .then(data => res.json({data: data}))
  .catch(err => console.log(err));
})

//update
app.patch('/update', (request, response) => {
  const { name } = req.body.name;
  const { email } = req.body.email;
  const { phone } = req.body.phone;
  const db = dbService.getDbServiceInstance();

  const result = db.updateNameById(id, name, email, phone);

  result
  .then(data => response.json({success : data}))
  .catch(err => console.log(err));
});


//delete

app.delete('/delete/:id', (request, response) => {
  const { id } = request.params;
  const db = dbService.getDbServiceInstance();

  const result = db.deleteRowById(id);

  result
  .then(data => response.json({success : data}))
  .catch(err => console.log(err));
});


app.listen(8000);