import React from 'react';
import '../../style/topbar.css';
import {NotificationsNone, Settings} from '@material-ui/icons';
import Avatar from '../../images/avatar.jpg';

export default function Topbar() {
    return(
        <div className="topbar">
            <div className="topbarWrapper">
                <div className="topLeft">
                    <span className="logo">Forest Officer</span>
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
                </div>
            </div>   
        </div>
    )
}