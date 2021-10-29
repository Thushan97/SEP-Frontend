import './topbar.css';

export default function Topbar(){
    return(
        <div className="topActive">
            <div className="topLeftActive">
                <i className="topIconActive fab fa-facebook-square"></i>
                <i className="topIconActive fab fa-twitter-square"></i>
                <i className="topIconActive fab fa-pinterest-square"></i>
                <i className="topIconActive fab fa-instagram-square"></i>
            </div>

            <div className="topCenterActive">
                <i className="fas fa-search"></i>
            </div>
            <div className="topSearchIconActive topRightActive"></div>
        </div>
    )
}