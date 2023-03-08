import React, { useState, useEffect } from 'react'
import cover1 from '../components/Covers/Cover.jpg'
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

export default function Home(handleClose, action, open, message,) {

    // const comic = async () => {
    //     const random = Math.floor(Math.random() * 1561)

    //     const hash = '93ff149b2c28d22cb9adf5cdafa2a845'
    //     const PublicKey = 'efad1a5f2b651e2a8b909ed94669c244'
    //     const url = `http://gateway.marvel.com/v1/public/characters?offset=${random}&ts=1&apikey=${PublicKey}&hash=${hash}`

    //     const res = await fetch(url)
    //     const data = await res.json()
    //     const char = data.data.results[0]

    //     console.log(char.thumbnail.path + '/landscape_incredible.jpg')
    //     if (char.thumbnail.path != "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available") {
    //         return (char.thumbnail.path + '/landscape_incredible.jpg')
    //     } else {
    //         comic()
    //     }
    // }

    return (
        <div className='fullpage'>
            <div className='col-12'>
                <img className='cover' src={cover1} style={{ width: '100%' }} />
            </div>
            <h1 className='main-title text-center my-5'>Welcome to Marvelous</h1>
            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}
                message={message}
                action={action}
            />
        </div>
    )
}
