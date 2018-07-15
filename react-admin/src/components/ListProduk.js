import React, { Component } from 'react';
import axios from 'axios';

class ListProduk extends Component {
  state = {
      dataproduk: [],
  }
  componentDidMount(){
      axios.get(`http://localhost:8002/`).then(
          /** Disini fungsi */
          (ambilData) => {
              console.log(ambilData.data);
              this.setState({
                  dataproduk: ambilData.data
              });
          }
      )
  }
  render() {
    const hasil = this.state.dataproduk.map(
        (isi, urutan) => {
            var urut = isi.id;
            var namaproduk = isi.namabarang;
            var hargaproduk = isi.harga;
             
            return <tr key={urutan} style={{textAlign: 'center'}}>
            <td>{urut}</td>
            <td>{namaproduk}</td>
            <td>{hargaproduk}</td>
            <td>
                <button className="btn btn-warning btn-md">Edit</button>&nbsp;
                <button className="btn btn-danger btn-md">Delete</button>
            </td>
        </tr>
        }
    );
    return (
      <div className="container">
        <table className="table table-striped table-hover table-bordered">
        <thead>
            <tr>
                <th style={{textAlign: 'center'}}>Nomor</th>
                <th style={{textAlign: 'center'}}>Nama Produk</th>
                <th style={{textAlign: 'center'}}>Harga Produk</th>
                <th style={{textAlign: 'center'}}>Actions</th>
            </tr>
        </thead>
        <tbody>
            {hasil}
        </tbody>
        </table>
      </div>
    )
  }
}
export default ListProduk;
