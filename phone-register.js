const knex = require("knex")({
  client: "mysql",
  connection: {
    host: "127.0.0.1",
    user: "root",
    password: "toor",
    database: "phone_register",
  },
});

const readline = require("readline-sync");
//  chosing options

const menuList = [
  "List all phonenumbers.",
  "Search phonenumber by name.",
  "Add a new number.",
  "Alter an existing number.",
  "Delete an existing number",
  "Exit",
];

const menu = async () => {
  const tableName = "phone_book";
  let name = "";
  let region = "";
  let number = 0;
  let question = "";
  const index = readline.keyInSelect(menuList, "What would you like to do?");
  switch (true) {
    //  listing
    case menuList[index] === menuList[0]:
      await listAll();
      menu();
      break;
    //  searching:
    case menuList[index] === menuList[1]:
      name = readline.question(
        "Please tipe in the name of the person's number your are looking for:"
      );
      await search(name);
      menu();
      break;
    //  new number:
    case menuList[index] === menuList[2]:
      name = readline.question("Add a name:");
      region = readline.question("Add the region and service center:");
      number = readline.question("Add the number:");
      await insertNumber(name, region, number);
      menu();
      break;
    // update number:
    case menuList[index] === menuList[3]:
      name = readline.question("Name of the number owner:");
      await search(name);
      question = readline.keyInYN("Is this what you are looking for?:");
      if (question === true) {
        region = readline.question("Add a new region:");
        number = readline.question("Add a new number");
        await updateNumber(name, region, number);
        await console.log(search(name));
        menu();
      } else if (question === false) {
        console.log(
          "To try again, please press button 4, to see all the names please press button 1"
        );
        menu();
      }
      break;
    case menuList[index] === menuList[4]:
      console.log("5.");
      break;
    case menuList[index] === menuList[5]:
      process.exit();
  }
};

// functions

// lists all of the numbers:
const listAll = async () => {
  const list = await knex.select().table("phone_book");
  console.log(list);
};

// search by name:

const search = async (nameInput) => {
  let searchResault = await knex
    .where({ name: nameInput })
    .select()
    .table("phone_book");
  console.log(searchResault);
};

// add a new number:
const insertNumber = async (name, region, number) => {
  await knex("phone_book").insert({
    name: name,
    region: region,
    phone_number: number,
  });
  let display = await knex.where({ name: name }).select().table("phone_book");
  console.log(display);
};

// alter a number:

const updateNumber = async (name, region, number) => {
  const search = await knex.where({ name: name }).select().table("phone_book");
  const update = await knex("phone_book").where({ name: name }).update({
    name: name,
    region: region,
    phone_number: number,
  });
};

const main = async () => {
  menu();
};

main();
