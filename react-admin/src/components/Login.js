import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class Login extends Component {
  state = {
      statusRedirect: false,
      statusLogin: ''
  }
  fungsiLogin = (e) => {
    axios.post(`http://localhost:8002/login`, {
        username: e.username.value,
        password: e.password.value
    }).then((kepastian) => {
        if(kepastian.data === 'oke'){
            this.setState({
                statusRedirect: true
            });
        } else {
            this.setState({
                statusLogin: 'Login gagal, username atau password salah'
            })
        }
    });
  }
  fungsiRedirect = () => {
    if(this.state.statusRedirect){
        return <Redirect to="/"/>
      }  
  }
  render() {
    return (
      <div className="container">
      {this.fungsiRedirect()}
        <form className="form-horizontal">
                <fieldset>
                    <legend>Login</legend>
                    <div className="form-group">
                        <label className="col-lg-2 control-label">Username</label>
                        <div className="col-lg-10">
                            <input ref="username" type="text" className="form-control" placeholder="Masukan username anda ..." />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="col-lg-2 control-label">Password</label>
                        <div className="col-lg-10">
                            <input ref="password" type="text" className="form-control"   placeholder="Isi dengan password anda ..." />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-lg-10 col-lg-offset-2">
                            <button type="button" onClick={() => this.fungsiLogin(this.refs)} className="btn btn-primary"><i className="fa fa-paper-plane"></i> Login</button>
                        </div>
                    </div>

                </fieldset>
            </form>
      </div>
    )
  }
}
export default Login;
