/** this is test files folder 
 * Check out what is dunder in javascript? 
*/

const { users, sortByAge } = require('../app'); // Adjust the path as necessary

test('Testing the sortByAge() functions', () => {
  const sortedData = sortByAge(users);

  expect(sortedData[0]?.name).toBe('Diana');
});