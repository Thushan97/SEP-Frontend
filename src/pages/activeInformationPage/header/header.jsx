import './header.css';

export default function Header(){
    return(
        <div className="header">
            <div className="headerTitles">
                <span className="headerTitleSm">Active Information Page</span>
                <span className="headerTitleLg">Save The Forests</span>
            </div>

            <img
                className="headerImg"
                src="https://wallpapercave.com/wp/NXRaxEy.jpg"
                alt=""
               
            ></img>
        </div>
    )
}
