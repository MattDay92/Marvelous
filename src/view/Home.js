import React, { useState, useEffect } from 'react'
import cover1 from '../components/Covers/Cover.jpg'
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

export default function Home(handleClose, action, open, message,) {


    return (
        <div className='fullpage'>
            <div className='col-12'>
                <img className='cover' src={cover1} style={{ width: '100%' }} />
            </div>
            <h1 className='main-title text-center my-5'>Welcome to Marvelous</h1>
        </div>
    )
}
