import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function SingleEvent({ addToFavorites }) {
  const { eventid } = useParams()
  const [event, setEvent] = useState([])

  const MARVEL_API_KEY = process.env.REACT_APP_MARVEL_API_KEY
  const MARVEL_HASH = process.env.REACT_APP_MARVEL_HASH

  const getEvent = async () => {

    const hash = MARVEL_HASH
    const PublicKey = MARVEL_API_KEY
    const url = `http://gateway.marvel.com/v1/public/events/${eventid}?ts=1&apikey=${PublicKey}&hash=${hash}`


    const res = await fetch(url)
    const data = await res.json()
    console.log(data.data.results[0])
    setEvent(data.data.results[0])


  };

  useEffect(() => {
    getEvent()
  }, [])


  const img_url = (i) => {
    const url = i.thumbnail.path
    const x = url.split(':')
    return x[0] + 's:' + x[1] + '.jpg'
  }

  // const extra_img_url = (i) => {
  //   let x = i.path
  //   if (comic.images.length > 1) {
  //     return x + '.jpg'
  //   } else {
  //     return null
  //   }
  // }

  //   const getPrice = (c) => {
  //     if (c.prices.length > 1){
  //       return `Price: \$${c.prices[1].price}`
  //     } else if (c.prices[0].price > 0){
  //       return `Price: \$${c.prices[0].price}`
  //     } else {
  //       return null
  //     }
  //   };

  return event.length === 0 ? <></> : (
    <div className='container fullpage col-10 my-5'>
      <div className='row d-flex justify-content-center'>
        <div className='col-5'><img alt={event.title} src={(img_url(event))} style={{ width: '80%' }} /></div>
        <div className='col-5'>
          <h1>{event.title}</h1>
          <p>{event.description}</p>
          <h4>Creators:</h4>
          <div>
            {event.creators.items.map(i => <h5>{i.name} - {i.role}</h5>)}
          </div>
        </div>
      </div>
      <div className='row d-flex justify-content-center my-5'>
        <Link className='btn btn-yellow col-2 mx-5' to={event.urls[0].url}>View on Marvel.com</Link>
        {/* <Link onClick={()=>{addToFavorites(event)}} className='btn btn-yellow col-2 mx-5'>Add to Favorites</Link> */}
      </div>
    </div>
  )
}
