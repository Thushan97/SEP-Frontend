import '../../style/user.css';
import { useState} from 'react';
import { toast } from 'react-toastify';
import Joi from 'joi-browser';
import { schema } from '../../validations/updateForestOfficer';
import { api } from '../../services/api';
import { useLocation } from 'react-router-dom';

toast.configure();

export default function User(){
    let location = useLocation();
    const [username, setUsername] = useState('');
    const [forestName, setForestName] = useState('');

    const handleSubmit = async (e) => {

        e.preventDefault();

        const data = {
            "oldUsername" : location.state.username,
            "username" : username,
            "forest_name" : forestName,
        }

        console.log(data);

        const result = Joi.validate(data, schema);
        console.log(result);

        try{  
            if(!result.error){
                const response = await api.forestAdmin.updateForestOfficer(data);
                if(response.status === 200){
                    setUsername('');
                    setForestName('');
                    toast.success("Forest Officer Updated Successfully.");
                }          
            } else{
                toast.warning("Please ckeck the form and fill again!");
            }
            
        }
        catch(ex){
            toast.error("Something Went Wrong!");
        }
    }

    return(
        <div className="user">

            <div className="userContainer">
                <div className="userUpdate">
                    <span className="userUpdateTitle">Edit</span>
                    <form className="userUpdateForm" onSubmit={handleSubmit}>
                        
                        <div className="newUserItem">
                            <label>Username</label>
                            <input type="email" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
                        </div>

                        <div className="newUserItem">
                            <label>Forest Name</label>
                            <input type="text" placeholder="Forest Name" value={forestName} onChange={(e) => setForestName(e.target.value)}/>
                        </div>

                        <div className="userUpdateRight">
                            <button className="userUpdateButton">Update</button>
                        </div>

                        <div className="newUserItem">
                            <label>Status</label>
                            <select className="newUserSelect" name="active" id="active">
                                <option value="new">New</option>
                                <option value="active">Active</option>
                                <option value="deactive">Deactive</option>
                            </select>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}