const operands = ["+", "-", "x", ":"];

const generateQuestions = () => {
  let numb1 = Math.round(Math.random() * 10);
  let numb2 = Math.round(Math.random() * 10);
  const op = Math.round(Math.random() * 3);
  let result = 0;

  switch (operands[op]) {
    case "+":
      result = numb1 + numb2;
      break;
    case "-":
      if (numb1 < numb2) {
        let temp = numb1;
        numb1 = numb2;
        numb2 = temp;
      }
      result = numb1 - numb2;
      break;
    case "x":
      result = numb1 * numb2;
      break;
    case ":":
      result = numb1 / numb2;
      do {
        numb1 = Math.round(Math.random() * 10);
        numb2 = Math.round(Math.random() * 10);
        result = numb1 / numb2;
      } while (Math.abs(Math.floor(result)) !== result || numb2 === 0);

      break;
  }

  return {
    numb1,
    numb2,
    op: operands[op],
    answer: result,
  };
};

export default generateQuestions;
