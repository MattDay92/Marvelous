import React, { useState } from 'react'

export default function Comics() {
    const [test, setTest] = useState([])


    const getInfo = async (event) => {
        event.preventDefault()
        const search = event.target.search.value

        const hash = '93ff149b2c28d22cb9adf5cdafa2a845'
        const PublicKey = 'efad1a5f2b651e2a8b909ed94669c244'
        const PrivateKey = 'a2038ae9e1466f847958a24ceb1891ed3a266be6'
        const url = `http://gateway.marvel.com/v1/public/comics?title=${search}&ts=1&apikey=${PublicKey}&hash=${hash}`


        const res = await fetch(url)
        const data = await res.json()
        console.log(data.data.results)
        setTest(data.data.results)

    }

    // const getComics = () => {
    //     console.log('Getting Comics')
    //     return test.map(c => (<div>
    //         <img className='my-3' src={img_url()} style={{width: '100%'}}/>
    //         <h3>{test.title}</h3>
    //     </div>))
    // }

    const img_url = (i) => {
        let x = i.thumbnail.path
        return x + '.jpg'
    }

    return test.length === 0 ? <><div>
        <h1 className='text-center my-5'>Search Comics</h1>
        <div className='row d-flex justify-content-center text-center'>
            <form className="col-4" onSubmit={getInfo}>
                <input className='form-control' name='search' />
                <button type='submit' className='btn btn-success'>Submit</button>
            </form>
        </div>
    </div></> : (
        <>
            <div>
                <h1 className='text-center my-5'>Search Comics Again</h1>
                <div className='row d-flex justify-content-center text-center'>
                    <form className="col-4" onSubmit={getInfo}>
                        <input className='form-control' name='search' />
                        <button type='submit' className='btn btn-success'>Submit</button>
                    </form>
                </div>
                <div>
                    {test.map(c => <img src={require(img_url(c))}/>)}
                    {test.map(c => <p>{c.title}</p>)}
                </div>
            </div>
        </>
    )
}
