import '../../style/sidebar.css';
import {Nature, Group, Assessment, Feedback, Chat} from '@material-ui/icons';
import { Link } from 'react-router-dom';

export default function Sidebar(){
    return(
        <div className="sidebar">
            <div className="sidebarWrapper">
                <div className="siderbarMenu">

                    <h3 className="sidebarTitle">Dashboard</h3>
                    <ul className="sidebarList">
                        <Link to="/forestOfficer">
                            <li className="sidebarListItem active">
                                <Nature className="sidebarIcon"/>
                                View Forest
                            </li>
                        </Link>
                    </ul>

                    <h3 className="sidebarTitle">Quick Menu</h3>
                    <ul className="sidebarList">
                        <Link to="/forestOfficer/update">
                            <li className="sidebarListItem active">
                                <Group className="sidebarIcon"/>
                                Update Account
                            </li>
                        </Link>

                        <Link to="/forestOfficer/addForestDetails">
                            <li className="sidebarListItem active">
                                <Assessment className="sidebarIcon"/>
                                Add Forest Details
                            </li>
                        </Link>
                        
                        <li className="sidebarListItem active">
                            <Assessment className="sidebarIcon"/>
                            Update Forest Details
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}