import Person from "./Person.js"
import Document from "./Document.js"

class Periodical extends Document {
    issn : number
    volume : number
    issue : number

    constructor (issn: number, volume: number, issue: number, title: string, subtitle: string, publishedAt: Date | number, author: Person) {
        super (title, subtitle, publishedAt, author)
 
        this.issn = issn
        this.volume = volume
        this.issue = issue
     }
}

export default Periodical