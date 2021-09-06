import '../../style/sidebar.css';
import {Nature, Group, Assessment, Feedback, Chat} from '@material-ui/icons';

export default function Sidebar(){
    return(
        <div className="sidebar">
            <div className="sidebarWrapper">
                <div className="siderbarMenu">

                    <h3 className="sidebarTitle">Dashboard</h3>
                    <ul className="sidebarList">
                        <li className="sidebarListItem active">
                            <Nature className="sidebarIcon"/>
                            Create Forest
                        </li>
                    </ul>

                    <h3 className="sidebarTitle">Quick Menu</h3>
                    <ul className="sidebarList">
                        <li className="sidebarListItem active">
                            <Group className="sidebarIcon"/>
                            Users
                        </li>

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