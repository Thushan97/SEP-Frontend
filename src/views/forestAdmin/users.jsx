import '../../style/userList.css';
import { DataGrid } from '@material-ui/data-grid';
import { Delete } from '@material-ui/icons';
import { useState, useEffect } from 'react';
import { api } from '../../services/api';
import {Link} from 'react-router-dom';

export default function ForestOfficerList(){
  const [data,setData] = useState([]);
    
    const columns = [
        { field: 'id', headerName: 'ID', width: 120 },
        {
          field: 'username',
          headerName: 'Username',
          width: 150,
          editable: true,
        },
        {
          field: 'first_name',
          headerName: 'First name',
          width: 150,
          editable: true,
        },
        {
          field: 'last_name',
          headerName: 'Last name',
          width: 150,
          editable: true,
        },
        {
          field: 'forest_name',
          headerName: 'Forest Name',
          width: 160,
          editable: true,
        },
        {
          field: 'phone',
          headerName: 'Telephone',
          description: 'This column has a value getter and is not sortable.',
          sortable: false,
          width: 150,
        },
        {
          field: 'status',
          headerName: 'Status',
          description: 'This column has a value getter and is not sortable.',
          sortable: false,
          width: 150,
        },
        {
          field: 'action',
          headerName: 'Action',
          width: '180',
          renderCell: (params) => {
              return(
                <>
                <Link to={"/forestAdmin/user/"+params.row.id} >
                        <button className="userListEdit">Edit</button>
                </Link>
                <Delete className="userListDelete" onClick={() => handleDelete(params.row.username)}/>
                </>
              )
          }
        },
      ];

    useEffect(() => {
        try{
          async function getForestOfficers(){
            const response = await api.forestAdmin.getUsers();
            if(response.data){
              console.log(response.data);
              setData(response.data);
            }
          }
        getForestOfficers();
        }
        catch(ex){
          console.log(ex);
        }    
    },[])

      

      const handleDelete = async (username) => {
        console.log(username);
        const email = {
          "email": username
        }
        const result = await api.forestAdmin.deleteForestOfficer(email);
       
        setData(data.filter((item) => item.username !== username));
      }
    console.log(data);    
    return(
        <div className="userList">
            <DataGrid
                rows={data}
                columns={columns}
                pageSize={8}
                checkboxSelection
                disableSelectionOnClick
            />
        </div>
    )
}