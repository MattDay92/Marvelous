import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Skeleton from '@mui/material/Skeleton';


export default function This_Week() {
    const [new_comics, setNewComics] = useState([])

    const MARVEL_API_KEY = process.env.REACT_APP_MARVEL_API_KEY
    const MARVEL_HASH = process.env.REACT_APP_MARVEL_HASH

    console.log(new_comics)

    const getNewComics = async () => {

        const hash = MARVEL_HASH
        const PublicKey = MARVEL_API_KEY
        const url = `https://gateway.marvel.com/v1/public/comics?format=comic&noVariants=true&dateDescriptor=thisWeek&orderBy=title&limit=100&ts=1&apikey=${PublicKey}&hash=${hash}`


        const res = await fetch(url)
        const data = await res.json()
        setNewComics(data.data.results)

    }

    const img_url = (c) => {
        const url = c.thumbnail.path
        const x = url.split(':')
        return x[0] + 's:' + x[1] + '.jpg'
    }

    useEffect(() => {
        getNewComics()
    }, [])

    return (
        <div className='fullpage'>
            <h1 className='text-center my-5'>On Sale This Week</h1>
            <div className='d-flex justify-content-center'>
                <div className='col-10 d-flex justify-content-center'>
                    {new_comics.length != 0 ? <>
                        <div className='row my-5'>
                            {new_comics.map(c => <div className='col-6 col-md-3 col-lg-2 text-center'>
                                <Link key={c.id} to={`/comics/${c.id}`}><img src={img_url(c)} alt={c.title} className='my-3 comic-img' style={{ width: '100%' }} /></Link>
                            </div>)}
                        </div></>  
                    : (<Skeleton sx={{ bgcolor: 'grey.900' }} variant="rectangular" width='100%' height='60vh' />)}
            </div>
        </div>
        </div >
    )
}
