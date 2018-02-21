import React from 'react';

import {Component} from "react";
import { Link } from 'react-router-dom';
import Header from './Header';
import './App.css';


class RegistrationPage extends Component{
    render (){
    return(
        <div className="App-body">
            <Header />
            <RegistrationForm />
        </div>
        );
    };
}


class RegistrationForm extends Component {

    constructor(props) {
        super(props);
        this.state = {'FirstName': '', 'LastName': '','InputEmail1': '','InputPassword1': '','InputPassword2' : ''};

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state.email,this.state.password);
        if(this.state.InputPassword1 === this.state.InputPassword2){
            let post_data = {
                first_name: this.state.FirstName,
                last_name: this.state.LastName,
                email : this.state.InputEmail1,
                password : this.state.InputPassword1,
            };
            fetch('http://127.0.0.1:8000/users/signup/',{
                method:'post',
                body: JSON.stringify(post_data),
                headers:{
                    "Content-Type": "application/json"
                }
            })
                .then(data => {
                    console.log(data);

                        window.location.href = ('http://localhost:3000/#/');

                })
            }
            else{
                alert('password doesnot match');
            }
        }

    render() {
        return (
            <div className="Login-panel">

                <p className='App-title'>Register</p>
                <form onSubmit={this.handleSubmit}>

                    <div className="login-input-item">
                        <input className="login-user-input"
                               id="FirstName"
                               placeholder="Your First-Name"
                               onChange={e => this.setState({FirstName : e.target.value})}
                        />
                    </div>

                    <div className="login-input-item">
                        <input className="login-user-input"
                               id="LastName"
                               placeholder="Your Last Name"
                               onChange={e => this.setState({LastName : e.target.value})}
                        />
                    </div>

                    <div className="login-input-item">
                        <input type="email"
                               className="login-user-input"
                               id="InputEmail1"
                               aria-describedby="emailHelp"
                               placeholder="Your Email Address"
                               onChange={e => this.setState({InputEmail1 : e.target.value})}
                        />
                    </div>

                    <div className="login-input-item">
                        <input type="password"
                               className="login-user-input-password login-user-input"
                               id="InputPassword1"
                               placeholder="Enter Password"
                               onChange={e => this.setState({InputPassword1 : e.target.value})}
                        />
                    </div>

                    <div className="login-input-item">
                        <input type="password"
                               className="login-user-input-password login-user-input"
                               id="InputPassword2"
                               placeholder="Confirm Password"
                               onChange={e => this.setState({InputPassword2 : e.target.value})}
                        />
                    </div>

                    <button type="submit" className="buttonStyle" onSubmit={e => e.preventDefault()}>Sign Up</button>

                </form>

                <div className="Switch-style">
                    Already Account ? <Link to='/'>Log In </Link>
                </div>
            </div>
        );
    }
}


export default RegistrationPage;

