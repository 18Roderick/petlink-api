const letters = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z'
];

const getRandomNumber = (size = 10) => Math.floor(Math.random() * size);

const getRandomLetter = () => letters[getRandomNumber(letters.length)];

const getRandomCode = (size = 4) => {
  let index = 0;
  let code = '';
  while (index < size) {
    code += getRandomNumber(2) > 0 ? getRandomLetter() : getRandomNumber();
    index += 1;
  }
  return code;
};

module.exports = {
  getRandomCode,
  getRandomLetter,
  getRandomNumber
};
