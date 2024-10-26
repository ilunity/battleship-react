export const getRandomBoolean = (): boolean => {
  return Math.round(Math.random()) === 1;
};

export const getRandomNumber = (min = 0, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getRandomElement = <T>(array: Array<T>): T | undefined => {
  const length = array.length;
  if (length === 0) {
    return undefined;
  }

  const randomIndex = getRandomNumber(0, length - 1);

  return array[randomIndex];
};
