function calculate(arg1, op, arg2) {
  if (op == '+') {
    return arg1 + arg2;
  } else if (op == '-') {
    return arg1 - arg2;
  } else {
    throw new Error("invalid op: '" + op + "'");
  }
}

function stringToNumber(input) {
  var res = Number.parseFloat(input);
  if (Number.isNaN(res)) {
    throw new Error("'" + input + "' is not a number");
  }
  return res;
}

function parseArguments(args, convert) {
  if (args.length != 3) {
    throw new Error("need three arguments: number operand number");
  }
  
  indices = [0, 2];
  for (var i in indices) {
    var index = indices[i];
    try {
      args[index] = convert(args[index]);
    } catch (e) {
      throw new Error("argument " + (index + 1) + " must be a number, got '" + args[index] + "'");
    }
  }
  
  return args;
}

function main(argv, parse, handler, errors, result) {
  try {
    var res = handler(parse(argv.splice(2, argv.length)))
    result.write(res + "\n");
    return 0;
  } catch (e) {
    errors.write(e.message + "\n");
    return 1;
  }
}

module.exports = {
  main: main,
  calculate: calculate,
  stringToNumber: stringToNumber,
  parseArguments: parseArguments
};
