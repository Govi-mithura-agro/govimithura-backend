const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const appUserSchema = new Schema ({

    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    contact: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
});

const AppUsers = mongoose.model('appusers', appUserSchema);

module.exports = AppUsers;