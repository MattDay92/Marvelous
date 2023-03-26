import React from 'react'
import {useNavigate } from 'react-router-dom'

export default function UpdateProfile({ handleClick, updateUser, profile, user, getFirstName }) {
    
    const navigate = useNavigate()


    return (
        <>
            <form onSubmit={updateUser}>
                <div className='container fullpage col-10 my-5'>
                    <div className='row my-3'>
                        <div className='col-12 col-md-6'>
                            <h1 className='my-3'>Name:  <input className='form-control' type='text' name='name' placeholder='Name' defaultValue={user.displayName} /></h1>
                            <h3 className='my-3'>Favorite Character:  <input className='form-control' type='text' name='favorite_char' placeholder='Favorite Character' defaultValue={profile.favoriteChar} /></h3>
                            <p className='my-3'>Bio: <input className='form-control' type='text' name='bio' placeholder='Bio' defaultValue={profile.bio} /></p>
                            <h4 className='my-3'>Email:  <input className='form-control' type='text' name='email' placeholder='Email' defaultValue={user.email} /></h4>
                        </div>
                        <div className='col-6 d-flex justify-content-center align-items-center'>
                            <img className='rounded-circle' alt={user.displayName} src={profile.photoURL} style={{ height: '50%' }} />
                        </div>
                        <div className='col-6'>
                            <h3>Profile Image URL:  <input className='form-control' type='text' name='profile_image' placeholder='Profile Image URL' defaultValue={user.photoURL} /></h3>
                        </div>
                    </div>
                    <div className='d-flex justify-content-center my-3'>
                        <button onClick={navigate('/profile')} className='btn btn-yellow' type='submit'>Update {(getFirstName(user))}'s Profile</button>
                    </div>
                </div>
            </form>
        </>
    )
}
