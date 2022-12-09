const mongoose = require("mongoose");

const URI = process.env.MONGODB_URI ? process.env.MONGODB_URI : "NO URI";

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(URI);
  console.log("DB Connect");
}
