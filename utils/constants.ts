export const FIBONACCI_INDECES = [1, 2, 3, 5, 8, 13, 21];

export const totalPage = 3;
const DOMAIN_URL = "http://localhost:5173";
export const FETCH_URL = new Map([
  [1, `${DOMAIN_URL}/data/current.json`],
  [2, `${DOMAIN_URL}/data/next.json`],
  [3, `${DOMAIN_URL}/data/prev.json`],
]);
