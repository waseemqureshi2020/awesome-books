const booksListSection = document.querySelector('.books-list');
const inputTitle = document.querySelector('.input-title');
const inputAuthor = document.querySelector('.input-author');
const addBookButton = document.querySelector('.add-book-button');
const date = document.querySelector('.date');
const bookList = document.querySelector('.list');
const addNewBook = document.querySelector('.add-new');
const contact = document.querySelector('.contact');
const noBooks = document.getElementById('no-books');
const pageTitle = document.querySelector('.title');
const addBookSection = document.getElementById('add-book-section');
const contactSection = document.getElementById('contact-section');
const listBooksSection = document.getElementById('list-books-section');

bookList.onclick = (() => {
  listBooksSection.classList.remove('display-none');
  listBooksSection.classList.add('books');
  contactSection.classList.remove('contact-section');
  contactSection.classList.add('display-none');
  addBookSection.classList.remove('add-book');
  addBookSection.classList.add('display-none');
  pageTitle.innerText = 'All awesome books';
});

noBooks.onclick = (() => {
  addNewBook.click();
  return true;
});

// addNewBook.onclick = (() => {
//   listBooksSection.classList.remove('books');
//   listBooksSection.classList.add('display-none');
//   contactSection.classList.remove('contact-section');
//   contactSection.classList.add('display-none');
//   addBookSection.classList.remove('display-none');
//   addBookSection.classList.add('add-book');
//   pageTitle.innerText = 'Add a new book';
// });

contact.onclick = (() => {
  listBooksSection.classList.remove('books');
  listBooksSection.classList.add('display-none');
  contactSection.classList.remove('display-none');
  contactSection.classList.add('contact-section');
  addBookSection.classList.remove('add-book');
  addBookSection.classList.add('display-none');
  pageTitle.innerText = 'Contact information';
});

// eslint-disable-next-line no-unused-vars
function displayCounterTime() {
  const x = new Date();
  date.innerHTML = x;
  // eslint-disable-next-line no-use-before-define
  displayCounter();
}
function displayCounter() {
  const refresh = 1000;
  // eslint-disable-next-line no-implied-eval
  setTimeout('displayCounterTime()', refresh);
}

let books = Array.from(JSON.parse(localStorage.getItem('books') || '[]'));

let booksList = '';

function createBooksList(books) {
  if (books) {
    books.forEach((book, index) => {
      booksList += `
        <li class="book">
          <div class="title-and-author">
            <p class="book-title">"${book.title}"</p>
            by
            <p class="book-author">${book.author}</p>
          </div>
          <button class="remove-book-button" onclick="removeBookButton(${index})">Remove</button>
        </li>
      `;
    });
  }

  booksListSection.innerHTML = booksList;
}

createBooksList(books);
let bookIndex;

class Book {
  constructor(title, author, index) {
    this.title = title;
    this.author = author;
    this.index = index;
  }

  removeBook() {
    this.index = bookIndex;
    books.splice(this.index, 1);
    booksList = '';
    localStorage.setItem('books', JSON.stringify(books));
    books = Array.from(JSON.parse(localStorage.getItem('books') || '[]'));
    createBooksList(books);
  }

  addBook() {
    if (books.length) {
      bookIndex = (books.length - 1);
    }
    this.author = inputAuthor.value;
    this.title = inputTitle.value;
    this.index = bookIndex;
    booksList = '';
    localStorage.setItem('books', JSON.stringify(books));
    books = Array.from(JSON.parse(localStorage.getItem('books') || '[]'));
    createBooksList(books);
    inputAuthor.value = '';
    inputTitle.value = '';
  }
}

if (books.length) {
  bookIndex = (books.length - 1);
}

function checkForBooks() {
  if (books.length === 0) {
    noBooks.classList.add('display');
    noBooks.classList.remove('display-none');
  } else {
    noBooks.classList.add('display-none');
    noBooks.classList.remove('display');
  }
}

let newBook;
function createNewBook() {
  if (inputAuthor.value && inputTitle.value) {
    newBook = new Book(inputTitle.value, inputAuthor.value, bookIndex);
  }
}

addBookButton.onclick = (() => {
  createNewBook();
  if (newBook) {
    books.push(newBook);
    newBook.addBook();
  }
  window.location.reload();
  checkForBooks();
});

// eslint-disable-next-line no-unused-vars
function removeBookButton(index) {
  if (index) {
    bookIndex = index;
  }

  newBook = new Book('', '', index);
  newBook.removeBook();
  window.location.reload();
  checkForBooks();
}

checkForBooks();