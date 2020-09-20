//calling addVoter Method

const response = await contract.methods
  .addVoter("0x82ef247050aba28c18f7a12f61dbe5bd9e494b88", "pankaj")
  .send({ from: accounts[0] });
console.log(response);

//calling public variable totalVoter

const data = await contract.methods.totalVoter.call().call();
console.log(data);

//calling a mapped variable voterRegister

   const voterData = await contract.methods
     .voterRegister("0x82ef247050aba28c18f7a12f61dbe5bd9e494b88")
     .call();
   console.log(voterData);


