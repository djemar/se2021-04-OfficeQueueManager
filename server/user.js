class User {
    constructor(ID,name,surname,password,type){
        if(id){
            this.id = id;
        }
        this.name = name;
        this.surname = surname;
        this.password = password;
        this.type = type;
    }

    /**
     * Construct a User from a plain object
     * @param {{}} json 
     * @return {User} the newly created User object
     */
    static from(json) {
        const t =  Object.assign(new User(), json);
        return t;
    }
}

module.exports = User