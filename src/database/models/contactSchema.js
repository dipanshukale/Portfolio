const mongoose = require('mongoose');
const validator = require('validator');

const ContactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        validate(mail) {
            if (!validator.isEmail(mail)) {
                throw new Error('Invalid email');
                }
        }
    },
    phone: {
        type: String,
        required: true, 
        min: 10
    },
    message: {
        type: String,
        required: true,
    }

})

//create model
const Contact = mongoose.model('Contact', ContactSchema);
module.exports = Contact;