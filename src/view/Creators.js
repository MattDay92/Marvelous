import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function Creators() {
    const [creator, setCreator] = useState([])
    const [comics, setComics] = useState([])
    const [events, setEvents] = useState([])

    const MARVEL_API_KEY = process.env.REACT_APP_MARVEL_API_KEY
    const MARVEL_HASH = process.env.REACT_APP_MARVEL_HASH


    const getCreator = async (event) => {
        event.preventDefault()
        const search = event.target.search.value
        const name = search.split(" ")

        const hash = MARVEL_HASH
        const PublicKey = MARVEL_API_KEY
        const url = `https://gateway.marvel.com/v1/public/creators?firstName=${name[0]}&lastName=${name[-1]}&ts=1&apikey=${PublicKey}&hash=${hash}`


        const res = await fetch(url)
        const data = await res.json()
        console.log(data)
        setCreator(data.data.results[0])

        const creator_id = data.data.results[0].id

        const url2 = `https://gateway.marvel.com/v1/public/creators/${creator_id}/comics?format=comic&noVariants=true&orderBy=-onsaleDate&ts=1&apikey=${PublicKey}&hash=${hash}`


        const res2 = await fetch(url2)
        const data2 = await res2.json()
        setComics(data2.data.results)

        const url3 = `https://gateway.marvel.com/v1/public/creators/${creator_id}/events?&ts=1&apikey=${PublicKey}&hash=${hash}`


        const res3 = await fetch(url3)
        const data3 = await res3.json()
        setEvents(data3.data.results)
    }

    const img_url = (i) => {
        const url = i.thumbnail.path
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

    return creator.length === 0 ? <><div className='fullpage'>
        <h1 className='text-center my-5'>Search Creators</h1>
        <div className='row d-flex justify-content-center text-center'>
            <form className="col-4" onSubmit={getCreator}>
                <input className='form-control' name='search' />
                <button type='submit' className='btn btn-yellow my-3'>Submit</button>
            </form>
        </div>
    </div></> : (
        <>
            <div className='fullpage'>
                <h1 className='text-center my-5'>Search Creators</h1>
                <div className='row d-flex justify-content-center text-center'>
                    <form className="col-4" onSubmit={getCreator}>
                        <input className='form-control' name='search' />
                        <button type='submit' className='btn btn-yellow my-3'>Submit</button>
                    </form>
                </div>
                <div className='row d-flex justify-content-center my-5'>
                    <div className='col-4 text-center my-3'>
                        <img src={(img_url(creator))} style={{ width: '100%' }} />
                        <h2 className='my-4'>{creator.fullName}</h2>
                    </div>
                </div>
                <div className='d-flex justify-content-center'>
                    <div className='row col-10 my-5 text-center'>
                        <h2>Comics by {creator.fullName}</h2>
                        {comics.filter(c => c.digitalId > 0).map(i => <Link className='col-2 my-3' key={i.id} to={`/comics/${i.id}`}><img src={(img_url_comics(i))} style={{ width: '100%' }} /></Link>)}
                    </div>
                </div>
                <div className='d-flex justify-content-center'>
                    <div className='row col-10 text-center'>
                        <h2>Events by {creator.fullName}</h2>
                        {events.map(i => <Link className='col-2 my-3' key={i.id} to={`/events/${i.id}`}><img src={(img_url_events(i))} style={{ width: '100%' }} /></Link>)}
                    </div>
                </div>
            </div>
        </>
    )
}
