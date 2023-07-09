const popup = document.querySelector('.pop-up');
const screenblur = document.querySelector('.page-wrap');
const addButton = document.querySelector('#head-add');
const cardContainer = document.querySelector('.cards');
const cardTemplate = document.querySelector('.template > div');
const bookAddButton = document.querySelector('#book-add');
const inputs = [...document.querySelectorAll(".details input"), document.querySelector("input[type='checkbox']")];
const discard = document.getElementById("discard");
const sort = document.getElementById("head-sort");

const handler = {
    counter : 0,
    library : [],

    addBook(book){
        book.card.setAttribute('data-id', this.counter);
        this.counter++;
        this.library.push(book);
        cardContainer.appendChild(book.card);
    },
    
    removeBook(id){
        for (let i = 0; i < this.library.length; i++) {
            if( this.library[i].card.getAttribute('data-id') == id ){
                this.library[i].card.remove();
                this.library.splice(i,1);
                break;
            }
        }
    },
    
    readBook(id, _pages){
        for (let i = 0; i < this.library.length; i++) {
            if( this.library[i].card.getAttribute('data-id') == id ){
                this.library[i].readPages = _pages ?? this.library[i].tPages;
                break;
            }
        }
    },

    refreshAll(){
        cardContainer.replaceChildren();
        this.library.forEach(book => cardContainer.appendChild(book.card));
    },

    sortBooks(){
        if( !this.asc_sort ){
            this.library = this.library.sort((a,b) => a.name.localeCompare(b.name));
            this.refreshAll();
        }
    }
};

function hidePopUp(_clean){
    screenblur.classList.toggle('none');
    popup.classList.toggle('none');

    if(_clean){
        inputs[0].value = "";
        inputs[1].value = "";
        inputs[2].value = "";
        inputs[3].checked = false;
    }
}

sort.addEventListener('click', handler.sortBooks.bind(handler));

addButton.addEventListener('click', ()=>{
    screenblur.classList.toggle('none');
    popup.classList.toggle('none');
});

popup.addEventListener('click',(ev)=>{
    ev.stopImmediatePropagation();
});

screenblur.addEventListener('click', hidePopUp);

document.querySelector("form").addEventListener('submit', (event)=>{
    event.preventDefault();
    const [bookName, author, pages] = inputs.map(elem => elem.value);
    const read = inputs[3].checked;
    const book = constructBook(bookName, author, pages, read);
    handler.addBook(book);
    hidePopUp(true);

})

discard.addEventListener('click', hidePopUp.bind(this, [true]));


function Card(){
    // //Create element shells
    // const card = document.createElement('div');
    // const desc = document.createElement('div');
    // const h1 = document.createElement('h1');
    // const h2 = document.createElement('h2');
    // const pages = document.createElement('div');
    // const topbar = document.createElement('div');
    // const clearButton = document.createElement('button');
    // const readButton = document.createElement('button');

    // // Add styling classes
    // topbar.classList.add('top-bar')
    // pages.classList.add("pages");
    // card.classList.add('card');
    // desc.classList.add('desc');
    // readButton.classList.add('card-btn');
    // clearButton.classList.add('card-btn');

    // //Assemble the elements
    // topbar.appendChild(clearButton);
    // topbar.appendChild(readButton);
    // topbar.appendChild(pages);
    // desc.appendChild(h1);
    // desc.appendChild(h2);
    // card.appendChild(topbar);
    // card.appendChild(desc);

    const card = cardTemplate.cloneNode(true);
    const readButton = card.querySelector('#check');
    const clearButton = card.querySelector('#rem');
    const h1 = card.querySelector('h1');
    const h2 = card.querySelector('h2');
    const pages = card.querySelector('.pages');

    console.log(card, readButton);

    // readButton.appendChild((()=> {
    // const elem = document.createElement('img');
    // elem.setAttribute('src',"./icons/book-check.svg");
    // return elem;
    // })())

//     clearButton.appendChild(
//         (()=> {
//         const elem = document.createElement('img');
//         elem.setAttribute('src',"./icons/book-remove.svg");
//         return elem})()
// )

    clearButton.onclick = function() {
        const target = this.parentElement.parentElement;
        target.remove(); 
        handler.removeBook(target.getAttribute('data-id'))
    }

    readButton.onclick = function() {
        handler.readBook(this.parentElement.parentElement.getAttribute('data-id'))
    }

    return { 
        card,
        h1,
        h2,
        pages,
        tPages : 0,
        rPages : 0,
        set name(value){
            this.h1.textContent = value;
        },
        get name(){
            return this.h1.textContent;
        },
        set author(value){
            this.h2.textContent = value;
        },
        set readPages(value){
            this.rPages = value;
            this.pages.textContent = value + "/" + this.tPages;
        },

        set totalPages(value){
            this.tPages = value;
            this.pages.textContent = this.rPages + "/" + value;
        }
        
    }
}

function constructBook(name, author, totalPages, done){
    const elem = Card();
    elem.name = name;
    elem.author = author;
    elem.readPages = done ? totalPages:0;
    elem.totalPages = totalPages;
    return elem;
}

handler.addBook(constructBook("Twelve Rules for Life", "Jordan Peterson", 89, false));
handler.addBook(constructBook("Atomic Habits", "Joooooo", 89, false));
handler.addBook(constructBook("Meditations", "Joooooo", 89, false));
handler.addBook(constructBook("Yeahhhhhh", "Joooooo", 89, false));

handler.refreshAll();