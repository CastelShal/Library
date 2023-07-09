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
    asc_sort : false,
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
                console.log();
                this.library[i].card.remove();
                this.library.splice(i);
                break;
            }
        }
    },
    
    readBook(id){
        const book = this.library.find(book => book.card.getAttribute('data-id') == id);
        if(!book) return;
        book.pages.textContent = book.totalPages + "/" + book.totalPages;
    },

    refreshAll(){
        cardContainer.replaceChildren();
        this.library.forEach(book => cardContainer.appendChild(book.card));
    },

    sortBooks(){
        if( !this.asc_sort ){
            this.library = this.library.sort((a,b) => a.h1.textContent.localeCompare(b.h1.textContent));
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
    this.card = document.createElement('div');
    this.desc = document.createElement('div');
    this.h1 = document.createElement('h1');
    this.h2 = document.createElement('h2');
    this.pages = document.createElement('div');
    this.topbar = document.createElement('div');
    this.clearButton = document.createElement('button');
    this.readButton = document.createElement('button');

    this.topbar.classList.add('top-bar')
    this.pages.classList.add("pages");
    this.card.classList.add('card');
    this.desc.classList.add('desc');
    this.readButton.classList.add('card-btn');
    this.readButton.appendChild((()=> {
        const elem = document.createElement('img');
        elem.setAttribute('src',"./icons/book-check.svg");
        return elem;}
        )()
)
    this.clearButton.classList.add('card-btn');
    this.clearButton.appendChild(
        (()=> {
        const elem = document.createElement('img');
        elem.setAttribute('src',"./icons/book-remove.svg");
        return elem})()
)

    this.clearButton.onclick = ev => {
        const id = this.card.getAttribute('data-id');
        handler.removeBook(id);   
    }

    this.readButton.onclick = ev => {
        const pages = this.pages.textContent.split("/")[1];
        this.pages.textContent = `${pages} / ${pages}`
    }

}

function constructBook(name, author, totalPages, done){
    const elem = new Card();
    elem.h1.textContent = name;
    elem.h2.textContent = author;
    elem.pages.textContent = (done ? totalPages:0) + " / " + totalPages;

    elem.topbar.appendChild(elem.clearButton);
    elem.topbar.appendChild(elem.readButton);
    elem.topbar.appendChild(elem.pages);
    elem.desc.appendChild(elem.h1);
    elem.desc.appendChild(elem.h2);
    elem.card.appendChild(elem.topbar);
    elem.card.appendChild(elem.desc);

    return elem;
}

handler.addBook(constructBook("Twelve Rules for Life", "Jordan Peterson", 89, false));
handler.addBook(constructBook("Atomic Habits", "Joooooo", 89, false));
handler.addBook(constructBook("Meditations", "Joooooo", 89, false));
handler.addBook(constructBook("Yeahhhhhh", "Joooooo", 89, false));
handler.refreshAll();