const express = require('express');
const bodyParser = require('body-parser');
const database = require('mysql');
var koneksi = require('cors');
var app = express();

const dbs = database.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'usbw',
    database: 'produk',
    port: '3307'
});
dbs.connect();


var port = 8002;

app.use(koneksi());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req, res) => {
    var panggilData = 'SELECT * FROM  tas';
    dbs.query(panggilData, (kaloError, hasilQuery) => {
        if(kaloError){
            throw kaloError;
        } else {
            res.send(hasilQuery);
        }
    });
    
});

app.post('/tambahData', (req, res) => {
   var namaProduk = req.body.inputSatu;
   var hargaProduk = req.body.inputDua;
   var sql = `INSERT INTO tas VALUES("${''}", "${namaProduk}", "${hargaProduk}")`;
    dbs.query(sql, (kaloError, hasilnya) => {
        if(kaloError){
            throw kaloError;
        } else {
            res.end('Data berhasil disimpan')
        }
    });
});


app.listen(port, () => {
    console.log('Server berjalan di port '+port+' ....')
});