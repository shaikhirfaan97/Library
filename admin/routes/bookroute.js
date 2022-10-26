// requiring express for router setup initiation
const express = require("express");
const requireAuth = require('../middleware/requireAuth')

// 
const {getBooks, getABook, createBook, deleteBook, updateBook} = require('../controllers/bookController')


// invoking express function on router to craete instance of the router
const router = express.Router()

// require for user auth
router.use(requireAuth);

// attaching CRUD handlers on router below

// GET all books from the list
router.get('/', getBooks);

// GET single book using id
router.get('/:id', getABook);

// POST/add a single book to the list
router.post('/', createBook);

// DELETE a book from the list using id 
router.delete('/:id', deleteBook);


// UPDATE a book from the list using id
router.patch('/:id', updateBook)



// after router handler setup, it is exported as a module
module.exports = router;