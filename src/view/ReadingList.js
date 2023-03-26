import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';


export default function ReadingList({handleClick, setMessage, user, getReadingList, getFirstName, list, setList }) {

    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL

    const img_url = (i) => {
        const url = i.image
        const x = url.split(':')
        return x[0] + 's:' + x[1] + '.jpg'
    }

    useEffect(() => {
        getReadingList()
    }, [])

    const deleteFromReadingList = async (c) => {
        const reqBody = {
          uid: user.uid,
          comic_id: c.comicId,
        }
    
        const url = `${BACKEND_URL}/api/deletefromreadinglist`
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
        setList(data.list)
    
        getReadingList()

        setMessage(data.message)
      }

    return (
        <>
            <div className='container fullpage col-10'>
                <div className='row text-center my-5'>
                    <h1>{getFirstName(user)}'s Reading List</h1>
                </div>
                {list.length === 0 ? <><p className='text-center'>You have not added any titles to your reading list.  </p></> :
                <div className='row my-5'>
                    {list.map(c => <div className='col-6 col-md-3 col-lg-2 text-center'>
                        <Link key={c.comicId} to={`/comics/${c.comicId}`}><img src={img_url(c)} alt={c.title} className='my-3 comic-img' style={{ width: '100%' }} /></Link>
                        {/* <h5>{c.title}</h5> */}
                        <div>
                            <button onClick={() => { deleteFromReadingList(c); handleClick() }} className='btn btn-red btn-sm my-1 mx-1 text-center'><AutoStoriesIcon /></button>
                        </div>
                    </div>)}
                </div>}
            </div>
        </>
    )
}
