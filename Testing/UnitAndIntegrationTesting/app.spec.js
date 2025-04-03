/** This defines a test file */

const { users, sortByAge } = require('./app'); // Adjust the path as necessary

test('Testing the sortByAge() functions', () => {
  const sortedData = sortByAge(users);

  expect(sortedData[0]?.name).toBe('Diana');
});