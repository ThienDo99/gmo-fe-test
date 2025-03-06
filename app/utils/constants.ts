export const totalItem = 60;
export const DOMAIN_URL = "http://localhost:5173";
export const FETCH_URL: Map<number, string> = new Map([
  [1, `${DOMAIN_URL}/data/current.json`],
  [2, `${DOMAIN_URL}/data/next.json`],
  [3, `${DOMAIN_URL}/data/prev.json`],
]);
