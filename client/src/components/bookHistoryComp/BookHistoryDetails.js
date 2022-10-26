import React from 'react'
import '../bookHistoryComp/BookHistoryDetails.css'

const BookHistoryDetails = ({book}) => {

  return (
    <div>
    
       <div className='book-log'>
        <p><strong>{book.bookTitle}</strong></p>
        <p>{book.authorName}</p>
        <p>{book.issueDate}</p>
      </div>
    </div>
  )
}

export default BookHistoryDetails
