import {Component} from "react";
import { Link } from 'react-router-dom';
import React from 'react';
import Header from './Header';
import './App.css';



class LoginForm extends Component {

    constructor(props) {
        super(props);
        this.state = {'email': '', 'password': '','token' : ''};

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state.email,this.state.password);
        let post_data = {
            email: this.state.email,
            password: this.state.password
        };
        fetch('http://127.0.0.1:8000/users/login/',{
            method:'post',
            body: JSON.stringify(post_data),
            headers:{
                "Content-Type": "application/json"
            }
        })
            .then(data => {
                if(data.status == 400){
                    alert('Authentication Failed');
                }
                else {
                    return new Promise(function(resolve, reject){
                        resolve(data)
                    }).then(data =>{
                        return (data.json())
                    }).then(data =>{
                        console.log(data.token);
                        this.setState({token : data.token});
                        sessionStorage.setItem('myData', this.state.token);
                        window.location.href = ('http://localhost:3000/#/taskListing');
                    })
                    // sessionStorage.setItem(this.state.token  : '');
                    // window.location.href = ('http://localhost:3000/#/taskListing');
                }
        })
    };

    render() {

        return (
            <div className="Login-panel">
                <p className='App-title'>Login</p>
                <form onSubmit={this.handleSubmit}>

                    <div className="login-input-item">
                        <input type="email"
                               className="login-user-input"
                               value={this.state.email}
                               onChange={e => this.setState({email : e.target.value})}
                               id="InputEmail"
                               aria-describedby="emailHelp"
                               placeholder="Your Email Address"
                               required />
                    </div>

                    <div className="login-input-item">
                        <input type="password"
                               className="login-user-input-password login-user-input"
                               value={this.state.password}
                               onChange={e => this.setState({password : e.target.value})}
                               id="InputPassword"
                               placeholder="Enter Password"
                               required />
                    </div>

                    <button type="submit" className="buttonStyle">Log In</button>

                </form>

                <div className="Switch-style">
                    New Member ? <Link to='/Register'>Create Account</Link>
                </div>
            </div>
        );
    }
}


class LoginPage extends Component {
    render() {
        return(
            <div className="App-body">
                <Header />
                <LoginForm />
            </div>
        );
    };
}



export default LoginPage;
