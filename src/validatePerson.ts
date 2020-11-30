import Person from './entities/Person.js'
import { Gender } from './entities/Person.js'

const name = document.querySelector<HTMLInputElement>('#name')!
const birth = document.querySelector<HTMLInputElement>('#birth')!
const gender = document.querySelector<HTMLSelectElement>('#gender')!
const message = document.querySelector<HTMLParagraphElement>('#message')!
const formulario = document.querySelector<HTMLFormElement>('form')!

const People: Person[] = []
showPeople()


formulario.addEventListener('submit', (e: Event) => {
    e.preventDefault()


    const nameValue = name.value.trim()

    if (!nameValue) {
        message.innerText = 'O campo Nome é obrigatório'
        name.focus()
        return
    }

    const regexNome = /\w+\s\w+/g

    if (!regexNome.test(nameValue)) {
        message.innerText = 'Informe seu Nome completo!'
        name.focus()
        return
    }

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

        const person = new Person(name.value, birthNew, gender.value === 'f' ? Gender.Female : Gender.Male)

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

export function showPeople()  {
    if (localStorage.getItem('People')) {
        const data = JSON.parse(localStorage.getItem('People')!)

        People.splice(0)

        for (const item of data) {
            People.push(new Person(item.name, item.birth, item.gender))
        }
    }
}

