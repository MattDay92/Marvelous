import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';


export default function ReadingList({ handleClick, setMessage, user, getReadingList, getFirstName, list, setList }) {

    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL

    const img_url = (i) => {
        // To change URL to https - Won't display without
        const url = i.comicIMG
        const x = url.split(':')
        return x[0] + 's:' + x[1] + '.jpg'
    }

    useEffect(() => {
        getReadingList()
    }, [])

    const deleteFromReadingList = async (c) => {
        // Updated to Node
        const reqBody = {
            userId: user.uid,
            comicID: c.comicID
        }

        const url = `${BACKEND_URL}/api/ReadingLists/delete`
        const options = {
            method: "POST",
            body: JSON.stringify(reqBody),
            headers: {
                "Content-Type": 'application/json'
            }
        }


        const res = await fetch(url, options);
        const data = await res.json();

        setMessage(data.message)

        getReadingList()
    }

    return (
        <>
            <div className='container fullpage col-10'>
                <div className='row text-center my-5'>
                    <h1>{getFirstName(user)}'s Reading List</h1>
                </div>
                {list.length === 0 ? <><p className='text-center'>You have not added any titles to your reading list.  </p></> :
                    <div className='row my-5 comicload'>
                        {list.map(c => <div className='col-6 col-md-3 col-lg-2 text-center'>
                            <Link key={c.comicId} to={`/comics/${c.comicID}`}><img src={img_url(c)} alt={c.title} className='my-3 comic-img' style={{ width: '100%' }} /></Link>
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
