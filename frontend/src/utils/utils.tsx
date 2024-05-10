export const getCurrentUserId = () => {
  // TODO logic for retrieving userId from probably UserContext?
  //      Need to be checked how to do it in next.js
  return 1;

  return Math.floor(Math.random() * (207 - 201 + 1)) + 201;
};

// TODO correct this function to be more type-safe
export const snakeToCamel = (obj: any): any => {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => snakeToCamel(item));
  }

  const camelObj = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const camelKey = key.replace(/_([a-z])/g, (match, char) =>
        char.toUpperCase()
      );
      //@ts-ignore
      camelObj[camelKey] = snakeToCamel(obj[key]);
    }
  }
  return camelObj;
};

// TODO correct this function to be more type-safe
export const camelToSnake = (obj: any): any => {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => camelToSnake(item));
  }

  const snakeObj = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const snakeKey = key.replace(
        /[A-Z]/g,
        (match) => `_${match.toLowerCase()}`
      );
      //@ts-ignore
      snakeObj[snakeKey] = camelToSnake(obj[key]);
    }
  }
  return snakeObj as any;
}