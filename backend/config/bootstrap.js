/**
 * Seed Function
 * (sails.config.bootstrap)
 *
 * A function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also create a hook.
 *
 * For more information on seeding your app with fake data, check out:
 * https://sailsjs.com/config/bootstrap
 */

const plainPassword = 'P@ssw0rd!123';
const { faker } = require('@faker-js/faker');
const bcrypt = require('bcrypt');

async function createUser() {
  let gender_name = faker.person.sex().toLowerCase();
  let first_name = faker.person.firstName({ sex: gender_name });
  return {
    email: faker.internet.email().toLowerCase(),
    phone: faker.phone.number(),
    password: bcrypt.hashSync(plainPassword, 10),
    firstName: first_name,
    lastName: faker.person.lastName(),
    gender: gender_name === 'male' ? 'M' : 'F',
    country: faker.location.country(),
    jobTitle: faker.person.jobTitle(),
    address: faker.location.streetAddress(),
    aboutMe: faker.lorem.paragraph(),
    facebook: faker.internet.userName(),
    instagram: faker.internet.userName(),
    twitter: faker.internet.userName(),
    linkedIn: faker.internet.userName(),
    confirmed: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

module.exports.bootstrap = async function() {

  // By convention, this is a good place to set up fake data during development.
  //
  // For example:
  // ```
  // // Set up fake development data (or if we already have some, avast)
  // if (await User.count() > 0) {
  //   return;
  // }
  //
  // await User.createEach([
  //   { emailAddress: 'ry@example.com', fullName: 'Ryan Dahl', },
  //   { emailAddress: 'rachael@example.com', fullName: 'Rachael Shaw', },
  //   // etc.
  // ]);
  // ```

  let totalUser = await User.count();
  let max = 100;

  if(totalUser === 0)
  {
      let users = [];
      for(let i = 1; i <= max; i++)
      {
        let obj = await createUser();
        users.push(obj);
      }

      await User.createEach(users);
  }

};
