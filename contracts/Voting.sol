

pragma solidity ^0.5.3;

contract Voting {
    
    struct candidate{
        string name;
        address candAddress;
        string citizenship;
        string party;
        uint votes;
        
    }

    struct vote{
        address voterAddress;
        address toAddress;
    }
    
    struct voter{
        string voterName;
        bool voted;
    }
    
    address[] public candidateAddress; 
   
    
    uint public totalVoter = 0;
    uint public totalCandidate = 0;
    uint public totalVote = 0;
    address public ballotOfficialAddress;      
    string public ballotOfficialName;
    uint private winnerVotes;
    address public winner;
    
    mapping(uint => vote) public votes;
    mapping(address => voter) public voterRegister;
    mapping (address => candidate) public candRegister;
    mapping(address => uint) public votesRecieved;
    
    enum State { Created, Voting, Ended }
	State public state;
	
	//creates a new ballot contract
	constructor( string memory _ballotOfficialName) public {
        ballotOfficialAddress = msg.sender;
        ballotOfficialName = _ballotOfficialName;
       
        
        state = State.Created;
    }
    
    
	modifier condition(bool _condition) {
		require(_condition);
		_;
	}

	modifier onlyOfficial() {
		require(msg.sender ==ballotOfficialAddress);
		_;
	}

	modifier inState(State _state) {
		require(state == _state);
		_;
	}

   
    
    //add candidate
    
     function registerCandidate(address _candidate, string memory _name , string memory _citizenship , string memory _party) onlyOfficial public inState(State.Created) {
        
        candidate memory m;
        m.name= _name;
        m.candAddress=_candidate;
        m.citizenship=_citizenship;
        m.party=_party;
        candRegister[_candidate]=m;
        candidateAddress.push(_candidate);
        totalCandidate++;
        
    }
    
    //add voter
    function addVoter(address _voterAddress, string memory _voterName)
        public
        inState(State.Created)
        onlyOfficial
    {
        voter memory v;
        v.voterName = _voterName;
        v.voted = false;
        voterRegister[_voterAddress] = v;
        
        totalVoter++;
      
    }

    //declare voting starts now
    function startVote()
        public
        inState(State.Created)
        onlyOfficial
    {
        state = State.Voting;     
       
    }


    
    function castVote(address _candidate) public{
        require(validCandidate(_candidate),"Not a Valid candidate");
        if (bytes(voterRegister[msg.sender].voterName).length != 0   && !voterRegister[msg.sender].voted){
        voterRegister[msg.sender].voted = true;
        vote memory v;
        v.voterAddress = msg.sender;
        v.toAddress= _candidate;
       
        votes[totalVote] = v;
        totalVote++;    
       // tempAddress=candRegister[_candidate];
        candRegister[_candidate].votes= candRegister[_candidate].votes+1;
        votesRecieved[_candidate]=votesRecieved[_candidate]+1;
    }
    }
    
    function validCandidate(address _candidate) view public returns(bool){
        
        for(uint i=0; i<candidateAddress.length;i++){
            
        
        if(candidateAddress[i]==_candidate){
            return true;
      }
    
        }
        return false;
    }
    
    
    
    function endVote()  public  inState(State.Voting) onlyOfficial
    {
        state = State.Ended;
 
    }
    
     function result() public{
        
        for(uint i=0; i<candidateAddress.length; i++){
            
            if(votesRecieved[candidateAddress[i]] >winnerVotes){
                winnerVotes=votesRecieved[candidateAddress[i]];
                winner=candidateAddress[i];
            }
        }
        
        
    }
}