class Service {
    constructor(id,name,counter1,counter2,counter3,counter4){
        if(id){
            this.id =id;
        }
        this.name = name;
        this.counter1 = counter1;
        this.counter2 = counter2;
        this.counter3 = counter3;
        this.counter4 = counter4;
    }

    /**
     * Construct a Service from a plain object
     * @param {{}} json 
     * @return {Service} the newly created Service object
     */
    static from(json) {
        const t =  Object.assign(new Service(), json);
        return t;
    }
}

module.exports = Service