import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Events() {
    const [events, setEvents] = useState([])
    const [comics, setComics] = useState([])

    const MARVEL_API_KEY = process.env.REACT_APP_MARVEL_API_KEY
    const MARVEL_HASH = process.env.REACT_APP_MARVEL_HASH


    const getEvent = async (event) => {
        event.preventDefault()
        const search = event.target.search.value

        const hash = MARVEL_HASH
        const PublicKey = MARVEL_API_KEY
        const url = `https://gateway.marvel.com/v1/public/events?name=${search}&ts=1&apikey=${PublicKey}&hash=${hash}`


        const res = await fetch(url)
        const data = await res.json()
        setEvents(data.data.results)

        const event_id = data.data.results[0].id

        const url2 = `https://gateway.marvel.com/v1/public/events/${event_id}/comics?format=comic&noVariants=true&orderBy=onsaleDate&ts=1&apikey=${PublicKey}&hash=${hash}`

        const res2 = await fetch(url2)
        const data2 = await res2.json()
        setComics(data2.data.results)

    }

    const img_url = (e) => {
        const url = e.thumbnail.path
        const x = url.split(':')
        return x[0] + 's:' + x[1] + '.jpg'
    }

    const img_url_comics = (comic) => {
        const url = comic.thumbnail.path
        const x = url.split(':')
        return x[0] + 's:' + x[1] + '.jpg'
    }

    return (
        <div className='fullpage'>
            <h1 className='text-center my-5'>Search Events</h1>
            <div className='row d-flex justify-content-center text-center'>
                <form className="col-lg-4 col-6" onSubmit={getEvent}>
                    <input className='form-control' name='search' />
                    <button type='submit' className='btn btn-yellow my-3'>Submit</button>
                </form>
            </div>
            <div className='row d-flex justify-content-center my-5'>
                {events.length === 0 ? <></> :
                    <div className='row col-10 d-flex justify-content-center text-center'>
                        <div className='col-lg-3 col-md-5 col-8 my-3'>
                            <img src={(img_url(events[0]))} alt={events[0].title} style={{ width: '100%' }} />
                            <h3 className='my-2'>{events[0].title}</h3>
                            <p className='my-2'>{events[0].description}</p>
                        </div>
                        <div className='row col-10 my-5 text-center'>
                            <h2>Comics included in {events[0].title}</h2>
                            {comics.filter(c => c.digitalId > 0).map(i => <Link className='col-lg-2 col-md-4 col-6 my-3' key={i.id} to={`/comics/${i.id}`}><img src={(img_url_comics(i))} style={{ width: '100%' }} /></Link>)}
                        </div>
                    </div>}</div>
        </div>

    )
}
