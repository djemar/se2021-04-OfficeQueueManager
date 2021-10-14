const User = require('../user');

test('create new user', () => {
    const user = new User(1, "Luke", "Skywalker", "J3d1", "master");
  expect(user.name).toBe("Luke");
});

// jest.mock('../user'); // SoundPlayer is now a mock constructor

// beforeEach(() => {
//   // Clear all instances and calls to constructor and all methods:
//   User.mockClear();
// });

// it('We can check if the consumer called the class constructor', () => {
//     const userConsumer = new User();
//     expect(User).toHaveBeenCalledTimes(1);
// });