import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom'; //redirect page

const EditGender = ({ match }) => {
    const [name, setName] = useState('')
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        axios
        .get('/api/genres/' + match.params.id )
        .then(res => {
            setName(res.data.name) 
        })
    }, [match.params.id])

    const onChange = e => {
        setName(e.target.value)
    }
    
    const save = () => {
        axios
        .put('/api/genres/' + match.params.id, {
            name
        })
        .then(res => {
            console.log(res.data)
            setSuccess(true);
        })
    }

    console.log({ match });

    if (success) {
        return <Redirect to='/genders' />
    }

    return (
        <div className='container'> 
<h1>Edit Genre</h1>
            <form>
                <div className="form-group">
                    <label htmlFor="exampleFormControlInput1">Gender name</label>
                    <input type='text' className='form-control' id='name' placeholder='Edit Gender' onChange={onChange} value={name} />
                </div>
                <button type='button' className='btn btn-primary' onClick={save}>Save</button>
            </form>
        </div>
    );
}

export default EditGender;