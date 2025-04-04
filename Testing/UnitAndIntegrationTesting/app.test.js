/** This defines a test file */

const { users, sortByAge } = require('./app'); // Adjust the path as necessary

test('Testing if the sortByAge function sorts in ascending order', () => {
  const sortedData = sortByAge(users);

  expect(sortedData[0]?.name).toBe('Diana');
});