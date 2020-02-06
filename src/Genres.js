import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const Genres = () => {
    
    const [ data, setData ] = useState([]);
    
    useEffect(() => {
        axios
        .get('/api/genres')
        .then(res => { 
            setData(res.data.data)   //comment this line to simulate empty list
        })
    }
    , []);

    const renderRow = row => (
        <tr key={row.id}>
            <th scope="row">{row.id}</th>
            <td>{ row.name }</td>
            <td>
                <Link onClick={() => editGender(row.id)} className='btn btn-warning' to={'/genres/' + row.id}>Edit</Link>
                <button onClick={() => deleteGender(row.id)} className='btn btn-danger'>Delete</button>
            </td>
            
        </tr>    
    )

    const editGender = id => {
        console.log('Edit' + id)
    }

    const deleteGender = id => {
        console.log("Deleted" + id)
        axios
        .delete('/api/genres/' + id)
        .then(res => {
            console.log(res)
            setData(data.filter(item => item.id !== id))
        })
    }
    
    if (data.length === 0) {
        return (
            
            <div className='container'>
                <h1>Genres</h1>
                <Link className='btn btn-primary' to='/genres/new' >New Gender</Link>
                <div className="alert alert-warning" role="alert">
                    You don't have any genres created.
                </div>
            </div>
        )
    }


    return (
    <div className='container'>
        <h1>genres</h1>
        {/* <pre>{JSON.stringify(data)}</pre> */}
        <Link className='btn btn-primary' to='/genres/new' >New Gender</Link>
        <table className="table table-striped">
        <thead>
            <tr>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Actions</th>
            </tr>
        </thead>
        <tbody>
           {data.map(renderRow)}
        </tbody>
        </table>
    </div>
      );
  }

export default Genres;