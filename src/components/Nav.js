import React from 'react'
import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Paper from '@mui/material/Paper';



export default function Nav({handleClick, getFirstName, message, getProfileInfo, createPopUp, logMeOut, user }) {

    return (
        <Paper elevation={10}>
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid">
                    <Link className="navbar-brand" to={'/'}>Marvelous</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link" to={'/thisweek'}>New Comics</Link>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Search
                                </a>
                                <ul className="dropdown-menu py-0">
                                    <li><Link className="dropdown-item" to={'/character'} >Characters</Link></li>
                                    <li><Link className="dropdown-item" to={'/comics'}>Comics</Link></li>
                                    <li><Link className="dropdown-item" to={'/events'}>Events</Link></li>
                                    <li><Link className="dropdown-item" to={'/creators'}>Creators</Link></li>
                                </ul>
                            </li>
                            {user.uid ? <>
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to={'/readinglist'}>Reading List</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to={'/profile'}>{(getFirstName(user))}'s Profile</Link>
                                </li>
                                <li className='nav-item'>
                                    <Link className='nav-link' to={'/'} onClick={() => {logMeOut()}}>Logout</Link>
                                </li>
                            </> :
                                <li className="nav-item">
                                    <Link className="nav-link" onClick={() => {createPopUp()}}>Login</Link>
                                </li>}
                        </ul>
                    </div>
                    {user.uid ?
                        <Avatar alt={user.displayName} src={user.photoURL} /> : <></>
                    }
                </div>
            </nav>
        </Paper>
    )
}
