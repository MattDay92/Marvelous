import React, { useState, useEffect } from 'react'

export default function Test() {
    const [test, setTest] = useState([])


    const getInfo = async (event) => {
        event.preventDefault()
        const search = event.target.search.value

        const hash = '93ff149b2c28d22cb9adf5cdafa2a845'
        const PublicKey = 'efad1a5f2b651e2a8b909ed94669c244'
        const PrivateKey = 'a2038ae9e1466f847958a24ceb1891ed3a266be6'
        const url = `http://gateway.marvel.com/v1/public/characters?name=${search}&ts=1&apikey=${PublicKey}&hash=${hash}`




        const res = await fetch(url)
        const data = await res.json()
        console.log(data.data.results)
        // setTest(data.data.results)
        const character_id = data.data.results[0].id
        console.log(character_id)

        // const url2 = `http://gateway.marvel.com/v1/public/characters/${character_id}/comics?&ts=1&apikey=${PublicKey}&hash=${hash}`


        // const res2 = await fetch(url2)
        // const data2 = await res2.json()
        // setTest(data2.data.results)
        // console.log(data2.data.results)

        const url3 = `http://gateway.marvel.com/v1/public/characters/${character_id}/events?&ts=1&apikey=${PublicKey}&hash=${hash}`


        const res3 = await fetch(url3)
        const data3 = await res3.json()
        setTest(data3.data.results)
        console.log(data3.data.results)

    }

    const img_url = () => {
        let x = test[0].thumbnail.path
        return x + '.jpg'
    }

       


    // useEffect(() => {
    //     getInfo()
    // }, [])


    return (
        <div>
            <h1 className='text-center my-5'> Marvel API Test</h1>
            <div className='row d-flex justify-content-center text-center'>
            <form className="col-4" onSubmit={getInfo}>
                <input className='form-control' name='search' />
                <button type='submit' className='btn btn-success'>Submit</button>
            </form>
            </div>
            <div className='row d-flex justify-content-center my-5'>
            {test.length===0? <p className='text-center'>Information is loading...</p>:
            <div className='col-4 text-center'>
            <img className='my-3' src={img_url()} style={{width: '100%'}}/>
            <p>{test[0].title}</p>
            <p>{test[0].description}</p>
            </div>}</div>

        </div>
    )
}
