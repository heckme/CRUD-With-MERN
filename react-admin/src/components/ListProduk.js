import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

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
  render() 
    {
        const hasil = this.state.dataproduk
        .map((isi, urutan) => 
            {
                var urut = urutan + 1;
                var produkID = isi.id;
                var namaproduk = isi.nama_produk;
                var hargaproduk = isi.harga;
                
                return  <tr key={urutan} style={{textAlign: 'center'}}>
                            <td>{urut}</td>
                            <td>{namaproduk}</td>
                            <td>{hargaproduk}</td>
                            <td>
                                <Link to={
                                        {
                                            pathname: '/editdata/', 
                                            state: {produkID: produkID}
                                        }
                                    } 
                                    className="btn btn-warning"><i className="fa fa-pencil"></i> Edit</Link>&nbsp;
                                <button className="btn btn-danger btn-md"><i className="fa fa-trash"></i> Delete</button>
                            </td>
                        </tr>
            }
        );
                return (
                    <div className="container">
                        <table className="table table-striped table-hover table-bordered">
                            <thead>
                                <tr style={{backgroundColor: ''}}>
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
