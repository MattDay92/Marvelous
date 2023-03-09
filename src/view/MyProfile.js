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

    useEffect(() => {
        getFavorites()
    }, [])

    useEffect(() => {
        favoriteIds()
    }, [])

    const img_url = (i) => {
        let x = i.image
        return x + '.jpg'
    }

    const deleteFromFavorites = async (c) => {
        const reqBody = {
            uid: user.uid,
            comic_id: c.comicId
        }

        const url = `http://127.0.0.1:5000/api/deletefromfavorites`
        const options = {
            method: "POST",
            body: JSON.stringify(reqBody),
            headers: {
                "Content-Type": 'application/json'
            }
        }

        console.log(url, options)

        const res = await fetch(url, options);
        const data = await res.json();
        console.log(data)
        setFavorites(data.favorites)
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
                    <div className='col-6'>
                        <h1 className='my-3'>{profile.displayName}</h1>
                        <h3 className='my-3'>Favorite Character: {profile.favoriteChar}</h3>
                        <p className='my-3'>{profile.bio}</p>
                        {/* <h4 className='my-3'>Comics Read: </h4> */}
                    </div>
                    <div className='col-6 d-flex justify-content-center align-items-center'>
                        <img className='rounded-circle' src={profile.photoURL} style={{ height: '50%'}} />
                    </div>
                </div>
                <div className='d-flex justify-content-around my-3'>
                    <Link to={'/profile/update'}><button className='btn btn-yellow' >Update Profile</button></Link>
                    <Link to={'/readinglist'}><button className='btn btn-yellow'>View {getFirstName(user)}'s Reading List</button></Link>
                </div>
            </div>
            {favorites.length === 0 ? <></> : (
                <div className='container col-10'>
                    <div className='row text-center my-5'>
                        <h1>{getFirstName(user)}'s Favorites</h1>
                    </div>

                    {/* <button onClick={() => { deleteFromFavorites(c) }} className='btn btn-red btn-sm my-1 mx-1'>Delete</button> */}

                    <div className='col d-flex justify-content-center'>
                        <ImageList sx={{ width: 1200 }} cols={5} gap={10}>
                            {favorites.map((item) => (
                                <Link to={`/comics/${item.comicId}`}><ImageListItem key={item.id}>
                                    <img
                                        src={`${img_url(item)}?w=164&h=164&fit=crop&auto=format`}
                                        srcSet={`${img_url(item)}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                        alt={item.title}
                                        loading="lazy"
                                    />
                                    <ImageListItemBar
                                        title={item.title}
                                        actionIcon={
                                            <IconButton
                                                sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                                aria-label={`info about ${item.title}`}
                                            >
                                                <InfoIcon />
                                            </IconButton>
                                        }
                                    />
                                </ImageListItem></Link>
                            ))}
                        </ImageList>
                    </div>
                </div>)}
        </div>
    )
}
