import './singlePost.css';
import { useState, useEffect } from 'react';
import { api } from '../../../services/api';
import {useLocation} from 'react-router-dom'

export default function SinglePost(){
    const location = useLocation();
    const [date, setDate] = useState('');
    const [forestId, setForestId] = useState('');
    const [description, setDescription] = useState('');
    const [notification, setNotification] = useState('');

    useEffect(() => {
        try{
            async function getSinglePost(){
                const response = await api.activeInformationPage.getSinglePost(location.state.postId);
                setDate(response.data.forest_view_updated_date);
                setForestId(response.data.forest_id);
                setDescription(response.data.description);
                setNotification(response.data.notification);
                console.log(response.data);
            } 
            getSinglePost();  
        }
        catch(ex){
            console.log(ex);
        }
         
    }, [])


    return(
        <div className="singlePost">
            <div className="singlePostWrapper">
                
                <img 
                    src = {`https://defom-api.herokuapp.com/forestpage/i/${forestId}`}
                    alt=""
                    className="singlePostImg"
                /> 
                <h1 className="singlePostTitle">
                    {location.state.forestName}
                </h1>

                <div className="singlePostInfo">
                    <span className="singlePostDate">{new Date(date).toDateString()}</span>
                </div>
                <div className="singlePostDesc">
                    <p>
                        {/* The forest is the orchestra of my mind, playing one enchanting symphony after 
                        another. Her leaves dance to an unheard beat, whispering their songs to the wind. In here, sheltered by the 
                        mighty trees, is every kind of life, from the humble beetle to enchanting birds of every colour. I hold my hands 
                        up to feel the cascading light, a brilliant white shaft illuminating the path that takes me onward and home. */}
                        {description}
                    </p>
                    <p>
                        {/* And upon the forest floor so woven with ancient tree roots came a light filtered by the bouquet of foliage above: 
                        softened, verdant and freshly aromatic. */}
                        {notification}
                    </p>
                </div>
            </div>
        </div>
    )
}