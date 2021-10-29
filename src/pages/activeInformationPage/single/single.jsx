import './single.css';
import SinglePost from '../singlePost/singlePost';
import Topbar from '../topbar/topbar';

export default function Single(){

    return(
        <div className="single">
            <Topbar />
            <SinglePost />
        </div>
    )
}