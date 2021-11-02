import '../../style/AddForestDetails.css';
import Topbar from './topbar';
import Sidebar from './sidebar';
import { useState, useEffect} from 'react';
import { api } from '../../services/api';
import {toast} from 'react-toastify';

toast.configure();

export default function AddForestDetails() {
    const [forestName, setForestName] = useState('');
    const [description, setDescription] = useState('');
    const [notification, setNotification] = useState('');
    const [forestId, setForestId] = useState('');

    useEffect(() => {
        async function getForestNameById(){
            const response = await api.forestOfficer.getForestNameById(localStorage.getItem("email"));
            console.log(localStorage.getItem("email"));
            setForestName(response.data.forest_name);
            setForestId(response.data.forest_id);
            console.log(response.data.forest_name)
        }
        getForestNameById();
    }, [])

    const handleSubmit = async (e) => {
        const newForestDetails = {
            forestId,
            description,
            notification,   
        }
        try{
            const response = await api.forestOfficer.addForestDetails(newForestDetails);
            if(response.status === 200){
                toast.success('Successfully added the forest details');
            }
        }catch(ex){
            toast.error('Something went wrong');
        }    
    }

    return (
        <div>
            <Topbar/>
            <div className="containers">
                <Sidebar/>
                <div className="write">
                    
                    <form className="writeForm" onSubmit={handleSubmit}>
                        <div className="writeFormGroup">
                            {forestName && (<h4>{forestName}</h4>)}
                        </div>

                        <div className="writeFormGroup">
                            <textarea
                                placeholder="Add description here..."
                                type="text"
                                className="writeText"
                                onChange={(e) => setDescription(e.target.value)}
                            ></textarea>
                        </div>

                        <div className="writeFormGroup">
                            <textarea
                                placeholder="Add notification here..."
                                type="text"
                                className="writeText"
                                onChange={(e) => setNotification(e.target.value)}
                            ></textarea>
                        </div>
                        <button className="writeSubmit" type="submit">Publish</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
