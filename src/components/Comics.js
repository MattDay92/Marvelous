import React from 'react'

export default function Comics({img_url, test}) {
  return (
    <div>
        <img className='my-3' src={img_url()} style={{width: '100%'}}/>
        <h3>{test.title}</h3>
    </div>
  )
}
