
const Library = [];


function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}


Book.prototype.toggleReadStatus = function () {
  this.read = !this.read;
};


function displayBooks() {
  const libraryContainer = document.getElementById('library-container');
  libraryContainer.innerHTML = ''; 

  Library.forEach((book, index) => {
    const bookCard = document.createElement('div');
    bookCard.className = 'book-card';
    bookCard.innerHTML = `
      <h3>${book.title}</h3>
      <p>Author: ${book.author}</p>
      <p>Pages: ${book.pages}</p>
      <p>Read: ${book.read ? 'Yes' : 'No'}</p>
      <button data-index="${index}" class="toggle-read">Toggle Read</button>
      <button data-index="${index}" class="remove-book">Remove</button>
    `;

    libraryContainer.appendChild(bookCard);
  });

 
  document.querySelectorAll('.toggle-read').forEach((button) => {
    button.addEventListener('click', toggleReadStatus);
  });

  document.querySelectorAll('.remove-book').forEach((button) => {
    button.addEventListener('click', removeBook);
  });
}


function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  Library.push(newBook);
  displayBooks();
}


function removeBook(event) {
  const index = event.target.dataset.index;
  Library.splice(index, 1);
  displayBooks();
}


function toggleReadStatus(event) {
  const index = event.target.dataset.index;
  Library[index].toggleReadStatus();
  displayBooks();
}


const newBookButton = document.getElementById('new-book-button');
const addBookForm = document.getElementById('add-book-form');

newBookButton.addEventListener('click', () => {
  addBookForm.style.display =
    addBookForm.style.display === 'none' ? 'block' : 'none';
});

addBookForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = parseInt(document.getElementById('pages').value, 10);
  const read = document.getElementById('read').checked;

  addBookToLibrary(title, author, pages, read);
  addBookForm.reset();
  addBookForm.style.display = 'none';
});

// sample books for testing
addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 295, true);
addBookToLibrary('1984', 'George Orwell', 328, false);
displayBooks();