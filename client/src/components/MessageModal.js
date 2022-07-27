import React from 'react'
import './MessageModal.css'
import { useMovieSearchContext } from '../context/MovieSearchContext'

function MessageModal() {

    const { modal} = useMovieSearchContext()

  return (
    <div className='message-modal-container'>
    <div className='modal'>
        <p className='modal-message'>{modal}</p>
        <button className='modal-button'>X</button>
    </div>
    </div>
  )
}

export default MessageModal