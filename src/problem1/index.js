// Using for loop
var sum_to_n_a = function (n) {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
};

// Using array reduce method
var sum_to_n_b = function (n) {
  const arr = Array.from({ length: n }, (_, index) => index + 1);
  return arr.reduce((a, b) => a + b, 0);
};

// Using recursive function
var sum_to_n_c = function (n) {
  if (n === 0) {
    return 0;
  } else {
    return n + sum_to_n_c(n - 1);
  }
};
