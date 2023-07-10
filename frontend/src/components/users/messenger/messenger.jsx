import React from 'react'

function Messenger({ currentChat }) {
  return (
    <>
      <div className="col-md-6 gedf-main" style={{ marginBottom: "10px", marginTop: "1rem", borderRadius: "20px" }}>
        <div className="card gedf-card" style={{ backgroundColor: 'white', borderRadius: "20px", maxHeight: "87vh", overflow: "auto", minHeight:"87vh" }}>
          <h1>{currentChat?.chatName}</h1>
          
        </div>
      </div>
    </>
  )
}

export default Messenger
