const mongoose = require("mongoose");
const path = require("path");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

// This correctly finds the .env file located in your main Wonderlust folder
require('dotenv').config({ path: path.join(__dirname, "../.env") }); 

const DbUrl = process.env.ATLASDB; 

// Safety check: Stop the script if the URL is still missing
if (!DbUrl) {
  console.error("ERROR: ATLASDB connection string is undefined. Check your .env file path!");
  process.exit(1);
}

main()
  .then(() => {
    console.log("Connected to ATLAS DB");
    initDB();
  })
  .catch((err) => {
    console.log("Database Connection Error:", err);
  });

async function main() {
  await mongoose.connect(DbUrl);
}

const initDB = async () => {
  try {
    await Listing.deleteMany({});
    console.log("Atlas Database cleared.");

    const updatedData = initData.data.map((obj) => ({
      ...obj,
      owner: "69b83a2ba6a432c45bbe84e8", 
      category: [
        "Trending", "Rooms", "Iconic cities", "Mountain", "Castles", 
        "Amazing pools", "Camping", "Arctic", "Beachfront"
      ].includes(obj.category) ? obj.category : "Trending",
      geometry: {
        type: "Point",
        coordinates: [77.209, 28.6139],
      },
    }));

    await Listing.insertMany(updatedData);
    console.log("Success! 40 listings initialized in Atlas.");
    mongoose.connection.close();
  } catch (error) {
    console.log("Error seeding data:", error);
    process.exit(1);
  }
};