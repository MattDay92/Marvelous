import React from 'react'
import { Link } from 'react-router-dom'
import captainAmerica from './Heros/Captain-America.png'
import Hawkeye from './Heros/Hawkeye.png'
import Hulk from './Heros/Hulk.webp'
import ironMan from './Heros/Iron-Man.png'
import Spiderman from './Heros/Spider-Man-Peter-Parker.png'
import Thor from './Heros/Thor.png'
import Wolverine from './Heros/Wolverine.webp'
import Xmen from './Heros/X-Men.png'




export default function Heros({favorite_char}) {

    const getCharacter = async (name) => {

        const hash = '93ff149b2c28d22cb9adf5cdafa2a845'
        const PublicKey = 'efad1a5f2b651e2a8b909ed94669c244'
        const PrivateKey = 'a2038ae9e1466f847958a24ceb1891ed3a266be6'
        const url = `https://gateway.marvel.com/v1/public/characters?name=${name}&ts=1&apikey=${PublicKey}&hash=${hash}`


        const res = await fetch(url)
        const data = await res.json()
        console.log(data.data.results[0])
        favorite_char(data.data.results[0])
    }


  return (
    <div className='container'>
        <h3 className='text-center my-3'>Popular Characters</h3>
        <div className='row d-flex justify-content-center align-items-center charsload'>
            <div className='col-lg-1 col-2'>
                <Link onClick={()=>{getCharacter('Captain America')}}><img src={captainAmerica}  alt='Captain America' style={{width: '100%'}}/></Link>
            </div>
            <div className='col-lg-1 col-2'>
                <Link onClick={()=>{getCharacter('Hawkeye')}}><img src={Hawkeye} alt='Hawkeye'  style={{width: '100%'}} /></Link>
            </div>
            <div className='col-lg-1 col-2'>
                <Link onClick={()=>{getCharacter('Hulk')}}><img src={Hulk} alt='Hulk' style={{width: '100%'}}/></Link>
            </div>
            <div className='col-lg-1 col-2'>
                <Link onClick={()=>{getCharacter('Spider-Man (Peter Parker)')}}><img src={Spiderman} alt='Spider-Man' style={{width: '100%'}}/></Link>
            </div>
        </div>
        <div className='row d-flex justify-content-center align-items-center charsload'>
            <div className='col-lg-1 col-2'>
                <Link onClick={()=>{getCharacter('Iron Man')}}><img src={ironMan} alt='Iron Man' style={{width: '100%'}}/></Link>
            </div>
            <div className='col-lg-1 col-2'>
                <Link onClick={()=>{getCharacter('X-Men')}}><img src={Xmen} alt='X-Men Logo' style={{width: '100%'}}/></Link>
            </div>
            <div className='col-lg-1 col-2'>
                <Link onClick={()=>{getCharacter('Thor')}}><img src={Thor} alt='Thor' style={{width: '100%'}}/></Link>
            </div>
            <div className='col-lg-1 col-2'> 
                <Link onClick={()=>{getCharacter('Wolverine')}}><img src={Wolverine} alt='Wolverine' style={{width: '100%'}}/></Link>
            </div>
        </div>
    </div>
  )
}
