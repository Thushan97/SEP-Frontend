import React from 'react';
import '../../style/topbar.css';
import {NotificationsNone, Settings} from '@material-ui/icons';
import Avatar from '../../images/avatar.jpg';
import { useHistory } from 'react-router';
import { api } from '../../services/api';

export default function Topbar() {

    let history = useHistory();

    const handleLogout = async () => {

        const data = {
            "email" : localStorage.getItem("email")
        }
        
        await api.auth.logout(data);
        localStorage.removeItem("email");
        localStorage.removeItem("token");
        history.push('/login');
    }

    return(
        <div className="topbar">
            <div className="topbarWrapper">
                <div className="topLeft">
                    <span className="logo">System Admin</span>
                </div>
                <div className="topRight">

                    <div className="topbarIconContainer">
                        <NotificationsNone />
                        <span className="topIconBadge">1</span>
                    </div>

                    <div className="topbarIconContainer">
                        <Settings />
                    </div>
                    
                    <img src={Avatar} alt="" className="topAvatar"/>
                    <button className="button-logout" onClick={handleLogout}>Logout</button>
                </div>
            </div>   
        </div>
    )
}