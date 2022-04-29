let bookList = document.querySelector('.add__list');
let bookInput = document.querySelector('.add__app input');
let searchBook = document.querySelector ('.app__search input');




let books = checkLocalStorage() || [];

function checkLocalStorage(){
    let localBooks = JSON.parse(localStorage.getItem('books'));
    if(localBooks){
        return localBooks;
    }
    return false;
}

    function renderBooks(booksData){
        bookList.innerHTML ='';

        if(!booksData.length){
            bookList.innerHTML =`
            <li>
            <span class = 'text__red'>You don't have any books to show up...</span>
            </li>
            `;
            return;
        }
        
        for(let i=0;i<booksData.length;i++){
            bookList.innerHTML += `  <li class="app__book">
            <span>${booksData[i]}</span>
            <button class="delete"  onclick="deletedBook(${i})">delete</button>
           </li>
        `;
        }
    }
    
  renderBooks(books)



  function addBook(e){
    e.preventDefault();
     let bookTitle = bookInput.value;
     books.push(bookTitle);
    localStorage.setItem('books',JSON.stringify(books));
 
    renderBooks(books);
    bookInput.value = '';

}


function deletedBook(index){
  books.splice(index,1);
  localStorage.setItem('books',JSON.stringify(books));

   renderBooks(books);

}



function clearAll(){
    books.splice(0);
    localStorage.clear();
    renderBooks(books);

}

function preventSubmit(e){
    e.preventDefault();
}

function searchBooks(){
    let search=searchBook.value.toLowerCase();
    let matchedBooks= [];
     matchedBooks = books.filter((book)=>book.toLowerCase().includes(search))
     renderBooks(matchedBooks);
}
