import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';


export default function MyProfile({ user, profile, getFirstName, getFavorites, favorites, setFavorites }) {
    const [ids, setIds] = useState([])

    const MARVEL_API_KEY = process.env.REACT_APP_MARVEL_API_KEY
    const MARVEL_HASH = process.env.REACT_APP_MARVEL_HASH

    useEffect(() => {
        getFavorites()
    }, [])

    useEffect(() => {
        favoriteIds()
    }, [])

    const img_url = (i) => {
        const url = i.image
        const x = url.split(':')
        return x[0] + 's:' + x[1] + '.jpg'
    }


    const favoriteIds = () => {
        let i
        let ids = []
        if (favorites.length > 0) {
            for (i = 0; i < favorites.length; i++) {
                ids.push(favorites[i].comicId)
            }
            setIds(ids)
        }
    }


    return (
        <div className='fullpage'>
            <div className='container col-10 my-5'>
                <div className='row my-3'>
                    <div className='col-md-6 col-12'>
                        <h1 className='my-3'>{profile.displayName}</h1>
                        <h3 className='my-3'>Favorite Character: {profile.favoriteChar}</h3>
                        <p className='my-3'>{profile.bio}</p>
                    </div>
                    <div className='col-md-6 d-flex justify-content-center align-items-center'>
                        <img className='rounded-circle' src={profile.photoURL} alt={profile.displayName} style={{ height: '100%' }} />
                    </div>
                </div>
                <div className='d-flex justify-content-around my-3'>
                    <Link to={'/profile/update'}><button className='btn btn-yellow mx-2' >Update Profile</button></Link>
                    <Link to={'/readinglist'}><button className='btn btn-yellow mx-2'>View {getFirstName(user)}'s Reading List</button></Link>
                </div>
            </div>
            {favorites.length === 0 ? <><h2 className='text-center'>{getFirstName(user)} has no favorites yet.</h2></> : (
                <div className='container col-10'>
                    <div className='row text-center my-5'>
                        <h1>{getFirstName(user)}'s Favorites</h1>
                    </div>

                    <div className='row my-5 comicload'>
                        {favorites.map(c => <div className='col-6 col-md-3 col-lg-2 text-center'>
                            <Link key={c.comicId} to={`/comics/${c.comicId}`}><img src={img_url(c)} alt={c.title} className='my-3 comic-img' style={{ width: '100%' }} /></Link>
                        </div>)}
                    </div>
                </div>)
            }
        </div>)
    }
