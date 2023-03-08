import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import Paper from '@mui/material/Paper';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import Snackbar from '@mui/material/Snackbar';



export default function SingleComic({ user, handleClick, handleClose, action, open , message, favorites, list, getReadingList, addToReadingList, addToFavorites, deleteFromFavorites, deleteFromReadingList, listids, ids }) {
  const { comicid } = useParams()
  const [comic, setComic] = useState([])
  const [rating, setRating] = useState()
  const [comments, setComments] = useState([])

  const getComic = async () => {

    const hash = '93ff149b2c28d22cb9adf5cdafa2a845'
    const PublicKey = 'efad1a5f2b651e2a8b909ed94669c244'
    const url = `http://gateway.marvel.com/v1/public/comics/${comicid}?ts=1&apikey=${PublicKey}&hash=${hash}`


    const res = await fetch(url)
    const data = await res.json()
    console.log(data.data.results[0])
    setComic(data.data.results[0])


  };

  const getComments = async () => {
    const reqBody = {
      comic_id: comicid
    }

    const url = `http://127.0.0.1:5000/api/getcomments`
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
    setComments(data.comments)
  }

  const addComment = async (event) => {
    event.preventDefault()
    const comment = event.target.comment.value;

    const reqBody = {
      user_id: user.uid,
      comic_id: comicid,
      comment: comment,
      name: user.displayName
    }

    const url = `http://127.0.0.1:5000/api/addcomment`
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

    getComments()
  }

  const deleteComment = async (c) => {
    const reqBody = {
      uid: user.uid,
      comic_id: c.comicId,
      comment_id: c.id
    }

    const url = `http://127.0.0.1:5000/api/deletecomment`
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
    setComments(data.comments)

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
    let x = i.thumbnail.path
    return x + '.jpg'
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


  console.log(comments)


  return comic.length === 0 ? <></> : (
    <div className='container fullpage col-10 my-5'>
      <div className='row d-flex justify-content-around'>
        <div className='col-5 d-flex justify-content-center align-items-center'>
          <img className='comic-img' src={(img_url(comic))} alt={comic.title} style={{ width: '80%' }} />
        </div>
        <div className='col-5'>
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
        <div className='col-5 text-center'>
          <a className='btn btn-yellow btn-sm col-4 mx-3 text-center' href={comic.urls[0].url} target="_blank">Read on Marvel.com</a>
          {listids.includes(parseInt(comicid))? <button className='btn btn-red btn-sm col-2 mx-3 text-center' onClick={() => {deleteFromReadingList(comic); handleClick()}}>Delete <AutoStoriesIcon /></button> :
            <button className='btn addfavorite btn-sm col-2 mx-3 text-center' onClick={() => { addToReadingList(comic); handleClick() }}><AutoStoriesIcon /></button>}
          {ids.includes(parseInt(comicid))? <button className='btn btn-red btn-sm col-2 mx-3 text-center' onClick={() => {deleteFromFavorites(comic); handleClick() }}>Delete <FavoriteIcon /></button> :
            <button className='btn addfavorite btn-sm col-2 mx-3 text-center' onClick={() => { addToFavorites(comic); handleClick() }}><FavoriteIcon /></button>}
        </div>
        <div className='col-5'>
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
                {c.uid != user.uid? <></>:
                <button className='btn delete-comment btn-red btn-sm' onClick={() => { deleteComment(c) }}>Delete</button>}
              </div>
            </div>
            )}

        </div>
      </div>
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
