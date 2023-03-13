import React, { useState } from 'react'
import {Link} from 'react-router-dom'


export default function Comics() {
    const [comics, setComics] = useState([])

    const MARVEL_API_KEY = process.env.REACT_APP_MARVEL_API_KEY
    const MARVEL_HASH = process.env.REACT_APP_MARVEL_HASH


    const getInfo = async (event) => {
        event.preventDefault()
        const search = event.target.search.value

        const hash = MARVEL_HASH
        const PublicKey = MARVEL_API_KEY
        const url = `https://gateway.marvel.com/v1/public/comics?title=${search}&noVariants=true&limit=100&ts=1&apikey=${PublicKey}&hash=${hash}`


        const res = await fetch(url)
        const data = await res.json()
        console.log(data.data.results)
        setComics(data.data.results)

    }


    const img_url = (i) => {
        const url = i.thumbnail.path
        const x = url.split(':')
        return x[0] + 's:' + x[1] + '.jpg'
    }

    

    return comics.length === 0 ? <><div className='fullpage'>
        <h1 className='text-center my-5'>Search Comics</h1>
        <div className='row d-flex justify-content-center text-center'>
            <form className="col-4" onSubmit={getInfo}>
                <input className='form-control' name='search' />
                <button type='submit' className='btn btn-yellow my-3'>Submit</button>
            </form>
        </div>
    </div></> : (
        <>
            <div className='fullpage'>
                <h1 className='text-center my-5'>Search Comics</h1>
                <div className='row d-flex justify-content-center text-center'>
                    <form className="col-4" onSubmit={getInfo}>
                        <input className='form-control' name='search' />
                        <button type='submit' className='btn btn-yellow my-3'>Submit</button>
                    </form>
                </div>
                <div className='d-flex justify-content-center'>
                <div className='row col-10'>
                    {comics.filter(c => c.digitalId > 0).map(i => <Link className='col-2 my-3' key={i.id} to={`/comics/${i.id}`}><img src={(img_url(i))} alt={i.title} style={{width: '100%'}}/></Link>)}
                </div>
                </div>
            </div>
        </>
    )
}
