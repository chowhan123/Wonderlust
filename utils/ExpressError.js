// This code is for if any unknow route are present it show the error

class ExpressError extends Error {
    constructor(statusCode,message){
        super();
        this.statusCode = statusCode;
        this.message = message;
    }
}

module.exports  = ExpressError;

