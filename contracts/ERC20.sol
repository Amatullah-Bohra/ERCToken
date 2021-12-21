//SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.6.8 <0.9.0;

interface IERC20 {
    function totalSupply() external view returns(uint256);
    function balanceOf(address account) external view returns (uint256);
    function transfer(address recipient , uint256 amount) external returns(bool);
    
    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    
}

contract ERCToken is IERC20 {
    string public _name;
    string public _symbol;
    uint8 public _decimals;
    address public manager;
   // uint256 public timeStart;
    
    mapping(address => uint256) balances;
    
    mapping(address => mapping(address => uint256)) allowed;
    
    uint256 totalSupply_;

    
    event Mint(address indexed minter, address indexed account, uint256 amount);
    event Burn(address indexed burner, address indexed account, uint256 amount);
    
    event Approval (address indexed tokenOwner,address indexed _spender,uint tokens);
    
    
    constructor(string memory name, string memory symbol, uint8 decimal, uint256 _totalSupply) public {
           totalSupply_ = _totalSupply;
            balances[msg.sender] = _totalSupply;
            manager = msg.sender;
           _name =name;
            _symbol=symbol;
            _decimals = decimal;
           // timeStart = block.timestamp;
     }

   function totalSupply() public override view returns (uint256) {
       return totalSupply_;
   }
   
   function balanceOf(address tokenOwner) public override view returns (uint256 balance) {
        return balances[tokenOwner];
    }
    
    function transfer(address receiver,uint256 numTokens) public override returns (bool) {
        require (balances[msg.sender] >= numTokens);
        balances[msg.sender] -= numTokens;
        balances[receiver] += numTokens;
        emit Transfer(msg.sender,receiver,numTokens);
        return true;
    }
    
   modifier onlyOwner {
        require(msg.sender == manager, "only admin can run this function");
        _;
    }
  /*  uint256 Seconds_in_a_year = 3153600; //60*60*24*365
    function MintBurnEveryYear() public{
        uint256 timeElapsed = block.timestamp - timeStart;
        if(timeElapsed>Seconds_in_a_year){
            mint();   //mint 2% every year
            burn();   //burn 1% every year///////////////////
            timeStart = block.timestamp;
        }
    }
    
    function mint () private returns(uint256) {
        uint256 mint_qyt = ((2*totalSupply_)/100);
        balances[manager]+= mint_qyt;
        totalSupply_+=mint_qyt;
        return totalSupply_;
    }
    
    function burn () private returns(uint256) {
        uint256 burn_qty =((1*totalSupply_)/100);
        require(balances[msg.sender]>=burn_qty);
        totalSupply_-= burn_qty;
        balances [msg.sender] -= burn_qty;
        return totalSupply_;
    }*/
    
     function allowance(address _owner, address _spender) public view returns (uint256 remaining) {
        return allowed[_owner][_spender];
    }
    

     function increaseAllowance(address spender, uint256 addedValue) public virtual returns (bool) {
       emit Approval(msg.sender, spender, allowed[msg.sender][spender] + addedValue);
        return true;
    }

     function decreaseAllowance(address spender, uint256 subtractedValue) public virtual returns (bool) {
        uint256 currentAllowance = allowed[msg.sender][spender];
        require(currentAllowance >= subtractedValue, "ERC20: decreased allowance below zero");

         emit Approval(msg.sender, spender, currentAllowance - subtractedValue);

        return true;
    }


        function approve(address _spender, uint256 _value) public returns (bool success) {
        allowed[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value); 
        return true;
    }
    
    

    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
        uint256 allowance1 = allowed[_from][msg.sender];
        require(balances[_from] >= _value && allowance1 >= _value);
        balances[_to] += _value;
        balances[_from] -= _value;
        allowed[_from][msg.sender] -= _value;
        emit Transfer(_from, _to, _value); 
        return true;
    }

        function mintTo(
        address _to,
        uint _amount
    ) public
        onlyOwner
    {
        require(_to != address(0), 'ERC20: to address is not valid');
        require(_amount > 0, 'ERC20: amount is not valid');

        totalSupply_ = totalSupply_+_amount;
        balances[_to] = balances[_to]+(_amount);

        emit Mint(msg.sender, _to, _amount);
    }

    function burnFrom(
        address _from,
        uint _amount
    ) public
        onlyOwner
    {
        require(_from != address(0), 'ERC20: from address is not valid');
        require(balances[_from] >= _amount, 'ERC20: insufficient balance');
        
        balances[_from] = balances[_from]-(_amount);
        totalSupply_ = totalSupply_ - (_amount);

        emit Burn(msg.sender, _from, _amount);
    }

    
}

