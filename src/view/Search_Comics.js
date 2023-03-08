import React, { useState } from 'react'
import {Link} from 'react-router-dom'


export default function Comics() {
    const [comics, setComics] = useState([])


    const getInfo = async (event) => {
        event.preventDefault()
        const search = event.target.search.value

        const hash = '93ff149b2c28d22cb9adf5cdafa2a845'
        const PublicKey = 'efad1a5f2b651e2a8b909ed94669c244'
        const url = `http://gateway.marvel.com/v1/public/comics?title=${search}&noVariants=true&limit=100&ts=1&apikey=${PublicKey}&hash=${hash}`


        const res = await fetch(url)
        const data = await res.json()
        console.log(data.data.results)
        setComics(data.data.results)

    }


    const img_url = (i) => {
        let x = i.thumbnail.path
        return x + '.jpg'
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
