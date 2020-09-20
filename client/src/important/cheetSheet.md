****contract class "Lottery"****

?Creating a Instance: 

#Lottery.deployed().then(function (instance) { app = instance ;} )

?calling getter:

#app.getterName();

?Getting Accounts:

#web3.eth.getAccounts().then(console.log);

?Assigning accounts to a variable:

#web3.eth.getAccounts().then(function (result) {accounts = result });

?calling a setter method:

#app.setterName(params , {from : [account] })

?calling a public variable:
#await contract.methods.varName.call().call();

