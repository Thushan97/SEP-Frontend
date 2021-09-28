import '../../style/user.css';
import { useState} from 'react';
import { toast } from 'react-toastify';
import Joi from 'joi-browser';
import { schema } from '../../validations/forestOfficerValidate';
import { api } from '../../services/api';

toast.configure();

export default function UpdateForestOfficer(){
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');

    const handleSubmit = async (e) => {

        e.preventDefault();

        const data = {
            "username" : localStorage.getItem("email"),
            "first_name" : firstName,
            "last_name" : lastName,
            "phone" : phone
        }

        console.log(data);

        const result = Joi.validate(data, schema);
        console.log(result);

        try{  
            if(!result.error){
                const response = await api.forestOfficer.updateDetails(data);
                if(response.status === 200){
                    setFirstName('');
                    setLastName('');
                    setPhone('');
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
                            <label>First Name</label>
                            <input type="text" placeholder="FirstName" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
                        </div>

                        <div className="newUserItem">
                            <label>Last Name</label>
                            <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
                        </div>

                        <div className="newUserItem">
                            <label>Phone</label>
                            <input type="text" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)}/>
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