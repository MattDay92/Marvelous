import React from 'react'
import captainAmerica from './Heros/Captain-America.png'
import Hawkeye from './Heros/Hawkeye.png'
import Hulk from './Heros/Hulk.webp'
import ironMan from './Heros/Iron-Man.png'
import Spiderman from './Heros/Spider-Man-Peter-Parker.png'
import Thor from './Heros/Thor.png'
import Wolverine from './Heros/Wolverine.webp'
import Xmen from './Heros/X-Men.png'



export default function Heros() {
  return (
    <div className='container'>
        <h3 className='text-center my-3'>Favorite Characters</h3>
        <div className='row d-flex justify-content-center'>
            <div className='col-1'>
                <img src={captainAmerica} style={{width: '100%'}}/>
            </div>
            <div className='col-1'>
                <img src={Hawkeye}style={{width: '100%'}} />
            </div>
            <div className='col-1'>
                <img src={Hulk} style={{width: '100%'}}/>
            </div>
            <div className='col-1'>
                <img src={Spiderman} style={{width: '100%'}}/>
            </div>
        </div>
        <div className='row d-flex justify-content-center'>
            <div className='col-1'>
                <img src={ironMan} style={{width: '100%'}}/>
            </div>
            <div className='col-1'>
                <img src={Xmen} style={{width: '100%'}}/>
            </div>
            <div className='col-1'>
                <img src={Thor} style={{width: '100%'}}/>
            </div>
            <div className='col-1'>
                <img src={Wolverine} style={{width: '100%'}}/>
            </div>
        </div>
    </div>
  )
}
