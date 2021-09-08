import { CalendarToday, LocationSearching, MailOutline, PermIdentity, PhoneAndroid } from '@material-ui/icons';
import '../../style/user.css';
import { Link } from 'react-router-dom';

export default function User(){
    return(
        <div className="user">
            <div className="userTitleContainer">
                <h1 className="userTitle">Edit User</h1>
                <Link to={"/systemAdmin/newUser"} >
                    <button className="userAddButton">Create</button>   
                </Link>    
            </div>

            <div className="userContainer">
                <div className="userShow">
                    <div className="userShowTop">
                        <div className="userShowTopTitle">
                            <span className="userShowUsername">Thushan Nirasha</span>
                            <span className="userShowUserTitle">Software Engineer</span>
                        </div>
                    </div>

                    <div className="userShowButton">
                        <span className="userShowTitle">Account Details</span>
                        <div className="userShowInfo"> 
                            <PermIdentity className="userShowIcon"/>
                            <span className="userShowInfoTitle">thushan97</span>
                        </div>

                        <div className="userShowInfo"> 
                            <CalendarToday className="userShowIcon"/>
                            <span className="userShowInfoTitle">15/07/1997</span>
                        </div>

                        <span className="userShowTitle">Account Details</span>
                        <div className="userShowInfo"> 
                            <PhoneAndroid className="userShowIcon"/>
                            <span className="userShowInfoTitle">+94 769 253 114</span>
                        </div>

                        <div className="userShowInfo"> 
                            <MailOutline className="userShowIcon"/>
                            <span className="userShowInfoTitle">thushan@gmail.com</span>
                        </div>

                        <div className="userShowInfo"> 
                            <LocationSearching className="userShowIcon"/>
                            <span className="userShowInfoTitle">Balapitiya</span>
                        </div>
                    </div>
                </div>
                <div className="userUpdate">
                    <span className="userUpdateTitle">Edit</span>
                    <form className="userUpdateForm">
                        <div className="userUpdateLeft">
                            <div className="userUpdateItem">
                                <label>Username</label>
                                <input
                                    type="text"
                                    placeholder="thushan97"
                                    className="userUpdateInput"
                                />
                            </div>

                            <div className="userUpdateItem">
                                <label>Full Name</label>
                                <input
                                    type="text"
                                    placeholder="Thushan Nirasha"
                                    className="userUpdateInput"
                                />
                            </div>

                            <div className="userUpdateItem">
                                <label>Email</label>
                                <input
                                    type="text"
                                    placeholder="thushan@gmail.com"
                                    className="userUpdateInput"
                                />
                            </div>

                            <div className="userUpdateItem">
                                <label>Phone</label>
                                <input
                                    type="text"
                                    placeholder="+94 769 253 114"
                                    className="userUpdateInput"
                                />
                            </div>

                            <div className="userUpdateItem">
                                <label>Address</label>
                                <input
                                    type="text"
                                    placeholder="Balapitiya"
                                    className="userUpdateInput"
                                />
                            </div>
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