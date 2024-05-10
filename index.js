const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance-value");
const labelSumIn = document.querySelector(".summary_value_in");
const labelSumOut = document.querySelector(".summary_value_out");
const labelSumInterest = document.querySelector(".summary_value_interest");
const labelTimer = document.querySelector(".timer");
const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");
const btnLogin = document.querySelector(".login_btn");
const btnTransfer = document.querySelector(".form_btn_transfer");
const btnLoan = document.querySelector(".form_btn_loan");
const btnClose = document.querySelector(".form_btn_close");
const btnSort = document.querySelector(".btn_sort");
const inputLoginUsername = document.querySelector(".login_input_user");
const inputLoginPin = document.querySelector(".login_input_to");
const inputTransferTo = document.querySelector(".form_input_to");
const inputTransferAmount = document.querySelector(".form_input_amount");
const inputLoanAmount = document.querySelector(".form_input_loan_amount");
const inputCloseUsername = document.querySelector(".form_input_user");
const inputClosePin = document.querySelector(".form_input_pin");

const account1 = {
  owner: "Markos Teshome Shiferaw",
  movements: [200, 450, -400, 3000, -650, -130, 70, -1300],
  interestRate: 1.2,
  pin: 7066,
};
const account2 = {
  owner: "Abraham Shiferaw Fentahun",
  movements: [1174, -3500, -35, -1500, 3600, 7700, 45600, -16600],
  interestRate: 1.5,
  pin: 2112,
};
const account3 = {
  owner: "Temesgen Marie Getu",
  movements: [60000, -7000, -24455, -15433, 61600, 35600, -1600, -36600],
  interestRate: 0.7,
  pin: 2444,
};
const account4 = {
  owner: "Bayleyegn Shiferie Gezahegn",
  movements: [4200, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 1111,
};

const displayMovements = function (movements) {
  containerMovements.innerHTML = "";
  movements.forEach(function (mov, i) {
    const type = mov > 0 ? "deposit" : "withdrawal";
    const html = `<div class="movements_row">
    <div class="movements_type movements_type_${type}">${i + 1}${type}</div>
    <div class="movements_value">${mov}€</div>
  </div>`;
    containerMovements.insertAdjacentHTML("afterBegin", html);
  });
};
// const user = "Temesgen Abrham Markos";
const accounts = [account1, account2, account3, account4];

displayMovements(account1.movements);
const creatUserName = function (accs) {
  accs.forEach(function (acc) {
    acc.userName = acc.owner
      .toLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("");
  });
};
creatUserName(accounts);
console.log(accounts);
const movements = [200, 450, -400, 3000, -650, -130, 70, -1300];
const displayBalance = function (movements) {
  const balance = movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${balance}€`;
};
const calcDisplaySummary = function (movements) {
  const incomes = movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;
  const out = movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`;
  const interest = movements
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * 1.2) / 100)
    .filter((int, i, arr) => {
      console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}€`;
};

calcDisplaySummary(account1.movements);
displayBalance(account1.movements);

// const eurToUsd = 1.1;
// const resultPer70 = [39, 43, 59, 69, 28, 56, 24, 67, 22, 46];
// const totalPer100 = resultPer70.map(function (result) {
//   return (result += 27);
// });
// console.log(`Result Per70 ${resultPer70}`);
// console.log("------Thanks To Array Map------ ");
// console.log(`Result Per100 ${totalPer100}`);

// // const amountUSD = amount.map(function (mov) {
// //   return mov * eurToUsd;
// // });
// const amount = [39, 43, 59, 69, 28, 56, 24];
// const eurToUsd = 1.1;

// let amountUSD = amount.map((mov) => {
//   return mov * eurToUsd;
// });
// console.log(amountUSD);

// amountUSD = amount.map((mov) => mov * eurToUsd);
// console.log(amountUSD);

//******************* FILTER IN ARRAY ***********
/*
const result = [39, 43, 59, 69, 28, 56, 24, 67, 22, 46];
const selectedResult = result.filter((mov) => mov > 50);
console.log(`Registered Result:${result}`);
console.log(`Selected Result:${selectedResult}`);
const withdrawal = movements.filter((amount) => amount < 0);
console.log(`Whole Transaction :${movements}`);
console.log(`Your WithDrawalt:${withdrawal}`);
*/
//**********ReducedInArray*****************
// console.log(movements);
// const balance = movements.reduce(function (acc, cur, i, arr) {
//   console.log(`Iteration ${i}:${acc}`);
//   return acc + cur;
// }, 100);
// console.log(`Total Balance:${balance}`);
// // Get Maximum value in the Array
// const maxumumValue = movements.reduce(
//   (max, value) => (max > value ? max : (max = value)),
//   movements[0]
// );
// console.log(`The maximum value is ${maxumumValue}`);
// Array Method Magic Of Chainning
const eurToUsd = 1.1;
// PIPleine
const totalDepositUsd = movements
  .filter((mov) => mov > 0)
  .map((mov, i, arr) => {
    console.log(arr);
    return mov * eurToUsd;
  })

  .reduce((acc, cur) => (acc += cur), 0);
console.log(totalDepositUsd);
