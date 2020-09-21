//calling addVoter Method

const response = await contract.methods
  .addVoter("0x82ef247050aba28c18f7a12f61dbe5bd9e494b88", "pankaj")
  .send({ from: accounts[0] });
console.log(response);

//caling registerCandidate method
  const response = await contract.methods
    .registerCandidate("0x82ef247050aba28c18f7a12f61dbe5bd9e494b88", "pankaj")
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
   
//calling a mapped variable candRegister
   const candidateDate = await contract.methods
     .candRegister("0x82ef247050aba28c18f7a12f61dbe5bd9e494b88")
     .call();
console.log(candidateDate);
   
//calling a startVote method
const sVote = await contract.methods.startVote().send({ from: accounts[0] });
console.log(sVote);

//calling castVote method
 const response = await contract.methods
   .castVote("0x3bd56ccc6903f8ebbd87cc5e57f0005560bececd")
   .send({ from: accounts[0] });
 console.log(response);
  





