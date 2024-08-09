const express = require("express");
const { books } = require("../data/books.json");
const { users } = require("../data/users.json");

const router = express.Router();

//Get All Books
router.get("/",(req,res)=>{
  res.status(200).json({
    success: true,
    message: "The All books are..",
    data: books,
  });
});

// Get Books by Id
router.get("/:id",(req,res)=>{
  const { id } = req.params;

  const book = books.find((each) => each.id === id);
    
  if (!book)
    return res.status(404).json({
  success: false,
  message: "Book not Found..!",
});
  return res.status(200).json({
    success: true,
    message: "The book is...",
    data: book
  });
});

// Get Issued books by User
router.get("/issued/byUser",(req,res)=>{
  const usersWithIssuedBook =users.filter((each)=>{
    if (each.issuedBook) return each;
  });
  const issuedBooks = [];
  
    usersWithIssuedBook.forEach((each) =>{
      const book = books.find((book) => book.id === each.issuedBook );

      book.issuedBy = each.name;
      book.issuedDate = each.issuedDate;
      book.returnDate = each.returnDate;

      issuedBooks.push(book);

    });
    if (issuedBooks.length === 0)
      return res.status(404).json({
    success: false,
    message : "No issued books now..!",
    
  });
  return res.status(200).json({
    success: true,
    message: "Issued book found..",
    data: issuedBooks,
  });
}) ;

module.exports = router;
