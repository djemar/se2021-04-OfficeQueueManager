const dao = require("../dao");

// async/await can be used.
it("getOfficerById", async () => {
  expect.assertions(1);
  const data = await dao.getOfficerById(1);
  expect(data.username).toEqual("s286329@studenti.polito.it");
});

it("loadUsers", async () => {
  expect.assertions(1);
  const data = await dao.loadUsers();
  expect(data).toHaveLength(1); //TODO update when table is finalized
});

it("loadServices", async () => {
  expect.assertions(1);
  const data = await dao.loadServices();
  expect(data).toHaveLength(7); //TODO update when table is finalized
});

it("findUser", async () => {
  expect.assertions(1);
  const data = await dao.findUser(1);
  expect(data).toHaveLength(1);
});

// promises
//   it('works with async/await and resolves', async () => {
//     expect.assertions(1);
//     // await expect(dao.getOfficerById(1)).resolves.toEqual('Paul');
//     return dao.getOfficerById(1).then(data => expect(data.username).toEqual('s286329@studenti.polito.it'));
//   });
