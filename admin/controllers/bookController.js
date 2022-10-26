// BOOK Controllers

const Bookmodel = require("../models/bookModel");
const mongoose = require("mongoose");


// GET all books
const getBooks = async (req, res) => {
  const user_id = req.user._id
  const allBooks = await Bookmodel.find({user_id}).sort({ createdAt: -1});
  res.status(200).json(allBooks);
};



// GET single book
const getABook = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such book found!" });
  }
  const singleBook = await Bookmodel.findById(id);

  if (!singleBook) {
    return res.status(404).json({ error: "Book not available." });
  }

  res.status(200).json(singleBook);
};



// POST & CREATE a book
const createBook = async (req, res) => {
  // add data to database
  const {bookTitle, authorName, issueDate} = req.body;
  let emptyField = [];

  if(!bookTitle){
    emptyField.push('bookTitle')
  }

  if(!authorName){
    emptyField.push('authorName')
  }

  if(!issueDate){
    emptyField.push('issueDate')
  }

  if(emptyField.length > 0){
    return res.status(400).json({error: 'All fields required.', emptyField})
  }

  try {
  const user_id = req.user._id;
    // const newBook = await Bookmodel.create(req.body);
    const newBook = await Bookmodel.create({bookTitle, authorName, issueDate, user_id});
    res.status(200).json(newBook);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// DELETE a book
const deleteBook = async (req, res) => {
  const { id } = req.params;
 
  // checks whether id is valid or not
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such book found!" });
  }
  const deleteOneBook = await Bookmodel.findOneAndDelete({_id: id});
  if (!deleteOneBook) {
    return res.status(404).json({ error: "Book not available." });
  }

  res.status(200).json(deleteOneBook);
};

// UPDATE a book
const updateBook = async (req, res) => {
  const { id } = req.params;

  // checks whether id is valid or not
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such book found!" });
  }

  const updateOneBook = await Bookmodel.findOneAndUpdate({_id: id}, {
    ...req.body
  });

  if (!updateOneBook) {
    return res.status(404).json({ error: "Book not available." });
  }

  res.status(200).json(updateOneBook);
};



module.exports = {
  getBooks,
  getABook,
  createBook,
  deleteBook,
  updateBook

};
