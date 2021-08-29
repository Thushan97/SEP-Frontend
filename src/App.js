import React from 'react';
import LoginForm from './components/loginForm';
import { Route, Redirect, Switch} from 'react-router-dom';
import RegisterForm from './components/registerForm';
import SystemAdminDashboard from './views/dashboard/systemAdminDashboard';
import './App.css';

function App() {
  return (
    <React.Fragment>
     
        <Switch>
          <Route path="/" exact component={LoginForm}></Route>
          <Route path="/register" component={RegisterForm}></Route>
          <Route path="/systemAdmin" component={SystemAdminDashboard}></Route>   
        </Switch>     
      
    </React.Fragment>  
  );
}

export default App;
