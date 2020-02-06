import React, {useState, useEffect } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom'; //redirect page
import { Badge} from 'reactstrap';

const InfoSeries = ({ match }) => {
    const [data, setData] = useState({})
    const [form, setForm] = useState({
        name: '', 
        comments: ''
    })
    const [mode, setMode] = useState('INFO')
    const [genres, setGenres] = useState([])
    const [success, setSuccess] = useState(false)
    const [genreId, setGenreId] = useState('')


    useEffect(() => {
        axios
        .get('/api/series/' + match.params.id)
        .then(res => {
            setData(res.data)
            setForm(res.data)
        })  
    }, [match.params.id])

    useEffect(() => {
        axios
        .get('/api/genres/')
        .then(res => {
            setGenres(res.data.data)
            
            const genres = res.data.data;
            const found = genres.find(genre => data.genre === genre.name)

            if (found) {
                setGenreId(found.id)
            }
        })
    }, [data])
        

    const masterHeader = {
        height: '50vh', 
        minHeight: '500px',
        backgroundImage: `url('${data.background}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: false
    }

    const onChange = field => e => {
        setForm({
            ...form, 
            [field]: e.target.value
        })
    }

    const onChangeGenre = e => {
        setGenreId(e.target.value)
    }

    const save = () => {
        console.log(genreId, form)
        axios
        .put('/api/series/' + match.params.id, {
            ...form,
            genre_id: genreId    
        })
        .then(res => {
            console.log(res.data)
            setSuccess(true);
        })
    }


    const changeStatus = status => () => {
        setForm({
            ...form,
            status
        })
    }

    if (success) {
        return <Redirect to='/series' />
    }

    return (
        <div>
            <header style={masterHeader}>
                <div className='h-100' style={{ background: 'rgba(0,0,0,0.7)' }} >
                    <div className='h-100 container'>
                    <div className='row h-100 align-items-center'>
                        <div className='col-3'>
                            <img className='img-fluid img-thumbnail' src={data.poster} alt={data.name} />
                        </div>
                        <div className='col-8'>
                            <h1 className='font-weight-light text-white'>{data.name}</h1>
                            <div className='lead text-white'>
                                { data.status === 'WATCHED' && <Badge color='success'>Watched</Badge> }
                                { data.status === 'TO_WATCH' && <Badge color='warning'>To watch</Badge> }
                                Genre: { data.genre }
                            </div>   
                        </div> 
                                                 
                    </div>
                    </div>
                </div>
            </header>
            <div className='container'>
                <button className='btn btn-warning' onClick={() => setMode('EDIT')} >Edit</button>
            </div>
            {
                mode === 'EDIT' &&
                <div className='container'>     
                    <h1>Editar series</h1>
                    {/* <pre>DATA: {JSON.stringify(data)}</pre>
                    <pre>FORM: {JSON.stringify(form)}</pre>
                    <pre>FORM.GENRE: {JSON.stringify(form.genre)}</pre>
                    <pre>FORM.NAME: {JSON.stringify(form.name)}</pre>
                    <pre>DATA.GENRE: {JSON.stringify(data.genre)}</pre>
                    <pre>GENRES: {JSON.stringify(genres)}</pre> */}
                    <form>
                        <div className='form-group'>
                            <label htmlFor='name'>Series name</label>
                            <input type='text' value={form.name} className='form-control' id='name' placeholder='Series name' onChange={onChange('name')} />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='comments'>Comments</label>
                            <input type='text' value={form.comments} className='form-control' id='comments' placeholder='Comments' onChange={onChange('comments')} />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='genres'>Gerens</label>
                                <select id='inputState' className='form-control' onChange={onChangeGenre} value={genreId}>
                                    {/* { genres.map(genre => <option key={genre.id} value={genre.id} id={genres} select={genre.id === form.genre}> {genre.name} </option>) } */}
                                    { genres.map(genre => <option key={genre.id} value={genre.id} id={genres}> {genre.name} </option>) }
                                </select>
                        </div>
                        <div className='form-check'>
                            <input className='form-check-input' checked={form.status === 'WATCHED'} type='radio' name='status' id='watched' value='WATCHED' onChange={changeStatus('WATCHED')} />
                            <label className='form-check-label' htmlFor='watched'>
                                Watched
                            </label>
                        </div>
                        <div className='form-check'>
                            <input className='form-check-input' checked={form.status === 'TO_WATCH'} type='radio' name='status' id='towatch' value='TO_WATCH' onChange={changeStatus('TO_WATCH')}/>
                            <label className='form-check-label' htmlFor='towatch'>
                                To Watch
                            </label>
                        </div>
                        <button type='button' className='btn btn-primary' onClick={save}>Save</button>
                        <button type='button' className='btn btn-info' onClick={() => setMode('INFO')}>Cancel</button>
                    </form>
                </div>
            }
        </div>
    );
}

export default InfoSeries;