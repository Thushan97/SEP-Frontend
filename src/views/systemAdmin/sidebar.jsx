import '../../style/sidebar.css';
import {Nature, Assessment, Feedback, Chat} from '@material-ui/icons';
import { Link } from 'react-router-dom';

export default function Sidebar(){
    return(
        <div className="sidebar">
            <div className="sidebarWrapper">
                <div className="siderbarMenu">

                    <h3 className="sidebarTitle">Dashboard</h3>

                    <ul className="sidebarList">
                        <Link to="/systemAdmin/pinMap">
                            <li className="sidebarListItem active">
                                <Nature className="sidebarIcon"/>
                                Register Forest
                            </li>
                        </Link>

                    </ul>

                    <h3 className="sidebarTitle">User</h3>
                    <ul className="sidebarList">
                        <Link to="/systemAdmin">
                            <li className="sidebarListItem active">
                                <Nature className="sidebarIcon"/>
                                Register Forest Admin
                            </li>
                        </Link>
                    </ul>

                    <h3 className="sidebarTitle">Quick Menu</h3>
                    <ul className="sidebarList">
                        {/* <Link to="/forestAdmin/users">
                            <li className="sidebarListItem active">
                                <Group className="sidebarIcon"/>
                                Users
                            </li>
                        </Link> */}
                        <li className="sidebarListItem active">
                            <Assessment className="sidebarIcon"/>
                            Reports
                        </li>
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