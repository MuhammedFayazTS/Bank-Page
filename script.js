class Account{
    constructor(AccNo,AccName,AccPass,Amount){
        this.acno = AccNo;
        this.acname = AccName;
        this.acpass = AccPass;
        this.amount = Amount;
    }
    getacc(){
        console.log(this.acno , this.acname ,this.acpass,this.amount);
    }
}

function register(){
    // fetch values from the html
    acno = AccNo.value;
    acname = AccName.value;
    acpass = AccPass.value;
    amount = 1000;
    s =acno;
    s = new Account(acno,acname,acpass,amount);
    s.getacc();

    // accdetails object
    accdetails = {
        acno,
        acname,
        acpass,
        'amount':amount
    }
    console.log(accdetails);
    // check if acno is already available
    if(acno in localStorage){
        alert("user already registered");
    }
    else{
        localStorage.setItem(acno,JSON.stringify(accdetails));
        alert('Registration Successful');
        // redirect to login page
        window.location='./index.html';
    }
}

// login
function login(){

    acno = AccNoLogin.value;
    acpass = AccPassLogin.value;
    if(acno in localStorage){
        let accDetails = JSON.parse(localStorage.getItem(acno))
        if(accDetails.acpass === acpass){
            var acc = new Account(accDetails.acno,accDetails.acname,accDetails.acpass,accDetails.amount);
            acc.getacc();
            window.location='./home.html'
            localStorage.setItem('temp',acno);
        }
        else{
            alert("wrong password!!")
        }
    }
    else{
        alert('Account Number does not exist!!')
    }
}

// deposit amount

function deposit(){
    acno = localStorage.getItem('temp')
    accdetails = JSON.parse(localStorage.getItem(acno))
    amount = Number(depositAmount.value);
    pass = depositPass.value;
    if(accdetails.acpass === pass){
        accdetails.amount += amount;
        localStorage.setItem(acno,JSON.stringify(accdetails));
        alert(`${acno} Credited with ${amount}RS`)
         window.location.reload();   
    }
    else{
        alert('Wrong password!!')
    }
}

function withdraw(){
    acno = localStorage.getItem('temp')
    accdetails = JSON.parse(localStorage.getItem(acno))
    withdrawAmount = Number(withdrawAmount.value);
    pass = withdrawPass.value;
    if(accdetails.acpass === pass){
        if(accdetails.amount-withdrawAmount < 0){
            alert('Insufficient Balance');
        }
        else{
            accdetails.amount -= withdrawAmount;
            localStorage.setItem(acno,JSON.stringify(accdetails));
            alert(`${acno} Debited with ${withdrawAmount}RS`)
            window.location.reload();
        }
    }
    else{
        alert('Wrong password!!')
    }
}
acno = localStorage.getItem('temp')
accdetails = JSON.parse(localStorage.getItem(acno));
Balance = document.getElementById('balance')
Balance.innerText = `${accdetails.amount}`