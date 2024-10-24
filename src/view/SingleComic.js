import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import Skeleton from '@mui/material/Skeleton';





export default function SingleComic({ user, handleClick, handleClose, action, open, message, favorites, list, getReadingList, addToReadingList, addToFavorites, deleteFromFavorites, deleteFromReadingList, listids, ids }) {
  const { comicid } = useParams()
  const [comic, setComic] = useState([])
  const [rating, setRating] = useState()
  const [comments, setComments] = useState([])




  const MARVEL_API_KEY = process.env.REACT_APP_MARVEL_API_KEY
  const MARVEL_HASH = process.env.REACT_APP_MARVEL_HASH
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL

  const getComic = async () => {

    const hash = MARVEL_HASH
    const PublicKey = MARVEL_API_KEY
    const url = `https://gateway.marvel.com/v1/public/comics/${comicid}?ts=1&apikey=${PublicKey}&hash=${hash}`


    const res = await fetch(url)
    const data = await res.json()
    setComic(data.data.results[0])

  };

  const getComments = async () => {
// Updated to Node
    const url = `${BACKEND_URL}/api/Comments/${comicid}`
    const options = {
      method: "GET",
      headers: {
        "Content-Type": 'application/json'
      }
    }

    const res = await fetch(url, options);
    const data = await res.json();
    console.log(data.comicComments)
    setComments(data.comicComments)
  }

  const addComment = async (event) => {
    // Updated to Node
    event.preventDefault()
    const comment = event.target.comment.value;

    const reqBody = {
      comicID: comicid,
      comment: comment,
      name: user.displayName, 
      userId: user.uid
    }

    const url = `${BACKEND_URL}/api/Comments`
    const options = {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: {
        "Content-Type": 'application/json'
      }
    }

    const res = await fetch(url, options);
    const data = await res.json();
    console.log(data)

    getComments()
  }

  useEffect(() => {
    console.log(comic)
  }, [comic])

  const deleteComment = async (c) => {
    // Updated to Node
    const reqBody = {
      userId: user.uid,
      comicID: comicid,
      commentID: c.id
    }

    const url = `${BACKEND_URL}/api/Comments/delete`
    const options = {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: {
        "Content-Type": 'application/json'
      }
    }


    const res = await fetch(url, options);
    const data = await res.json();
    console.log(data.message)

    getComments()
  }

  useEffect(() => {
    getComic()
  }, [comicid])

  useEffect(() => {
    getComments()
  }, [])

  useEffect(() => {
    getReadingList()
  }, [list])

  const img_url = (i) => {
    const url = i.thumbnail.path
    const x = url.split(':')
    return x[0] + 's:' + x[1] + '.jpg'
  }

  // const extra_img_url = (i) => {
  //   let x = i.path
  //   if (comic.images.length > 1) {
  //     return x + '.jpg'
  //   } else {
  //     return null
  //   }
  // }

  const getPrice = (c) => {
    if (c.prices.length > 1) {
      return `Price: \$${c.prices[1].price}`
    } else if (c.prices[0].price > 0) {
      return `Price: \$${c.prices[0].price}`
    } else {
      return null
    }
  };

  const getDate = (c) => {
    const date = c.dates[0].date
    const dateInfo = date.split('T')
    const mdy = dateInfo[0].split('-')

    return `${mdy[1]}/${mdy[2]}/${mdy[0]}`
  }

  const getDesciption = (c) => {
    if (c.description === null) {
      return 'Description not available.  Visit marvel.com for more information.'
    } else {
      return c.description
    }
  }

  const popoverAddReading = (
    <Popover id="popover">
      <Popover.Header as="p" bsPrefix='popover'>Add to Reading List</Popover.Header>
    </Popover>
  );

  const popoverDeleteReading = (
    <Popover id="popover-basic2">
      <Popover.Header as="p" bsPrefix='popover'>Delete from Reading List</Popover.Header>
    </Popover>
  );

  const popoverAddFavorite = (
    <Popover id="popover-basic3">
      <Popover.Header as="p" bsPrefix='popover'>Add to Favorites</Popover.Header>
    </Popover>
  );

  const popoverDeleteFavorite = (
    <Popover id="popover-basic4">
      <Popover.Header as="p" bsPrefix='popover'>Delete from Favorites</Popover.Header>
    </Popover>
  );






  return comic.length === 0 ? <><Skeleton sx={{ bgcolor: 'grey.000' }} variant="rectangular" width='100%' height='100vh' /></> : (
    <div className='container fullpage singlecomic col-10 my-5'>
      <div className='row comic-info d-flex justify-content-around'>
        <div className='col-12 col-md-10 col-lg-5 mb-5 mb-lg-0 d-flex justify-content-center align-items-center'>
          <img className='comic-img' src={(img_url(comic))} alt={comic.title} style={{ width: '80%' }} />
        </div>
        <div className='col-12 col-md-12 col-lg-5'>
          <h1 className='mb-4'>{comic.title}</h1>
          <p>{(getDesciption(comic))}</p>
          <h3 className='mb-4'>{(getPrice(comic))}</h3>
          <h5 className='mb-4'>Publication Date:  {(getDate(comic))}</h5>
          <h4 className='mb-2'>Creators:</h4>
          <div>
            {comic.creators.items.map(i => <h5>{i.name} - {i.role}</h5>)}
          </div>
          {/* <Rating
            name="simple-controlled"
            rating={rating}
            onChange={(event, newValue) => {
              setRating(newValue);
            }}
          /> */}
        </div>
      </div>

      <div className='row d-flex justify-content-around my-5'>
        <div className='col-12 col-lg-5 mb-5 mb-lg-0 text-center'>
          <a className='btn btn-yellow btn-sm col-sm-4 col-3 mx-3 text-center' href={comic.urls[0].url} target="_blank">Read on Marvel.com</a>
          
            {listids.includes(parseInt(comicid)) ?
              <><OverlayTrigger trigger="hover" placement="bottom" overlay={popoverDeleteReading}>
                <button className='btn btn-red btn-sm col-2 mx-3 text-center' onClick={() => { deleteFromReadingList(comic); handleClick() }}><AutoStoriesIcon /></button>
              </OverlayTrigger></>
              :
              <><OverlayTrigger trigger="hover" placement="bottom" overlay={popoverAddReading}>
                <button className='btn addfavorite btn-sm col-2 mx-3 text-center' onClick={() => { addToReadingList(comic); handleClick() }}><AutoStoriesIcon /></button>
              </OverlayTrigger></>}
            {ids.includes(parseInt(comicid)) ?
              <><OverlayTrigger trigger="hover" placement="bottom" overlay={popoverDeleteFavorite}>
                <button className='btn btn-red btn-sm col-2 mx-3 text-center' onClick={() => { deleteFromFavorites(comic); handleClick() }}><FavoriteIcon /></button>
              </OverlayTrigger></>
              :
              <><OverlayTrigger trigger="hover" placement="bottom" overlay={popoverAddFavorite}>
                <button className='btn addfavorite btn-sm col-2 mx-3 text-center' onClick={() => { addToFavorites(comic); handleClick() }}><FavoriteIcon /></button>
              </OverlayTrigger></>}
        </div>
        <div className='col-lg-5 col-md-8 col-12'>
          <form className='my-2' onSubmit={addComment}>
            <input type='text' className='form-control' name='comment' placeholder='Comment' />
            <div className='my-2 text-center'><button type='submit' className='btn btn-yellow btn-sm'>Submit Comment</button></div>
          </form>
          {comments.length === 0 ? <></> :
            comments.map(c => <div className='my-4 col-10'><div className='my-0 p-2 border rounded comment'>
              {c.comment}
            </div>
              <div className='d-flex justify-content-around'>
                <span className='comment'>{c.name}</span>
                {c.userId != user.uid ? <></> :
                  <button className='btn delete-comment btn-red btn-sm' onClick={() => { deleteComment(c) }}>Delete</button>}
              </div>
            </div>
            )}

        </div>
      </div>
    </div>
  )
}
