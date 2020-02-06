import React, {useState} from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom'; //redirect page

const NewSeries = () => {
    
    const [name, setName] = useState('')
    const [success, setSuccess] = useState(false)


    const onChange = e => {
        setName(e.target.value)
    }
    

    const save = () => {
        axios
        .post('/api/series', {
            name
        })
        .then(res => {
            console.log(res.data)
            setSuccess(true);
        })
    }

    if (success) {
        return <Redirect to='/series' />
    }

    return (
        <div className='container'> 
<h1>New Series</h1>
            <form>
                <div className="form-group">
                    <label htmlFor="exampleFormControlInput1">Series name</label>
                    <input type='text' className='form-control' id='name' placeholder='Novo Genero' onChange={onChange}/>
                </div>
                <button type='button' className='btn btn-primary' onClick={save}>Save</button>
            </form>
        </div>
    );
}

export default NewSeries;