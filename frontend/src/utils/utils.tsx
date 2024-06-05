import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { User } from "../models/user";

export const getCurrentUser = async (sessionCookie: RequestCookie) => {
  const res = await fetch(`http://localhost:8080/api/v1/users/current`, {
    method: "GET",
    cache: "no-store",
    headers: new Headers({
      Authorization: "Bearer a9655739cbfed565b6b86dfb4d2a63df",
      Cookie: `${sessionCookie.name}=${sessionCookie.value}`,
    }),
    credentials: "include",
  });

  if (res.ok) return (await res.json()) as User;
  //@ts-ignore
  else console.error("Failed to fetch user:", res.error ?? res.statusText);

  return {
    id: "a5f96fd2-a29f-4d95-bdcb-1545b59310fd",
    name: "Mock user",
    email: "mockuser@mail.com",
    role: "patient",
  } satisfies User;
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
};
