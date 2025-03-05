export const isFibonacci = (num: number): boolean => {
  const isPerfectSquare = (x: number) => Math.sqrt(x) % 1 === 0;
  return (
    isPerfectSquare(5 * num * num + 4) || isPerfectSquare(5 * num * num - 4)
  );
};
