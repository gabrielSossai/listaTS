import Person from "./entities/Person.js";
import {Gender} from "./entities/Person.js";
import Book from "./entities/Book.js";
import Periodical from "./entities/Book.js"

const person1 = new Person('Gabriel Sossai', new Date('2002-04-11T00:00:00'), Gender.Male)
const book1 = new Book ('Autobiografia Gabriel Sossai', 'Autobiografia com a história de Gabriel Sossai e Curiosidades sobre T.I.', new Date('2020-11-19T00:00:00'), person1, 1, 1, 1)
const person2 = new Person('Rick Riordan', new Date('1964-06-05T00:00:00'), Gender.Male)
const book2 = new Book('Percy Jackson e os Olimpianos', 'O Ladrão de Raios', new Date('2010-02-12T00:00:)0'), person2, 1, 1, 1 )
const person3 = new Person('T. Harver Eker', new Date('1954-06-10T00:00:00'), Gender.Male)
const book3 = new Book ('Os Segredos da Mente Milionária', 'Aprenda a enriquecer mudando seus conceitos sobre o dinheiro e adotando os hábitos das pessoas bem-sucedidas', new Date('2005-02-15T00:00:00'), person3, 1, 1, 1)
const person4 = new Person ('Maurício de Sousa', new Date('1935-10-27T00:00:00'), Gender.Male)
const periodical1 = new Periodical('Turma da Mônica Jovem', 'Eles cresceram!', new Date ('2008-08-1T00:00:00'), person4, 1, 1, 1)
const periodical2 = new Periodical('Turma da Mônica Jovem', 'A Aventura Continua!', new Date ('2008-09-1T00:00:00'), person4, 2, 1, 2)
const periodical3 = new Periodical('Turma da Mônica Jovem', 'Novos Desafios!', new Date ('2008-10-1T00:00:00'), person4, 3, 1, 3)

const people = [person1, person2, person3, person4]
const books = [book1, book2, book3]
const periodicals = [periodical1, periodical2, periodical3]

console.log(people);
console.log(books);
console.log(periodicals);