import React, { useState, useEffect } from 'react'

export default function Test() {
    const [info, setInfo] = useState({})

    const handleSubmit = async (event) => {
        event.preventDefault();

        const userID = event.target.userID.value
        const name = event.target.name.value
        const email = event.target.email.value
        const profileIMG = event.target.profileIMG.value

        try {
            const response = await fetch('http://localhost:3001/api/Users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userID, name, email, profileIMG }),
            });
            const data = await response.json();
            console.log('User Created: ', data);
        } catch (error) {
            console.error(error)
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="User ID"
                    name='userID'
                />
                <input
                    type="text"
                    placeholder="Name"
                    name='name'
                />
                <input
                    type="email"
                    placeholder="Email"
                    name="email"
                />
                <input
                    type="text"
                    placeholder="Profile IMG"
                    name='profileIMG'
                />
                <button type="submit">Create User</button>
            </form>
        </div>
    )
}
