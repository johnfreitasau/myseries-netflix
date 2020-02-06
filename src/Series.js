import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const Series = () => {
    
    const [ data, setData ] = useState([]);
    
    useEffect(() => {
        axios
        .get('/api/series')
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
                <Link onClick={() => editSerie(row.id)} className='btn btn-info' to={'/series/info/' + row.id}>Info</Link>
                <button onClick={() => deleteSerie(row.id)} className='btn btn-danger'>Delete</button>
            </td>
            
        </tr>    
    )

    const editSerie = id => {
        console.log('Edit' + id)
    }

    const deleteSerie = id => {
        console.log("Deleted" + id)
        axios
        .delete('/api/series/' + id)
        .then(res => {
            console.log(res)
            setData(data.filter(item => item.id !== id))
        })
    }
    
    if (data.length === 0) {
        return (
            
            <div className='container'>
                <h1>Series</h1>
                <Link className='btn btn-primary' to='/series/new' >New Series</Link>
                <div className="alert alert-warning" role="alert">
                    You don't have any Series created.
                </div>
            </div>
        )
    }


    return (
    <div className='container'>
        <h1>Series</h1>
        {/* <pre>{JSON.stringify(data)}</pre> */}
        <Link className='btn btn-primary' to='/series/new' >New Series</Link>
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

export default Series;