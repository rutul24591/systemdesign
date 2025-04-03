const users = [
  { id: 1, name: 'Alice', age: 25 },
  { id: 2, name: 'Bob', age: 30 },
  { id: 3, name: 'Charlie', age: 35 },
  { id: 4, name: 'Diana', age: 8 },
  { id: 5, name: 'Eve', age: 22 }
];

function sortByAge(users) {
  // This is a simple function, but assume its more complex in a real-world scenario
  // and we want to test it in isolation.
  // For example, it could be fetching data from a database or an API.
  // This is a pure function, so we can test it in isolation.
  // This function is a very small piece of unit or code in your application.

  // To test failed scenario for testing.
  // return users.sort();

  return users.sort((a, b) => a.age - b.age);
}

console.log(sortByAge(users));

module.exports = {
  sortByAge,
  users
};