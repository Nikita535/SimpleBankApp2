'use strict';

// Simply Bank App

const account1 = {
  userName: 'Cecil Ireland',
  transactions: [500, 250, -300, 5000, -850, -110, -170, 1100],
  interest: 1.5,
  pin: 1111,
  transactionsDates: [
    '2020-10-02T14:43:31.074Z',
    '2020-10-29T11:24:19.761Z',
    '2020-11-15T10:45:23.907Z',
    '2021-01-22T12:17:46.255Z',
    '2021-02-12T15:14:06.486Z',
    '2021-03-09T11:42:26.371Z',
    '2022-02-11T07:43:59.331Z',
    '2022-02-14T15:21:20.814Z',
  ],
  currency: 'USD',
  locale: 'ru-RU',
};

const account2 = {
  userName: 'Amani Salt',
  transactions: [2000, 6400, -1350, -70, -210, -2000, 5500, -30],
  interest: 1.3,
  pin: 2222,
  transactionsDates: [
    '2020-10-02T14:43:31.074Z',
    '2020-10-29T11:24:19.761Z',
    '2020-11-15T10:45:23.907Z',
    '2021-01-22T12:17:46.255Z',
    '2021-02-12T15:14:06.486Z',
    '2021-03-09T11:42:26.371Z',
    '2021-05-21T07:43:59.331Z',
    '2021-06-22T15:21:20.814Z',
  ],
  currency: 'USD',
  locale: 'uk-UA',
};

const account3 = {
  userName: 'Corey Martinez',
  transactions: [900, -200, 280, 300, -200, 150, 1400, -400],
  interest: 0.8,
  pin: 3333,
  transactionsDates: [
    '2020-10-02T14:43:31.074Z',
    '2020-10-29T11:24:19.761Z',
    '2020-11-15T10:45:23.907Z',
    '2021-01-22T12:17:46.255Z',
    '2021-02-12T15:14:06.486Z',
    '2021-03-09T11:42:26.371Z',
    '2021-05-21T07:43:59.331Z',
    '2021-06-22T15:21:20.814Z',
  ],
  currency: 'USD',
  locale: 'fr-FR',
};

const account4 = {
  userName: 'Kamile Searle',
  transactions: [530, 1300, 500, 40, 190],
  interest: 1,
  pin: 4444,
  transactionsDates: [
    '2020-10-02T14:43:31.074Z',
    '2020-10-29T11:24:19.761Z',
    '2020-11-15T10:45:23.907Z',
    '2021-01-22T12:17:46.255Z',
    '2021-02-12T15:14:06.486Z',
  ],
  currency: 'USD',
  locale: 'it-IT',
};

const account5 = {
  userName: 'Oliver Avila',
  transactions: [630, 800, 300, 50, 120],
  interest: 1.1,
  pin: 5555,
  transactionsDates: [
    '2020-10-02T14:43:31.074Z',
    '2020-10-29T11:24:19.761Z',
    '2020-11-15T10:45:23.907Z',
    '2021-01-22T12:17:46.255Z',
    '2021-02-12T15:14:06.486Z',
  ],
  currency: 'USD',
  locale: 'ar-SY',
};

const accounts = [account1, account2, account3, account4, account5];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.total__value--in');
const labelSumOut = document.querySelector('.total__value--out');
const labelSumInterest = document.querySelector('.total__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerTransactions = document.querySelector('.transactions');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');


const formatTransactionDate=function(date,locale){

  const getDaysBetweenTwoDates=(date1,date2)=>Math.floor(Math.abs((date2-date1)/(1000*60*60*24)));
  const daysPassed=getDaysBetweenTwoDates(new Date(),date);
  
  if(daysPassed===0) return 'Сегодня';
  if(daysPassed===1) return 'Вчера';
  if(daysPassed<5) return `${daysPassed} дня назад`;
  if(daysPassed>=5 && daysPassed<=7) return `${daysPassed} дней назад`;
  else{
  // const day=`${date.getDate()}`.padStart(2,'0');
  // const month=`${date.getMonth()+1}`.padStart(2,'0');
  // const year=`${date.getFullYear()}`;
  // return `${day}/${month}/${year}`;
      return new Intl.DateTimeFormat(locale).format(date);
  }
}

const displayTransactions=function(account,sort=false){
  containerTransactions.innerHTML='';

const transacs=sort ? account.transactions.slice().sort((x,y)=>x-y) :account.transactions;

  transacs.forEach(function(trans,index){
    
    const tranType=trans>0 ? 'deposit':'withdrawal';

    const date=new Date(account.transactionsDates[index]);
    const transDate=formatTransactionDate(date,account.locale);

    const transactionsRow=`
    <div class="transactions__row">
          <div class="transactions__type transactions__type--${tranType}">
            ${index+1} ${tranType}
          </div>
          <div class="transactions__date">${transDate}</div>
          <div class="transactions__value">${trans}$</div>
    </div>
    `
    containerTransactions.insertAdjacentHTML('afterbegin',transactionsRow);
  })
}




const createUserNickname=function(accs){
    accs.forEach(function(acc){
      const userName=acc.userName;
      acc.userNickname=userName.toLowerCase().split(' ').map(word =>word[0]).join('');
    })
}

createUserNickname(accounts);


const dipslayBalance=function(account){
  const balance=account.transactions.reduce((acc,trans)=>acc+trans,0);
  account.balance=balance;
  labelBalance.textContent=`${balance}$`;
}




const displayTotal=function(account){
  const depositesTotal=account.transactions.filter(trans => trans>0).reduce((acc,trans)=>acc+trans,0);
  labelSumIn.textContent=`${depositesTotal}$`;

  const withdrawalsTotal=account.transactions.filter(trans=>trans<0).reduce((acc,trans)=>acc+trans,0);
  labelSumOut.textContent=`${withdrawalsTotal}$`;

  const interestTotal=account.transactions.filter(trans=>trans>0).map(depos=>(depos*account.interest)/100)
    .filter((interest,index,arr)=>interest>5).reduce((acc,interest)=>acc+interest);
  labelSumInterest.textContent=`${interestTotal}$`;
}

const updateUi=function(acc){
  displayTransactions(acc);
  dipslayBalance(acc);
  displayTotal(acc);
}

let currentAccount;//global

//Always logged in
// currentAccount=account1;
// updateUi(currentAccount);
// containerApp.style.opacity=100;

//now date

const now=new Date();
const day=`${now.getDate()}`.padStart(2,'0');
const month=`${now.getMonth()+1}`.padStart(2,'0');
const year=now.getFullYear();
labelDate.textContent=`${day}/${month}/${year}`;



btnLogin.addEventListener('click',function(e){
  e.preventDefault();
  currentAccount=accounts.find(account=>account.userNickname===inputLoginUsername.value);

  if( currentAccount?.pin === Number(inputLoginPin.value) && currentAccount){

    inputLoginPin.value='';
    inputLoginUsername.value='';
    inputLoginPin.blur();

    const now=new Date();
    // const day=`${now.getDate()}`.padStart(2,'0');
    // const month=`${now.getMonth()+1}`.padStart(2,'0');
    // const year=now.getFullYear();
    // labelDate.textContent=`${day}/${month}/${year}`;
    const optionsForDate={
      hour:'numeric',
      minute:'numeric',
      day:'2-digit',
      month:'long',
      year:'numeric',
      weekday:'long'
    }

    const locale =currentAccount.locale;
    labelDate.textContent=new Intl.DateTimeFormat(locale,optionsForDate).format(now);


    containerApp.style.opacity=100;
     labelWelcome.textContent=`Рады, что вы снова с нами, ${currentAccount.userName.split(' ')[0]}!`;
     updateUi(currentAccount);
  }
});

btnTransfer.addEventListener('click', function(e){
  e.preventDefault();
  const transferAmount=Number(inputTransferAmount.value);
  const recipientNickname=inputTransferTo.value;
  // const recipientAccount=accounts.find(function(acc){
  //   if(acc.userNickname===recipientNickname){
  //     return true;
  //   }else return false;
  // });

  const recipientAccount=accounts.find(acc=>acc.userNickname===recipientNickname);
  

  if (transferAmount>0 && currentAccount.balance>=transferAmount 
    && currentAccount.userNickname!==recipientAccount?.userNickname
    && recipientAccount){
      currentAccount.transactions.push(-transferAmount);
      recipientAccount.transactions.push(transferAmount);


      currentAccount.transactionsDates.push(new Date().toISOString());
      recipientAccount.transactionsDates.push(new Date().toISOString());

      updateUi(currentAccount);
  }
});

btnClose.addEventListener('click',function(e){
  e.preventDefault();
  if(inputCloseUsername.value === currentAccount.userNickname
    && Number(inputClosePin.value) === currentAccount.pin){
      const currentAccountIndex=accounts.findIndex(acc=>acc.userNickname === currentAccount.userNickname);
      accounts.splice(currentAccountIndex,1);
      containerApp.style.opacity=0;
      labelWelcome.textContent='Войдите в свой аккаунт';
      console.log(accounts);
  }
  inputClosePin.value='';
  inputCloseUsername.value='';
});

btnLoan.addEventListener('click',function(e){
  e.preventDefault();
  const loanAmount=Number(inputLoanAmount.value);

  if(loanAmount>0 && currentAccount.transactions.some(trans=>trans>=loanAmount*10/100)){
    currentAccount.transactions.push(loanAmount);
    currentAccount.transactionsDates.push(new Date().toISOString());
    updateUi(currentAccount);
  }
});

let areTransactionsSort=false;

btnSort.addEventListener('click',function(e){
  e.preventDefault();
  displayTransactions(currentAccount,!areTransactionsSort);
  areTransactionsSort=!areTransactionsSort;
  
})


