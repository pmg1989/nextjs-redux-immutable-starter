import React from 'react'
import styles from './List.less'

const List = () => {
  return (
    <div className="viewport">
      <div className={styles.box}>
        <span className={styles.title}>i am demo list</span>
        <span>i am demo list</span>
        <div>Loading data from {process.env.BACKEND_URL}</div>
      </div>
    </div>
  )
}

export default List
