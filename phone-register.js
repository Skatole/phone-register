const knex = require ('knex') ({
  client: 'mysql',
  connection:{
    host: '127.0.0.1',
    user: 'root',
    password: 'toor',
    database: 'phone_register'
  }
});

const records = async () => {
  const tableName = 'phone_book';
  const numbers = [
    {name: 'Sonka', region: '+36 30', phone_number: 666666},
    {name: 'Husi', region: '+36 20', phone_number: 333333},
    {name: 'RántottHOus', region: '+36 70', phone_number: 555555},
  ];
  for (let num of numbers) {
    await knex(tableName).insert(num);
  }
};

const main = async () => {
  // await records();
  console.log
  process.exit();

}

main();