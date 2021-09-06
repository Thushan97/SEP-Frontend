import '../../style/userList.css';
import { DataGrid } from '@material-ui/data-grid';
import { Delete } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function UserList(){
    
    const columns = [
        { field: 'id', headerName: 'ID', width: 120 },
        {
          field: 'firstName',
          headerName: 'First name',
          width: 180,
          editable: true,
        },
        {
          field: 'lastName',
          headerName: 'Last name',
          width: 180,
          editable: true,
        },
        {
          field: 'status',
          headerName: 'Status',
          width: 180,
          editable: true,
        },
        {
          field: 'fullName',
          headerName: 'Full name',
          description: 'This column has a value getter and is not sortable.',
          sortable: false,
          width: 180,
        },
        {
          field: 'action',
          headerName: 'Action',
          width: '180',
          renderCell: (params) => {
              return(
                  <>
                    <Link to={"/systemAdmin/user/"+params.row.id} >
                        <button className="userListEdit">Edit</button>
                    </Link>
                    <Delete className="userListDelete" onClick={() => handleDelete(params.row.id)}/>
                  </>   
              )
          }
        },
      ];
      
      const rows = [
        { id: 1, lastName: 'Snow', firstName: 'Jon', status: 'active' },
        { id: 2, lastName: 'Lannister', firstName: 'Cersei', status: 'active' },
        { id: 3, lastName: 'Lannister', firstName: 'Jaime', status: 'active' },
        { id: 4, lastName: 'Stark', firstName: 'Arya', status: 'active' },
        { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', status: 'active' },
        { id: 6, lastName: 'Melisandre', firstName: null, status: 'active' },
        { id: 7, lastName: 'Clifford', firstName: 'Ferrara', status: 'active' },
        { id: 8, lastName: 'Frances', firstName: 'Rossini', status: 'active' },
        { id: 9, lastName: 'Roxie', firstName: 'Harvey', status: 'active' },
      ];

      const [data,setData] = useState(rows);

      const handleDelete = (id) => {
        setData(data.filter((item) => item.id !== id));
      }
      

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