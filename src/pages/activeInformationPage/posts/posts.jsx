import Post from './post';
import './posts.css';
import {useState, useEffect} from 'react';
import { api } from '../../../services/api';

export default function Posts(){
    const [posts, setPosts] = useState([])

    useEffect(() => {
        async function fetchPosts(){
            const response = await api.activeInformationPage.getPosts();
            console.log(response.data);
            setPosts(response.data);
        }
        fetchPosts();
    }, [])

    return(
        <div className="posts">
            {posts && (posts.map((p) => 
                <Post key={p._id} post={p} />
            ))}
        </div>
    )
}