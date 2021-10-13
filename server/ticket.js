class Ticket {
    constructor(id,value,userid,serviceid,date,state){
        if(id){
            this.id =id;
        }
        this.value = value;
        this.userid = userid;
        this.serviceid = serviceid;
        this.date = date;
        this.state = state;
    }

    /**
     * Construct a Ticket from a plain object
     * @param {{}} json 
     * @return {Ticket} the newly created Ticket object
     */
    static from(json) {
        const t =  Object.assign(new Ticket(), json);
        return t;
    }
}

module.exports = Ticket