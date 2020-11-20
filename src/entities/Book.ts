import Person from "./Person.js";
import Document from "./Document.js";

class Book extends Document {
    isbn : number
    edition : number
    volume: number

    constructor (title: string, subtitle: string, publishedAt: Date | number, author: Person, isbn: number, edition: number, volume: number) {
       super (title, subtitle, publishedAt, author)

       this.isbn = isbn
       this.edition = edition
       this.volume = volume
    }
}

export default Book
