import Person from './entities/Person.js'
import { Gender } from './entities/Person.js'

const name = document.querySelector<HTMLInputElement>('#name')!
const birth = document.querySelector<HTMLInputElement>('#birth')!
const gender = document.querySelector<HTMLSelectElement>('#gender')!
const message = document.querySelector<HTMLParagraphElement>('#message')!
const formulario = document.querySelector<HTMLFormElement>('form')!
const verify = document.querySelector<HTMLButtonElement>('#verify')!
const search = document.querySelector<HTMLInputElement>('#search')!
//const filter = document.querySelector<HTMLButtonElement>('#filter')!


const People: Person[] = []
showPeople()


verify.addEventListener('click', (e: Event) => {
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
    }

    const trimAll = (text: string) => text.trim().replace(/\s+/g, ' ')

    let nameValue = name.value.trim()

    if (!nameValue) {
        message.innerText = 'O campo Nome é obrigatório'
        name.focus()
        return
    }

    /* const regexNome = /\w+\s\w+/g

    if (!regexNome.test(name.value)) {
        message.innerText = 'Informe seu Nome completo!'
        name.focus()
        return
    } */

    if (!birth.value) {
        message.innerText = 'O campo Nascimento é obrigatório!'
        birth.focus()
        return
    }

    const birthDate = new Date(`${birth.value}T00:00:00`)

    if (Date.now() - Number(birthDate) < 0) {
        message.innerText = 'O nascimento deve ter ocorrido no passado!'
        birth.focus()
        return
    }

    if (!gender.value) {
        message.innerText = 'O campo Sexo é obrigatório!'
        gender.focus()
        return
    }

    try {
        let birthNew = new Date(birth.value)

        const person = new Person(capitalize(trimAll((name.value))), birthNew, gender.value === 'f' ? Gender.Female : Gender.Male)

        People.push(person)
        localStorage.setItem('People', JSON.stringify(People))
        showPeople()
    }

    catch (error: any) {
        message.innerText = 'DEU PAU!'
        return
    }

    message.innerText = 'Cadastro realizado com sucesso!'
})

export function showPeople() {
    if (localStorage.getItem('People')) {
        const data = JSON.parse(localStorage.getItem('People')!)

        People.splice(0)

        for (const item of data) {
            People.push(new Person(item.name, item.birth, item.gender))
        }
    }
}

//Pega os dados do Local Storage
let personLocalStorage: Array<Person> = JSON.parse(localStorage.getItem('People') || '{}')
//Seleciona os nomes no local storage
let varnames = personLocalStorage.map(p => p.name)
//Ordena os nomes por ordem alfabética
let sortnames = [...varnames].sort()

let varbirth = personLocalStorage.map(p => p.birth)
//let parsebirth = math.round(varbirth)
let vargender = personLocalStorage.map(p => p.gender)

let lines = ' '
let table = document.querySelector<HTMLTableCaptionElement>('#table')!

for (let i = 0; i < sortnames.length; i++) {
    lines += `
        <tr>
        <td>${sortnames[i]}</td>
        </tr>
        `
}

table.style.display = 'block'
table.innerHTML = `
  <thread>
    <tr> 
        Autores:
    </tr>
  </thread>
  <tbody>
    ${lines}
    </tbody>
  `

  search.addEventListener("keyup", filter)
  function filter() {
      if (search.value) {
        let peopleLocalStorage: Array<Person> = JSON.parse(localStorage.getItem("people")!)

        const onlyPeople = (obj: typeof peopleLocalStorage[0]) => obj.name.includes(search.value)

        let filtrar = peopleLocalStorage.filter(onlyPeople)
        let lines = ' '
        for (const people of filtrar) {
            lines += `
            <tr>
                <td>${(people as Person).name}</td>
            </tr>
            `
        }
      }
  }
    
