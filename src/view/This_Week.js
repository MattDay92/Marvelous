import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';

export default function This_Week() {
    const [new_comics, setNewComics] = useState([])

    const MARVEL_API_KEY = process.env.REACT_APP_MARVEL_API_KEY
    const MARVEL_HASH = process.env.REACT_APP_MARVEL_HASH


    const getNewComics = async () => {

        const hash = MARVEL_HASH
        const PublicKey = MARVEL_API_KEY
        const url = `https://gateway.marvel.com/v1/public/comics?format=comic&noVariants=true&dateDescriptor=thisWeek&orderBy=title&limit=100&ts=1&apikey=${PublicKey}&hash=${hash}`


        const res = await fetch(url)
        const data = await res.json()
        console.log(data.data.results)
        setNewComics(data.data.results)

    }

    const img_url = (c) => {
        const url = c.thumbnail.path
        const x = url.split(':')
        return x[0] + 's:' + x[1] + '.jpg'
    }

    useEffect(() => {
        getNewComics()
    }, [])

    return (
        <div className='fullpage'>
            <h1 className='text-center my-5'>On Sale This Week</h1>
            
            <div className='col d-flex justify-content-center'>
                <ImageList sx={{ width: 1200 }} cols={5} gap={10}>
                    {new_comics.map((item) => (
                        <Link to={`/comics/${item.id}`}><ImageListItem key={item.id}>
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
        </div>
    )
}
