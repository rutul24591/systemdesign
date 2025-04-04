/** this is test files folder 
 * Check out what is dunder in javascript? 
*/

const { users, sortByAge } = require('../app'); // Adjust the path as necessary

test('Testing if the sortByAge function sorts in ascending order', () => {
  const sortedData = sortByAge(users);

  expect(sortedData[0]?.name).toBe('Diana');
});

test('Testing if the last user returned by sortByAge is Charlie', () => {
  const sortedData = sortByAge(users);

  expect(sortedData[sortedData.length - 1]?.name).toBe('Charlie');
});

/** Below 2 are same test cases */
test('Testing if the sortByAge function to have length', () => {
  const sortedData = sortByAge(users);

  expect(sortedData).toHaveLength(5);
});

test('Testing if the sortByAge function returns an array of users having length 5', () => {
  const sortedData = sortByAge(users);

  expect(sortedData.length).toBe(5);
});


test('Testing if return value of sortByAge is not undefined', () => {
  const sortedData = sortByAge(users);

  expect(sortedData).not.toBeUndefined();
});