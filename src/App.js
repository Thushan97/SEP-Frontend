import React from 'react';
import LoginForm from './components/loginForm';
import { Route, Redirect, Switch} from 'react-router-dom';
import RegisterForm from './components/registerForm';
import Topbar from './components/topBar/Topbar';
import Sidebar from './components/sidebar/sidebar';
import User from './views/forestAdmin/user';
import RenderMap from './views/systemAdmin/map';
import PinMap from './views/systemAdmin/pinMap';
import ForestOfficerSidebar from './views/forestOfficer/sidebar';
import ForestOfficerTopbar from './views/forestOfficer/topbar';
import AssignForests from './views/forestOfficer/assisgnForests';
import SystemAdminSidebar from './views/systemAdmin/sidebar';
import SystemAdminTopbar from './views/systemAdmin/topbar';
import NewForestAdmin from './views/systemAdmin/users';
import NewForestOfficer from './views/forestAdmin/newForestOfficer';
import ForestOfficerList from './views/forestAdmin/users';
import UpdateForestOfficer from './views/forestOfficer/updateForestOfficer';
import RestrictionLevels from './views/forestAdmin/restrictionLevels';
import ActiveTopbar from './pages/activeInformationPage/topbar/topbar';
import ActiveHeader from './pages/activeInformationPage/header/header';
import Posts from './pages/activeInformationPage/posts/posts';
import Single from './pages/activeInformationPage/single/single';
import AddForestDetails from './views/forestOfficer/AddForestDetails';
import NotFound from './pages/notFound/NotFound';
import './App.css';


function App() {

  const user = localStorage.getItem("user");
  console.log(user);

  return (
    <React.Fragment>
        <Switch>
          
          <Route path="/login" component={LoginForm}></Route>
          <Route exact path="/register" component={RegisterForm}></Route>
          <Route exact path="/notFound" component={NotFound}></Route>

          <Route exact path='/systemAdmin' render={props =>
            <div>
              <SystemAdminTopbar />
              <div className="containers">
                <SystemAdminSidebar />
                <NewForestAdmin />
              </div>
            </div>
          } />
          
          <Route exact path='/forestAdmin' render={props =>
            <div>
              <Topbar />
              <div className="containers">
                <Sidebar />
                <ForestOfficerList />
              </div>
            </div>
          } />

          <Route exact path='/forestAdmin/users' render={props =>
            <div>
              <Topbar />
              <div className="containers">
                <Sidebar />
                <ForestOfficerList />
              </div>
            </div>
          } />

          <Route path='/forestAdmin/user' render={props =>
            <div>
              <Topbar />
              <div className="containers">
                <Sidebar />
                <User />
              </div>
            </div>
          } />

          <Route exact path='/forestAdmin/newForestOfficer' render={props =>
            <div>
              <Topbar />
              <div className="containers">
                <Sidebar />
                <NewForestOfficer/>
              </div>
            </div>
          } />

          <Route exact path='/forestAdmin/restrictionLevels' render={props =>
            <div>
              <Topbar />
              <div className="containers">
                <Sidebar />
                <RestrictionLevels/>
              </div>
            </div>
          } />

          <Route exact path='/systemAdmin/createForest' render={props =>
            <div>
              <SystemAdminTopbar />
              <div className="containers">
                <SystemAdminSidebar />
                <RenderMap />
              </div>
            </div>
          } />

          <Route exact path='/systemAdmin/pinMap' render={props =>
            <div>
              <SystemAdminTopbar />
              <div className="containers">
                <SystemAdminSidebar />
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

          <Route exact path='/forestOfficer/update' render={props => 
            <div>
              <ForestOfficerTopbar/>
              <div className="containers">
                <ForestOfficerSidebar/>
                <UpdateForestOfficer />
              </div>
            </div>
          } />
          
          <Route exact path="/forestOfficer/addForestDetails" component={AddForestDetails}></Route>
  
          <Route exact path='/activeInformationPage' render={props => 
            <div>
              <ActiveTopbar/>
              <div className="containers">
                <ActiveHeader/>
              </div>
              <div>
                <Posts />
              </div>
            </div>
          } />

          <Route exact path="/activeInformationPage/post/:postId" component={Single}></Route>

          <Redirect to="/login" />  
          
        </Switch>       
    </React.Fragment>  
  );
}

export default App;
