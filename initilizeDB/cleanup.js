const mongoose = require("mongoose");
const Listing = require("../models/listing");
const User = require("../models/user");
const path = require("path");

require('dotenv').config({ path: path.join(__dirname, "../.env") });

const DbUrl = process.env.ATLASDB;

async function cleanOrphanedListings() {
    if (!DbUrl) {
        console.error("Error: ATLASDB connection string is undefined. Check your .env file path.");
        return;
    }
    
    await mongoose.connect(DbUrl);
    console.log("Connected to DB... Searching for orphaned listings.");

    const listings = await Listing.find({});
    let count = 0;

    for (let listing of listings) {
        const ownerExists = await User.exists({ _id: listing.owner });
        if (!ownerExists) {
            await Listing.findByIdAndDelete(listing._id);
            console.log(`Deleted: ${listing.title} (Owner was missing)`);
            count++;
        }
    }

    console.log(`Success! Removed ${count} orphaned listings.`);
    mongoose.connection.close();
}

cleanOrphanedListings();