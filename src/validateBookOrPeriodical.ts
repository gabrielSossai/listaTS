import Book from './entities/Book.js'
import Periodical from './entities/Periodical.js'
import { showPeople } from './validatePerson.js'
import Person from './entities/Person.js'

const title = document.querySelector<HTMLInputElement>('#title')!
const subtitle = document.querySelector<HTMLInputElement>('#subtitle')!
const publishedAt = document.querySelector<HTMLInputElement>('#publishedAt')!
const author = document.querySelector<HTMLSelectElement>('#author')!
const isbn = document.querySelector<HTMLInputElement>('#isbn')!
const edicao = document.querySelector<HTMLInputElement>('#edition')!
const volume = document.querySelector<HTMLInputElement>('#volume')!
const issn = document.querySelector<HTMLInputElement>('#issn')!
const issue = document.querySelector<HTMLInputElement>('#issue')!
const message = document.querySelector<HTMLParagraphElement>('#message')!
const formulario = document.querySelector<HTMLFormElement>('form')!
const selectType = document.querySelector<HTMLSelectElement>('#type')!
const authorName = document.querySelector<HTMLSelectElement>('#authorName')!
const table = document.querySelector<HTMLTableCaptionElement>('#table')!
const tableBooks = document.querySelector<HTMLTableCaptionElement>('#tableBooks')!

const Periodicals: Periodical[] = []
showPeriodicals()

const Books: Book[] = []
showBooks()

selectType.addEventListener('change', (ev: Event) => {
    ev.preventDefault()

    if (selectType.value == "l") {
        title.style.display = "block";
        subtitle.style.display = "block";
        publishedAt.style.display = "block";
        author.style.display = "block";
        isbn.style.display = "block";
        edicao.style.display = "block";
        volume.style.display = "block";
        issue.style.display = "none";
        issn.style.display = "none";
        pullNames()



    } else if (selectType.value == "p") {
        title.style.display = "block";
        subtitle.style.display = "block";
        publishedAt.style.display = "block";
        author.style.display = "block";
        issue.style.display = "block";
        issn.style.display = '';
        volume.style.display = "block";
        isbn.style.display = "none";
        edicao.style.display = "none";
        pullNames()

    } else {

        title.style.display = "none";
        subtitle.style.display = "none";
        publishedAt.style.display = "none";
        author.style.display = "none";
        issue.style.display = "none";
        issn.style.display = "none";
        volume.style.display = "none";
        isbn.style.display = "none";
        edicao.style.display = "none";
    }
})

let personLocalStorage: Array<Person> = JSON.parse(localStorage.getItem('People') || '{}')
let varnames = personLocalStorage.map(p => p.name)

formulario.addEventListener('submit', (e: Event) => {
    e.preventDefault()

    const capitalize = (text: string) => {
        const words = text.split(' ')

        for (let i = 0; i < words.length; i++) {
            words[i] = words[i].substr(0, 1).toUpperCase() + words[i].substr(1).toLowerCase()
        }
        return words.join(' ')
            .replace(/ e /gi, ' e ')
            .replace(/ do /gi, ' do ')
            .replace(/ dos /gi, ' dos ')
            .replace(/ das /gi, ' das ')
            .replace(/ de /gi, ' de ')
            .replace(/ das /gi, ' das ')
            .replace(/ a /gi, ' a ')
            .replace(/ o /gi, ' o ')
            .replace(/ as /gi, ' as ')
            .replace(/ no /gi, ' no ')
            .replace(/ nos /gi, ' nos ')
            .replace(/ na /gi, ' na ')
            .replace(/ nas /gi, ' nas ')
    }

    const trimAll = (text: string) => text.trim().replace(/\s+/g, ' ')

    var person = personLocalStorage[parseInt(author.value)]

    if (!title.value.trim()) {
        message.innerText = 'O campo Título é obrigatório!'
        title.focus()
        return
    }

    if (!subtitle.value.trim()) {
        message.innerText = 'O campo Subtítulo é obrigatório!'
        title.focus()
        return
    }

    if (!publishedAt.value) {
        message.innerText = 'O campo data de publicação é obrigatório!'
        publishedAt.focus()
        return
    }

    const publishedDate = new Date(`^${publishedAt.value}T00:00:00`)

    if (Date.now() - Number(publishedDate) < 0) {
        message.innerText = 'Escolha uma data do passado!'
        publishedAt.focus()
        return
    }

    const authorValue = author.value.trim()
    if (!authorValue) {
        message.innerText = 'O campo Autor é obrigatório'
        author.focus()
        return
    }

    //const regexNome = /\w+\s\w+/g

    /* if (!regexNome.test(authorValue)) {
        message.innerText = 'Informe o nome completo do autor!'
        author.focus()
        return
    } */

    if (selectType.value == 'l') {
        if (!isbn.value) {
            message.innerText = 'O campo ISBN é obrigatório'
            isbn.focus()
            return
        }
    }

   if (selectType.value == 'l')
        if (!edicao.value) {
            message.innerText = 'AAAAAAAAAA FILHO DA PUTAAAAAAAAA'
            edicao.focus()
            return
        }


    if (!volume.value) {
        message.innerText = 'O campo Volume é obrigatório'
        volume.focus()
        return
    }


    if (selectType.value == 'p') {
        if (!issn.value) {
            message.innerText = 'O campo ISSN é obrigatório'
            issn.focus()
            return
        }
    }

    if (selectType.value == 'p') {
        if (!issue.value.trim()) {
            message.innerText = 'O campo Issue é obrigatório'
            issue.focus()
            return
        }
    }
    message.innerText = 'Seu cadastro foi realizado com sucesso!'

    if (selectType.value == 'l') {
        try {
            let publishDate = new Date(publishedAt.value)
            let newISBN: number = +isbn.value
            let newEdition: number = +edicao.value
            let newVolume: number = +volume.value
            const book = new Book(capitalize(trimAll(title.value)), subtitle.value, publishDate, person, newISBN, newEdition, newVolume)
            Books.push(book)
            localStorage.setItem('Books', JSON.stringify(Books))
            showBooks()
        }
        catch (error: any) {
            message.innerText = 'Algo de errado não está certo!'
            return
        }
        message.innerText = 'Seu cadastro foi realizado com sucesso!'
    }

    if (selectType.value == 'p') {
        try {
            let publishDate = new Date(publishedAt.value)
            let newISSN: number = +issn.value
            let newVolume: number = +volume.value
            let newIssue: number = + issue.value
            const periodical = new Periodical(newISSN, newVolume, newIssue, capitalize(trimAll(title.value)), subtitle.value, publishDate, person);

            Periodicals.push(periodical)
            localStorage.setItem('Periodicals', JSON.stringify(Periodicals))
            showPeriodicals()
        } catch (error: any) {
            message.innerText = 'Algo de errado não está certo!'
            return
        }
        message.innerText = 'Seu cadastro foi realizado com sucesso!'
    }

})

function showBooks() {
    if (localStorage.getItem('Books')) {
        const data = JSON.parse(localStorage.getItem('Books')!)

        Books.splice(0)

        for (const item of data) {
            Books.push(new Book(item.title, item.subtitle, item.publishedAt, item.author, item.isbn, item.edition, item.value))
        }
    }
}

function showPeriodicals() {
    if (localStorage.getItem('Periodicals')) {
        const data = JSON.parse(localStorage.getItem('Periodicals')!)

        Periodicals.splice(0)

        for (const item of data) {
            Periodicals.push(new Periodical(item.issn, item.volume, item.issue, item.title, item.subtitle, item.publishedAt, item.author))
        }
    }
}

function pullNames() {
    for (let i = 0; i < varnames.length; i++) {
        author.add(new Option(varnames[i].toString(), i.toString()))
    }
}

let periodicalLocalStorage: Array<Periodical> = JSON.parse(localStorage.getItem('Periodicals') || '{}')
let periodicalTitles = periodicalLocalStorage.map (p => p.title) 
let sortPeriodicals = [...periodicalTitles].sort()

let lines = ' '

for (let i = 0; i < sortPeriodicals.length; i++) {
    lines += `
    <tr>
    <td>${sortPeriodicals[i]}</td>
    </tr>
    `
}

table.style.display = 'block'
table.innerHTML = `
    <thread>
        <tr>
        Periódicos:
        </tr
    </thread>
    <tbody>
        ${lines}
    </tbody>
` 

let bookLocalStorage: Array<Book> = JSON.parse(localStorage.getItem('Books') || '{}')
let bookTitles = bookLocalStorage.map (p => p.title) 
let sortBooks = [...bookTitles].sort()

let linesBooks = ' '

for (let i = 0; i < sortBooks.length; i++) {
    linesBooks += `
    <tr>
    <td>${sortBooks[i]}</td>
    </tr>
    `
}

tableBooks.style.display = 'block'
tableBooks.innerHTML = `
    <thread>
        <tr>
        Livros:
        </tr
    </thread>
    <tbody>
        ${linesBooks}
    </tbody>
` 
