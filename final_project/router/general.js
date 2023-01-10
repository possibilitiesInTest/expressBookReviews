const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
        const username = req.body.username;
        const password = req.body.password;
      
        if(username && password){
          if(!isValid(username)){
            users.push({
              "username": username,
              "password": password
            });
            return res.status(200).json({message: "User successfully registered. You can proceed to login"});
          }else{
            return res.status(404).json({message: "Username already exists!"});
          }
        }
        return res.status(404).json({message: "Unable to register user."});
});


// Get the book list available in the shop
public_users.get('/', async function (req, res) {
    let response = await JSON.stringify(books, null, 10);
    res.status(200).send(response);
})

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
 });
  
// Get book details based on author
public_users.get('/author/:author', async function (req, res) {
    const author = req.params.author;
    const booksArray = Object.entries(books);
    const authorsBooks = await booksArray.filter((book) => book[1].author === author);
    res.status(200).send(authorsBooks);
  });

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
        const title = req.params.title;
        for(var i = 0; i < Object.keys(books).length; i++){
            if(books[Objects.keys(books)[i]['title'] == title]){
                let newPromise = new Promise((resolve, reject) => {
                    setTimeout(() => {
                        resolve(books[Object.keys(books)[i]])
                    }, 6000 )
                    foundTitle.then((successMessage) => {
                        res.send("From callback" + successMessage)
                    })
                })} else {
                    
                let newPromise = newPromise((resolve, reject) => {
                    setTimeout(() => {
                        resolve("Title not found")
                    }, 6000 )})
                    res.send("From callback" + successMessage)
}}})

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    const bookReviews = books[isbn].reviews;
    res.status(200).json(bookReviews);
  });

module.exports.general = public_users;
