import React, {useState} from 'react'

export default function Events() {
    const [test, setTest] = useState([])


    const getEvent = async (event) => {
        event.preventDefault()
        const search = event.target.search.value

        const hash = '93ff149b2c28d22cb9adf5cdafa2a845'
        const PublicKey = 'efad1a5f2b651e2a8b909ed94669c244'
        const PrivateKey = 'a2038ae9e1466f847958a24ceb1891ed3a266be6'
        const url = `http://gateway.marvel.com/v1/public/characters?name=${search}&ts=1&apikey=${PublicKey}&hash=${hash}`


        const res = await fetch(url)
        const data = await res.json()
        console.log(data.data.results)
        setTest(data.data.results)

    }

    const img_url = () => {
        let x = test[0].thumbnail.path
        return x + '.jpg'
    }

  return (
    <div>
        <h1 className='text-center my-5'>Search Events</h1>
            <div className='row d-flex justify-content-center text-center'>
            <form className="col-4" onSubmit={getEvent}>
                <input className='form-control' name='search' />
                <button type='submit' className='btn btn-success'>Submit</button>
            </form>
            </div>
            <div className='row d-flex justify-content-center my-5'>
            {test.length===0? <p className='text-center'>Information is loading...</p>:
            <div className='col-4 text-center'>
            <img className='my-3' src={img_url()} style={{width: '100%'}}/>
            <h3>{test[0].name}</h3>
            <p>{test[0].description}</p>
            </div>}</div>
    </div>
  )
}
