class Collection {
    constructor(title, description = null) {
        this.title = title
        this.description = description
    
        this.displayProperties = function() {
            for (let key in this)
                console.log(`${key}: ${this[key]}`)}    
    }
}

class DefaultCollection extends Collection { 
    constructor() {
        super('Have You?', 'This is your default collection')
    }
}

export { Collection, DefaultCollection }