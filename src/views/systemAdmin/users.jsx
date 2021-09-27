import '../../style/newUser.css';
import { api } from '../../services/api';
import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Joi from 'joi-browser';
import { schema } from '../../validations/adminsValidation';

toast.configure();

export default function NewUser(){
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [forestName, setForestName] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');

    const handleSubmit = async (e) => {

        e.preventDefault();
        
        const data = {
            "username" : username,
            "first_name" : firstName,
            "last_name" : lastName,
            "forest_name" : forestName,
            "password" : password,
            "phone" : phone
        }
        console.log(data);

        const result = Joi.validate(data, schema);
        console.log(result);

        try{  
            if(!result.error){
                const response = await api.systemAdmin.addForestAdmin(data);
                if(response.status === 200){
                    setUsername('');
                    setFirstName('');
                    setLastName('');
                    setForestName('');
                    setPassword('');
                    setPhone('');
                    toast.success("Forest Admin Registered Successfully.");
                }          
            } else{
                toast.warning("Please ckeck the form and fill again!");
            }
            
        }
        catch(ex){
            toast.error("Something Went Wrong");
        }
    }
    
    return(
        <div className="newUser">
            <h1 className="newUserTitle">New Forest Admin</h1>
            <form className="newUserForm" >

                <div className="newUserItem">
                    <label>Username</label>
                    <input type="email" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
                </div>

                <div className="newUserItem">
                    <label>First Name</label>
                    <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
                </div>

                <div className="newUserItem">
                    <label>Last Name</label>
                    <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
                </div>

                <div className="newUserItem">
                    <label>Forest Name</label>
                    <input type="text" placeholder="Forest Name" value={forestName} onChange={(e) => setForestName(e.target.value)}/>
                </div>

                <div className="newUserItem">
                    <label>Password</label>
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>

                <div className="newUserItem">
                    <label>Phone</label>
                    <input type="text" placeholder="Mobile Number" value={phone} onChange={(e) => setPhone(e.target.value)}/>
                </div>

                <button className="newUserButton" onClick={handleSubmit}>Create</button>             
            </form>
            
        </div>
    )
}