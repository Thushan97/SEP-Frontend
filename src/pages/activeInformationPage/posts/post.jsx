import './posts.css';
import { Link } from 'react-router-dom';

export default function Post({post}){
    // const [postId, setPostId] = useState('');
    // setPostId(post._id);
    const postId = post._id;
    const forestName = post.forest_name;

    return(
        <div className="post">
            <img
                className="postImg"
                src="https://images.pexels.com/photos/302804/pexels-photo-302804.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                alt=""
            />
            <div className="postInfo">
                {/* <Link to={`activeInformationPage/post/${post._id}`}>
                    <span className="forestName">{post.forest_name}</span>
                </Link> */}

                <Link to={{
                            pathname:`activeInformationPage/post/${post._id}`,
                            state: {postId, forestName}  
                }}>
                    <span className="forestName">{post.forest_name}</span>
                </Link>

                <p className="description">{post.district}</p>
                <hr/>
                <p className="notification">{post.country}</p>
                {/* <span className="postDate">{new Date(post.forest_view_updated_date).toDateString()}</span> */}
            </div>
        </div>
    )
}
