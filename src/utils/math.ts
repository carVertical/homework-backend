export const nextGaussian = (mean: number, std: number) => {
  const u = 1 - Math.random();
  const v = Math.random();
  const z = Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  return z * std + mean;
};

export const randomInt = (limit: number) => {
  return Math.floor(Math.random() * limit);
};

export const round = (num: number, precision: number) => {
  const factor = Math.pow(10, precision);
  return Math.round((num + Number.EPSILON) * factor) / factor;
};
