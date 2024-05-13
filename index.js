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
const inputLoginPin = document.querySelector(".login_input_pin");
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
  movementsDates: [
    "2024-05-13T21:31:17.178Z",
    "2024-05-14T07:42:02.383Z",
    "2024-05-15T09:15:04.904Z",
    "2024-04-16T10:17:24.185Z",
    "2024-05-13T14:11:59.604Z",
    "2024-05-14T17:01:17.194Z",
    "2024-05-15T23:36:17.929Z",
    "2024-05-17T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "pt-PT",
};
const account2 = {
  owner: "Abraham Shiferaw Fentahun",
  movements: [1174, -3500, -35, -1500, 3600, 7700, 45600, -16600],
  interestRate: 1.5,
  pin: 2112,
  movementsDates: [
    "2024-05-13T21:31:17.178Z",
    "2024-05-14T07:42:02.383Z",
    "2024-05-15T09:15:04.904Z",
    "2024-04-16T10:17:24.185Z",
    "2024-05-13T14:11:59.604Z",
    "2024-05-14T17:01:17.194Z",
    "2024-05-15T23:36:17.929Z",
    "2024-05-17T10:51:36.790Z",
  ],
  currency: "USD",
  locale: "en-US",
};
const formatMovementDate = function (date, locale) {
  const calcDaysPassed = (day2, day1) =>
    Math.round(Math.abs(day2 - day1) / (1000 * 60 * 60 * 24));
  const daysPassed = calcDaysPassed(new Date(), date);
  if (daysPassed === 0) return "Today";
  if (daysPassed === 1) return "Yesterday";
  if (daysPassed <= 7) return `${daysPassed}days ago`;
  // const day = `${date.getDate()}`.padStart(2, 0);
  // const month = `${date.getMonth() + 1}`.padStart(2, 0);
  // const year = date.getFullYear();
  return Intl.DateTimeFormat(locale).format(date);
};
const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = "";
  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;
  movs.forEach(function (mov, i) {
    const type = mov > 0 ? "deposit" : "withdrawal";
    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementDate(date, acc.locale);
    const formattedMove = new Intl.NumberFormat(acc.locale, {
      style: "currency",
      currency: "USD",
    }).format(mov);
    const html = `<div class="movements_row">
    <div class="movements_type movements_type_${type}">${i + 1}${type}</div>
    <div class="movements_date">${displayDate}</div> 
    <div class="movements_value">${formattedMove}</div>
  </div>`;
    containerMovements.insertAdjacentHTML("afterBegin", html);
  });
};

const accounts = [account1, account2];
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
const displayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance.toFixed(2)}€`;
};
const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes.toFixed(2)}€`;
  const out = acc.movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out).toFixed(2)}€`;
  const interest = acc.movements
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest.toFixed(2)}€`;
};

//UPDATE UI ACCOUNT
const updateUi = function (acc) {
  //display Movements
  displayMovements(acc);
  //display SUMMARY
  calcDisplaySummary(acc);
  //Display Balnce
  displayBalance(acc);
};
// EVENT HANDLER
let currentAccount;
// Fake Always Loggged In
currentAccount = account1;
updateUi(currentAccount);
containerApp.style.opacity = 100;
const now = new Date();
const option = {
  hour: "numeric",
  minute: "numeric",
  day: "numeric",
  month: "numeric",
  year: "numeric",
};
labelDate.textContent = new Intl.DateTimeFormat(
  currentAccount.locale,
  option
).format(now);

btnLogin.addEventListener("click", function (event) {
  event.preventDefault();
  currentAccount = accounts.find(
    (acc) => acc.userName === inputLoginUsername.value
  );
  if (currentAccount.pin === Number(inputLoginPin.value)) {
    // display message,movement,balance,summary;
    labelWelcome.textContent = `Welcome Dear,${
      currentAccount.owner.split(" ")[0]
    }`;
    inputLoginUsername.value = inputLoginPin.value = "";
    inputLoginPin.blur();
    containerApp.style.opacity = 100;
    //update ui
    updateUi(currentAccount);
  }
});
btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
  const receiverAccount = accounts.find(
    (acc) => acc.userName === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = "";
  if (
    amount > 0 &&
    currentAccount.balance >= amount &&
    receiverAccount &&
    receiverAccount?.userName !== currentAccount.userName
  ) {
    currentAccount.movements.push(-amount);
    receiverAccount.movements.push(amount);
  }
  // Add Transfer Date
  currentAccount.movementsDates.push(new Date().toISOString());
  receiverAccount.movementsDates.push(new Date().toISOString());
  //update ui
  updateUi(currentAccount);
});
// close container
btnClose.addEventListener("click", function (e) {
  e.preventDefault();
  if (
    currentAccount.userName === inputCloseUsername.value &&
    currentAccount.pin === +inputClosePin.value
  ) {
    const index = accounts.findIndex(
      (acc) => acc.userName === currentAccount.userName
    );
    // Delete Account
    accounts.splice(index, 1);
    containerApp.style.opacity = 0;
  }
  inputClosePin.value = inputCloseUsername.value = "";
});
btnLoan.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = Math.floor(inputLoanAmount.value);
  if (
    amount > 0 &&
    amount > currentAccount.movements.some((mov) => mov > amount * 0.1)
  ) {
    currentAccount.movements.push(amount);
    currentAccount.movementsDates.push(new Date().toISOString());
    updateUi(currentAccount);
  }
  inputLoanAmount.value = " ";
});
// LECTURES LECTURE LECTURES LECYURES LECTUES LECTURES LECTURES LESDTURELEC//
// FLAT AND FLATMAP METHOD
const arr = [[1, 2, 3, 4], [5, 6], 7, 8];
console.log(arr.flat());
const accountMovements = accounts.map((acc) => acc.movements);
console.log(accountMovements);
const allMovements = accountMovements.flat();
console.log(allMovements);
// const overallBalance = allMovements.reduce(acc, (mov) => acc + mov, 0);
const overallBalance = accounts
  .flatMap((mov) => mov.movements)
  .reduce((acc, mov) => acc + mov, 0);
console.log(overallBalance);
let sorted = false;
btnSort.addEventListener("click", function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

//######### S O R T I N G LECTURES

// 33333333333333333333333333333333333333333333
const movementes = [200, 450, -400, -650, -130, 70, 1300];
const owners = ["Markos", "Bekalu", "Abrham", "Temesgen"];
console.log(owners.sort());
console.log(movementes);
// Asssecending Order
movementes.sort((a, b) => a - b);
console.log(`Assending Order:${movementes}`);
// Dessending Order
movementes.sort((a, b) => b - a);
console.log(`Decending Order:${movementes}`);

// creating and filling array
const x = new Array(7);
x.fill(1, ...x);
console.log(x);

const y = Array.from({ length: 7 }, () => 7);
console.log(y);
const m = Array.from({ length: 7 }, (cur, i) => i + 1);

console.log(m);
const dice = new Array(100);
const randomDice = Array.from(
  { length: 100 },
  (cur, i) => Math.trunc(Math.random() * 100) + 1
);
console.log(randomDice);
// A R R A Y E X E R C E S I S E???????????????///
//exercise one
const bankDepositSum = accounts
  .flatMap((acc) => acc.movements)
  .filter((mov) => mov > 0)
  .reduce((acc, value) => acc + value, 0);
console.log(`The Total Deposite of Our Bank is ${bankDepositSum}`);
// exercise 2 how many deposits are present in //acounts >1000
// const numDeposit1000 = accounts
//   .flatMap((acc) => acc.movements)
//   .filter((mov) => mov >= 1000).length;
// console.log(numDeposit1000);

const numDeposit1000 = accounts
  .flatMap((acc) => acc.movements)
  .reduce((count, cur) => (cur >= 1000 ? count + 1 : count), 0);
console.log(numDeposit1000);
//##### Exercise 3 ######sum of deposit and withDrawal
const { deposit, withDrawal } = accounts
  .flatMap((mov) => mov.movements)
  .reduce(
    (sum, cur) => {
      cur > 0 ? (sum.deposit += cur) : (sum.withDrawal += cur);
      return sum;
    },
    { deposit: 0, withDrawal: 0 }
  );
console.log(deposit, withDrawal);
// Question Number Four
const converTitleCase = function (title) {
  const exception = ["a", "an", "the", "but", "or", "in", "with"];
  const titleCase = title
    .toLowerCase()
    .split(" ")
    .map((mov) =>
      exception.includes(mov) ? mov : mov[0].toUpperCase() + mov.slice(1)
    )
    .join(" ");
  return titleCase;
};
console.log(converTitleCase("this is a nice title"));
labelBalance.addEventListener("click", function () {
  [...document.querySelectorAll(".movements_row")].forEach(function (row, i) {
    if (i % 2 === 0) {
      row.style.backgroundColor = "orangered";
    }
    if (i % 3 === 0) {
      row.style.backgroundColor = "blue";
    }
  });
});

//Lectures//
// console.log(23 === 23.0);
// console.log(0.1 + 0.2);
// console.log(Number("23"));
// console.log(+"23");
// console.log(Number.parseInt("200px,10"));
// console.log(Number.parseInt("since7200"));
// console.log(Number.parseInt("2.56rem"));
// console.log(Number.parseFloat("2.56rem"));
// console.log(Number.isNaN(12 / 0));
// console.log(+"23");
// console.log(Number.isInteger(23.56));
// console.log(Number.isInteger(23.0));
// console.log(Number.isInteger(23));
// console.log(Math.sqrt(25));
// console.log(8 ** (1 / 3));
// console.log(Math.trunc(Math.random() * 10) + 1);
// const randomInt = (max, min) => Math.trunc(Math.random() * max - min + 1) + min;
// console.log(randomInt(200, 10));
// console.log(Math.ceil(23.677));
// console.log(Math.round(23.2));
// console.log(Math.round(23.8));
// console.log(Math.round(23.5));
// console.log(Math.trunc(23.2));
// console.log(Math.trunc(23.8));
// console.log(+(23.25666).toFixed(2));
// // Numeric Selector
// // 287,487,000,000
// const diameter = 287_460_000_000;
// console.log(diameter);
// const price = 345_99;
// const transferFee1 = 15_00;
// const transferFee2 = 1_500;
// console.log(transferFee1, transferFee2);
// // big int
// console.log(2 ** 53 - 1);
// console.log(Number.MAX_SAFE_INTEGER);
// console.log(11111111111132222222376666666666n);
// console.log(typeof 21837n);
// console.log(45n === 23);
// console.log(23 + "234");
// // ####DATE and Time ########
// const now = new Date();
// console.log(now);
// console.log(new Date(`May 13 2024 09:41:49`));
// console.log(new Date(`october 6 2001`));
// console.log(new Date(2001, 9, 19, 23, 59, 5));
// console.log(new Date(0));
// console.log(new Date(3 * 24 * 60 * 60 * 1000));
// const future = new Date(2037, 10, 19, 15, 23);
// console.log(future);
// console.log(future.getFullYear());
// console.log(future.getMonth());
// console.log(future.getDay());
// console.log(future.getDate());
// console.log(future.getHours());
// console.log(future.getMinutes());
// console.log(future.getSeconds());
// // console.log(future.getMilliseconds());
// console.log(future.toISOString());
// console.log(future.getTime());
// console.log(new Date(2142246180000));
// console.log(new Date());
// future.setFullYear(2040);
// console.log(future);

// const future = new Date(2037, 10, 19, 15, 14);
// console.log(+future);
// const calcDaysPassed = (day2, day1) =>
//   Math.abs(day2 - day1) / (1000 * 60 * 60 * 24);
// const days1 = calcDaysPassed(new Date(2001, 11, 7), new Date(2024, 5, 13));
// console.log(days1);

const num = 3674789.92;
const options = {
  style: "currency",
  unit: "celsius",
  currency: "EUR",
};
console.log(`US:${new Intl.NumberFormat("en-US", options).format(num)}`);
console.log(`Portugal:${new Intl.NumberFormat("pt-PT", options).format(num)}`);
console.log(`Germany:${new Intl.NumberFormat("de-DE", options).format(num)}`);
console.log(`Syria:${new Intl.NumberFormat("ar-SY", options).format(num)}`);
console.log(`Browser:${new Intl.NumberFormat(navigator.language).format(num)}`);
