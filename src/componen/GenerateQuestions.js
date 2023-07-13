const operands = [":", "-", "x", "+"];

const generateQuestions = (level) => {
  console.log(level);
  let lev = 0;
  if (level === "easy") {
    lev = 10;
  } else if (level === "medium") {
    lev = 30;
  } else if (lev === "hard") {
    lev = 40;
  }
  let numb1 = Math.round(Math.random() * lev);
  let numb2 = Math.round(Math.random() * lev);
  const op = Math.round(Math.random() * 3);
  let result = 0;

  // eslint-disable-next-line
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
        numb1 = Math.round(Math.random() * lev);
        console.log(numb1);
        numb2 = Math.round(Math.random() * lev);
        console.log(numb2);
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
