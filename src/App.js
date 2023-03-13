import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Nav from './components/Nav'
import Character from './view/Character'
import Search_Comics from './view/Search_Comics'
import Events from './view/Events'
import Home from './view/Home'
import This_Week from './view/This_Week'
import Creators from './view/Creators'
import SingleComic from './view/SingleComic'
import SingleEvent from './view/SingleEvent'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import MyProfile from './view/MyProfile'
import UpdateProfile from './view/UpdateProfile'
import ReadingList from './view/ReadingList'
import Footer from './components/Footer'
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';


export default function () {
  const getUserFromLS = () => {
    const foundUser = localStorage.getItem('user_marvelous');
    if (foundUser) {
      return JSON.parse(foundUser)
    }
    return {}
  }

  const getProfileFromLS = () => {
    const foundProfile = localStorage.getItem('profile_marvelous');
    if (foundProfile) {
      return JSON.parse(foundProfile)
    }
    return {}
  }

  const getCharsFromLS = () => {
    const foundChars = localStorage.getItem('chars_marvelous');
    if (foundChars) {
      return JSON.parse(foundChars)
    }
    return []
  }

  const [user, setUser] = useState(getUserFromLS())
  const [profile, setProfile] = useState(getProfileFromLS())
  const [allChars, setAllChars] = useState(getCharsFromLS())
  const [favorites, setFavorites] = useState([])
  const [ids, setIds] = useState([])
  const [list, setList] = useState([])
  const [listids, setListIds] = useState([])
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('')

  const MARVEL_API_KEY = process.env.REACT_APP_MARVEL_API_KEY
  const MARVEL_HASH = process.env.REACT_APP_MARVEL_HASH

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
    setMessage('')
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  const getAllCharacters = async () => {
    const hash = MARVEL_HASH
    const PublicKey = MARVEL_API_KEY
    const url = `http://gateway.marvel.com/v1/public/characters?limit=100&ts=1&apikey=${PublicKey}&hash=${hash}`


    const res = await fetch(url)
    const data = await res.json()
    const chars1 = data.data.results

    const url2 = `http://gateway.marvel.com/v1/public/characters?limit=100&offset=100&ts=1&apikey=${PublicKey}&hash=${hash}`

    const res2 = await fetch(url2)
    const data2 = await res2.json()
    const chars2 = data2.data.results


    const url3 = `http://gateway.marvel.com/v1/public/characters?limit=100&offset=200&ts=1&apikey=${PublicKey}&hash=${hash}`

    const res3 = await fetch(url3)
    const data3 = await res3.json()
    const chars3 = data3.data.results

    const url4 = `http://gateway.marvel.com/v1/public/characters?limit=100&offset=300&ts=1&apikey=${PublicKey}&hash=${hash}`

    const res4 = await fetch(url4)
    const data4 = await res4.json()
    const chars4 = data4.data.results

    const url5 = `http://gateway.marvel.com/v1/public/characters?limit=100&offset=400&ts=1&apikey=${PublicKey}&hash=${hash}`

    const res5 = await fetch(url5)
    const data5 = await res5.json()
    const chars5 = data5.data.results

    const url6 = `http://gateway.marvel.com/v1/public/characters?limit=100&offset=500&ts=1&apikey=${PublicKey}&hash=${hash}`

    const res6 = await fetch(url6)
    const data6 = await res6.json()
    const chars6 = data6.data.results

    const url7 = `http://gateway.marvel.com/v1/public/characters?limit=100&offset=600&ts=1&apikey=${PublicKey}&hash=${hash}`

    const res7 = await fetch(url7)
    const data7 = await res7.json()
    const chars7 = data7.data.results

    const url8 = `http://gateway.marvel.com/v1/public/characters?limit=100&offset=700&ts=1&apikey=${PublicKey}&hash=${hash}`

    const res8 = await fetch(url8)
    const data8 = await res8.json()
    const chars8 = data8.data.results

    const url9 = `http://gateway.marvel.com/v1/public/characters?limit=100&offset=800&ts=1&apikey=${PublicKey}&hash=${hash}`

    const res9 = await fetch(url9)
    const data9 = await res9.json()
    const chars9 = data9.data.results

    const url10 = `http://gateway.marvel.com/v1/public/characters?limit=100&offset=900&ts=1&apikey=${PublicKey}&hash=${hash}`

    const res10 = await fetch(url10)
    const data10 = await res10.json()
    const chars10 = data10.data.results

    const url11 = `http://gateway.marvel.com/v1/public/characters?limit=100&offset=1000&ts=1&apikey=${PublicKey}&hash=${hash}`

    const res11 = await fetch(url11)
    const data11 = await res11.json()
    const chars11 = data11.data.results

    const url12 = `http://gateway.marvel.com/v1/public/characters?limit=100&offset=1100&ts=1&apikey=${PublicKey}&hash=${hash}`

    const res12 = await fetch(url12)
    const data12 = await res12.json()
    const chars12 = data12.data.results

    const url13 = `http://gateway.marvel.com/v1/public/characters?limit=100&offset=1200&ts=1&apikey=${PublicKey}&hash=${hash}`

    const res13 = await fetch(url13)
    const data13 = await res13.json()
    const chars13 = data13.data.results

    const url14 = `http://gateway.marvel.com/v1/public/characters?limit=100&offset=1300&ts=1&apikey=${PublicKey}&hash=${hash}`

    const res14 = await fetch(url14)
    const data14 = await res14.json()
    const chars14 = data14.data.results

    const url15 = `http://gateway.marvel.com/v1/public/characters?limit=100&offset=1400&ts=1&apikey=${PublicKey}&hash=${hash}`

    const res15 = await fetch(url15)
    const data15 = await res15.json()
    const chars15 = data15.data.results

    const url16 = `http://gateway.marvel.com/v1/public/characters?limit=100&offset=1500&ts=1&apikey=${PublicKey}&hash=${hash}`

    const res16 = await fetch(url16)
    const data16 = await res16.json()
    const chars16 = data16.data.results

    let chars = chars1.concat(chars2, chars3, chars4, chars5, chars6, chars7, chars8, chars9, chars10, chars11, chars12, chars13, chars14, chars15, chars16)

    let names = []
    let i
    for (i = 0; i < chars.length; i++) {
      names.push(chars[i].name)
    }

    localStorage.setItem('chars_marvelous', JSON.stringify(names))
    setAllChars(names)
  }

  // const getAllComics = async () => {
  //   const hash = '93ff149b2c28d22cb9adf5cdafa2a845'
  //   const PublicKey = 'efad1a5f2b651e2a8b909ed94669c244'
  //   const url = `http://gateway.marvel.com/v1/public/series?limit=100&ts=1&apikey=${PublicKey}&hash=${hash}`


  //   const res = await fetch(url)
  //   const data = await res.json()
  //   const comics1 = data.data.results

  //   const url2 = `http://gateway.marvel.com/v1/public/series?limit=100&offset=100&ts=1&apikey=${PublicKey}&hash=${hash}`

  //   const res2 = await fetch(url2)
  //   const data2 = await res2.json()
  //   const comics2 = data2.data.results


  //   const url3 = `http://gateway.marvel.com/v1/public/series?limit=100&offset=200&ts=1&apikey=${PublicKey}&hash=${hash}`

  //   const res3 = await fetch(url3)
  //   const data3 = await res3.json()
  //   const comics3 = data3.data.results

  //   const url4 = `http://gateway.marvel.com/v1/public/series?limit=100&offset=300&ts=1&apikey=${PublicKey}&hash=${hash}`

  //   const res4 = await fetch(url4)
  //   const data4 = await res4.json()
  //   const comics4 = data4.data.results

  //   const url5 = `http://gateway.marvel.com/v1/public/series?limit=100&offset=400&ts=1&apikey=${PublicKey}&hash=${hash}`

  //   const res5 = await fetch(url5)
  //   const data5 = await res5.json()
  //   const comics5 = data5.data.results

  //   const url6 = `http://gateway.marvel.com/v1/public/series?limit=100&offset=500&ts=1&apikey=${PublicKey}&hash=${hash}`

  //   const res6 = await fetch(url6)
  //   const data6 = await res6.json()
  //   const comics6 = data6.data.results

  //   const url7 = `http://gateway.marvel.com/v1/public/series?limit=100&offset=600&ts=1&apikey=${PublicKey}&hash=${hash}`

  //   const res7 = await fetch(url7)
  //   const data7 = await res7.json()
  //   const comics7 = data7.data.results

  //   const url8 = `http://gateway.marvel.com/v1/public/series?limit=100&offset=700&ts=1&apikey=${PublicKey}&hash=${hash}`

  //   const res8 = await fetch(url8)
  //   const data8 = await res8.json()
  //   const comics8 = data8.data.results

  //   const url9 = `http://gateway.marvel.com/v1/public/series?limit=100&offset=800&ts=1&apikey=${PublicKey}&hash=${hash}`

  //   const res9 = await fetch(url9)
  //   const data9 = await res9.json()
  //   const comics9 = data9.data.results

  //   const url10 = `http://gateway.marvel.com/v1/public/series?limit=100&offset=900&ts=1&apikey=${PublicKey}&hash=${hash}`

  //   const res10 = await fetch(url10)
  //   const data10 = await res10.json()
  //   const comics10 = data10.data.results

  //   const url11 = `http://gateway.marvel.com/v1/public/series?limit=100&offset=1000&ts=1&apikey=${PublicKey}&hash=${hash}`

  //   const res11 = await fetch(url11)
  //   const data11 = await res11.json()
  //   const comics11 = data11.data.results

  //   const url12 = `http://gateway.marvel.com/v1/public/series?limit=100&offset=1100&ts=1&apikey=${PublicKey}&hash=${hash}`

  //   const res12 = await fetch(url12)
  //   const data12 = await res12.json()
  //   const comics12 = data12.data.results

  //   const url13 = `http://gateway.marvel.com/v1/public/series?limit=100&offset=1200&ts=1&apikey=${PublicKey}&hash=${hash}`

  //   const res13 = await fetch(url13)
  //   const data13 = await res13.json()
  //   const comics13 = data13.data.results

  //   const url14 = `http://gateway.marvel.com/v1/public/series?limit=100&offset=1300&ts=1&apikey=${PublicKey}&hash=${hash}`

  //   const res14 = await fetch(url14)
  //   const data14 = await res14.json()
  //   const comics14 = data14.data.results

  //   const url15 = `http://gateway.marvel.com/v1/public/series?limit=100&offset=1400&ts=1&apikey=${PublicKey}&hash=${hash}`

  //   const res15 = await fetch(url15)
  //   const data15 = await res15.json()
  //   const comics15 = data15.data.results

  //   const url16 = `http://gateway.marvel.com/v1/public/series?limit=100&offset=1500&ts=1&apikey=${PublicKey}&hash=${hash}`

  //   const res16 = await fetch(url16)
  //   const data16 = await res16.json()
  //   const comics16 = data16.data.resomics

  //   let comics = comics1.concat(comics2, comics3, comics4, comics5, comics6, comics7, comics8, comics9, comics10, comics11, comics12, comics13, comics14, comics15, comics16)
  //   let names = []
  //   let i
  //   for (i=0;i<comics.length;i++){
  //     if (comics[i].title != null){
  //     names.push(comics[i].title)
  //     }
  //   }
  //   console.log(names.length)
  //   console.log(names)

  // }

  const createPopUp = async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);

    const user = result.user;
    console.log(user)
    setUser(user)

    setMessage('Successfully logged in to Marvelous!')

    localStorage.setItem('user_marvelous', JSON.stringify(user))

  }

  const logMeOut = () => {
    setUser({})
    setProfile({})
    setAllChars([])
    setFavorites([])
    setIds([])
    setList([])
    setListIds([])
    setMessage('Successfully logged out of Marvelous!')
    localStorage.removeItem('user_marvelous')
    localStorage.removeItem('profile_marvelous')
    localStorage.removeItem('chars_marvelous')


  }

  const getFirstName = (u) => {
    const name = u.displayName.split(' ')
    return name[0]
  }

  const createUser = async () => {

    const reqBody = {
      user_id: user.uid,
      name: user.displayName,
      email: user.email,
      profile_image: user.photoURL,
      bio: 'None',
      favorite_char: 'None'
    }

    const url = `http://127.0.0.1:5000/api/createuser`
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

    getProfileInfo(data.user)
    localStorage.setItem('profile_marvelous', JSON.stringify(data.user))
  };

  const updateUser = async (event) => {
    event.preventDefault()
    const displayName = event.target.name.value;
    const email = event.target.email.value;
    const profile_image = event.target.profile_image.value;
    const bio = event.target.bio.value;
    const favorite_char = event.target.favorite_char.value;


    const reqBody = {
      user_id: user.uid,
      name: displayName,
      email: email,
      profile_image: profile_image,
      bio: bio,
      favorite_char: favorite_char
    }

    const url = `http://127.0.0.1:5000/api/createuser`
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

    setProfile(data.user)
    setMessage(data.message)
    localStorage.setItem('profile_marvelous', JSON.stringify(data.user))
  };

  const getProfileInfo = async (user) => {
    const url = `http://127.0.0.1:5000/api/senduser`
    const options = {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": 'application/json'
      }
    }

    console.log(url, options)

    const res = await fetch(url, options);
    const data = await res.json();
    console.log(data)

    setProfile(data.user)
    localStorage.setItem('profile_marvelous', JSON.stringify(data.user))
  }

  useEffect(() => {
    getProfileInfo(user)
  }, [user])

  useEffect(() => {
    createUser()
    
  }, [user])

  useEffect(() => {
    getAllCharacters()
  }, [user])

  useEffect(() => {
    getFavorites()
    getReadingList()
  }, [user])

  useEffect(() => {
    favoriteIds()
  }, [favorites])

  useEffect(() => {
    listIds()
  }, [list])

  const addToFavorites = async (c) => {

    const reqBody = {
      user_id: user.uid,
      comic_id: c.id,
      comic_img: c.thumbnail.path,
      comic_title: c.title
    }

    const url = `http://127.0.0.1:5000/api/addtofavorites`
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

    setMessage(data.message)

    getFavorites()
  }

  const getFavorites = async () => {
    const reqBody = {
      uid: user.uid
    }

    const url = `http://127.0.0.1:5000/api/getfavorites`
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

  const getReadingList = async () => {
    const reqBody = {
      uid: user.uid
    }

    const url = `http://127.0.0.1:5000/api/getreadinglist`
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
    setList(data.list)
  };

  const addToReadingList = async (c) => {

    const reqBody = {
      user_id: user.uid,
      comic_id: c.id,
      comic_img: c.thumbnail.path,
      comic_title: c.title
    }

    const url = `http://127.0.0.1:5000/api/addtoreadinglist`
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

    setMessage(data.message)

    getReadingList()
  }

  const deleteFromReadingList = async (c) => {
    const reqBody = {
      uid: user.uid,
      comic_id: c.comicId,
      comic_id: c.id
    }

    const url = `http://127.0.0.1:5000/api/deletefromreadinglist`
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
    setList(data.list)

    setMessage(data.message)

    listids = listids.splice(listids.indexOf(c.comicId), 1)

    getReadingList()
  }


  const deleteFromFavorites = async (c) => {
    console.log(c)
    const reqBody = {
      uid: user.uid,
      comic_id: c.comicId,
      comic_id: c.id
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

    setMessage(data.message)
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

  const listIds = () => {
    let i
    let ids = []
    if (list.length > 0) {
      for (i = 0; i < list.length; i++) {
        ids.push(list[i].comicId)
      }
      console.log(ids)
      setListIds(ids)
    }
  }


  return (
    <div>
      <BrowserRouter>
        <Nav createPopUp={createPopUp} handleClick={handleClick} getProfileInfo={getProfileInfo} user={user} logMeOut={logMeOut} getFirstName={getFirstName} />
        <Routes>
          <Route path='/' element={<Home handleClick={handleClick} message={message} handleClose={handleClose} action={action} open={open} />} />
          <Route path='/character' element={<Character allChars={allChars} />} />
          <Route path='/comics' element={<Search_Comics />} />
          <Route path='/events' element={<Events />} />
          <Route path='/thisweek' element={<This_Week />} />
          <Route path='/creators' element={<Creators />} />
          <Route path='/comics/:comicid' element={<SingleComic handleClick={handleClick} message={message} handleClose={handleClose} action={action} open={open} addToReadingList={addToReadingList} getReadingList={getReadingList} deleteFromReadingList={deleteFromReadingList} listids={listids} favorites={favorites} favoriteIds={favoriteIds} deleteFromFavorites={deleteFromFavorites} ids={ids} addToFavorites={addToFavorites} user={user} />} />
          <Route path='/events/:eventid' element={<SingleEvent addToFavorites={addToFavorites} />} />
          <Route path='/profile' element={<MyProfile favorites={favorites} setFavorites={setFavorites} getFavorites={getFavorites} profile={profile} user={user} getFirstName={getFirstName} />} />
          <Route path='/profile/update' element={<UpdateProfile handleClick={handleClick} updateUser={updateUser} profile={profile} user={user} getFirstName={getFirstName} />} />
          <Route path='/readinglist' element={<ReadingList setMessage={setMessage} handleClick={handleClick} getReadingList={getReadingList} list={list} deleteFromReadingList={deleteFromReadingList} setList={setList} deleteFromFavorites={deleteFromFavorites} ids={ids} addToFavorites={addToFavorites} getFirstName={getFirstName} user={user} />} />
        </Routes>
        <Snackbar
          open={open}
          autoHideDuration={3000}
          onClose={handleClose}
          message={message}
          action={action}
        />
        <Footer />
      </BrowserRouter>
    </div>
  )
}

