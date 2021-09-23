import React from 'react';
import LoginForm from './components/loginForm';
import { Route, Redirect, Switch} from 'react-router-dom';
import RegisterForm from './components/registerForm';
import Topbar from './components/topBar/Topbar';
import Sidebar from './components/sidebar/sidebar';
import UserList from './pages/userList/userList';
import User from './pages/user/user';
import NewUser from './pages/newUser/newUser';
import RenderMap from './views/systemAdmin/map';
import PinMap from './views/systemAdmin/pinMap';
import ForestOfficerSidebar from './views/forestOfficer/sidebar';
import ForestOfficerTopbar from './views/forestOfficer/topbar';
import AssignForests from './views/forestOfficer/assisgnForests';
import './App.css';

function App() {

  return (
    <React.Fragment>
        <Switch>
          <Route path="/login" component={LoginForm}></Route>
          <Route path="/register" component={RegisterForm}></Route>
          <Route exact path='/systemAdmin' render={props =>
            <div>
              <Topbar />
              <div className="containers">
                <Sidebar />
                {/* <div className="others">Other Pages</div> */}
                <UserList />
              </div>
            </div>
          } />
          <Route path='/systemAdmin/users' render={props =>
            <div>
              <Topbar />
              <div className="containers">
                <Sidebar />
                <UserList />
              </div>
            </div>
          } />
          <Route path='/systemAdmin/user' render={props =>
            <div>
              <Topbar />
              <div className="containers">
                <Sidebar />
                <User />
              </div>
            </div>
          } />
          <Route path='/systemAdmin/newUser' render={props =>
            <div>
              <Topbar />
              <div className="containers">
                <Sidebar />
                <NewUser/>
              </div>
            </div>
          } />
          <Route path='/systemAdmin/createForest' render={props =>
            <div>
              <Topbar />
              <div className="containers">
                <Sidebar />
                <RenderMap />
              </div>
            </div>
          } />
          <Route path='/systemAdmin/pinMap' render={props =>
            <div>
              <Topbar />
              <div className="containers">
                <Sidebar />
                <PinMap />
              </div>
            </div>
          } />

          <Route exact path='/forestOfficer' render={props => 
            <div>
              <ForestOfficerTopbar/>
              <div className="containers">
                <ForestOfficerSidebar/>
                <AssignForests />
              </div>
            </div>
          } />

          {/* <Route path='/forestOfficer/forests' render={props => 
            <div>
              <ForestOfficerTopbar/>
              <div className="containers">
                <ForestOfficerSidebar/>
                <AssignForests />
              </div>
            </div>
          } /> */}

          <Redirect to="/login" /> 
        </Switch>       
    </React.Fragment>  
  );
}

export default App;
