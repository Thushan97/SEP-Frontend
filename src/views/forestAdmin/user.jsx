import '../../style/user.css';
import { useState } from 'react';
import { toast } from 'react-toastify';
import Joi from 'joi-browser';
import { schema } from '../../validations/updateForestOfficer';
import { api } from '../../services/api';

toast.configure();

export default function User(){
    const [username, setUsername] = useState();
    const [forestName, setForestName] = useState();
    const [status, setStatus] = useState();

    const handleSubmit = async () => {

        const data = {
            "username" : username,
            "forest_name" : forestName,
        }

        const result = Joi.validate(data, schema);
        console.log(result);

        try{  
            if(!result.error){
                const response = await api.forestAdmin.updateForestOfficer(data);
                if(response.status === 200){
                    setUsername('');
                    setForestName('');
                    toast.success("Forest Officer Registered Successfully.");
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
                    </form>
                </div>
            </div>
        </div>
    )
}