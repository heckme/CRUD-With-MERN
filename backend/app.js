const express = require('express');
const bodyParser = require('body-parser');
const database = require('mysql');
var koneksi = require('cors');
var app = express();

const dbs = database.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'wisemonkey',
    port: '3306'
});
dbs.connect();


var port = 8002;

app.use(koneksi());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req, res) => {
    var panggilData = 'SELECT * FROM  produk_samid';
    dbs.query(panggilData, (kaloError, hasilQuery) => {
        if(kaloError)
        {
            throw kaloError;
        } 
        else 
        {
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

/** Untuk mengambil data per baris */
app.get('/getdata/:id', (req, res) => {
    /** Menyiapkan query untuk ke MySQL */
    var grabData = `SELECT * FROM produk_samid WHERE id = ${req.params.id}`;
    /** Mengeksekusi query dengan syntax nodeJS */
    dbs.query(grabData, (err, hasilquery) => {
        if(err){
            /** Mengeluarkan pesan error apabila terjadi kesalahan */
            throw err;
        } else {
            /** Menyiapkan hasil query untuk siap dikirim */
            res.send(hasilquery);
        }
    })
});

/** Untuk mengupdate data */
app.post('/ubahData', (req, res) => {
    var id = req.body.id;
    var namaProduk = req.body.namaproduk;
    var hargaProduk = req.body.harga;
    var queryUpdate = `UPDATE produk_samid SET nama_produk = "${namaProduk}", 
                        harga = "${hargaProduk}" WHERE id="${id}"`;
    dbs.query(queryUpdate, (err, result) => {
        if(err){
            throw err;
        } else {
            res.send('Update berhasil !');
        }
    });
});

app.listen(port, () => {
    console.log('Server berjalan di port '+port+' ....')
});