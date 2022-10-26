import React from 'react'
import { useBookContext } from '../../hooks/useBookContext'
import '../bookdetails/Bookdetails.css'
import { useAuthContext } from "../../hooks/useAuthContext";


const BookDetails = ({book}) => {

  const {dispatch} = useBookContext()
  const {user} = useAuthContext();

  const handleDelete = async () =>{
    if(!user){
      return
    }
    const response = await fetch('/api/books/' + book._id, {
      method: 'DELETE',
      headers:{
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()
    if(response.ok){
      dispatch({type: 'DELETE_BOOK', payload: json})

    }
  }


  return (
    
    <div className='book-details'>
      <div >
        <p>Book Name :<strong>{book.bookTitle}</strong></p>
        <p>Author Name :{book.authorName}</p>
        <p>Issue Date :{book.issueDate}</p>
      </div>
      <div>
      <button onClick={handleDelete} className='return-btn'>RETURN</button>
    </div>
    </div>
  )
}

export default BookDetails
