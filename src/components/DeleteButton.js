import React from 'react'
import './DeleteButton.css'

const DeleteButton = ({click}) => {
  return (
    <div >
        <button className='delete' onClick={click}>Delete Selected</button>
    </div>
  )
}

export default DeleteButton