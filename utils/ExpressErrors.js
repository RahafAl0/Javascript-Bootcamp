class ExpressErrors extends Error {
    constructor(message, statusCode) {
        super();
        this.mesage = message;
        this.statusCode = statusCode;

    }
}

module.exports = ExpressErrors;