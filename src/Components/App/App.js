import React, {Component} from 'react';
import Navbar from '../Navbar/Navbar'
import Main from "../Main/Main";
import SignIn from '../SignIn/SignIn';
import SignUp from '../SignUp/SignUp';
import StartPage from '../StartPage/StartPage'

import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';
import './App.css';

import arrayKeyNoProduction from '../../array';
import arrayUserNoProduction from '../../arrayUsers';

class App extends Component {
    constructor() {
        super();
        this.state = {
            userSession: null
        };
        this.userVerification = this.userVerification.bind(this);
    }

    userVerification(value) {
        this.setState({userSession: value});
        this.props.history.push("/")
    }

    render() {

        let keyArray = arrayKeyNoProduction;
        let userArray = arrayUserNoProduction;

        const GetRootPage = () => <StartPage signin={signin} signup={signup}/>;

        const GetSignUp = () => <SignUp userArray={userArray}/>;
        const GetSignIn = () => <SignIn userArray={userArray} userVerification={this.userVerification}/>;

        const home = (<Link to="/"><span>&#10026;</span> key keeper</Link>);
        const signin = (<Link to="/sign_in">SignIn</Link>);
        const signup = (<Link to="/sign_up">SignUp</Link>);

        const userLogin = (userLogin, GetSignUp, GetSignIn) => {
            if (userLogin === null) {
                return (
                    <div className="main-sign">
                        <Route exact path="/" component={GetRootPage}/>
                        <Route path="/sign_in" component={GetSignIn}/>
                        <Route path="/sign_up" component={GetSignUp}/>
                    </div>
                )
            }
            else{
                    return (
                        <Main userLogin={this.state.userSession} keyArray={keyArray}/>
                    )
                }

            };

        return (
            <Router>
                <div className="App">
                    <Navbar userSession={this.state.userSession} home={home} signin={signin} signup={signup} userVerification={this.userVerification}/>
                    {userLogin(this.state.userSession, GetSignUp, GetSignIn, GetRootPage)}
                </div>
            </Router>
        );
    }
}


export default App;
