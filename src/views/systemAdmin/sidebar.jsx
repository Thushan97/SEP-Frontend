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
                </div>
            </div>
        </div>
    )
}