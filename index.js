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

const accounts = [account1, account2, account3, account4];
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
  labelBalance.textContent = `${acc.balance}€`;
};
const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;
  const out = acc.movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`;
  const interest = acc.movements
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}€`;
};

//UPDATE UI ACCOUNT
const updateUi = function (acc) {
  //display Movements
  displayMovements(acc.movements);
  //display SUMMARY
  calcDisplaySummary(acc);
  //Display Balnce
  displayBalance(acc);
};
// implement login
let currentAccount;
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
  const amount = Number(inputTransferAmount.value);
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
  //update ui
  updateUi(currentAccount);
});
//////////////////////////////////////////////
