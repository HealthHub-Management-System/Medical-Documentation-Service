export const getCurrentUserId = () => {
  // TODO logic for retrieving userId from probably UserContext?
  //      Need to be checked how to do it in next.js

  return Math.floor(Math.random() * (207 - 201 + 1)) + 201;
};
