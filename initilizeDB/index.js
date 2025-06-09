const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");


const MONGO_URL = "mongodb://127.0.0.1:27017/wonderlust";
main()
.then(() => {
  console.log("Connected to DB");
})
.catch((err) => {
  console.log(err)
});

async function main() {
  await mongoose.connect(MONGO_URL);

}

const initDB = async() => {
    await Listing.deleteMany({});
    //this below line of code initilize owner id to all places
   initData.data = initData.data.map((obj) => ({...obj, owner:"682b37b14ec57d3e81272e38"}));
    await Listing.insertMany(initData.data);
    console.log("Data was initilized successfully");
}

initDB();