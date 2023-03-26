import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'



export default function Comics() {
    const [comics, setComics] = useState([])
    const [input, setInput] = useState('')
    const [page, setPage] = useState(-1)

    const MARVEL_API_KEY = process.env.REACT_APP_MARVEL_API_KEY
    const MARVEL_HASH = process.env.REACT_APP_MARVEL_HASH

    const handleSubmit = (event) => {
        event.preventDefault()
        const search = event.target.search.value

        setInput(search)

        setPage(0)
    }

    const handleNext = () => {


        setPage(page + 20)

    }

    const handlePrevious = (event) => {


        setPage(page - 20)
    }


    useEffect(() => {
        getInfo()
    }, [page, input])


    const getInfo = async () => {

        const hash = MARVEL_HASH
        const PublicKey = MARVEL_API_KEY
        const url = `https://gateway.marvel.com/v1/public/comics?title=${input}&noVariants=true&limit=20&offset=${page}&ts=1&apikey=${PublicKey}&hash=${hash}`

        console.log(url)

        const res = await fetch(url)
        const data = await res.json()
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
            <form className="col-lg-4 col-6" onSubmit={handleSubmit}>
                <input className='form-control' name='search' />
                <button type='submit' className='btn btn-yellow my-3'>Submit</button>
            </form>
        </div>
    </div></> : (
        <>
            <div className='fullpage'>
                <h1 className='text-center my-5'>Search Comics</h1>
                <div className='row d-flex justify-content-center text-center'>
                    <form className="col-lg-4 col-6" onSubmit={handleSubmit}>
                        <input className='form-control' name='search' />
                        <button type='submit' className='btn btn-yellow my-3'>Submit</button>
                    </form>
                </div>
                <nav className='page-change'>
                    <ul className="pagination d-flex justify-content-center text-center">
                        <li className="page-item">
                            <button onClick={handlePrevious} type='submit' className="btn btn-yellow mx-5">Previous</button>
                        </li>
                        <p className='page-count'>{page + 1} - {page + 20}</p>
                        <li>
                            <button onClick={handleNext} type='submit' className="btn btn-yellow mx-5">Next</button>
                        </li>
                    </ul>
                </nav>
                <div className='d-flex justify-content-center'>
                    <div className='row col-10'>
                        {comics.map(i => <Link className='col-lg-2 col-md-4 col-6 my-3' key={i.id} to={`/comics/${i.id}`}><img src={(img_url(i))} alt={i.title} style={{ width: '100%' }} /></Link>)}
                    </div>
                </div>
            </div>
        </>
    )
}
