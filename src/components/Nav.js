import React from 'react'
import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';


export default function Nav() {
    return (
        <div>
            <nav class="navbar navbar-expand-lg bg-light">
                <div class="container-fluid">
                    <a class="navbar-brand" href="#">Marvelous</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul class="navbar-nav">
                            <li class="nav-item">
                                <a class="nav-link active" aria-current="page" href="#">Reading List</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">New Comics</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">My Profile</a>
                            </li>
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Search
                                </a>
                                <ul class="dropdown-menu">
                                    <li><Link class="dropdown-item" to={'/character'} >Characters</Link></li>
                                    <li><Link class="dropdown-item" to={'/comics'}>Comics</Link></li>
                                    <li><Link class="dropdown-item" to={'/events'}>Events</Link></li>
                                    <li><a class="dropdown-item" href="#">Creators</a></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    <Avatar alt="Remy Sharp" src="..." />
                </div>
            </nav>
        </div>
    )
}
