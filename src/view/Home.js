import React, { useState, useEffect } from 'react'
import cover from '../components/Covers/Cover3.jpeg'


export default function Home() {


    return (
        <div className='fullpage'>
            <div className='col-12'>
                <img className='cover' src={cover} />
            </div>
            <h1 className='main-title text-center my-5'>Welcome to Marvelous</h1>
        </div>
    )
}
