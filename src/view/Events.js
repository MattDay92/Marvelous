import React, { useState } from 'react'

export default function Events() {
    const [events, setEvents] = useState([])

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
        console.log(data.data.results)
        setEvents(data.data.results)

    }

    const img_url = (e) => {
        const url = e.thumbnail.path
        const x = url.split(':')
        return x[0] + 's:' + x[1] + '.jpg'
    }

    return (
        <div className='fullpage'>
            <h1 className='text-center my-5'>Search Events</h1>
            <div className='row d-flex justify-content-center text-center'>
                <form className="col-4" onSubmit={getEvent}>
                    <input className='form-control' name='search' />
                    <button type='submit' className='btn btn-yellow my-3'>Submit</button>
                </form>
            </div>
            <div className='row d-flex justify-content-center my-5'>
                {events.length === 0 ? <></> :
                    <div className='row col-10 d-flex justify-content-center text-center'>
                        <div className='col-4 my-3'>
                            <img src={(img_url(events[0]))} alt={events[0].title} style={{ width: '100%' }} />
                            <h3 className='my-2'>{events[0].title}</h3>
                            <p className='my-2'>{events[0].description}</p>
                        </div>
                    </div>}</div>
        </div>

        /* <div className='row d-flex justify-content-center my-5'>
        {events.length===0? <p className='text-center'>Information is loading...</p>:
        <div className='row col-10 text-center'>
        {events.map(i => <div className='col-2 my-3'>
            <img src={(img_url(i))} style={{ width: '100%' }} />
            <h5>{i.title}</h5>
            </div>)}
        </div>}</div> */
    )
}
