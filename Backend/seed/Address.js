const Address = require("../models/Address");

const addresses = [
  {
    _id: "65c26398e1e1a2106ac8fbd5",
    user: "65b8e564ea5ce114184ccb96",
    street: "main 11th",
    city: "Lahore",
    state: "Punjab",
    phoneNumber: "9452571272",
    postalCode: "201012",
    country: "Pakistan",
    type: "Home",
    __v: 0,
  },
  {
    _id: "65c26412e1e1a2106ac8fbd8",
    user: "65b8e564ea5ce114184ccb96",
    street: "main 18th",
    city: "Islamabad",
    state: "Punjab",
    phoneNumber: "9846286159",
    postalCode: "301273",
    country: "Pakistan",
    type: "Buisness",
    __v: 0,
  },
];

exports.seedAddress = async () => {
  try {
    await Address.insertMany(addresses);
    console.log("Address seeded successfully");
  } catch (error) {
    console.log(error);
  }
};
