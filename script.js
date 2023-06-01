const library = [new Book(15, "Oh its a new book", 600,true),
new Book(88, "Oh its a new book", 600,true),
new Book(32, "Oh its a new book", 600,true)];


function Book(uid, name, pages, read){
    [this.uid,this.name,this.pages,this.read] = arguments;
}

/**
 * @param {number} uid The UID of the book
 * @param {string} name Name of the book
 * @param {number} pages Pages of the book
 * @param {boolean} read Read/unread
 */
function addNewBook(uid, name, pages, read){
    const exists = library.find(book => book.uid == uid)
    if(exists){
        return false;
    }
    else{
        library.push(new Book(...arguments));
        return true;
    }
}