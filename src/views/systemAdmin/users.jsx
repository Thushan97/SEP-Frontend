import '../../style/newUser.css';

export default function NewUser(){
    return(
        <div className="newUser">
            <h1 className="newUserTitle">New User</h1>
            <form className="newUserForm">
                <div className="newUserItem">
                    <label>Username</label>
                    <input type="text" placeholder="Username" />
                </div>

                <div className="newUserItem">
                    <label>Full Name</label>
                    <input type="text" placeholder="Full Name" />
                </div>

                <div className="newUserItem">
                    <label>Forest Id</label>
                    <input type="text" placeholder="Forest Id" />
                </div>

                <div className="newUserItem">
                    <label>Password</label>
                    <input type="password" placeholder="password" />
                </div>

                <div className="newUserItem">
                    <label>Phone</label>
                    <input type="text" placeholder="Mobile Number" />
                </div>

                <div className="newUserItem">
                    <label>Address</label>
                    <input type="text" placeholder="Address" />
                </div>

                <div className="newUserItem">
                    <label>Gender</label>
                    <div className="newUserGender">
                        <input type="radio" name="gender" id="male" value="male"/>
                        <label for="male">Male</label>
                        <input type="radio" name="gender" id="female" value="female"/>
                        <label for="female">Female</label>
                    </div>
                </div>

                <div className="newUserItem">
                <label>Active</label>
                <select className="newUserSelect" name="active" id="active">
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                </select>
                </div>
               
                <button className="newUserButton">Create</button>
                
            </form>
        </div>
    )
}