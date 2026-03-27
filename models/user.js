const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');
const Listing = require("./listing");

const userSchema = new Schema ({
    email: {
        type: String,
        required: true,
    },
    avatar: {
        url: { 
            type: String, 
            default: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" 
        },
        filename: {
            type: String,
            default: "defaultavatar"
        } 
    }
});

// This runs AFTER a user is deleted
userSchema.post("findOneAndDelete", async (user) => {
    if (user) {
        // Now 'Listing' is defined and this will work!
        await Listing.deleteMany({ owner: user._id });
    }
});

userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', userSchema);