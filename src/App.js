import './App.css';
import React from 'react';
import LoginForm from './components/loginForm';
import { Route, Redirect, Switch} from 'react-router-dom';
import RegisterForm from './components/registerForm';

function App() {
  return (
    <React.Fragment>
      <main className="container">
        <Switch>
          <Route path="/" exact component={LoginForm}></Route>
          <Route path="/register" component={RegisterForm}></Route>   
        </Switch>     
      </main>
    </React.Fragment>  
  );
}

export default App;
