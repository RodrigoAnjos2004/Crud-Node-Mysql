const mysql = require('mysql');
const express = require('express');
var app = express();
const bodyparser = require('body-parser');

app.use(bodyparser.json());

var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'CrudDB',
    multipleStatements: true
});

mysqlConnection.connect((err) => {
    if (!err)
        console.log('DB conexão estabelecida.');
    else
        console.log('DB conexão falhou \n Error : ' + JSON.stringify(err, undefined, 2));
});


app.listen(3000, () => console.log('Express server is runnig at port no : 3000'));


//Get(tudo) 
app.get('/Cruds', (req, res) => {
    mysqlConnection.query('SELECT * FROM Crud', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

//Get  
app.get('/Cruds/:id', (req, res) => {
    mysqlConnection.query('SELECT * FROM Crud WHERE MatriculaID = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

//Delete  
app.delete('/Cruds/:id', (req, res) => {
    mysqlConnection.query('DELETE FROM Crud WHERE MatriculaID = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send('Deletado com sucesso.');
        else
            console.log(err);
    })
});

//Insert  
app.post('/Cruds', (req, res) => {
    let emp = req.body;
    var sql = "SET @MatriculaID = ?;SET @CPF = ?;SET @Nome = ?;SET @idade = ?; \
    CALL ADDouEditar(@MatriculaID,@CPF,@Nome,@idade);";
    mysqlConnection.query(sql, [emp.MatriculaID, emp.CPF, emp.Nome, emp.idade], (err, rows, fields) => {
        if (!err)
            rows.forEach(element => {
                if(element.constructor == Array)
                res.send('Inserted Crud id : '+element[0].MatriculaID);
            });
        else
            console.log(err);
    })
});

//Update  
app.put('/Cruds', (req, res) => {
    let emp = req.body;
    var sql = "SET @MatriculaID = ?;SET @CPF = ?;SET @Nome = ?;SET @idade = ?; \
    CALL ADDouEditar(@MatriculaID,@CPF,@Nome,@idade);";
    mysqlConnection.query(sql, [emp.MatriculaID, emp.CPF, emp.Nome, emp.idade], (err, rows, fields) => {
        if (!err)
            res.send('Updated successfully');
        else
            console.log(err);
    })
});


