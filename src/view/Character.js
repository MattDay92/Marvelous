import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Heros from '../components/Heros'
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Skeleton from '@mui/material/Skeleton';





export default function Character({allChars}) {
    const [char, setChar] = useState([])
    const [comics, setComics] = useState([])
    const [events, setEvents] = useState([])

    const MARVEL_API_KEY = process.env.REACT_APP_MARVEL_API_KEY
    const MARVEL_HASH = process.env.REACT_APP_MARVEL_HASH

    const getCharacter = async (event) => {
        event.preventDefault()
        const search = event.target.search.value

        const hash = MARVEL_HASH
        const PublicKey = MARVEL_API_KEY
        const url = `https://gateway.marvel.com/v1/public/characters?name=${search}&ts=1&apikey=${PublicKey}&hash=${hash}`


        const res = await fetch(url)
        const data = await res.json()
        setChar(data.data.results[0])

        const character_id = data.data.results[0].id

        const url2 = `https://gateway.marvel.com/v1/public/characters/${character_id}/comics?format=comic&noVariants=true&orderBy=-onsaleDate&ts=1&apikey=${PublicKey}&hash=${hash}`


        const res2 = await fetch(url2)
        const data2 = await res2.json()
        setComics(data2.data.results)

        const url3 = `https://gateway.marvel.com/v1/public/characters/${character_id}/events?&ts=1&apikey=${PublicKey}&hash=${hash}`


        const res3 = await fetch(url3)
        const data3 = await res3.json()
        setEvents(data3.data.results)
    }

    const img_url = () => {
        const url = char.thumbnail.path
        const x = url.split(':')
        return x[0] + 's:' + x[1] + '.jpg'
    }
    const img_url_comics = (comic) => {
        const url = comic.thumbnail.path
        const x = url.split(':')
        return x[0] + 's:' + x[1] + '.jpg'
    }
    const img_url_events = (event) => {
        const url = event.thumbnail.path
        const x = url.split(':')
        return x[0] + 's:' + x[1] + '.jpg'
    }

    const favorite_char = async (name) => {
        setChar(name)
    }

    const favorite_char_comics = async () => {
        const hash = MARVEL_HASH
        const PublicKey = MARVEL_API_KEY

        const character_id = char.id

        const url2 = `https://gateway.marvel.com/v1/public/characters/${character_id}/comics?format=comic&noVariants=true&orderBy=-onsaleDate&ts=1&apikey=${PublicKey}&hash=${hash}`


        const res2 = await fetch(url2)
        const data2 = await res2.json()
        setComics(data2.data.results)

        const url3 = `https://gateway.marvel.com/v1/public/characters/${character_id}/events?&ts=1&apikey=${PublicKey}&hash=${hash}`


        const res3 = await fetch(url3)
        const data3 = await res3.json()
        setEvents(data3.data.results)
    }

    useEffect(() => {
        favorite_char_comics()
    }, [char])


    return (
        <div className='fullpage'>
            <h1 className='text-center my-5'>Search Characters</h1>
            <div className='row d-flex justify-content-center text-center'>
                <form className="col-lg-4 col-8 char" onSubmit={getCharacter}>
                    <Autocomplete
                        id="character-search"
                        options={allChars.map((option) => option)}
                        loading={true}
                        renderInput={(params) => <TextField {...params} name='search' label="Character Name" />}
                    />
                    <button type='submit' className='btn btn-yellow my-3'>Submit</button>
                </form>
            </div>
            <div className='row d-flex justify-content-center my-5'>
                {char.length === 0 ?
                    <Heros favorite_char={favorite_char} /> :
                    <><div className='col-lg-3 col-md-5 col-8 text-center comicload'>
                        <img className='my-3' alt={char.name} src={img_url()} style={{ width: '100%' }} />
                        <h2>{char.name}</h2>
                        <p>{char.description}</p>
                    </div>
                    
                        <div className='row col-10 my-5 text-center comicload'>
                            <h2>Recent Comics featuring {char.name}</h2>
                            {comics.filter(c => c.digitalId > 0).map(i => <Link className='col-lg-2 col-md-4 col-6 my-3' key={i.id} to={`/comics/${i.id}`}><img src={(img_url_comics(i))} style={{ width: '100%' }} /></Link>)}
                        </div>
                        <div className='row col-10 text-center comicload'>
                            <h2>Events featuring {char.name}</h2>
                            {events.map(i => <Link className='col-lg-2 col-md-4 col-6 my-3' key={i.id} to={`/events/${i.id}`}><img src={(img_url_events(i))} style={{ width: '100%' }} /></Link>)}
                        </div></>}
            </div>
        </div>
    )
}



