import React, {useState} from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom'; //redirect page

const NewGenre = () => {
    
    const [name, setName] = useState('')
    const [success, setSuccess] = useState(false)


    const onChange = e => {
        setName(e.target.value)
    }
    

    const save = () => {
        axios
        .post('/api/genres', {
            name
        })
        .then(res => {
            console.log(res.data)
            setSuccess(true);
        })
    }

    if (success) {
        return <Redirect to='/genres' />
    }

    return (
        <div className='container'> 
<h1>New Genre</h1>
            <form>
                <div className="form-group">
                    <label htmlFor="exampleFormControlInput1">Genre name</label>
                    <input type='text' className='form-control' id='name' placeholder='New Genre' onChange={onChange}/>
                </div>
                <button type='button' className='btn btn-primary' onClick={save}>Save</button>
            </form>
        </div>
    );
}

export default NewGenre;