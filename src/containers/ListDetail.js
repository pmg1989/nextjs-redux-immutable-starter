import React from 'react'

const ListDetail = () => {
  return (
    <div className="viewport">
      <div className="box">
        i am list detail
      </div>
      <div>Loading data from {process.env.BACKEND_URL}</div>
    </div>
  )
}

export default ListDetail
