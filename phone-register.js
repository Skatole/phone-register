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
const tableName = "phone_book";

const menu = async () => {
  let name = "";
  let region = "";
  let number = 0;
  let question = "";
  const index = readline.keyInSelect(menuList, "What would you like to do?");
  switch (menuList[index]) {
    //  listing
    case menuList[0]:
      await listAll();
      menu();
      break;
    //  searching:
    case menuList[1]:
      name = readline.question("Name of the number owner: ");
      await search(name);
      menu();
      break;
    //  new number:
    case menuList[2]:
      name = readline.question("Add a name:");
      region = readline.question("Add the region and service center:");
      number = readline.question("Add the number:");
      await insertNumber(name, region, number);
      menu();
      break;

    // update number:
    case menuList[3]:
      name = readline.question("Name of the number owner:");
      const updatedResult = await search(name);
      question = readline.keyInYN("Is this what you are looking for?:");

      if (question === true) {
        name = readline.question("Add a new name:");
        region = readline.question("Add a new region:");
        number = readline.question("Add a new number:");
        await updateNumber(name, updatedResult);
        await search(name);
        menu();
      } else if (question === false) {
        console.log(
          "To try again, please press button 4, to see all the names please press button 1"
        );
        menu();
      }
      break;

    // delete number:
    case menuList[4]:
      name = readline.question(
        "Which user you would like to delete? Enter name: "
      );
      await search(name);
      question = readline.keyInYN(
        "Are you sure you would like to delete this user?"
      );
      if (question === true) {
        deleteNumber(name);
        menu();
      }
      if (question === false) {
        console.log(
          "If you would like to try again press 5, if you would like to see all the users press 1"
        );
        menu();
      }
      break;
    case menuList[5]:
      process.exit();
  }
};

// functions

// lists all of the numbers:
const listAll = async () => {
  const list = await knex(tableName).select();
  console.log(list);
};

// search by name:

const search = async (nameSearch) => {
  // const variable = await knex(tableName).where({ name: nameSearch }).select('name');
  const searchResault = await knex
    .where({ name: nameSearch })
    .select()
    .table(tableName);
  console.log(searchResault);
  return searchResault;
};

// add a new number:
const insertNumber = async (name, region, number) => {
  await knex(tableName).insert({
    name: name,
    region: region,
    phone_number: number,
  });
  let display = await knex.where({ name: name }).select().table(tableName);
  console.log(display);
};

// update a number:

const updateNumber = async (name, record) => {
    await knex(tableName).where({ name: record.name }).update({ name });
};

// delete number:
  
const deleteNumber = async (name) => {
  const remove = await knex(tableName).where({ name: name }).del();
};

const main = async () => {
  menu();
};

main();
