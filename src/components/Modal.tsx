import React from 'react'
import './Modal.css'

function Modal({ closeModal, postInfo, postBody }: any) {

  return (
    <>
      <div className="modalBackground">
        <div className="modalContainer">
          <div className="titleCloseBtn">
            <button onClick={() => closeModal(false)}>x</button>
          </div>
          <div className="title">
            <h2>Details for post number: {postInfo}</h2>
          </div>
          <div className="body">
            <p> {postBody}</p>
          </div>
          <div className="footer">
            <button onClick={() => closeModal(false)} id="closeBtn">Close</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Modal