import '../../style/sidebar.css';
import {Nature, Group, Assessment, Feedback, Chat} from '@material-ui/icons';
import { Link } from 'react-router-dom';

export default function Sidebar(){
    return(
        <div className="sidebar">
            <div className="sidebarWrapper">
                <div className="siderbarMenu">

                    {/* <h3 className="sidebarTitle">Dashboard</h3>
                    <ul className="sidebarList">
                        <Link to="/forestAdmin/pinMap">
                            <li className="sidebarListItem active">
                                <Nature className="sidebarIcon"/>
                                Register Forest
                            </li>
                        </Link>
                    </ul> */}

                    <h3 className="sidebarTitle">Dashboard</h3>
                    <ul className="sidebarList">
                        <Link to="/forestAdmin/users">
                            <li className="sidebarListItem active">
                                <Group className="sidebarIcon"/>
                                Forest Officers
                            </li>
                        </Link>
                        <Link to="/forestAdmin/newForestOfficer">
                            <li className="sidebarListItem active">
                                <Assessment className="sidebarIcon"/>
                                New Forest Officer
                            </li>
                        </Link>
                        <Link to="/forestAdmin/restrictionLevels">
                            <li className="sidebarListItem active">
                                <Assessment className="sidebarIcon"/>
                                Add Restriction Levels
                            </li>
                        </Link>
                    </ul>

                    <h3 className="sidebarTitle">Notifications</h3>
                    <ul className="sidebarList">
                        <li className="sidebarListItem active">
                            <Feedback className="sidebarIcon"/>
                            Feedback
                        </li>

                        <li className="sidebarListItem active">
                            <Chat className="sidebarIcon"/>
                            Messages
                        </li>
                    </ul>

                </div>
            </div>
        </div>
    )
}