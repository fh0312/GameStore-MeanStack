// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Item = require("./modules/item");
const User = require("./modules/user");
const Biblioteca = require("./modules/biblioteca");
const MongoClient = require("mongodb").MongoClient;
const fs = require("fs");

const items = [];
const mongoose = require("mongoose");
mongoose.set("strictQuery", false); // Prepare for Mongoose

const mongoDB = "mongodb+srv://fc56348:admin@cluster0.2t02o62.mongodb.net/psi_project";

  const mongoDB = process.env.MONGODB_URI || dev_db_url;";

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await createItems();
  await loadBibliotecas();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

async function loadBibliotecas() {
  var bibUser = new User({
    username: "biblioteca",
    password: "Biblioteca1",
  });
  bibUser.save();
  console.log("user bib saved");

  const itemIds = Array.from({ length: 5 }, (_, index) => ({
    item: index + 1,
    acquisitionDate: new Date(
      Date.now() - Math.floor(Math.random() * 86400000 * 365)
    ),
  }));

  const biblioteca = new Biblioteca({
    username: "biblioteca",
    itemIds: itemIds,
  });

  await biblioteca.save();
  console.log("Biblioteca saved successfully!");
}

async function itemCreate(
  name,
  image,
  type,
  desc,
  plat,
  lang,
  price,
  classification,
  aval,
  link,
  image1,
  image2
) {
  let item = undefined;
  if (link === undefined) {
    link = "";
  }
  if (image1 === undefined && image2 === undefined) {
    item = new Item({
      name: name,
      image: {
        data: fs.readFileSync(image),
        contentType: "image/jpeg",
      },
      type: type,
      description: desc,
      platform: plat,
      idiomas: lang,
      price: price,
      classification: classification,
      aval: aval,
      link: link,
      image1: "",
      image2: "",
    });
  } else if (image1 === undefined) {
    item = new Item({
      name: name,
      image: {
        data: fs.readFileSync(image),
        contentType: "image/jpeg",
      },
      type: type,
      description: desc,
      platform: plat,
      idiomas: lang,
      price: price,
      classification: classification,
      aval: aval,
      link: link,
      image1: "",
      image2: {
        data: fs.readFileSync(image2),
        contentType: "image/jpeg",
      },
    });
  } else if (image2 === undefined) {
    item = new Item({
      name: name,
      image: {
        data: fs.readFileSync(image),
        contentType: "image/jpeg",
      },
      type: type,
      description: desc,
      platform: plat,
      idiomas: lang,
      price: price,
      classification: classification,
      aval: aval,
      link: link,
      image1: {
        data: fs.readFileSync(image1),
        contentType: "image/jpeg",
      },
      image2: "",
    });
  } else {
    item = new Item({
      name: name,
      image: {
        data: fs.readFileSync(image),
        contentType: "image/jpeg",
      },
      type: type,
      description: desc,
      platform: plat,
      idiomas: lang,
      price: price,
      classification: classification,
      aval: aval,
      link: link,
      image1: {
        data: fs.readFileSync(image1),
        contentType: "image/jpeg",
      },
      image2: {
        data: fs.readFileSync(image2),
        contentType: "image/jpeg",
      },
    });
  }
  await item.save();
  items.push(item);
  console.log(`Added item: ${name}`);
}

async function createItems() {
  console.log("Adding items");
  await Promise.all([
    itemCreate(
      "Minekraft",
      "Images/items/minekraft1.jpg",
      "Game",
      "Embarca nesta nova aventura!",
      "PC or Android/IOS",
      "PT/ENG",
      "10€",
      "NA",
      "NA",
      "https://www.youtube.com/watch?v=MmB9b5njVbA&ab_channel=Minecraft",
      "Images/items/minekraft2.jpg",
      "Images/items/minekraft3.jpg"
    ),

    itemCreate(
      "Caunter Straike",
      "Images/items/cs2.jpg",
      "Game",
      "Embarca nesta nova aventura!",
      "PC",
      "PT/ENG",
      "10€",
      "NA",
      "NA",
      undefined,
      "Images/items/cs1.jpg",
      "Images/items/cs3.jpg"
    ),

    itemCreate(
      "Legends of League",
      "Images/items/lol1.jpg",
      "Game",
      "Embarca nesta nova aventura!",
      "PC",
      "PT/ENG",
      "10€",
      "NA",
      "NA",
      undefined,
      "Images/items/legendsofleague.jpg",
      undefined
    ),

    itemCreate(
      "Fortday",
      "Images/items/fortday1.jpg",
      "Game",
      "Embarca nesta nova aventura!",
      "PC/PS4/PS5/XBOX",
      "PT/ENG",
      "10€",
      "NA",
      "NA",
      "https://www.youtube.com/watch?v=OmpsKymKh4Y&ab_channel=DieisonGames",
      undefined,
      undefined
    ),

    itemCreate(
      "Underwatch",
      "Images/items/underwatch.jpg",
      "Game",
      "Embarca nesta nova aventura!",
      "PC or Android/IOS",
      "PT/ENG",
      "10€",
      "NA",
      "NA",
      undefined,
      undefined,
      undefined
    ),

    itemCreate(
      "PUGB",
      "Images/items/pugb1.jpg",
      "Game",
      "Embarca nesta nova aventura!",
      "PC/XBOX",
      "PT/ENG",
      "10€",
      "NA",
      "NA",
      undefined,
      "Images/items/pugb2.jpg",
      "Images/items/pugb3.jpg"
    ),

    itemCreate(
      "Luigi Kart",
      "./Images/items/luigi1.jpg",
      "Game",
      "Embarca nesta nova aventura!",
      "PS4/PS5/XBOX",
      "PT/ENG",
      "10€",
      "NA",
      "NA",
      undefined,
      "Images/items/luigi3.png",
      "Images/items/luigi2.jpg"
    ),

    itemCreate(
      "Earth 4",
      "Images/items/earth4.jpg",
      "Game",
      "Embarca nesta nova aventura!",
      "PC",
      "PT/ENG",
      "10€",
      "NA",
      "NA",
      "https://www.youtube.com/watch?v=IUN664s7N-c&ab_channel=Eredus",
      undefined,
      undefined
    ),

    itemCreate(
      "Dota 3",
      "Images/items/dota 3.jpg",
      "Game",
      "Embarca nesta nova aventura!",
      "PC",
      "PT/ENG",
      "10€",
      "NA",
      "NA",
      "https://www.youtube.com/watch?v=WtCn0yzj5y4&ab_channel=FinargotDota2",
      undefined,
      undefined
    ),

    itemCreate(
      "Minekraft",
      "Images/items/minekraft1.jpg",
      "Game",
      "Embarca nesta nova aventura!",
      "PC or Android/IOS",
      "PT/ENG",
      "10€",
      "NA",
      "NA",
      "https://www.youtube.com/watch?v=MmB9b5njVbA&ab_channel=Minecraft",
      "Images/items/minekraft2.jpg",
      "Images/items/minekraft3.jpg"
    ),
  ]);
}
