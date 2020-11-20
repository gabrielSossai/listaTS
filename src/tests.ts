import Person from "./entities/Person.js"
import {Gender} from "./entities/Person.js"
import Book from "./entities/Book.js"

const person1 = new Person('Gabriel Sossai', new Date('2002-04-11T00:00:00'), Gender.Male)
const book1 = new Book ('Autobiografia Gabriel Sossai', 'Autobiografia com a história de Gabriel Sossai e Curiosidades sobre T.I.', new Date('2020-11-19T00:00:00'), person1, 1, 1, 1)
const person2 = new Person('Rick Riordan', new Date('1964-6-5T00:00:00'), Gender.Male)
const book2 = new Book('Percy Jackson e os Olimpianos', 'O Ladrão de Raios', new Date('2010-2-12T00:00:)0'), person2, 1, 1, 1 )
const person3 = new Person('T. Harver Eker', new Date('1954-6-10T00:00:00'), Gender.Male)
const book3 = new Book ('Os Segredos da Mente Milionária', 'Aprenda a enriquecer mudando seus conceitos sobre o dinheiro e adotando os hábitos das pessoas bem-sucedidas', new Date('2005-2-15T00:00:00'), person3, 1, 1, 1)

console.log(person1);
console.log(person2);
console.log(person3);
console.log(book1);
console.log(book2);
console.log(book3);

