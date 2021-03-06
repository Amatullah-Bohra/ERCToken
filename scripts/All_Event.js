
//import Web3 from 'web3';
const Web3 = require("web3");
let web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
​
// Get the ERC20 contract ABI from compiled smart contract json
const erc20TokenContractAbi = {
  "contractName": "ERCToken",
  "abi": [
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "symbol",
          "type": "string"
        },
        {
          "internalType": "uint8",
          "name": "decimal",
          "type": "uint8"
        },
        {
          "internalType": "uint256",
          "name": "_totalSupply",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "tokenOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "_spender",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "tokens",
          "type": "uint256"
        }
      ],
      "name": "Approval",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "burner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "account",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "Burn",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "minter",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "account",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "Mint",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "_from",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "_to",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_value",
          "type": "uint256"
        }
      ],
      "name": "Transfer",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "_decimals",
      "outputs": [
        {
          "internalType": "uint8",
          "name": "",
          "type": "uint8"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "_name",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "_symbol",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "manager",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "totalSupply",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "tokenOwner",
          "type": "address"
        }
      ],
      "name": "balanceOf",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "balance",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "receiver",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "numTokens",
          "type": "uint256"
        }
      ],
      "name": "transfer",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_owner",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_spender",
          "type": "address"
        }
      ],
      "name": "allowance",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "remaining",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "addedValue",
          "type": "uint256"
        }
      ],
      "name": "increaseAllowance",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "subtractedValue",
          "type": "uint256"
        }
      ],
      "name": "decreaseAllowance",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_spender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_value",
          "type": "uint256"
        }
      ],
      "name": "approve",
      "outputs": [
        {
          "internalType": "bool",
          "name": "success",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_value",
          "type": "uint256"
        }
      ],
      "name": "transferFrom",
      "outputs": [
        {
          "internalType": "bool",
          "name": "success",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_amount",
          "type": "uint256"
        }
      ],
      "name": "mintTo",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_from",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_amount",
          "type": "uint256"
        }
      ],
      "name": "burnFrom",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ],
  "metadata": "{\"compiler\":{\"version\":\"0.6.8+commit.0bbfe453\"},\"language\":\"Solidity\",\"output\":{\"abi\":[{\"inputs\":[{\"internalType\":\"string\",\"name\":\"name\",\"type\":\"string\"},{\"internalType\":\"string\",\"name\":\"symbol\",\"type\":\"string\"},{\"internalType\":\"uint8\",\"name\":\"decimal\",\"type\":\"uint8\"},{\"internalType\":\"uint256\",\"name\":\"_totalSupply\",\"type\":\"uint256\"}],\"stateMutability\":\"nonpayable\",\"type\":\"constructor\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"tokenOwner\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"_spender\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"tokens\",\"type\":\"uint256\"}],\"name\":\"Approval\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"burner\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"account\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"}],\"name\":\"Burn\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"minter\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"account\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"}],\"name\":\"Mint\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"_from\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"_to\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"_value\",\"type\":\"uint256\"}],\"name\":\"Transfer\",\"type\":\"event\"},{\"inputs\":[],\"name\":\"_decimals\",\"outputs\":[{\"internalType\":\"uint8\",\"name\":\"\",\"type\":\"uint8\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"_name\",\"outputs\":[{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"_symbol\",\"outputs\":[{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"_owner\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"_spender\",\"type\":\"address\"}],\"name\":\"allowance\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"remaining\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"_spender\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"_value\",\"type\":\"uint256\"}],\"name\":\"approve\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"success\",\"type\":\"bool\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"tokenOwner\",\"type\":\"address\"}],\"name\":\"balanceOf\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"balance\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"_from\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"_amount\",\"type\":\"uint256\"}],\"name\":\"burnFrom\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"spender\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"subtractedValue\",\"type\":\"uint256\"}],\"name\":\"decreaseAllowance\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"spender\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"addedValue\",\"type\":\"uint256\"}],\"name\":\"increaseAllowance\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"manager\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"_to\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"_amount\",\"type\":\"uint256\"}],\"name\":\"mintTo\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"totalSupply\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"receiver\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"numTokens\",\"type\":\"uint256\"}],\"name\":\"transfer\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"_from\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"_to\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"_value\",\"type\":\"uint256\"}],\"name\":\"transferFrom\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"success\",\"type\":\"bool\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"}],\"devdoc\":{\"methods\":{}},\"userdoc\":{\"methods\":{}}},\"settings\":{\"compilationTarget\":{\"project:/contracts/ERC20.sol\":\"ERCToken\"},\"evmVersion\":\"istanbul\",\"libraries\":{},\"metadata\":{\"bytecodeHash\":\"ipfs\"},\"optimizer\":{\"enabled\":false,\"runs\":200},\"remappings\":[]},\"sources\":{\"project:/contracts/ERC20.sol\":{\"keccak256\":\"0x7dfbd9145567819e6cd5c2527d106db10510e617b69acdc1092284c5b955c7aa\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://da686a265416a8382b8c5a6e1c03db961f70a35d590971670f800844afc76b1b\",\"dweb:/ipfs/Qme8gsJ8kCvE2riWa1EV55WWSQZK3v1gfs8fqHcvXhvpGr\"]}},\"version\":1}",
  "bytecode": "0x60806040523480156200001157600080fd5b506040516200190038038062001900833981810160405260808110156200003757600080fd5b81019080805160405193929190846401000000008211156200005857600080fd5b838201915060208201858111156200006f57600080fd5b82518660018202830111640100000000821117156200008d57600080fd5b8083526020830192505050908051906020019080838360005b83811015620000c3578082015181840152602081019050620000a6565b50505050905090810190601f168015620000f15780820380516001836020036101000a031916815260200191505b50604052602001805160405193929190846401000000008211156200011557600080fd5b838201915060208201858111156200012c57600080fd5b82518660018202830111640100000000821117156200014a57600080fd5b8083526020830192505050908051906020019080838360005b838110156200018057808201518184015260208101905062000163565b50505050905090810190601f168015620001ae5780820380516001836020036101000a031916815260200191505b5060405260200180519060200190929190805190602001909291905050508060058190555080600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555033600260016101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550836000908051906020019062000270929190620002af565b50826001908051906020019062000289929190620002af565b5081600260006101000a81548160ff021916908360ff160217905550505050506200035e565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10620002f257805160ff191683800117855562000323565b8280016001018555821562000323579182015b828111156200032257825182559160200191906001019062000305565b5b50905062000332919062000336565b5090565b6200035b91905b80821115620003575760008160009055506001016200033d565b5090565b90565b611592806200036e6000396000f3fe608060405234801561001057600080fd5b50600436106100ea5760003560e01c806370a082311161008c578063a9059cbb11610066578063a9059cbb14610427578063b09f12661461048d578063d28d885214610510578063dd62ed3e14610593576100ea565b806370a082311461031b57806379cc679014610373578063a457c2d7146103c1576100ea565b806332424aa3116100c857806332424aa3146101f9578063395093511461021d578063449a52f814610283578063481c6a75146102d1576100ea565b8063095ea7b3146100ef57806318160ddd1461015557806323b872dd14610173575b600080fd5b61013b6004803603604081101561010557600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291908035906020019092919050505061060b565b604051808215151515815260200191505060405180910390f35b61015d6106fd565b6040518082815260200191505060405180910390f35b6101df6004803603606081101561018957600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610707565b604051808215151515815260200191505060405180910390f35b610201610976565b604051808260ff1660ff16815260200191505060405180910390f35b6102696004803603604081101561023357600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610989565b604051808215151515815260200191505060405180910390f35b6102cf6004803603604081101561029957600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610a78565b005b6102d9610d4d565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b61035d6004803603602081101561033157600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610d73565b6040518082815260200191505060405180910390f35b6103bf6004803603604081101561038957600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610dbc565b005b61040d600480360360408110156103d757600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001909291905050506110d0565b604051808215151515815260200191505060405180910390f35b6104736004803603604081101561043d57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291908035906020019092919050505061121d565b604051808215151515815260200191505060405180910390f35b610495611374565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156104d55780820151818401526020810190506104ba565b50505050905090810190601f1680156105025780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b610518611412565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561055857808201518184015260208101905061053d565b50505050905090810190601f1680156105855780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6105f5600480360360408110156105a957600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506114b0565b6040518082815260200191505060405180910390f35b600081600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925846040518082815260200191505060405180910390a36001905092915050565b6000600554905090565b600080600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905082600360008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054101580156107d85750828110155b6107e157600080fd5b82600360008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254019250508190555082600360008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254039250508190555082600460008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825403925050819055508373ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef856040518082815260200191505060405180910390a360019150509392505050565b600260009054906101000a900460ff1681565b60008273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92584600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054016040518082815260200191505060405180910390a36001905092915050565b600260019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610b3b576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260208152602001807f6f6e6c792061646d696e2063616e2072756e20746869732066756e6374696f6e81525060200191505060405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415610bde576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601e8152602001807f45524332303a20746f2061646472657373206973206e6f742076616c6964000081525060200191505060405180910390fd5b60008111610c54576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601a8152602001807f45524332303a20616d6f756e74206973206e6f742076616c696400000000000081525060200191505060405180910390fd5b806005540160058190555080600360008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205401600360008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508173ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167fab8530f87dc9b59234c4623bf917212bb2536d647574c8e7e5da92c2ede0c9f8836040518082815260200191505060405180910390a35050565b600260019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000600360008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b600260019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610e7f576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260208152602001807f6f6e6c792061646d696e2063616e2072756e20746869732066756e6374696f6e81525060200191505060405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415610f22576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260208152602001807f45524332303a2066726f6d2061646472657373206973206e6f742076616c696481525060200191505060405180910390fd5b80600360008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020541015610fd7576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601b8152602001807f45524332303a20696e73756666696369656e742062616c616e6365000000000081525060200191505060405180910390fd5b80600360008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205403600360008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555080600554036005819055508173ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167fbac40739b0d4ca32fa2d82fc91630465ba3eddd1598da6fca393b26fb63b9453836040518082815260200191505060405180910390a35050565b600080600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050828110156111ab576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260258152602001806115386025913960400191505060405180910390fd5b8373ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9258584036040518082815260200191505060405180910390a3600191505092915050565b600081600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054101561126b57600080fd5b81600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254039250508190555081600360008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a36001905092915050565b60018054600181600116156101000203166002900480601f01602080910402602001604051908101604052809291908181526020018280546001816001161561010002031660029004801561140a5780601f106113df5761010080835404028352916020019161140a565b820191906000526020600020905b8154815290600101906020018083116113ed57829003601f168201915b505050505081565b60008054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156114a85780601f1061147d576101008083540402835291602001916114a8565b820191906000526020600020905b81548152906001019060200180831161148b57829003601f168201915b505050505081565b6000600460008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205490509291505056fe45524332303a2064656372656173656420616c6c6f77616e63652062656c6f77207a65726fa26469706673582212208d7d2a5653d339cb81d49dcfdfd85e763fba7a51ae91300d9efc4cad08b8f98864736f6c63430006080033",
  "deployedBytecode": "0x608060405234801561001057600080fd5b50600436106100ea5760003560e01c806370a082311161008c578063a9059cbb11610066578063a9059cbb14610427578063b09f12661461048d578063d28d885214610510578063dd62ed3e14610593576100ea565b806370a082311461031b57806379cc679014610373578063a457c2d7146103c1576100ea565b806332424aa3116100c857806332424aa3146101f9578063395093511461021d578063449a52f814610283578063481c6a75146102d1576100ea565b8063095ea7b3146100ef57806318160ddd1461015557806323b872dd14610173575b600080fd5b61013b6004803603604081101561010557600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291908035906020019092919050505061060b565b604051808215151515815260200191505060405180910390f35b61015d6106fd565b6040518082815260200191505060405180910390f35b6101df6004803603606081101561018957600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610707565b604051808215151515815260200191505060405180910390f35b610201610976565b604051808260ff1660ff16815260200191505060405180910390f35b6102696004803603604081101561023357600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610989565b604051808215151515815260200191505060405180910390f35b6102cf6004803603604081101561029957600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610a78565b005b6102d9610d4d565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b61035d6004803603602081101561033157600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610d73565b6040518082815260200191505060405180910390f35b6103bf6004803603604081101561038957600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610dbc565b005b61040d600480360360408110156103d757600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001909291905050506110d0565b604051808215151515815260200191505060405180910390f35b6104736004803603604081101561043d57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291908035906020019092919050505061121d565b604051808215151515815260200191505060405180910390f35b610495611374565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156104d55780820151818401526020810190506104ba565b50505050905090810190601f1680156105025780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b610518611412565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561055857808201518184015260208101905061053d565b50505050905090810190601f1680156105855780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6105f5600480360360408110156105a957600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506114b0565b6040518082815260200191505060405180910390f35b600081600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925846040518082815260200191505060405180910390a36001905092915050565b6000600554905090565b600080600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905082600360008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054101580156107d85750828110155b6107e157600080fd5b82600360008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254019250508190555082600360008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254039250508190555082600460008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825403925050819055508373ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef856040518082815260200191505060405180910390a360019150509392505050565b600260009054906101000a900460ff1681565b60008273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92584600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054016040518082815260200191505060405180910390a36001905092915050565b600260019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610b3b576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260208152602001807f6f6e6c792061646d696e2063616e2072756e20746869732066756e6374696f6e81525060200191505060405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415610bde576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601e8152602001807f45524332303a20746f2061646472657373206973206e6f742076616c6964000081525060200191505060405180910390fd5b60008111610c54576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601a8152602001807f45524332303a20616d6f756e74206973206e6f742076616c696400000000000081525060200191505060405180910390fd5b806005540160058190555080600360008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205401600360008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508173ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167fab8530f87dc9b59234c4623bf917212bb2536d647574c8e7e5da92c2ede0c9f8836040518082815260200191505060405180910390a35050565b600260019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000600360008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b600260019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610e7f576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260208152602001807f6f6e6c792061646d696e2063616e2072756e20746869732066756e6374696f6e81525060200191505060405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415610f22576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260208152602001807f45524332303a2066726f6d2061646472657373206973206e6f742076616c696481525060200191505060405180910390fd5b80600360008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020541015610fd7576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601b8152602001807f45524332303a20696e73756666696369656e742062616c616e6365000000000081525060200191505060405180910390fd5b80600360008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205403600360008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555080600554036005819055508173ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167fbac40739b0d4ca32fa2d82fc91630465ba3eddd1598da6fca393b26fb63b9453836040518082815260200191505060405180910390a35050565b600080600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050828110156111ab576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260258152602001806115386025913960400191505060405180910390fd5b8373ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9258584036040518082815260200191505060405180910390a3600191505092915050565b600081600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054101561126b57600080fd5b81600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254039250508190555081600360008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a36001905092915050565b60018054600181600116156101000203166002900480601f01602080910402602001604051908101604052809291908181526020018280546001816001161561010002031660029004801561140a5780601f106113df5761010080835404028352916020019161140a565b820191906000526020600020905b8154815290600101906020018083116113ed57829003601f168201915b505050505081565b60008054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156114a85780601f1061147d576101008083540402835291602001916114a8565b820191906000526020600020905b81548152906001019060200180831161148b57829003601f168201915b505050505081565b6000600460008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205490509291505056fe45524332303a2064656372656173656420616c6c6f77616e63652062656c6f77207a65726fa26469706673582212208d7d2a5653d339cb81d49dcfdfd85e763fba7a51ae91300d9efc4cad08b8f98864736f6c63430006080033",
  "immutableReferences": {},
  "sourceMap": "397:4661:0:-:0;;;984:357;5:9:-1;2:2;;;27:1;24;17:12;2:2;984:357:0;;;;;;;;;;;;;;;15:3:-1;10;7:12;4:2;;;32:1;29;22:12;4:2;984:357:0;;;;;;;;;;;;;19:11:-1;14:3;11:20;8:2;;;44:1;41;34:12;8:2;71:11;66:3;62:21;55:28;;123:4;118:3;114:14;159:9;141:16;138:31;135:2;;;182:1;179;172:12;135:2;219:3;213:10;330:9;325:1;311:12;307:20;289:16;285:43;282:58;261:11;247:12;244:29;233:115;230:2;;;361:1;358;351:12;230:2;384:12;379:3;372:25;420:4;415:3;411:14;404:21;;0:432;;984:357:0;;;;;;;;;;23:1:-1;8:100;33:3;30:1;27:10;8:100;;;99:1;94:3;90:11;84:18;80:1;75:3;71:11;64:39;52:2;49:1;45:10;40:15;;8:100;;;12:14;984:357:0;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;19:11:-1;14:3;11:20;8:2;;;44:1;41;34:12;8:2;71:11;66:3;62:21;55:28;;123:4;118:3;114:14;159:9;141:16;138:31;135:2;;;182:1;179;172:12;135:2;219:3;213:10;330:9;325:1;311:12;307:20;289:16;285:43;282:58;261:11;247:12;244:29;233:115;230:2;;;361:1;358;351:12;230:2;384:12;379:3;372:25;420:4;415:3;411:14;404:21;;0:432;;984:357:0;;;;;;;;;;23:1:-1;8:100;33:3;30:1;27:10;8:100;;;99:1;94:3;90:11;84:18;80:1;75:3;71:11;64:39;52:2;49:1;45:10;40:15;;8:100;;;12:14;984:357:0;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1110:12;1095;:27;;;;1159:12;1136:8;:20;1145:10;1136:20;;;;;;;;;;;;;;;:35;;;;1195:10;1185:7;;:20;;;;;;;;;;;;;;;;;;1225:4;1218:5;:11;;;;;;;;;;;;:::i;:::-;;1251:6;1243:7;:14;;;;;;;;;;;;:::i;:::-;;1283:7;1271:9;;:19;;;;;;;;;;;;;;;;;;984:357;;;;397:4661;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;:::o;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;:::o;:::-;;;;;;;",
  "deployedSourceMap": "397:4661:0:-:0;;;;5:9:-1;2:2;;;27:1;24;17:12;2:2;397:4661:0;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;12:1:-1;9;2:12;3614:211:0;;;;;;15:2:-1;10:3;7:11;4:2;;;31:1;28;21:12;4:2;3614:211:0;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;1346:96;;;:::i;:::-;;;;;;;;;;;;;;;;;;;3841:407;;;;;;15:2:-1;10:3;7:11;4:2;;;31:1;28;21:12;4:2;3841:407:0;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;483:22;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;3018:208;;;;;;15:2:-1;10:3;7:11;4:2;;;31:1;28;21:12;4:2;3018:208:0;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;4258:372;;;;;;15:2:-1;10:3;7:11;4:2;;;31:1;28;21:12;4:2;4258:372:0;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;511:22;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;1450:130;;;;;;15:2:-1;10:3;7:11;4:2;;;31:1;28;21:12;4:2;1450:130:0;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;4636:414;;;;;;15:2:-1;10:3;7:11;4:2;;;31:1;28;21:12;4:2;4636:414:0;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;3233:370;;;;;;15:2:-1;10:3;7:11;4:2;;;31:1;28;21:12;4:2;3233:370:0;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;1590:304;;;;;;15:2:-1;10:3;7:11;4:2;;;31:1;28;21:12;4:2;1590:304:0;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;456:21;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;23:1:-1;8:100;33:3;30:1;27:10;8:100;;;99:1;94:3;90:11;84:18;80:1;75:3;71:11;64:39;52:2;49:1;45:10;40:15;;8:100;;;12:14;456:21:0;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;431:19;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;23:1:-1;8:100;33:3;30:1;27:10;8:100;;;99:1;94:3;90:11;84:18;80:1;75:3;71:11;64:39;52:2;49:1;45:10;40:15;;8:100;;;12:14;431:19:0;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2864:142;;;;;;15:2:-1;10:3;7:11;4:2;;;31:1;28;21:12;4:2;2864:142:0;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;3614:211;3681:12;3737:6;3705:7;:19;3713:10;3705:19;;;;;;;;;;;;;;;:29;3725:8;3705:29;;;;;;;;;;;;;;;:38;;;;3779:8;3758:38;;3767:10;3758:38;;;3789:6;3758:38;;;;;;;;;;;;;;;;;;3814:4;3807:11;;3614:211;;;;:::o;1346:96::-;1399:7;1424:12;;1417:19;;1346:96;:::o;3841:407::-;3923:12;3947:18;3968:7;:14;3976:5;3968:14;;;;;;;;;;;;;;;:26;3983:10;3968:26;;;;;;;;;;;;;;;;3947:47;;4031:6;4012:8;:15;4021:5;4012:15;;;;;;;;;;;;;;;;:25;;:49;;;;;4055:6;4041:10;:20;;4012:49;4004:58;;12:1:-1;9;2:12;4004:58:0;4089:6;4072:8;:13;4081:3;4072:13;;;;;;;;;;;;;;;;:23;;;;;;;;;;;4124:6;4105:8;:15;4114:5;4105:15;;;;;;;;;;;;;;;;:25;;;;;;;;;;;4170:6;4140:7;:14;4148:5;4140:14;;;;;;;;;;;;;;;:26;4155:10;4140:26;;;;;;;;;;;;;;;;:36;;;;;;;;;;;4207:3;4191:28;;4200:5;4191:28;;;4212:6;4191:28;;;;;;;;;;;;;;;;;;4237:4;4230:11;;;3841:407;;;;;:::o;483:22::-;;;;;;;;;;;;;:::o;3018:208::-;3106:4;3147:7;3126:72;;3135:10;3126:72;;;3187:10;3156:7;:19;3164:10;3156:19;;;;;;;;;;;;;;;:28;3176:7;3156:28;;;;;;;;;;;;;;;;:41;3126:72;;;;;;;;;;;;;;;;;;3215:4;3208:11;;3018:208;;;;:::o;4258:372::-;1954:7;;;;;;;;;;;1940:21;;:10;:21;;;1932:66;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;4385:1:::1;4370:17;;:3;:17;;;;4362:60;;;;;;;;;;;;;;;;;;;;;;;;;;;::::0;::::1;;;;;;;;;;;;;4450:1;4440:7;:11;4432:50;;;;;;;;;;;;;;;;;;;;;;;;;;;::::0;::::1;;;;;;;;;;;;;4521:7;4508:12;;:20;4493:12;:35;;;;4569:7;4554:8;:13;4563:3;4554:13;;;;;;;;;;;;;;;;:23;4538:8;:13;4547:3;4538:13;;;;;;;;;;;;;;;:39;;;;4610:3;4593:30;;4598:10;4593:30;;;4615:7;4593:30;;;;;;;;;;;;;;;;;;4258:372:::0;;:::o;511:22::-;;;;;;;;;;;;;:::o;1450:130::-;1519:15;1553:8;:20;1562:10;1553:20;;;;;;;;;;;;;;;;1546:27;;1450:130;;;:::o;4636:414::-;1954:7;;;;;;;;;;;1940:21;;:10;:21;;;1932:66;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;4769:1:::1;4752:19;;:5;:19;;;;4744:64;;;;;;;;;;;;;;;;;;;;;;;;;;;::::0;::::1;;;;;;;;;;;;;4845:7;4826:8;:15;4835:5;4826:15;;;;;;;;;;;;;;;;:26;;4818:66;;;;;;;;;;;;;;;;;;;;;;;;;;;::::0;::::1;;;;;;;;;;;;;4938:7;4921:8;:15;4930:5;4921:15;;;;;;;;;;;;;;;;:25;4903:8;:15;4912:5;4903:15;;;;;;;;;;;;;;;:43;;;;4987:7;4971:12;;:24;4956:12;:39;;;;5028:5;5011:32;;5016:10;5011:32;;;5035:7;5011:32;;;;;;;;;;;;;;;;;;4636:414:::0;;:::o;3233:370::-;3326:4;3342:24;3369:7;:19;3377:10;3369:19;;;;;;;;;;;;;;;:28;3389:7;3369:28;;;;;;;;;;;;;;;;3342:55;;3435:15;3415:16;:35;;3407:85;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;3530:7;3509:65;;3518:10;3509:65;;;3558:15;3539:16;:34;3509:65;;;;;;;;;;;;;;;;;;3592:4;3585:11;;;3233:370;;;;:::o;1590:304::-;1669:4;1718:9;1694:8;:20;1703:10;1694:20;;;;;;;;;;;;;;;;:33;;1685:43;;12:1:-1;9;2:12;1685:43:0;1762:9;1738:8;:20;1747:10;1738:20;;;;;;;;;;;;;;;;:33;;;;;;;;;;;1803:9;1781:8;:18;1790:8;1781:18;;;;;;;;;;;;;;;;:31;;;;;;;;;;;1847:8;1827:39;;1836:10;1827:39;;;1856:9;1827:39;;;;;;;;;;;;;;;;;;1883:4;1876:11;;1590:304;;;;:::o;456:21::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::o;431:19::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::o;2864:142::-;2938:17;2974:7;:15;2982:6;2974:15;;;;;;;;;;;;;;;:25;2990:8;2974:25;;;;;;;;;;;;;;;;2967:32;;2864:142;;;;:::o",
  "source": "//SPDX-License-Identifier: UNLICENSED\npragma solidity >=0.6.8 <0.9.0;\n\ninterface IERC20 {\n    function totalSupply() external view returns(uint256);\n    function balanceOf(address account) external view returns (uint256);\n    function transfer(address recipient , uint256 amount) external returns(bool);\n    \n    event Transfer(address indexed _from, address indexed _to, uint256 _value);\n    \n}\n\ncontract ERCToken is IERC20 {\n    string public _name;\n    string public _symbol;\n    uint8 public _decimals;\n    address public manager;\n   // uint256 public timeStart;\n    \n    mapping(address => uint256) balances;\n    \n    mapping(address => mapping(address => uint256)) allowed;\n    \n    uint256 totalSupply_;\n\n    \n    event Mint(address indexed minter, address indexed account, uint256 amount);\n    event Burn(address indexed burner, address indexed account, uint256 amount);\n    \n    event Approval (address indexed tokenOwner,address indexed _spender,uint tokens);\n    \n    \n    constructor(string memory name, string memory symbol, uint8 decimal, uint256 _totalSupply) public {\n           totalSupply_ = _totalSupply;\n            balances[msg.sender] = _totalSupply;\n            manager = msg.sender;\n           _name =name;\n            _symbol=symbol;\n            _decimals = decimal;\n           // timeStart = block.timestamp;\n     }\n\n   function totalSupply() public override view returns (uint256) {\n       return totalSupply_;\n   }\n   \n   function balanceOf(address tokenOwner) public override view returns (uint256 balance) {\n        return balances[tokenOwner];\n    }\n    \n    function transfer(address receiver,uint256 numTokens) public override returns (bool) {\n        require (balances[msg.sender] >= numTokens);\n        balances[msg.sender] -= numTokens;\n        balances[receiver] += numTokens;\n        emit Transfer(msg.sender,receiver,numTokens);\n        return true;\n    }\n    \n   modifier onlyOwner {\n        require(msg.sender == manager, \"only admin can run this function\");\n        _;\n    }\n  /*  uint256 Seconds_in_a_year = 3153600; //60*60*24*365\n    function MintBurnEveryYear() public{\n        uint256 timeElapsed = block.timestamp - timeStart;\n        if(timeElapsed>Seconds_in_a_year){\n            mint();   //mint 2% every year\n            burn();   //burn 1% every year///////////////////\n            timeStart = block.timestamp;\n        }\n    }\n    \n    function mint () private returns(uint256) {\n        uint256 mint_qyt = ((2*totalSupply_)/100);\n        balances[manager]+= mint_qyt;\n        totalSupply_+=mint_qyt;\n        return totalSupply_;\n    }\n    \n    function burn () private returns(uint256) {\n        uint256 burn_qty =((1*totalSupply_)/100);\n        require(balances[msg.sender]>=burn_qty);\n        totalSupply_-= burn_qty;\n        balances [msg.sender] -= burn_qty;\n        return totalSupply_;\n    }*/\n    \n     function allowance(address _owner, address _spender) public view returns (uint256 remaining) {\n        return allowed[_owner][_spender];\n    }\n    \n\n     function increaseAllowance(address spender, uint256 addedValue) public virtual returns (bool) {\n       emit Approval(msg.sender, spender, allowed[msg.sender][spender] + addedValue);\n        return true;\n    }\n\n     function decreaseAllowance(address spender, uint256 subtractedValue) public virtual returns (bool) {\n        uint256 currentAllowance = allowed[msg.sender][spender];\n        require(currentAllowance >= subtractedValue, \"ERC20: decreased allowance below zero\");\n\n         emit Approval(msg.sender, spender, currentAllowance - subtractedValue);\n\n        return true;\n    }\n\n\n        function approve(address _spender, uint256 _value) public returns (bool success) {\n        allowed[msg.sender][_spender] = _value;\n        emit Approval(msg.sender, _spender, _value); \n        return true;\n    }\n    \n    \n\n    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {\n        uint256 allowance1 = allowed[_from][msg.sender];\n        require(balances[_from] >= _value && allowance1 >= _value);\n        balances[_to] += _value;\n        balances[_from] -= _value;\n        allowed[_from][msg.sender] -= _value;\n        emit Transfer(_from, _to, _value); \n        return true;\n    }\n\n        function mintTo(\n        address _to,\n        uint _amount\n    ) public\n        onlyOwner\n    {\n        require(_to != address(0), 'ERC20: to address is not valid');\n        require(_amount > 0, 'ERC20: amount is not valid');\n\n        totalSupply_ = totalSupply_+_amount;\n        balances[_to] = balances[_to]+(_amount);\n\n        emit Mint(msg.sender, _to, _amount);\n    }\n\n    function burnFrom(\n        address _from,\n        uint _amount\n    ) public\n        onlyOwner\n    {\n        require(_from != address(0), 'ERC20: from address is not valid');\n        require(balances[_from] >= _amount, 'ERC20: insufficient balance');\n        \n        balances[_from] = balances[_from]-(_amount);\n        totalSupply_ = totalSupply_ - (_amount);\n\n        emit Burn(msg.sender, _from, _amount);\n    }\n\n    \n}\n\n",
  "sourcePath": "C:\\Users\\Amatullah Bohra\\task_4\\contracts\\ERC20.sol",
  "ast": {
    "absolutePath": "project:/contracts/ERC20.sol",
    "exportedSymbols": {
      "ERCToken": [
        468
      ],
      "IERC20": [
        31
      ]
    },
    "id": 469,
    "license": "UNLICENSED",
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 1,
        "literals": [
          "solidity",
          ">=",
          "0.6",
          ".8",
          "<",
          "0.9",
          ".0"
        ],
        "nodeType": "PragmaDirective",
        "src": "38:31:0"
      },
      {
        "abstract": false,
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "interface",
        "documentation": null,
        "fullyImplemented": false,
        "id": 31,
        "linearizedBaseContracts": [
          31
        ],
        "name": "IERC20",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": null,
            "functionSelector": "18160ddd",
            "id": 6,
            "implemented": false,
            "kind": "function",
            "modifiers": [],
            "name": "totalSupply",
            "nodeType": "FunctionDefinition",
            "overrides": null,
            "parameters": {
              "id": 2,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "114:2:0"
            },
            "returnParameters": {
              "id": 5,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4,
                  "mutability": "mutable",
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "overrides": null,
                  "scope": 6,
                  "src": "139:7:0",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "139:7:0",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "138:9:0"
            },
            "scope": 31,
            "src": "94:54:0",
            "stateMutability": "view",
            "virtual": false,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": null,
            "functionSelector": "70a08231",
            "id": 13,
            "implemented": false,
            "kind": "function",
            "modifiers": [],
            "name": "balanceOf",
            "nodeType": "FunctionDefinition",
            "overrides": null,
            "parameters": {
              "id": 9,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 8,
                  "mutability": "mutable",
                  "name": "account",
                  "nodeType": "VariableDeclaration",
                  "overrides": null,
                  "scope": 13,
                  "src": "172:15:0",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 7,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "172:7:0",
                    "stateMutability": "nonpayable",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "171:17:0"
            },
            "returnParameters": {
              "id": 12,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 11,
                  "mutability": "mutable",
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "overrides": null,
                  "scope": 13,
                  "src": "212:7:0",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 10,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "212:7:0",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "211:9:0"
            },
            "scope": 31,
            "src": "153:68:0",
            "stateMutability": "view",
            "virtual": false,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": null,
            "functionSelector": "a9059cbb",
            "id": 22,
            "implemented": false,
            "kind": "function",
            "modifiers": [],
            "name": "transfer",
            "nodeType": "FunctionDefinition",
            "overrides": null,
            "parameters": {
              "id": 18,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 15,
                  "mutability": "mutable",
                  "name": "recipient",
                  "nodeType": "VariableDeclaration",
                  "overrides": null,
                  "scope": 22,
                  "src": "244:17:0",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 14,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "244:7:0",
                    "stateMutability": "nonpayable",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 17,
                  "mutability": "mutable",
                  "name": "amount",
                  "nodeType": "VariableDeclaration",
                  "overrides": null,
                  "scope": 22,
                  "src": "264:14:0",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 16,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "264:7:0",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "243:36:0"
            },
            "returnParameters": {
              "id": 21,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 20,
                  "mutability": "mutable",
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "overrides": null,
                  "scope": 22,
                  "src": "297:4:0",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 19,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "297:4:0",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "296:6:0"
            },
            "scope": 31,
            "src": "226:77:0",
            "stateMutability": "nonpayable",
            "virtual": false,
            "visibility": "external"
          },
          {
            "anonymous": false,
            "documentation": null,
            "id": 30,
            "name": "Transfer",
            "nodeType": "EventDefinition",
            "parameters": {
              "id": 29,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 24,
                  "indexed": true,
                  "mutability": "mutable",
                  "name": "_from",
                  "nodeType": "VariableDeclaration",
                  "overrides": null,
                  "scope": 30,
                  "src": "328:21:0",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 23,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "328:7:0",
                    "stateMutability": "nonpayable",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 26,
                  "indexed": true,
                  "mutability": "mutable",
                  "name": "_to",
                  "nodeType": "VariableDeclaration",
                  "overrides": null,
                  "scope": 30,
                  "src": "351:19:0",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 25,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "351:7:0",
                    "stateMutability": "nonpayable",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 28,
                  "indexed": false,
                  "mutability": "mutable",
                  "name": "_value",
                  "nodeType": "VariableDeclaration",
                  "overrides": null,
                  "scope": 30,
                  "src": "372:14:0",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 27,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "372:7:0",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "327:60:0"
            },
            "src": "313:75:0"
          }
        ],
        "scope": 469,
        "src": "71:324:0"
      },
      {
        "abstract": false,
        "baseContracts": [
          {
            "arguments": null,
            "baseName": {
              "contractScope": null,
              "id": 32,
              "name": "IERC20",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 31,
              "src": "418:6:0",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_IERC20_$31",
                "typeString": "contract IERC20"
              }
            },
            "id": 33,
            "nodeType": "InheritanceSpecifier",
            "src": "418:6:0"
          }
        ],
        "contractDependencies": [
          31
        ],
        "contractKind": "contract",
        "documentation": null,
        "fullyImplemented": true,
        "id": 468,
        "linearizedBaseContracts": [
          468,
          31
        ],
        "name": "ERCToken",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "constant": false,
            "functionSelector": "d28d8852",
            "id": 35,
            "mutability": "mutable",
            "name": "_name",
            "nodeType": "VariableDeclaration",
            "overrides": null,
            "scope": 468,
            "src": "431:19:0",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_storage",
              "typeString": "string"
            },
            "typeName": {
              "id": 34,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "431:6:0",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": null,
            "visibility": "public"
          },
          {
            "constant": false,
            "functionSelector": "b09f1266",
            "id": 37,
            "mutability": "mutable",
            "name": "_symbol",
            "nodeType": "VariableDeclaration",
            "overrides": null,
            "scope": 468,
            "src": "456:21:0",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_storage",
              "typeString": "string"
            },
            "typeName": {
              "id": 36,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "456:6:0",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": null,
            "visibility": "public"
          },
          {
            "constant": false,
            "functionSelector": "32424aa3",
            "id": 39,
            "mutability": "mutable",
            "name": "_decimals",
            "nodeType": "VariableDeclaration",
            "overrides": null,
            "scope": 468,
            "src": "483:22:0",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_uint8",
              "typeString": "uint8"
            },
            "typeName": {
              "id": 38,
              "name": "uint8",
              "nodeType": "ElementaryTypeName",
              "src": "483:5:0",
              "typeDescriptions": {
                "typeIdentifier": "t_uint8",
                "typeString": "uint8"
              }
            },
            "value": null,
            "visibility": "public"
          },
          {
            "constant": false,
            "functionSelector": "481c6a75",
            "id": 41,
            "mutability": "mutable",
            "name": "manager",
            "nodeType": "VariableDeclaration",
            "overrides": null,
            "scope": 468,
            "src": "511:22:0",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_address",
              "typeString": "address"
            },
            "typeName": {
              "id": 40,
              "name": "address",
              "nodeType": "ElementaryTypeName",
              "src": "511:7:0",
              "stateMutability": "nonpayable",
              "typeDescriptions": {
                "typeIdentifier": "t_address",
                "typeString": "address"
              }
            },
            "value": null,
            "visibility": "public"
          },
          {
            "constant": false,
            "id": 45,
            "mutability": "mutable",
            "name": "balances",
            "nodeType": "VariableDeclaration",
            "overrides": null,
            "scope": 468,
            "src": "576:36:0",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_mapping$_t_address_$_t_uint256_$",
              "typeString": "mapping(address => uint256)"
            },
            "typeName": {
              "id": 44,
              "keyType": {
                "id": 42,
                "name": "address",
                "nodeType": "ElementaryTypeName",
                "src": "584:7:0",
                "typeDescriptions": {
                  "typeIdentifier": "t_address",
                  "typeString": "address"
                }
              },
              "nodeType": "Mapping",
              "src": "576:27:0",
              "typeDescriptions": {
                "typeIdentifier": "t_mapping$_t_address_$_t_uint256_$",
                "typeString": "mapping(address => uint256)"
              },
              "valueType": {
                "id": 43,
                "name": "uint256",
                "nodeType": "ElementaryTypeName",
                "src": "595:7:0",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                }
              }
            },
            "value": null,
            "visibility": "internal"
          },
          {
            "constant": false,
            "id": 51,
            "mutability": "mutable",
            "name": "allowed",
            "nodeType": "VariableDeclaration",
            "overrides": null,
            "scope": 468,
            "src": "623:55:0",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_mapping$_t_address_$_t_mapping$_t_address_$_t_uint256_$_$",
              "typeString": "mapping(address => mapping(address => uint256))"
            },
            "typeName": {
              "id": 50,
              "keyType": {
                "id": 46,
                "name": "address",
                "nodeType": "ElementaryTypeName",
                "src": "631:7:0",
                "typeDescriptions": {
                  "typeIdentifier": "t_address",
                  "typeString": "address"
                }
              },
              "nodeType": "Mapping",
              "src": "623:47:0",
              "typeDescriptions": {
                "typeIdentifier": "t_mapping$_t_address_$_t_mapping$_t_address_$_t_uint256_$_$",
                "typeString": "mapping(address => mapping(address => uint256))"
              },
              "valueType": {
                "id": 49,
                "keyType": {
                  "id": 47,
                  "name": "address",
                  "nodeType": "ElementaryTypeName",
                  "src": "650:7:0",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  }
                },
                "nodeType": "Mapping",
                "src": "642:27:0",
                "typeDescriptions": {
                  "typeIdentifier": "t_mapping$_t_address_$_t_uint256_$",
                  "typeString": "mapping(address => uint256)"
                },
                "valueType": {
                  "id": 48,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "661:7:0",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  }
                }
              }
            },
            "value": null,
            "visibility": "internal"
          },
          {
            "constant": false,
            "id": 53,
            "mutability": "mutable",
            "name": "totalSupply_",
            "nodeType": "VariableDeclaration",
            "overrides": null,
            "scope": 468,
            "src": "689:20:0",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_uint256",
              "typeString": "uint256"
            },
            "typeName": {
              "id": 52,
              "name": "uint256",
              "nodeType": "ElementaryTypeName",
              "src": "689:7:0",
              "typeDescriptions": {
                "typeIdentifier": "t_uint256",
                "typeString": "uint256"
              }
            },
            "value": null,
            "visibility": "internal"
          },
          {
            "anonymous": false,
            "documentation": null,
            "id": 61,
            "name": "Mint",
            "nodeType": "EventDefinition",
            "parameters": {
              "id": 60,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 55,
                  "indexed": true,
                  "mutability": "mutable",
                  "name": "minter",
                  "nodeType": "VariableDeclaration",
                  "overrides": null,
                  "scope": 61,
                  "src": "732:22:0",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 54,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "732:7:0",
                    "stateMutability": "nonpayable",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 57,
                  "indexed": true,
                  "mutability": "mutable",
                  "name": "account",
                  "nodeType": "VariableDeclaration",
                  "overrides": null,
                  "scope": 61,
                  "src": "756:23:0",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 56,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "756:7:0",
                    "stateMutability": "nonpayable",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 59,
                  "indexed": false,
                  "mutability": "mutable",
                  "name": "amount",
                  "nodeType": "VariableDeclaration",
                  "overrides": null,
                  "scope": 61,
                  "src": "781:14:0",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 58,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "781:7:0",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "731:65:0"
            },
            "src": "721:76:0"
          },
          {
            "anonymous": false,
            "documentation": null,
            "id": 69,
            "name": "Burn",
            "nodeType": "EventDefinition",
            "parameters": {
              "id": 68,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 63,
                  "indexed": true,
                  "mutability": "mutable",
                  "name": "burner",
                  "nodeType": "VariableDeclaration",
                  "overrides": null,
                  "scope": 69,
                  "src": "813:22:0",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 62,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "813:7:0",
                    "stateMutability": "nonpayable",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 65,
                  "indexed": true,
                  "mutability": "mutable",
                  "name": "account",
                  "nodeType": "VariableDeclaration",
                  "overrides": null,
                  "scope": 69,
                  "src": "837:23:0",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 64,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "837:7:0",
                    "stateMutability": "nonpayable",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 67,
                  "indexed": false,
                  "mutability": "mutable",
                  "name": "amount",
                  "nodeType": "VariableDeclaration",
                  "overrides": null,
                  "scope": 69,
                  "src": "862:14:0",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 66,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "862:7:0",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "812:65:0"
            },
            "src": "802:76:0"
          },
          {
            "anonymous": false,
            "documentation": null,
            "id": 77,
            "name": "Approval",
            "nodeType": "EventDefinition",
            "parameters": {
              "id": 76,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 71,
                  "indexed": true,
                  "mutability": "mutable",
                  "name": "tokenOwner",
                  "nodeType": "VariableDeclaration",
                  "overrides": null,
                  "scope": 77,
                  "src": "904:26:0",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 70,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "904:7:0",
                    "stateMutability": "nonpayable",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 73,
                  "indexed": true,
                  "mutability": "mutable",
                  "name": "_spender",
                  "nodeType": "VariableDeclaration",
                  "overrides": null,
                  "scope": 77,
                  "src": "931:24:0",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 72,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "931:7:0",
                    "stateMutability": "nonpayable",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 75,
                  "indexed": false,
                  "mutability": "mutable",
                  "name": "tokens",
                  "nodeType": "VariableDeclaration",
                  "overrides": null,
                  "scope": 77,
                  "src": "956:11:0",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 74,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "956:4:0",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "903:65:0"
            },
            "src": "888:81:0"
          },
          {
            "body": {
              "id": 116,
              "nodeType": "Block",
              "src": "1082:259:0",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 90,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 88,
                      "name": "totalSupply_",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 53,
                      "src": "1095:12:0",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "id": 89,
                      "name": "_totalSupply",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 85,
                      "src": "1110:12:0",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "1095:27:0",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "id": 91,
                  "nodeType": "ExpressionStatement",
                  "src": "1095:27:0"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 97,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "baseExpression": {
                        "argumentTypes": null,
                        "id": 92,
                        "name": "balances",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 45,
                        "src": "1136:8:0",
                        "typeDescriptions": {
                          "typeIdentifier": "t_mapping$_t_address_$_t_uint256_$",
                          "typeString": "mapping(address => uint256)"
                        }
                      },
                      "id": 95,
                      "indexExpression": {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 93,
                          "name": "msg",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": -15,
                          "src": "1145:3:0",
                          "typeDescriptions": {
                            "typeIdentifier": "t_magic_message",
                            "typeString": "msg"
                          }
                        },
                        "id": 94,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "sender",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": null,
                        "src": "1145:10:0",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address_payable",
                          "typeString": "address payable"
                        }
                      },
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": true,
                      "nodeType": "IndexAccess",
                      "src": "1136:20:0",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "id": 96,
                      "name": "_totalSupply",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 85,
                      "src": "1159:12:0",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "1136:35:0",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "id": 98,
                  "nodeType": "ExpressionStatement",
                  "src": "1136:35:0"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 102,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 99,
                      "name": "manager",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 41,
                      "src": "1185:7:0",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "id": 100,
                        "name": "msg",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": -15,
                        "src": "1195:3:0",
                        "typeDescriptions": {
                          "typeIdentifier": "t_magic_message",
                          "typeString": "msg"
                        }
                      },
                      "id": 101,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "sender",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": null,
                      "src": "1195:10:0",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address_payable",
                        "typeString": "address payable"
                      }
                    },
                    "src": "1185:20:0",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "id": 103,
                  "nodeType": "ExpressionStatement",
                  "src": "1185:20:0"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 106,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 104,
                      "name": "_name",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 35,
                      "src": "1218:5:0",
                      "typeDescriptions": {
                        "typeIdentifier": "t_string_storage",
                        "typeString": "string storage ref"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "id": 105,
                      "name": "name",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 79,
                      "src": "1225:4:0",
                      "typeDescriptions": {
                        "typeIdentifier": "t_string_memory_ptr",
                        "typeString": "string memory"
                      }
                    },
                    "src": "1218:11:0",
                    "typeDescriptions": {
                      "typeIdentifier": "t_string_storage",
                      "typeString": "string storage ref"
                    }
                  },
                  "id": 107,
                  "nodeType": "ExpressionStatement",
                  "src": "1218:11:0"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 110,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 108,
                      "name": "_symbol",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 37,
                      "src": "1243:7:0",
                      "typeDescriptions": {
                        "typeIdentifier": "t_string_storage",
                        "typeString": "string storage ref"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "id": 109,
                      "name": "symbol",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 81,
                      "src": "1251:6:0",
                      "typeDescriptions": {
                        "typeIdentifier": "t_string_memory_ptr",
                        "typeString": "string memory"
                      }
                    },
                    "src": "1243:14:0",
                    "typeDescriptions": {
                      "typeIdentifier": "t_string_storage",
                      "typeString": "string storage ref"
                    }
                  },
                  "id": 111,
                  "nodeType": "ExpressionStatement",
                  "src": "1243:14:0"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 114,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 112,
                      "name": "_decimals",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 39,
                      "src": "1271:9:0",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint8",
                        "typeString": "uint8"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "id": 113,
                      "name": "decimal",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 83,
                      "src": "1283:7:0",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint8",
                        "typeString": "uint8"
                      }
                    },
                    "src": "1271:19:0",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint8",
                      "typeString": "uint8"
                    }
                  },
                  "id": 115,
                  "nodeType": "ExpressionStatement",
                  "src": "1271:19:0"
                }
              ]
            },
            "documentation": null,
            "id": 117,
            "implemented": true,
            "kind": "constructor",
            "modifiers": [],
            "name": "",
            "nodeType": "FunctionDefinition",
            "overrides": null,
            "parameters": {
              "id": 86,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 79,
                  "mutability": "mutable",
                  "name": "name",
                  "nodeType": "VariableDeclaration",
                  "overrides": null,
                  "scope": 117,
                  "src": "996:18:0",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_string_memory_ptr",
                    "typeString": "string"
                  },
                  "typeName": {
                    "id": 78,
                    "name": "string",
                    "nodeType": "ElementaryTypeName",
                    "src": "996:6:0",
                    "typeDescriptions": {
                      "typeIdentifier": "t_string_storage_ptr",
                      "typeString": "string"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 81,
                  "mutability": "mutable",
                  "name": "symbol",
                  "nodeType": "VariableDeclaration",
                  "overrides": null,
                  "scope": 117,
                  "src": "1016:20:0",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_string_memory_ptr",
                    "typeString": "string"
                  },
                  "typeName": {
                    "id": 80,
                    "name": "string",
                    "nodeType": "ElementaryTypeName",
                    "src": "1016:6:0",
                    "typeDescriptions": {
                      "typeIdentifier": "t_string_storage_ptr",
                      "typeString": "string"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 83,
                  "mutability": "mutable",
                  "name": "decimal",
                  "nodeType": "VariableDeclaration",
                  "overrides": null,
                  "scope": 117,
                  "src": "1038:13:0",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint8",
                    "typeString": "uint8"
                  },
                  "typeName": {
                    "id": 82,
                    "name": "uint8",
                    "nodeType": "ElementaryTypeName",
                    "src": "1038:5:0",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint8",
                      "typeString": "uint8"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 85,
                  "mutability": "mutable",
                  "name": "_totalSupply",
                  "nodeType": "VariableDeclaration",
                  "overrides": null,
                  "scope": 117,
                  "src": "1053:20:0",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 84,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1053:7:0",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "995:79:0"
            },
            "returnParameters": {
              "id": 87,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1082:0:0"
            },
            "scope": 468,
            "src": "984:357:0",
            "stateMutability": "nonpayable",
            "virtual": false,
            "visibility": "public"
          },
          {
            "baseFunctions": [
              6
            ],
            "body": {
              "id": 125,
              "nodeType": "Block",
              "src": "1408:34:0",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 123,
                    "name": "totalSupply_",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 53,
                    "src": "1424:12:0",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "functionReturnParameters": 122,
                  "id": 124,
                  "nodeType": "Return",
                  "src": "1417:19:0"
                }
              ]
            },
            "documentation": null,
            "functionSelector": "18160ddd",
            "id": 126,
            "implemented": true,
            "kind": "function",
            "modifiers": [],
            "name": "totalSupply",
            "nodeType": "FunctionDefinition",
            "overrides": {
              "id": 119,
              "nodeType": "OverrideSpecifier",
              "overrides": [],
              "src": "1376:8:0"
            },
            "parameters": {
              "id": 118,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1366:2:0"
            },
            "returnParameters": {
              "id": 122,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 121,
                  "mutability": "mutable",
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "overrides": null,
                  "scope": 126,
                  "src": "1399:7:0",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 120,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1399:7:0",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1398:9:0"
            },
            "scope": 468,
            "src": "1346:96:0",
            "stateMutability": "view",
            "virtual": false,
            "visibility": "public"
          },
          {
            "baseFunctions": [
              13
            ],
            "body": {
              "id": 138,
              "nodeType": "Block",
              "src": "1536:44:0",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "baseExpression": {
                      "argumentTypes": null,
                      "id": 134,
                      "name": "balances",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 45,
                      "src": "1553:8:0",
                      "typeDescriptions": {
                        "typeIdentifier": "t_mapping$_t_address_$_t_uint256_$",
                        "typeString": "mapping(address => uint256)"
                      }
                    },
                    "id": 136,
                    "indexExpression": {
                      "argumentTypes": null,
                      "id": 135,
                      "name": "tokenOwner",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 128,
                      "src": "1562:10:0",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "isConstant": false,
                    "isLValue": true,
                    "isPure": false,
                    "lValueRequested": false,
                    "nodeType": "IndexAccess",
                    "src": "1553:20:0",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "functionReturnParameters": 133,
                  "id": 137,
                  "nodeType": "Return",
                  "src": "1546:27:0"
                }
              ]
            },
            "documentation": null,
            "functionSelector": "70a08231",
            "id": 139,
            "implemented": true,
            "kind": "function",
            "modifiers": [],
            "name": "balanceOf",
            "nodeType": "FunctionDefinition",
            "overrides": {
              "id": 130,
              "nodeType": "OverrideSpecifier",
              "overrides": [],
              "src": "1496:8:0"
            },
            "parameters": {
              "id": 129,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 128,
                  "mutability": "mutable",
                  "name": "tokenOwner",
                  "nodeType": "VariableDeclaration",
                  "overrides": null,
                  "scope": 139,
                  "src": "1469:18:0",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 127,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1469:7:0",
                    "stateMutability": "nonpayable",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1468:20:0"
            },
            "returnParameters": {
              "id": 133,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 132,
                  "mutability": "mutable",
                  "name": "balance",
                  "nodeType": "VariableDeclaration",
                  "overrides": null,
                  "scope": 139,
                  "src": "1519:15:0",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 131,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1519:7:0",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1518:17:0"
            },
            "scope": 468,
            "src": "1450:130:0",
            "stateMutability": "view",
            "virtual": false,
            "visibility": "public"
          },
          {
            "baseFunctions": [
              22
            ],
            "body": {
              "id": 180,
              "nodeType": "Block",
              "src": "1675:219:0",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "commonType": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        },
                        "id": 155,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "baseExpression": {
                            "argumentTypes": null,
                            "id": 150,
                            "name": "balances",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 45,
                            "src": "1694:8:0",
                            "typeDescriptions": {
                              "typeIdentifier": "t_mapping$_t_address_$_t_uint256_$",
                              "typeString": "mapping(address => uint256)"
                            }
                          },
                          "id": 153,
                          "indexExpression": {
                            "argumentTypes": null,
                            "expression": {
                              "argumentTypes": null,
                              "id": 151,
                              "name": "msg",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": -15,
                              "src": "1703:3:0",
                              "typeDescriptions": {
                                "typeIdentifier": "t_magic_message",
                                "typeString": "msg"
                              }
                            },
                            "id": 152,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "sender",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": null,
                            "src": "1703:10:0",
                            "typeDescriptions": {
                              "typeIdentifier": "t_address_payable",
                              "typeString": "address payable"
                            }
                          },
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "nodeType": "IndexAccess",
                          "src": "1694:20:0",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": ">=",
                        "rightExpression": {
                          "argumentTypes": null,
                          "id": 154,
                          "name": "numTokens",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 143,
                          "src": "1718:9:0",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "src": "1694:33:0",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      ],
                      "id": 149,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        -18,
                        -18
                      ],
                      "referencedDeclaration": -18,
                      "src": "1685:7:0",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 156,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "1685:43:0",
                    "tryCall": false,
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 157,
                  "nodeType": "ExpressionStatement",
                  "src": "1685:43:0"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 163,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "baseExpression": {
                        "argumentTypes": null,
                        "id": 158,
                        "name": "balances",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 45,
                        "src": "1738:8:0",
                        "typeDescriptions": {
                          "typeIdentifier": "t_mapping$_t_address_$_t_uint256_$",
                          "typeString": "mapping(address => uint256)"
                        }
                      },
                      "id": 161,
                      "indexExpression": {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 159,
                          "name": "msg",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": -15,
                          "src": "1747:3:0",
                          "typeDescriptions": {
                            "typeIdentifier": "t_magic_message",
                            "typeString": "msg"
                          }
                        },
                        "id": 160,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "sender",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": null,
                        "src": "1747:10:0",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address_payable",
                          "typeString": "address payable"
                        }
                      },
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": true,
                      "nodeType": "IndexAccess",
                      "src": "1738:20:0",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "-=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "id": 162,
                      "name": "numTokens",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 143,
                      "src": "1762:9:0",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "1738:33:0",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "id": 164,
                  "nodeType": "ExpressionStatement",
                  "src": "1738:33:0"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 169,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "baseExpression": {
                        "argumentTypes": null,
                        "id": 165,
                        "name": "balances",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 45,
                        "src": "1781:8:0",
                        "typeDescriptions": {
                          "typeIdentifier": "t_mapping$_t_address_$_t_uint256_$",
                          "typeString": "mapping(address => uint256)"
                        }
                      },
                      "id": 167,
                      "indexExpression": {
                        "argumentTypes": null,
                        "id": 166,
                        "name": "receiver",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 141,
                        "src": "1790:8:0",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": true,
                      "nodeType": "IndexAccess",
                      "src": "1781:18:0",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "+=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "id": 168,
                      "name": "numTokens",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 143,
                      "src": "1803:9:0",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "1781:31:0",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "id": 170,
                  "nodeType": "ExpressionStatement",
                  "src": "1781:31:0"
                },
                {
                  "eventCall": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 172,
                          "name": "msg",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": -15,
                          "src": "1836:3:0",
                          "typeDescriptions": {
                            "typeIdentifier": "t_magic_message",
                            "typeString": "msg"
                          }
                        },
                        "id": 173,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "sender",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": null,
                        "src": "1836:10:0",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address_payable",
                          "typeString": "address payable"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 174,
                        "name": "receiver",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 141,
                        "src": "1847:8:0",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 175,
                        "name": "numTokens",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 143,
                        "src": "1856:9:0",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_address_payable",
                          "typeString": "address payable"
                        },
                        {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        },
                        {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      ],
                      "id": 171,
                      "name": "Transfer",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 30,
                      "src": "1827:8:0",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_event_nonpayable$_t_address_$_t_address_$_t_uint256_$returns$__$",
                        "typeString": "function (address,address,uint256)"
                      }
                    },
                    "id": 176,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "1827:39:0",
                    "tryCall": false,
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 177,
                  "nodeType": "EmitStatement",
                  "src": "1822:44:0"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "hexValue": "74727565",
                    "id": 178,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": true,
                    "kind": "bool",
                    "lValueRequested": false,
                    "nodeType": "Literal",
                    "src": "1883:4:0",
                    "subdenomination": null,
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    },
                    "value": "true"
                  },
                  "functionReturnParameters": 148,
                  "id": 179,
                  "nodeType": "Return",
                  "src": "1876:11:0"
                }
              ]
            },
            "documentation": null,
            "functionSelector": "a9059cbb",
            "id": 181,
            "implemented": true,
            "kind": "function",
            "modifiers": [],
            "name": "transfer",
            "nodeType": "FunctionDefinition",
            "overrides": {
              "id": 145,
              "nodeType": "OverrideSpecifier",
              "overrides": [],
              "src": "1651:8:0"
            },
            "parameters": {
              "id": 144,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 141,
                  "mutability": "mutable",
                  "name": "receiver",
                  "nodeType": "VariableDeclaration",
                  "overrides": null,
                  "scope": 181,
                  "src": "1608:16:0",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 140,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1608:7:0",
                    "stateMutability": "nonpayable",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 143,
                  "mutability": "mutable",
                  "name": "numTokens",
                  "nodeType": "VariableDeclaration",
                  "overrides": null,
                  "scope": 181,
                  "src": "1625:17:0",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 142,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1625:7:0",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1607:36:0"
            },
            "returnParameters": {
              "id": 148,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 147,
                  "mutability": "mutable",
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "overrides": null,
                  "scope": 181,
                  "src": "1669:4:0",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 146,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "1669:4:0",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1668:6:0"
            },
            "scope": 468,
            "src": "1590:304:0",
            "stateMutability": "nonpayable",
            "virtual": false,
            "visibility": "public"
          },
          {
            "body": {
              "id": 192,
              "nodeType": "Block",
              "src": "1922:94:0",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "commonType": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        },
                        "id": 187,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 184,
                            "name": "msg",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": -15,
                            "src": "1940:3:0",
                            "typeDescriptions": {
                              "typeIdentifier": "t_magic_message",
                              "typeString": "msg"
                            }
                          },
                          "id": 185,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "sender",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": null,
                          "src": "1940:10:0",
                          "typeDescriptions": {
                            "typeIdentifier": "t_address_payable",
                            "typeString": "address payable"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": "==",
                        "rightExpression": {
                          "argumentTypes": null,
                          "id": 186,
                          "name": "manager",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 41,
                          "src": "1954:7:0",
                          "typeDescriptions": {
                            "typeIdentifier": "t_address",
                            "typeString": "address"
                          }
                        },
                        "src": "1940:21:0",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "hexValue": "6f6e6c792061646d696e2063616e2072756e20746869732066756e6374696f6e",
                        "id": 188,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "kind": "string",
                        "lValueRequested": false,
                        "nodeType": "Literal",
                        "src": "1963:34:0",
                        "subdenomination": null,
                        "typeDescriptions": {
                          "typeIdentifier": "t_stringliteral_4d0140eda1fc363a2f60e05319b2a31a626cb51369ffbf73d8c82ecae04113de",
                          "typeString": "literal_string \"only admin can run this function\""
                        },
                        "value": "only admin can run this function"
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        },
                        {
                          "typeIdentifier": "t_stringliteral_4d0140eda1fc363a2f60e05319b2a31a626cb51369ffbf73d8c82ecae04113de",
                          "typeString": "literal_string \"only admin can run this function\""
                        }
                      ],
                      "id": 183,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        -18,
                        -18
                      ],
                      "referencedDeclaration": -18,
                      "src": "1932:7:0",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 189,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "1932:66:0",
                    "tryCall": false,
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 190,
                  "nodeType": "ExpressionStatement",
                  "src": "1932:66:0"
                },
                {
                  "id": 191,
                  "nodeType": "PlaceholderStatement",
                  "src": "2008:1:0"
                }
              ]
            },
            "documentation": null,
            "id": 193,
            "name": "onlyOwner",
            "nodeType": "ModifierDefinition",
            "overrides": null,
            "parameters": {
              "id": 182,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1922:0:0"
            },
            "src": "1903:113:0",
            "virtual": false,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 208,
              "nodeType": "Block",
              "src": "2957:49:0",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "baseExpression": {
                      "argumentTypes": null,
                      "baseExpression": {
                        "argumentTypes": null,
                        "id": 202,
                        "name": "allowed",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 51,
                        "src": "2974:7:0",
                        "typeDescriptions": {
                          "typeIdentifier": "t_mapping$_t_address_$_t_mapping$_t_address_$_t_uint256_$_$",
                          "typeString": "mapping(address => mapping(address => uint256))"
                        }
                      },
                      "id": 204,
                      "indexExpression": {
                        "argumentTypes": null,
                        "id": 203,
                        "name": "_owner",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 195,
                        "src": "2982:6:0",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": false,
                      "nodeType": "IndexAccess",
                      "src": "2974:15:0",
                      "typeDescriptions": {
                        "typeIdentifier": "t_mapping$_t_address_$_t_uint256_$",
                        "typeString": "mapping(address => uint256)"
                      }
                    },
                    "id": 206,
                    "indexExpression": {
                      "argumentTypes": null,
                      "id": 205,
                      "name": "_spender",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 197,
                      "src": "2990:8:0",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "isConstant": false,
                    "isLValue": true,
                    "isPure": false,
                    "lValueRequested": false,
                    "nodeType": "IndexAccess",
                    "src": "2974:25:0",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "functionReturnParameters": 201,
                  "id": 207,
                  "nodeType": "Return",
                  "src": "2967:32:0"
                }
              ]
            },
            "documentation": null,
            "functionSelector": "dd62ed3e",
            "id": 209,
            "implemented": true,
            "kind": "function",
            "modifiers": [],
            "name": "allowance",
            "nodeType": "FunctionDefinition",
            "overrides": null,
            "parameters": {
              "id": 198,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 195,
                  "mutability": "mutable",
                  "name": "_owner",
                  "nodeType": "VariableDeclaration",
                  "overrides": null,
                  "scope": 209,
                  "src": "2883:14:0",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 194,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2883:7:0",
                    "stateMutability": "nonpayable",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 197,
                  "mutability": "mutable",
                  "name": "_spender",
                  "nodeType": "VariableDeclaration",
                  "overrides": null,
                  "scope": 209,
                  "src": "2899:16:0",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 196,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2899:7:0",
                    "stateMutability": "nonpayable",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2882:34:0"
            },
            "returnParameters": {
              "id": 201,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 200,
                  "mutability": "mutable",
                  "name": "remaining",
                  "nodeType": "VariableDeclaration",
                  "overrides": null,
                  "scope": 209,
                  "src": "2938:17:0",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 199,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "2938:7:0",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2937:19:0"
            },
            "scope": 468,
            "src": "2864:142:0",
            "stateMutability": "view",
            "virtual": false,
            "visibility": "public"
          },
          {
            "body": {
              "id": 234,
              "nodeType": "Block",
              "src": "3112:114:0",
              "statements": [
                {
                  "eventCall": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 219,
                          "name": "msg",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": -15,
                          "src": "3135:3:0",
                          "typeDescriptions": {
                            "typeIdentifier": "t_magic_message",
                            "typeString": "msg"
                          }
                        },
                        "id": 220,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "sender",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": null,
                        "src": "3135:10:0",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address_payable",
                          "typeString": "address payable"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 221,
                        "name": "spender",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 211,
                        "src": "3147:7:0",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "commonType": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        },
                        "id": 229,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "baseExpression": {
                            "argumentTypes": null,
                            "baseExpression": {
                              "argumentTypes": null,
                              "id": 222,
                              "name": "allowed",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 51,
                              "src": "3156:7:0",
                              "typeDescriptions": {
                                "typeIdentifier": "t_mapping$_t_address_$_t_mapping$_t_address_$_t_uint256_$_$",
                                "typeString": "mapping(address => mapping(address => uint256))"
                              }
                            },
                            "id": 225,
                            "indexExpression": {
                              "argumentTypes": null,
                              "expression": {
                                "argumentTypes": null,
                                "id": 223,
                                "name": "msg",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": -15,
                                "src": "3164:3:0",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_magic_message",
                                  "typeString": "msg"
                                }
                              },
                              "id": 224,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "lValueRequested": false,
                              "memberName": "sender",
                              "nodeType": "MemberAccess",
                              "referencedDeclaration": null,
                              "src": "3164:10:0",
                              "typeDescriptions": {
                                "typeIdentifier": "t_address_payable",
                                "typeString": "address payable"
                              }
                            },
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "nodeType": "IndexAccess",
                            "src": "3156:19:0",
                            "typeDescriptions": {
                              "typeIdentifier": "t_mapping$_t_address_$_t_uint256_$",
                              "typeString": "mapping(address => uint256)"
                            }
                          },
                          "id": 227,
                          "indexExpression": {
                            "argumentTypes": null,
                            "id": 226,
                            "name": "spender",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 211,
                            "src": "3176:7:0",
                            "typeDescriptions": {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            }
                          },
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "nodeType": "IndexAccess",
                          "src": "3156:28:0",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": "+",
                        "rightExpression": {
                          "argumentTypes": null,
                          "id": 228,
                          "name": "addedValue",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 213,
                          "src": "3187:10:0",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "src": "3156:41:0",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_address_payable",
                          "typeString": "address payable"
                        },
                        {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        },
                        {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      ],
                      "id": 218,
                      "name": "Approval",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 77,
                      "src": "3126:8:0",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_event_nonpayable$_t_address_$_t_address_$_t_uint256_$returns$__$",
                        "typeString": "function (address,address,uint256)"
                      }
                    },
                    "id": 230,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "3126:72:0",
                    "tryCall": false,
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 231,
                  "nodeType": "EmitStatement",
                  "src": "3121:77:0"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "hexValue": "74727565",
                    "id": 232,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": true,
                    "kind": "bool",
                    "lValueRequested": false,
                    "nodeType": "Literal",
                    "src": "3215:4:0",
                    "subdenomination": null,
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    },
                    "value": "true"
                  },
                  "functionReturnParameters": 217,
                  "id": 233,
                  "nodeType": "Return",
                  "src": "3208:11:0"
                }
              ]
            },
            "documentation": null,
            "functionSelector": "39509351",
            "id": 235,
            "implemented": true,
            "kind": "function",
            "modifiers": [],
            "name": "increaseAllowance",
            "nodeType": "FunctionDefinition",
            "overrides": null,
            "parameters": {
              "id": 214,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 211,
                  "mutability": "mutable",
                  "name": "spender",
                  "nodeType": "VariableDeclaration",
                  "overrides": null,
                  "scope": 235,
                  "src": "3045:15:0",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 210,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "3045:7:0",
                    "stateMutability": "nonpayable",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 213,
                  "mutability": "mutable",
                  "name": "addedValue",
                  "nodeType": "VariableDeclaration",
                  "overrides": null,
                  "scope": 235,
                  "src": "3062:18:0",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 212,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "3062:7:0",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3044:37:0"
            },
            "returnParameters": {
              "id": 217,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 216,
                  "mutability": "mutable",
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "overrides": null,
                  "scope": 235,
                  "src": "3106:4:0",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 215,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "3106:4:0",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3105:6:0"
            },
            "scope": 468,
            "src": "3018:208:0",
            "stateMutability": "nonpayable",
            "virtual": true,
            "visibility": "public"
          },
          {
            "body": {
              "id": 271,
              "nodeType": "Block",
              "src": "3332:271:0",
              "statements": [
                {
                  "assignments": [
                    245
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 245,
                      "mutability": "mutable",
                      "name": "currentAllowance",
                      "nodeType": "VariableDeclaration",
                      "overrides": null,
                      "scope": 271,
                      "src": "3342:24:0",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 244,
                        "name": "uint256",
                        "nodeType": "ElementaryTypeName",
                        "src": "3342:7:0",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 252,
                  "initialValue": {
                    "argumentTypes": null,
                    "baseExpression": {
                      "argumentTypes": null,
                      "baseExpression": {
                        "argumentTypes": null,
                        "id": 246,
                        "name": "allowed",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 51,
                        "src": "3369:7:0",
                        "typeDescriptions": {
                          "typeIdentifier": "t_mapping$_t_address_$_t_mapping$_t_address_$_t_uint256_$_$",
                          "typeString": "mapping(address => mapping(address => uint256))"
                        }
                      },
                      "id": 249,
                      "indexExpression": {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 247,
                          "name": "msg",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": -15,
                          "src": "3377:3:0",
                          "typeDescriptions": {
                            "typeIdentifier": "t_magic_message",
                            "typeString": "msg"
                          }
                        },
                        "id": 248,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "sender",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": null,
                        "src": "3377:10:0",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address_payable",
                          "typeString": "address payable"
                        }
                      },
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": false,
                      "nodeType": "IndexAccess",
                      "src": "3369:19:0",
                      "typeDescriptions": {
                        "typeIdentifier": "t_mapping$_t_address_$_t_uint256_$",
                        "typeString": "mapping(address => uint256)"
                      }
                    },
                    "id": 251,
                    "indexExpression": {
                      "argumentTypes": null,
                      "id": 250,
                      "name": "spender",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 237,
                      "src": "3389:7:0",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "isConstant": false,
                    "isLValue": true,
                    "isPure": false,
                    "lValueRequested": false,
                    "nodeType": "IndexAccess",
                    "src": "3369:28:0",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "3342:55:0"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "commonType": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        },
                        "id": 256,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "id": 254,
                          "name": "currentAllowance",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 245,
                          "src": "3415:16:0",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": ">=",
                        "rightExpression": {
                          "argumentTypes": null,
                          "id": 255,
                          "name": "subtractedValue",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 239,
                          "src": "3435:15:0",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "src": "3415:35:0",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "hexValue": "45524332303a2064656372656173656420616c6c6f77616e63652062656c6f77207a65726f",
                        "id": 257,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "kind": "string",
                        "lValueRequested": false,
                        "nodeType": "Literal",
                        "src": "3452:39:0",
                        "subdenomination": null,
                        "typeDescriptions": {
                          "typeIdentifier": "t_stringliteral_f8b476f7d28209d77d4a4ac1fe36b9f8259aa1bb6bddfa6e89de7e51615cf8a8",
                          "typeString": "literal_string \"ERC20: decreased allowance below zero\""
                        },
                        "value": "ERC20: decreased allowance below zero"
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        },
                        {
                          "typeIdentifier": "t_stringliteral_f8b476f7d28209d77d4a4ac1fe36b9f8259aa1bb6bddfa6e89de7e51615cf8a8",
                          "typeString": "literal_string \"ERC20: decreased allowance below zero\""
                        }
                      ],
                      "id": 253,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        -18,
                        -18
                      ],
                      "referencedDeclaration": -18,
                      "src": "3407:7:0",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 258,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "3407:85:0",
                    "tryCall": false,
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 259,
                  "nodeType": "ExpressionStatement",
                  "src": "3407:85:0"
                },
                {
                  "eventCall": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 261,
                          "name": "msg",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": -15,
                          "src": "3518:3:0",
                          "typeDescriptions": {
                            "typeIdentifier": "t_magic_message",
                            "typeString": "msg"
                          }
                        },
                        "id": 262,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "sender",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": null,
                        "src": "3518:10:0",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address_payable",
                          "typeString": "address payable"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 263,
                        "name": "spender",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 237,
                        "src": "3530:7:0",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "commonType": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        },
                        "id": 266,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "id": 264,
                          "name": "currentAllowance",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 245,
                          "src": "3539:16:0",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": "-",
                        "rightExpression": {
                          "argumentTypes": null,
                          "id": 265,
                          "name": "subtractedValue",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 239,
                          "src": "3558:15:0",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "src": "3539:34:0",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_address_payable",
                          "typeString": "address payable"
                        },
                        {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        },
                        {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      ],
                      "id": 260,
                      "name": "Approval",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 77,
                      "src": "3509:8:0",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_event_nonpayable$_t_address_$_t_address_$_t_uint256_$returns$__$",
                        "typeString": "function (address,address,uint256)"
                      }
                    },
                    "id": 267,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "3509:65:0",
                    "tryCall": false,
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 268,
                  "nodeType": "EmitStatement",
                  "src": "3504:70:0"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "hexValue": "74727565",
                    "id": 269,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": true,
                    "kind": "bool",
                    "lValueRequested": false,
                    "nodeType": "Literal",
                    "src": "3592:4:0",
                    "subdenomination": null,
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    },
                    "value": "true"
                  },
                  "functionReturnParameters": 243,
                  "id": 270,
                  "nodeType": "Return",
                  "src": "3585:11:0"
                }
              ]
            },
            "documentation": null,
            "functionSelector": "a457c2d7",
            "id": 272,
            "implemented": true,
            "kind": "function",
            "modifiers": [],
            "name": "decreaseAllowance",
            "nodeType": "FunctionDefinition",
            "overrides": null,
            "parameters": {
              "id": 240,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 237,
                  "mutability": "mutable",
                  "name": "spender",
                  "nodeType": "VariableDeclaration",
                  "overrides": null,
                  "scope": 272,
                  "src": "3260:15:0",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 236,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "3260:7:0",
                    "stateMutability": "nonpayable",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 239,
                  "mutability": "mutable",
                  "name": "subtractedValue",
                  "nodeType": "VariableDeclaration",
                  "overrides": null,
                  "scope": 272,
                  "src": "3277:23:0",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 238,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "3277:7:0",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3259:42:0"
            },
            "returnParameters": {
              "id": 243,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 242,
                  "mutability": "mutable",
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "overrides": null,
                  "scope": 272,
                  "src": "3326:4:0",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 241,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "3326:4:0",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3325:6:0"
            },
            "scope": 468,
            "src": "3233:370:0",
            "stateMutability": "nonpayable",
            "virtual": true,
            "visibility": "public"
          },
          {
            "body": {
              "id": 299,
              "nodeType": "Block",
              "src": "3695:130:0",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 288,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "baseExpression": {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 281,
                          "name": "allowed",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 51,
                          "src": "3705:7:0",
                          "typeDescriptions": {
                            "typeIdentifier": "t_mapping$_t_address_$_t_mapping$_t_address_$_t_uint256_$_$",
                            "typeString": "mapping(address => mapping(address => uint256))"
                          }
                        },
                        "id": 285,
                        "indexExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 282,
                            "name": "msg",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": -15,
                            "src": "3713:3:0",
                            "typeDescriptions": {
                              "typeIdentifier": "t_magic_message",
                              "typeString": "msg"
                            }
                          },
                          "id": 283,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "sender",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": null,
                          "src": "3713:10:0",
                          "typeDescriptions": {
                            "typeIdentifier": "t_address_payable",
                            "typeString": "address payable"
                          }
                        },
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "nodeType": "IndexAccess",
                        "src": "3705:19:0",
                        "typeDescriptions": {
                          "typeIdentifier": "t_mapping$_t_address_$_t_uint256_$",
                          "typeString": "mapping(address => uint256)"
                        }
                      },
                      "id": 286,
                      "indexExpression": {
                        "argumentTypes": null,
                        "id": 284,
                        "name": "_spender",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 274,
                        "src": "3725:8:0",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": true,
                      "nodeType": "IndexAccess",
                      "src": "3705:29:0",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "id": 287,
                      "name": "_value",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 276,
                      "src": "3737:6:0",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "3705:38:0",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "id": 289,
                  "nodeType": "ExpressionStatement",
                  "src": "3705:38:0"
                },
                {
                  "eventCall": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 291,
                          "name": "msg",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": -15,
                          "src": "3767:3:0",
                          "typeDescriptions": {
                            "typeIdentifier": "t_magic_message",
                            "typeString": "msg"
                          }
                        },
                        "id": 292,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "sender",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": null,
                        "src": "3767:10:0",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address_payable",
                          "typeString": "address payable"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 293,
                        "name": "_spender",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 274,
                        "src": "3779:8:0",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 294,
                        "name": "_value",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 276,
                        "src": "3789:6:0",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_address_payable",
                          "typeString": "address payable"
                        },
                        {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        },
                        {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      ],
                      "id": 290,
                      "name": "Approval",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 77,
                      "src": "3758:8:0",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_event_nonpayable$_t_address_$_t_address_$_t_uint256_$returns$__$",
                        "typeString": "function (address,address,uint256)"
                      }
                    },
                    "id": 295,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "3758:38:0",
                    "tryCall": false,
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 296,
                  "nodeType": "EmitStatement",
                  "src": "3753:43:0"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "hexValue": "74727565",
                    "id": 297,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": true,
                    "kind": "bool",
                    "lValueRequested": false,
                    "nodeType": "Literal",
                    "src": "3814:4:0",
                    "subdenomination": null,
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    },
                    "value": "true"
                  },
                  "functionReturnParameters": 280,
                  "id": 298,
                  "nodeType": "Return",
                  "src": "3807:11:0"
                }
              ]
            },
            "documentation": null,
            "functionSelector": "095ea7b3",
            "id": 300,
            "implemented": true,
            "kind": "function",
            "modifiers": [],
            "name": "approve",
            "nodeType": "FunctionDefinition",
            "overrides": null,
            "parameters": {
              "id": 277,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 274,
                  "mutability": "mutable",
                  "name": "_spender",
                  "nodeType": "VariableDeclaration",
                  "overrides": null,
                  "scope": 300,
                  "src": "3631:16:0",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 273,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "3631:7:0",
                    "stateMutability": "nonpayable",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 276,
                  "mutability": "mutable",
                  "name": "_value",
                  "nodeType": "VariableDeclaration",
                  "overrides": null,
                  "scope": 300,
                  "src": "3649:14:0",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 275,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "3649:7:0",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3630:34:0"
            },
            "returnParameters": {
              "id": 280,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 279,
                  "mutability": "mutable",
                  "name": "success",
                  "nodeType": "VariableDeclaration",
                  "overrides": null,
                  "scope": 300,
                  "src": "3681:12:0",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 278,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "3681:4:0",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3680:14:0"
            },
            "scope": 468,
            "src": "3614:211:0",
            "stateMutability": "nonpayable",
            "virtual": false,
            "visibility": "public"
          },
          {
            "body": {
              "id": 361,
              "nodeType": "Block",
              "src": "3937:311:0",
              "statements": [
                {
                  "assignments": [
                    312
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 312,
                      "mutability": "mutable",
                      "name": "allowance1",
                      "nodeType": "VariableDeclaration",
                      "overrides": null,
                      "scope": 361,
                      "src": "3947:18:0",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 311,
                        "name": "uint256",
                        "nodeType": "ElementaryTypeName",
                        "src": "3947:7:0",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 319,
                  "initialValue": {
                    "argumentTypes": null,
                    "baseExpression": {
                      "argumentTypes": null,
                      "baseExpression": {
                        "argumentTypes": null,
                        "id": 313,
                        "name": "allowed",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 51,
                        "src": "3968:7:0",
                        "typeDescriptions": {
                          "typeIdentifier": "t_mapping$_t_address_$_t_mapping$_t_address_$_t_uint256_$_$",
                          "typeString": "mapping(address => mapping(address => uint256))"
                        }
                      },
                      "id": 315,
                      "indexExpression": {
                        "argumentTypes": null,
                        "id": 314,
                        "name": "_from",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 302,
                        "src": "3976:5:0",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": false,
                      "nodeType": "IndexAccess",
                      "src": "3968:14:0",
                      "typeDescriptions": {
                        "typeIdentifier": "t_mapping$_t_address_$_t_uint256_$",
                        "typeString": "mapping(address => uint256)"
                      }
                    },
                    "id": 318,
                    "indexExpression": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "id": 316,
                        "name": "msg",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": -15,
                        "src": "3983:3:0",
                        "typeDescriptions": {
                          "typeIdentifier": "t_magic_message",
                          "typeString": "msg"
                        }
                      },
                      "id": 317,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "sender",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": null,
                      "src": "3983:10:0",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address_payable",
                        "typeString": "address payable"
                      }
                    },
                    "isConstant": false,
                    "isLValue": true,
                    "isPure": false,
                    "lValueRequested": false,
                    "nodeType": "IndexAccess",
                    "src": "3968:26:0",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "3947:47:0"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "commonType": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        },
                        "id": 329,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "commonType": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          },
                          "id": 325,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "leftExpression": {
                            "argumentTypes": null,
                            "baseExpression": {
                              "argumentTypes": null,
                              "id": 321,
                              "name": "balances",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 45,
                              "src": "4012:8:0",
                              "typeDescriptions": {
                                "typeIdentifier": "t_mapping$_t_address_$_t_uint256_$",
                                "typeString": "mapping(address => uint256)"
                              }
                            },
                            "id": 323,
                            "indexExpression": {
                              "argumentTypes": null,
                              "id": 322,
                              "name": "_from",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 302,
                              "src": "4021:5:0",
                              "typeDescriptions": {
                                "typeIdentifier": "t_address",
                                "typeString": "address"
                              }
                            },
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "nodeType": "IndexAccess",
                            "src": "4012:15:0",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "nodeType": "BinaryOperation",
                          "operator": ">=",
                          "rightExpression": {
                            "argumentTypes": null,
                            "id": 324,
                            "name": "_value",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 306,
                            "src": "4031:6:0",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "src": "4012:25:0",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bool",
                            "typeString": "bool"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": "&&",
                        "rightExpression": {
                          "argumentTypes": null,
                          "commonType": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          },
                          "id": 328,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "leftExpression": {
                            "argumentTypes": null,
                            "id": 326,
                            "name": "allowance1",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 312,
                            "src": "4041:10:0",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "nodeType": "BinaryOperation",
                          "operator": ">=",
                          "rightExpression": {
                            "argumentTypes": null,
                            "id": 327,
                            "name": "_value",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 306,
                            "src": "4055:6:0",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "src": "4041:20:0",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bool",
                            "typeString": "bool"
                          }
                        },
                        "src": "4012:49:0",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      ],
                      "id": 320,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        -18,
                        -18
                      ],
                      "referencedDeclaration": -18,
                      "src": "4004:7:0",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 330,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "4004:58:0",
                    "tryCall": false,
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 331,
                  "nodeType": "ExpressionStatement",
                  "src": "4004:58:0"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 336,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "baseExpression": {
                        "argumentTypes": null,
                        "id": 332,
                        "name": "balances",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 45,
                        "src": "4072:8:0",
                        "typeDescriptions": {
                          "typeIdentifier": "t_mapping$_t_address_$_t_uint256_$",
                          "typeString": "mapping(address => uint256)"
                        }
                      },
                      "id": 334,
                      "indexExpression": {
                        "argumentTypes": null,
                        "id": 333,
                        "name": "_to",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 304,
                        "src": "4081:3:0",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": true,
                      "nodeType": "IndexAccess",
                      "src": "4072:13:0",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "+=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "id": 335,
                      "name": "_value",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 306,
                      "src": "4089:6:0",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "4072:23:0",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "id": 337,
                  "nodeType": "ExpressionStatement",
                  "src": "4072:23:0"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 342,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "baseExpression": {
                        "argumentTypes": null,
                        "id": 338,
                        "name": "balances",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 45,
                        "src": "4105:8:0",
                        "typeDescriptions": {
                          "typeIdentifier": "t_mapping$_t_address_$_t_uint256_$",
                          "typeString": "mapping(address => uint256)"
                        }
                      },
                      "id": 340,
                      "indexExpression": {
                        "argumentTypes": null,
                        "id": 339,
                        "name": "_from",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 302,
                        "src": "4114:5:0",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": true,
                      "nodeType": "IndexAccess",
                      "src": "4105:15:0",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "-=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "id": 341,
                      "name": "_value",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 306,
                      "src": "4124:6:0",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "4105:25:0",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "id": 343,
                  "nodeType": "ExpressionStatement",
                  "src": "4105:25:0"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 351,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "baseExpression": {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 344,
                          "name": "allowed",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 51,
                          "src": "4140:7:0",
                          "typeDescriptions": {
                            "typeIdentifier": "t_mapping$_t_address_$_t_mapping$_t_address_$_t_uint256_$_$",
                            "typeString": "mapping(address => mapping(address => uint256))"
                          }
                        },
                        "id": 348,
                        "indexExpression": {
                          "argumentTypes": null,
                          "id": 345,
                          "name": "_from",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 302,
                          "src": "4148:5:0",
                          "typeDescriptions": {
                            "typeIdentifier": "t_address",
                            "typeString": "address"
                          }
                        },
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "nodeType": "IndexAccess",
                        "src": "4140:14:0",
                        "typeDescriptions": {
                          "typeIdentifier": "t_mapping$_t_address_$_t_uint256_$",
                          "typeString": "mapping(address => uint256)"
                        }
                      },
                      "id": 349,
                      "indexExpression": {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 346,
                          "name": "msg",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": -15,
                          "src": "4155:3:0",
                          "typeDescriptions": {
                            "typeIdentifier": "t_magic_message",
                            "typeString": "msg"
                          }
                        },
                        "id": 347,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "sender",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": null,
                        "src": "4155:10:0",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address_payable",
                          "typeString": "address payable"
                        }
                      },
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": true,
                      "nodeType": "IndexAccess",
                      "src": "4140:26:0",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "-=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "id": 350,
                      "name": "_value",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 306,
                      "src": "4170:6:0",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "4140:36:0",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "id": 352,
                  "nodeType": "ExpressionStatement",
                  "src": "4140:36:0"
                },
                {
                  "eventCall": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 354,
                        "name": "_from",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 302,
                        "src": "4200:5:0",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 355,
                        "name": "_to",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 304,
                        "src": "4207:3:0",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 356,
                        "name": "_value",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 306,
                        "src": "4212:6:0",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        },
                        {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        },
                        {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      ],
                      "id": 353,
                      "name": "Transfer",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 30,
                      "src": "4191:8:0",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_event_nonpayable$_t_address_$_t_address_$_t_uint256_$returns$__$",
                        "typeString": "function (address,address,uint256)"
                      }
                    },
                    "id": 357,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "4191:28:0",
                    "tryCall": false,
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 358,
                  "nodeType": "EmitStatement",
                  "src": "4186:33:0"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "hexValue": "74727565",
                    "id": 359,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": true,
                    "kind": "bool",
                    "lValueRequested": false,
                    "nodeType": "Literal",
                    "src": "4237:4:0",
                    "subdenomination": null,
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    },
                    "value": "true"
                  },
                  "functionReturnParameters": 310,
                  "id": 360,
                  "nodeType": "Return",
                  "src": "4230:11:0"
                }
              ]
            },
            "documentation": null,
            "functionSelector": "23b872dd",
            "id": 362,
            "implemented": true,
            "kind": "function",
            "modifiers": [],
            "name": "transferFrom",
            "nodeType": "FunctionDefinition",
            "overrides": null,
            "parameters": {
              "id": 307,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 302,
                  "mutability": "mutable",
                  "name": "_from",
                  "nodeType": "VariableDeclaration",
                  "overrides": null,
                  "scope": 362,
                  "src": "3863:13:0",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 301,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "3863:7:0",
                    "stateMutability": "nonpayable",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 304,
                  "mutability": "mutable",
                  "name": "_to",
                  "nodeType": "VariableDeclaration",
                  "overrides": null,
                  "scope": 362,
                  "src": "3878:11:0",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 303,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "3878:7:0",
                    "stateMutability": "nonpayable",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 306,
                  "mutability": "mutable",
                  "name": "_value",
                  "nodeType": "VariableDeclaration",
                  "overrides": null,
                  "scope": 362,
                  "src": "3891:14:0",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 305,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "3891:7:0",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3862:44:0"
            },
            "returnParameters": {
              "id": 310,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 309,
                  "mutability": "mutable",
                  "name": "success",
                  "nodeType": "VariableDeclaration",
                  "overrides": null,
                  "scope": 362,
                  "src": "3923:12:0",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 308,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "3923:4:0",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3922:14:0"
            },
            "scope": 468,
            "src": "3841:407:0",
            "stateMutability": "nonpayable",
            "virtual": false,
            "visibility": "public"
          },
          {
            "body": {
              "id": 412,
              "nodeType": "Block",
              "src": "4352:278:0",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "commonType": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        },
                        "id": 377,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "id": 372,
                          "name": "_to",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 364,
                          "src": "4370:3:0",
                          "typeDescriptions": {
                            "typeIdentifier": "t_address",
                            "typeString": "address"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": "!=",
                        "rightExpression": {
                          "argumentTypes": null,
                          "arguments": [
                            {
                              "argumentTypes": null,
                              "hexValue": "30",
                              "id": 375,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "4385:1:0",
                              "subdenomination": null,
                              "typeDescriptions": {
                                "typeIdentifier": "t_rational_0_by_1",
                                "typeString": "int_const 0"
                              },
                              "value": "0"
                            }
                          ],
                          "expression": {
                            "argumentTypes": [
                              {
                                "typeIdentifier": "t_rational_0_by_1",
                                "typeString": "int_const 0"
                              }
                            ],
                            "id": 374,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": true,
                            "lValueRequested": false,
                            "nodeType": "ElementaryTypeNameExpression",
                            "src": "4377:7:0",
                            "typeDescriptions": {
                              "typeIdentifier": "t_type$_t_address_$",
                              "typeString": "type(address)"
                            },
                            "typeName": {
                              "id": 373,
                              "name": "address",
                              "nodeType": "ElementaryTypeName",
                              "src": "4377:7:0",
                              "typeDescriptions": {
                                "typeIdentifier": null,
                                "typeString": null
                              }
                            }
                          },
                          "id": 376,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "typeConversion",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "4377:10:0",
                          "tryCall": false,
                          "typeDescriptions": {
                            "typeIdentifier": "t_address_payable",
                            "typeString": "address payable"
                          }
                        },
                        "src": "4370:17:0",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "hexValue": "45524332303a20746f2061646472657373206973206e6f742076616c6964",
                        "id": 378,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "kind": "string",
                        "lValueRequested": false,
                        "nodeType": "Literal",
                        "src": "4389:32:0",
                        "subdenomination": null,
                        "typeDescriptions": {
                          "typeIdentifier": "t_stringliteral_6415f4024abccc400ace23b1948b67fbfd7b265b8fd0d0012b4959c332f95923",
                          "typeString": "literal_string \"ERC20: to address is not valid\""
                        },
                        "value": "ERC20: to address is not valid"
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        },
                        {
                          "typeIdentifier": "t_stringliteral_6415f4024abccc400ace23b1948b67fbfd7b265b8fd0d0012b4959c332f95923",
                          "typeString": "literal_string \"ERC20: to address is not valid\""
                        }
                      ],
                      "id": 371,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        -18,
                        -18
                      ],
                      "referencedDeclaration": -18,
                      "src": "4362:7:0",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 379,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "4362:60:0",
                    "tryCall": false,
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 380,
                  "nodeType": "ExpressionStatement",
                  "src": "4362:60:0"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "commonType": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        },
                        "id": 384,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "id": 382,
                          "name": "_amount",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 366,
                          "src": "4440:7:0",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": ">",
                        "rightExpression": {
                          "argumentTypes": null,
                          "hexValue": "30",
                          "id": 383,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "4450:1:0",
                          "subdenomination": null,
                          "typeDescriptions": {
                            "typeIdentifier": "t_rational_0_by_1",
                            "typeString": "int_const 0"
                          },
                          "value": "0"
                        },
                        "src": "4440:11:0",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "hexValue": "45524332303a20616d6f756e74206973206e6f742076616c6964",
                        "id": 385,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "kind": "string",
                        "lValueRequested": false,
                        "nodeType": "Literal",
                        "src": "4453:28:0",
                        "subdenomination": null,
                        "typeDescriptions": {
                          "typeIdentifier": "t_stringliteral_2cbc8ec96bf431fc79e605094b9ed0553694f1459b3d65fab3b35f92dd6716dc",
                          "typeString": "literal_string \"ERC20: amount is not valid\""
                        },
                        "value": "ERC20: amount is not valid"
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        },
                        {
                          "typeIdentifier": "t_stringliteral_2cbc8ec96bf431fc79e605094b9ed0553694f1459b3d65fab3b35f92dd6716dc",
                          "typeString": "literal_string \"ERC20: amount is not valid\""
                        }
                      ],
                      "id": 381,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        -18,
                        -18
                      ],
                      "referencedDeclaration": -18,
                      "src": "4432:7:0",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 386,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "4432:50:0",
                    "tryCall": false,
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 387,
                  "nodeType": "ExpressionStatement",
                  "src": "4432:50:0"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 392,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 388,
                      "name": "totalSupply_",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 53,
                      "src": "4493:12:0",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "commonType": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "id": 391,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "leftExpression": {
                        "argumentTypes": null,
                        "id": 389,
                        "name": "totalSupply_",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 53,
                        "src": "4508:12:0",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "nodeType": "BinaryOperation",
                      "operator": "+",
                      "rightExpression": {
                        "argumentTypes": null,
                        "id": 390,
                        "name": "_amount",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 366,
                        "src": "4521:7:0",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "src": "4508:20:0",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "4493:35:0",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "id": 393,
                  "nodeType": "ExpressionStatement",
                  "src": "4493:35:0"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 403,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "baseExpression": {
                        "argumentTypes": null,
                        "id": 394,
                        "name": "balances",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 45,
                        "src": "4538:8:0",
                        "typeDescriptions": {
                          "typeIdentifier": "t_mapping$_t_address_$_t_uint256_$",
                          "typeString": "mapping(address => uint256)"
                        }
                      },
                      "id": 396,
                      "indexExpression": {
                        "argumentTypes": null,
                        "id": 395,
                        "name": "_to",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 364,
                        "src": "4547:3:0",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": true,
                      "nodeType": "IndexAccess",
                      "src": "4538:13:0",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "commonType": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "id": 402,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "leftExpression": {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 397,
                          "name": "balances",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 45,
                          "src": "4554:8:0",
                          "typeDescriptions": {
                            "typeIdentifier": "t_mapping$_t_address_$_t_uint256_$",
                            "typeString": "mapping(address => uint256)"
                          }
                        },
                        "id": 399,
                        "indexExpression": {
                          "argumentTypes": null,
                          "id": 398,
                          "name": "_to",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 364,
                          "src": "4563:3:0",
                          "typeDescriptions": {
                            "typeIdentifier": "t_address",
                            "typeString": "address"
                          }
                        },
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "nodeType": "IndexAccess",
                        "src": "4554:13:0",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "nodeType": "BinaryOperation",
                      "operator": "+",
                      "rightExpression": {
                        "argumentTypes": null,
                        "components": [
                          {
                            "argumentTypes": null,
                            "id": 400,
                            "name": "_amount",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 366,
                            "src": "4569:7:0",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          }
                        ],
                        "id": 401,
                        "isConstant": false,
                        "isInlineArray": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "nodeType": "TupleExpression",
                        "src": "4568:9:0",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "src": "4554:23:0",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "4538:39:0",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "id": 404,
                  "nodeType": "ExpressionStatement",
                  "src": "4538:39:0"
                },
                {
                  "eventCall": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 406,
                          "name": "msg",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": -15,
                          "src": "4598:3:0",
                          "typeDescriptions": {
                            "typeIdentifier": "t_magic_message",
                            "typeString": "msg"
                          }
                        },
                        "id": 407,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "sender",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": null,
                        "src": "4598:10:0",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address_payable",
                          "typeString": "address payable"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 408,
                        "name": "_to",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 364,
                        "src": "4610:3:0",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 409,
                        "name": "_amount",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 366,
                        "src": "4615:7:0",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_address_payable",
                          "typeString": "address payable"
                        },
                        {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        },
                        {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      ],
                      "id": 405,
                      "name": "Mint",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 61,
                      "src": "4593:4:0",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_event_nonpayable$_t_address_$_t_address_$_t_uint256_$returns$__$",
                        "typeString": "function (address,address,uint256)"
                      }
                    },
                    "id": 410,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "4593:30:0",
                    "tryCall": false,
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 411,
                  "nodeType": "EmitStatement",
                  "src": "4588:35:0"
                }
              ]
            },
            "documentation": null,
            "functionSelector": "449a52f8",
            "id": 413,
            "implemented": true,
            "kind": "function",
            "modifiers": [
              {
                "arguments": null,
                "id": 369,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 368,
                  "name": "onlyOwner",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 193,
                  "src": "4338:9:0",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "4338:9:0"
              }
            ],
            "name": "mintTo",
            "nodeType": "FunctionDefinition",
            "overrides": null,
            "parameters": {
              "id": 367,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 364,
                  "mutability": "mutable",
                  "name": "_to",
                  "nodeType": "VariableDeclaration",
                  "overrides": null,
                  "scope": 413,
                  "src": "4283:11:0",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 363,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "4283:7:0",
                    "stateMutability": "nonpayable",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 366,
                  "mutability": "mutable",
                  "name": "_amount",
                  "nodeType": "VariableDeclaration",
                  "overrides": null,
                  "scope": 413,
                  "src": "4304:12:0",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 365,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "4304:4:0",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "4273:49:0"
            },
            "returnParameters": {
              "id": 370,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "4352:0:0"
            },
            "scope": 468,
            "src": "4258:372:0",
            "stateMutability": "nonpayable",
            "virtual": false,
            "visibility": "public"
          },
          {
            "body": {
              "id": 466,
              "nodeType": "Block",
              "src": "4734:316:0",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "commonType": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        },
                        "id": 428,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "id": 423,
                          "name": "_from",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 415,
                          "src": "4752:5:0",
                          "typeDescriptions": {
                            "typeIdentifier": "t_address",
                            "typeString": "address"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": "!=",
                        "rightExpression": {
                          "argumentTypes": null,
                          "arguments": [
                            {
                              "argumentTypes": null,
                              "hexValue": "30",
                              "id": 426,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "4769:1:0",
                              "subdenomination": null,
                              "typeDescriptions": {
                                "typeIdentifier": "t_rational_0_by_1",
                                "typeString": "int_const 0"
                              },
                              "value": "0"
                            }
                          ],
                          "expression": {
                            "argumentTypes": [
                              {
                                "typeIdentifier": "t_rational_0_by_1",
                                "typeString": "int_const 0"
                              }
                            ],
                            "id": 425,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": true,
                            "lValueRequested": false,
                            "nodeType": "ElementaryTypeNameExpression",
                            "src": "4761:7:0",
                            "typeDescriptions": {
                              "typeIdentifier": "t_type$_t_address_$",
                              "typeString": "type(address)"
                            },
                            "typeName": {
                              "id": 424,
                              "name": "address",
                              "nodeType": "ElementaryTypeName",
                              "src": "4761:7:0",
                              "typeDescriptions": {
                                "typeIdentifier": null,
                                "typeString": null
                              }
                            }
                          },
                          "id": 427,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "typeConversion",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "4761:10:0",
                          "tryCall": false,
                          "typeDescriptions": {
                            "typeIdentifier": "t_address_payable",
                            "typeString": "address payable"
                          }
                        },
                        "src": "4752:19:0",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "hexValue": "45524332303a2066726f6d2061646472657373206973206e6f742076616c6964",
                        "id": 429,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "kind": "string",
                        "lValueRequested": false,
                        "nodeType": "Literal",
                        "src": "4773:34:0",
                        "subdenomination": null,
                        "typeDescriptions": {
                          "typeIdentifier": "t_stringliteral_4171c51e4f457093925af92a41380c952c98e8c76bd9595b75e2200d6f060d47",
                          "typeString": "literal_string \"ERC20: from address is not valid\""
                        },
                        "value": "ERC20: from address is not valid"
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        },
                        {
                          "typeIdentifier": "t_stringliteral_4171c51e4f457093925af92a41380c952c98e8c76bd9595b75e2200d6f060d47",
                          "typeString": "literal_string \"ERC20: from address is not valid\""
                        }
                      ],
                      "id": 422,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        -18,
                        -18
                      ],
                      "referencedDeclaration": -18,
                      "src": "4744:7:0",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 430,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "4744:64:0",
                    "tryCall": false,
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 431,
                  "nodeType": "ExpressionStatement",
                  "src": "4744:64:0"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "commonType": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        },
                        "id": 437,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "baseExpression": {
                            "argumentTypes": null,
                            "id": 433,
                            "name": "balances",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 45,
                            "src": "4826:8:0",
                            "typeDescriptions": {
                              "typeIdentifier": "t_mapping$_t_address_$_t_uint256_$",
                              "typeString": "mapping(address => uint256)"
                            }
                          },
                          "id": 435,
                          "indexExpression": {
                            "argumentTypes": null,
                            "id": 434,
                            "name": "_from",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 415,
                            "src": "4835:5:0",
                            "typeDescriptions": {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            }
                          },
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "nodeType": "IndexAccess",
                          "src": "4826:15:0",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": ">=",
                        "rightExpression": {
                          "argumentTypes": null,
                          "id": 436,
                          "name": "_amount",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 417,
                          "src": "4845:7:0",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "src": "4826:26:0",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "hexValue": "45524332303a20696e73756666696369656e742062616c616e6365",
                        "id": 438,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "kind": "string",
                        "lValueRequested": false,
                        "nodeType": "Literal",
                        "src": "4854:29:0",
                        "subdenomination": null,
                        "typeDescriptions": {
                          "typeIdentifier": "t_stringliteral_53c0a9b372dd4d10e0466e474511916fb244dbbc3766b7c40c21d1ec47086e63",
                          "typeString": "literal_string \"ERC20: insufficient balance\""
                        },
                        "value": "ERC20: insufficient balance"
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        },
                        {
                          "typeIdentifier": "t_stringliteral_53c0a9b372dd4d10e0466e474511916fb244dbbc3766b7c40c21d1ec47086e63",
                          "typeString": "literal_string \"ERC20: insufficient balance\""
                        }
                      ],
                      "id": 432,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        -18,
                        -18
                      ],
                      "referencedDeclaration": -18,
                      "src": "4818:7:0",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 439,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "4818:66:0",
                    "tryCall": false,
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 440,
                  "nodeType": "ExpressionStatement",
                  "src": "4818:66:0"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 450,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "baseExpression": {
                        "argumentTypes": null,
                        "id": 441,
                        "name": "balances",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 45,
                        "src": "4903:8:0",
                        "typeDescriptions": {
                          "typeIdentifier": "t_mapping$_t_address_$_t_uint256_$",
                          "typeString": "mapping(address => uint256)"
                        }
                      },
                      "id": 443,
                      "indexExpression": {
                        "argumentTypes": null,
                        "id": 442,
                        "name": "_from",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 415,
                        "src": "4912:5:0",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": true,
                      "nodeType": "IndexAccess",
                      "src": "4903:15:0",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "commonType": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "id": 449,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "leftExpression": {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 444,
                          "name": "balances",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 45,
                          "src": "4921:8:0",
                          "typeDescriptions": {
                            "typeIdentifier": "t_mapping$_t_address_$_t_uint256_$",
                            "typeString": "mapping(address => uint256)"
                          }
                        },
                        "id": 446,
                        "indexExpression": {
                          "argumentTypes": null,
                          "id": 445,
                          "name": "_from",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 415,
                          "src": "4930:5:0",
                          "typeDescriptions": {
                            "typeIdentifier": "t_address",
                            "typeString": "address"
                          }
                        },
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "nodeType": "IndexAccess",
                        "src": "4921:15:0",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "nodeType": "BinaryOperation",
                      "operator": "-",
                      "rightExpression": {
                        "argumentTypes": null,
                        "components": [
                          {
                            "argumentTypes": null,
                            "id": 447,
                            "name": "_amount",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 417,
                            "src": "4938:7:0",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          }
                        ],
                        "id": 448,
                        "isConstant": false,
                        "isInlineArray": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "nodeType": "TupleExpression",
                        "src": "4937:9:0",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "src": "4921:25:0",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "4903:43:0",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "id": 451,
                  "nodeType": "ExpressionStatement",
                  "src": "4903:43:0"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 457,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 452,
                      "name": "totalSupply_",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 53,
                      "src": "4956:12:0",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "commonType": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "id": 456,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "leftExpression": {
                        "argumentTypes": null,
                        "id": 453,
                        "name": "totalSupply_",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 53,
                        "src": "4971:12:0",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "nodeType": "BinaryOperation",
                      "operator": "-",
                      "rightExpression": {
                        "argumentTypes": null,
                        "components": [
                          {
                            "argumentTypes": null,
                            "id": 454,
                            "name": "_amount",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 417,
                            "src": "4987:7:0",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          }
                        ],
                        "id": 455,
                        "isConstant": false,
                        "isInlineArray": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "nodeType": "TupleExpression",
                        "src": "4986:9:0",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "src": "4971:24:0",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "4956:39:0",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "id": 458,
                  "nodeType": "ExpressionStatement",
                  "src": "4956:39:0"
                },
                {
                  "eventCall": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 460,
                          "name": "msg",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": -15,
                          "src": "5016:3:0",
                          "typeDescriptions": {
                            "typeIdentifier": "t_magic_message",
                            "typeString": "msg"
                          }
                        },
                        "id": 461,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "sender",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": null,
                        "src": "5016:10:0",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address_payable",
                          "typeString": "address payable"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 462,
                        "name": "_from",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 415,
                        "src": "5028:5:0",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 463,
                        "name": "_amount",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 417,
                        "src": "5035:7:0",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_address_payable",
                          "typeString": "address payable"
                        },
                        {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        },
                        {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      ],
                      "id": 459,
                      "name": "Burn",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 69,
                      "src": "5011:4:0",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_event_nonpayable$_t_address_$_t_address_$_t_uint256_$returns$__$",
                        "typeString": "function (address,address,uint256)"
                      }
                    },
                    "id": 464,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "5011:32:0",
                    "tryCall": false,
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 465,
                  "nodeType": "EmitStatement",
                  "src": "5006:37:0"
                }
              ]
            },
            "documentation": null,
            "functionSelector": "79cc6790",
            "id": 467,
            "implemented": true,
            "kind": "function",
            "modifiers": [
              {
                "arguments": null,
                "id": 420,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 419,
                  "name": "onlyOwner",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 193,
                  "src": "4720:9:0",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "4720:9:0"
              }
            ],
            "name": "burnFrom",
            "nodeType": "FunctionDefinition",
            "overrides": null,
            "parameters": {
              "id": 418,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 415,
                  "mutability": "mutable",
                  "name": "_from",
                  "nodeType": "VariableDeclaration",
                  "overrides": null,
                  "scope": 467,
                  "src": "4663:13:0",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 414,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "4663:7:0",
                    "stateMutability": "nonpayable",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 417,
                  "mutability": "mutable",
                  "name": "_amount",
                  "nodeType": "VariableDeclaration",
                  "overrides": null,
                  "scope": 467,
                  "src": "4686:12:0",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 416,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "4686:4:0",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "4653:51:0"
            },
            "returnParameters": {
              "id": 421,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "4734:0:0"
            },
            "scope": 468,
            "src": "4636:414:0",
            "stateMutability": "nonpayable",
            "virtual": false,
            "visibility": "public"
          }
        ],
        "scope": 469,
        "src": "397:4661:0"
      }
    ],
    "src": "38:5022:0"
  },
  "legacyAST": {
    "attributes": {
      "absolutePath": "project:/contracts/ERC20.sol",
      "exportedSymbols": {
        "ERCToken": [
          468
        ],
        "IERC20": [
          31
        ]
      },
      "license": "UNLICENSED"
    },
    "children": [
      {
        "attributes": {
          "literals": [
            "solidity",
            ">=",
            "0.6",
            ".8",
            "<",
            "0.9",
            ".0"
          ]
        },
        "id": 1,
        "name": "PragmaDirective",
        "src": "38:31:0"
      },
      {
        "attributes": {
          "abstract": false,
          "baseContracts": [
            null
          ],
          "contractDependencies": [
            null
          ],
          "contractKind": "interface",
          "documentation": null,
          "fullyImplemented": false,
          "linearizedBaseContracts": [
            31
          ],
          "name": "IERC20",
          "scope": 469
        },
        "children": [
          {
            "attributes": {
              "body": null,
              "documentation": null,
              "functionSelector": "18160ddd",
              "implemented": false,
              "isConstructor": false,
              "kind": "function",
              "modifiers": [
                null
              ],
              "name": "totalSupply",
              "overrides": null,
              "scope": 31,
              "stateMutability": "view",
              "virtual": false,
              "visibility": "external"
            },
            "children": [
              {
                "attributes": {
                  "parameters": [
                    null
                  ]
                },
                "children": [],
                "id": 2,
                "name": "ParameterList",
                "src": "114:2:0"
              },
              {
                "children": [
                  {
                    "attributes": {
                      "constant": false,
                      "mutability": "mutable",
                      "name": "",
                      "overrides": null,
                      "scope": 6,
                      "stateVariable": false,
                      "storageLocation": "default",
                      "type": "uint256",
                      "value": null,
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "uint256",
                          "type": "uint256"
                        },
                        "id": 3,
                        "name": "ElementaryTypeName",
                        "src": "139:7:0"
                      }
                    ],
                    "id": 4,
                    "name": "VariableDeclaration",
                    "src": "139:7:0"
                  }
                ],
                "id": 5,
                "name": "ParameterList",
                "src": "138:9:0"
              }
            ],
            "id": 6,
            "name": "FunctionDefinition",
            "src": "94:54:0"
          },
          {
            "attributes": {
              "body": null,
              "documentation": null,
              "functionSelector": "70a08231",
              "implemented": false,
              "isConstructor": false,
              "kind": "function",
              "modifiers": [
                null
              ],
              "name": "balanceOf",
              "overrides": null,
              "scope": 31,
              "stateMutability": "view",
              "virtual": false,
              "visibility": "external"
            },
            "children": [
              {
                "children": [
                  {
                    "attributes": {
                      "constant": false,
                      "mutability": "mutable",
                      "name": "account",
                      "overrides": null,
                      "scope": 13,
                      "stateVariable": false,
                      "storageLocation": "default",
                      "type": "address",
                      "value": null,
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "address",
                          "stateMutability": "nonpayable",
                          "type": "address"
                        },
                        "id": 7,
                        "name": "ElementaryTypeName",
                        "src": "172:7:0"
                      }
                    ],
                    "id": 8,
                    "name": "VariableDeclaration",
                    "src": "172:15:0"
                  }
                ],
                "id": 9,
                "name": "ParameterList",
                "src": "171:17:0"
              },
              {
                "children": [
                  {
                    "attributes": {
                      "constant": false,
                      "mutability": "mutable",
                      "name": "",
                      "overrides": null,
                      "scope": 13,
                      "stateVariable": false,
                      "storageLocation": "default",
                      "type": "uint256",
                      "value": null,
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "uint256",
                          "type": "uint256"
                        },
                        "id": 10,
                        "name": "ElementaryTypeName",
                        "src": "212:7:0"
                      }
                    ],
                    "id": 11,
                    "name": "VariableDeclaration",
                    "src": "212:7:0"
                  }
                ],
                "id": 12,
                "name": "ParameterList",
                "src": "211:9:0"
              }
            ],
            "id": 13,
            "name": "FunctionDefinition",
            "src": "153:68:0"
          },
          {
            "attributes": {
              "body": null,
              "documentation": null,
              "functionSelector": "a9059cbb",
              "implemented": false,
              "isConstructor": false,
              "kind": "function",
              "modifiers": [
                null
              ],
              "name": "transfer",
              "overrides": null,
              "scope": 31,
              "stateMutability": "nonpayable",
              "virtual": false,
              "visibility": "external"
            },
            "children": [
              {
                "children": [
                  {
                    "attributes": {
                      "constant": false,
                      "mutability": "mutable",
                      "name": "recipient",
                      "overrides": null,
                      "scope": 22,
                      "stateVariable": false,
                      "storageLocation": "default",
                      "type": "address",
                      "value": null,
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "address",
                          "stateMutability": "nonpayable",
                          "type": "address"
                        },
                        "id": 14,
                        "name": "ElementaryTypeName",
                        "src": "244:7:0"
                      }
                    ],
                    "id": 15,
                    "name": "VariableDeclaration",
                    "src": "244:17:0"
                  },
                  {
                    "attributes": {
                      "constant": false,
                      "mutability": "mutable",
                      "name": "amount",
                      "overrides": null,
                      "scope": 22,
                      "stateVariable": false,
                      "storageLocation": "default",
                      "type": "uint256",
                      "value": null,
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "uint256",
                          "type": "uint256"
                        },
                        "id": 16,
                        "name": "ElementaryTypeName",
                        "src": "264:7:0"
                      }
                    ],
                    "id": 17,
                    "name": "VariableDeclaration",
                    "src": "264:14:0"
                  }
                ],
                "id": 18,
                "name": "ParameterList",
                "src": "243:36:0"
              },
              {
                "children": [
                  {
                    "attributes": {
                      "constant": false,
                      "mutability": "mutable",
                      "name": "",
                      "overrides": null,
                      "scope": 22,
                      "stateVariable": false,
                      "storageLocation": "default",
                      "type": "bool",
                      "value": null,
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "bool",
                          "type": "bool"
                        },
                        "id": 19,
                        "name": "ElementaryTypeName",
                        "src": "297:4:0"
                      }
                    ],
                    "id": 20,
                    "name": "VariableDeclaration",
                    "src": "297:4:0"
                  }
                ],
                "id": 21,
                "name": "ParameterList",
                "src": "296:6:0"
              }
            ],
            "id": 22,
            "name": "FunctionDefinition",
            "src": "226:77:0"
          },
          {
            "attributes": {
              "anonymous": false,
              "documentation": null,
              "name": "Transfer"
            },
            "children": [
              {
                "children": [
                  {
                    "attributes": {
                      "constant": false,
                      "indexed": true,
                      "mutability": "mutable",
                      "name": "_from",
                      "overrides": null,
                      "scope": 30,
                      "stateVariable": false,
                      "storageLocation": "default",
                      "type": "address",
                      "value": null,
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "address",
                          "stateMutability": "nonpayable",
                          "type": "address"
                        },
                        "id": 23,
                        "name": "ElementaryTypeName",
                        "src": "328:7:0"
                      }
                    ],
                    "id": 24,
                    "name": "VariableDeclaration",
                    "src": "328:21:0"
                  },
                  {
                    "attributes": {
                      "constant": false,
                      "indexed": true,
                      "mutability": "mutable",
                      "name": "_to",
                      "overrides": null,
                      "scope": 30,
                      "stateVariable": false,
                      "storageLocation": "default",
                      "type": "address",
                      "value": null,
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "address",
                          "stateMutability": "nonpayable",
                          "type": "address"
                        },
                        "id": 25,
                        "name": "ElementaryTypeName",
                        "src": "351:7:0"
                      }
                    ],
                    "id": 26,
                    "name": "VariableDeclaration",
                    "src": "351:19:0"
                  },
                  {
                    "attributes": {
                      "constant": false,
                      "indexed": false,
                      "mutability": "mutable",
                      "name": "_value",
                      "overrides": null,
                      "scope": 30,
                      "stateVariable": false,
                      "storageLocation": "default",
                      "type": "uint256",
                      "value": null,
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "uint256",
                          "type": "uint256"
                        },
                        "id": 27,
                        "name": "ElementaryTypeName",
                        "src": "372:7:0"
                      }
                    ],
                    "id": 28,
                    "name": "VariableDeclaration",
                    "src": "372:14:0"
                  }
                ],
                "id": 29,
                "name": "ParameterList",
                "src": "327:60:0"
              }
            ],
            "id": 30,
            "name": "EventDefinition",
            "src": "313:75:0"
          }
        ],
        "id": 31,
        "name": "ContractDefinition",
        "src": "71:324:0"
      },
      {
        "attributes": {
          "abstract": false,
          "contractDependencies": [
            31
          ],
          "contractKind": "contract",
          "documentation": null,
          "fullyImplemented": true,
          "linearizedBaseContracts": [
            468,
            31
          ],
          "name": "ERCToken",
          "scope": 469
        },
        "children": [
          {
            "attributes": {
              "arguments": null
            },
            "children": [
              {
                "attributes": {
                  "contractScope": null,
                  "name": "IERC20",
                  "referencedDeclaration": 31,
                  "type": "contract IERC20"
                },
                "id": 32,
                "name": "UserDefinedTypeName",
                "src": "418:6:0"
              }
            ],
            "id": 33,
            "name": "InheritanceSpecifier",
            "src": "418:6:0"
          },
          {
            "attributes": {
              "constant": false,
              "functionSelector": "d28d8852",
              "mutability": "mutable",
              "name": "_name",
              "overrides": null,
              "scope": 468,
              "stateVariable": true,
              "storageLocation": "default",
              "type": "string",
              "value": null,
              "visibility": "public"
            },
            "children": [
              {
                "attributes": {
                  "name": "string",
                  "type": "string"
                },
                "id": 34,
                "name": "ElementaryTypeName",
                "src": "431:6:0"
              }
            ],
            "id": 35,
            "name": "VariableDeclaration",
            "src": "431:19:0"
          },
          {
            "attributes": {
              "constant": false,
              "functionSelector": "b09f1266",
              "mutability": "mutable",
              "name": "_symbol",
              "overrides": null,
              "scope": 468,
              "stateVariable": true,
              "storageLocation": "default",
              "type": "string",
              "value": null,
              "visibility": "public"
            },
            "children": [
              {
                "attributes": {
                  "name": "string",
                  "type": "string"
                },
                "id": 36,
                "name": "ElementaryTypeName",
                "src": "456:6:0"
              }
            ],
            "id": 37,
            "name": "VariableDeclaration",
            "src": "456:21:0"
          },
          {
            "attributes": {
              "constant": false,
              "functionSelector": "32424aa3",
              "mutability": "mutable",
              "name": "_decimals",
              "overrides": null,
              "scope": 468,
              "stateVariable": true,
              "storageLocation": "default",
              "type": "uint8",
              "value": null,
              "visibility": "public"
            },
            "children": [
              {
                "attributes": {
                  "name": "uint8",
                  "type": "uint8"
                },
                "id": 38,
                "name": "ElementaryTypeName",
                "src": "483:5:0"
              }
            ],
            "id": 39,
            "name": "VariableDeclaration",
            "src": "483:22:0"
          },
          {
            "attributes": {
              "constant": false,
              "functionSelector": "481c6a75",
              "mutability": "mutable",
              "name": "manager",
              "overrides": null,
              "scope": 468,
              "stateVariable": true,
              "storageLocation": "default",
              "type": "address",
              "value": null,
              "visibility": "public"
            },
            "children": [
              {
                "attributes": {
                  "name": "address",
                  "stateMutability": "nonpayable",
                  "type": "address"
                },
                "id": 40,
                "name": "ElementaryTypeName",
                "src": "511:7:0"
              }
            ],
            "id": 41,
            "name": "VariableDeclaration",
            "src": "511:22:0"
          },
          {
            "attributes": {
              "constant": false,
              "mutability": "mutable",
              "name": "balances",
              "overrides": null,
              "scope": 468,
              "stateVariable": true,
              "storageLocation": "default",
              "type": "mapping(address => uint256)",
              "value": null,
              "visibility": "internal"
            },
            "children": [
              {
                "attributes": {
                  "type": "mapping(address => uint256)"
                },
                "children": [
                  {
                    "attributes": {
                      "name": "address",
                      "type": "address"
                    },
                    "id": 42,
                    "name": "ElementaryTypeName",
                    "src": "584:7:0"
                  },
                  {
                    "attributes": {
                      "name": "uint256",
                      "type": "uint256"
                    },
                    "id": 43,
                    "name": "ElementaryTypeName",
                    "src": "595:7:0"
                  }
                ],
                "id": 44,
                "name": "Mapping",
                "src": "576:27:0"
              }
            ],
            "id": 45,
            "name": "VariableDeclaration",
            "src": "576:36:0"
          },
          {
            "attributes": {
              "constant": false,
              "mutability": "mutable",
              "name": "allowed",
              "overrides": null,
              "scope": 468,
              "stateVariable": true,
              "storageLocation": "default",
              "type": "mapping(address => mapping(address => uint256))",
              "value": null,
              "visibility": "internal"
            },
            "children": [
              {
                "attributes": {
                  "type": "mapping(address => mapping(address => uint256))"
                },
                "children": [
                  {
                    "attributes": {
                      "name": "address",
                      "type": "address"
                    },
                    "id": 46,
                    "name": "ElementaryTypeName",
                    "src": "631:7:0"
                  },
                  {
                    "attributes": {
                      "type": "mapping(address => uint256)"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "address",
                          "type": "address"
                        },
                        "id": 47,
                        "name": "ElementaryTypeName",
                        "src": "650:7:0"
                      },
                      {
                        "attributes": {
                          "name": "uint256",
                          "type": "uint256"
                        },
                        "id": 48,
                        "name": "ElementaryTypeName",
                        "src": "661:7:0"
                      }
                    ],
                    "id": 49,
                    "name": "Mapping",
                    "src": "642:27:0"
                  }
                ],
                "id": 50,
                "name": "Mapping",
                "src": "623:47:0"
              }
            ],
            "id": 51,
            "name": "VariableDeclaration",
            "src": "623:55:0"
          },
          {
            "attributes": {
              "constant": false,
              "mutability": "mutable",
              "name": "totalSupply_",
              "overrides": null,
              "scope": 468,
              "stateVariable": true,
              "storageLocation": "default",
              "type": "uint256",
              "value": null,
              "visibility": "internal"
            },
            "children": [
              {
                "attributes": {
                  "name": "uint256",
                  "type": "uint256"
                },
                "id": 52,
                "name": "ElementaryTypeName",
                "src": "689:7:0"
              }
            ],
            "id": 53,
            "name": "VariableDeclaration",
            "src": "689:20:0"
          },
          {
            "attributes": {
              "anonymous": false,
              "documentation": null,
              "name": "Mint"
            },
            "children": [
              {
                "children": [
                  {
                    "attributes": {
                      "constant": false,
                      "indexed": true,
                      "mutability": "mutable",
                      "name": "minter",
                      "overrides": null,
                      "scope": 61,
                      "stateVariable": false,
                      "storageLocation": "default",
                      "type": "address",
                      "value": null,
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "address",
                          "stateMutability": "nonpayable",
                          "type": "address"
                        },
                        "id": 54,
                        "name": "ElementaryTypeName",
                        "src": "732:7:0"
                      }
                    ],
                    "id": 55,
                    "name": "VariableDeclaration",
                    "src": "732:22:0"
                  },
                  {
                    "attributes": {
                      "constant": false,
                      "indexed": true,
                      "mutability": "mutable",
                      "name": "account",
                      "overrides": null,
                      "scope": 61,
                      "stateVariable": false,
                      "storageLocation": "default",
                      "type": "address",
                      "value": null,
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "address",
                          "stateMutability": "nonpayable",
                          "type": "address"
                        },
                        "id": 56,
                        "name": "ElementaryTypeName",
                        "src": "756:7:0"
                      }
                    ],
                    "id": 57,
                    "name": "VariableDeclaration",
                    "src": "756:23:0"
                  },
                  {
                    "attributes": {
                      "constant": false,
                      "indexed": false,
                      "mutability": "mutable",
                      "name": "amount",
                      "overrides": null,
                      "scope": 61,
                      "stateVariable": false,
                      "storageLocation": "default",
                      "type": "uint256",
                      "value": null,
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "uint256",
                          "type": "uint256"
                        },
                        "id": 58,
                        "name": "ElementaryTypeName",
                        "src": "781:7:0"
                      }
                    ],
                    "id": 59,
                    "name": "VariableDeclaration",
                    "src": "781:14:0"
                  }
                ],
                "id": 60,
                "name": "ParameterList",
                "src": "731:65:0"
              }
            ],
            "id": 61,
            "name": "EventDefinition",
            "src": "721:76:0"
          },
          {
            "attributes": {
              "anonymous": false,
              "documentation": null,
              "name": "Burn"
            },
            "children": [
              {
                "children": [
                  {
                    "attributes": {
                      "constant": false,
                      "indexed": true,
                      "mutability": "mutable",
                      "name": "burner",
                      "overrides": null,
                      "scope": 69,
                      "stateVariable": false,
                      "storageLocation": "default",
                      "type": "address",
                      "value": null,
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "address",
                          "stateMutability": "nonpayable",
                          "type": "address"
                        },
                        "id": 62,
                        "name": "ElementaryTypeName",
                        "src": "813:7:0"
                      }
                    ],
                    "id": 63,
                    "name": "VariableDeclaration",
                    "src": "813:22:0"
                  },
                  {
                    "attributes": {
                      "constant": false,
                      "indexed": true,
                      "mutability": "mutable",
                      "name": "account",
                      "overrides": null,
                      "scope": 69,
                      "stateVariable": false,
                      "storageLocation": "default",
                      "type": "address",
                      "value": null,
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "address",
                          "stateMutability": "nonpayable",
                          "type": "address"
                        },
                        "id": 64,
                        "name": "ElementaryTypeName",
                        "src": "837:7:0"
                      }
                    ],
                    "id": 65,
                    "name": "VariableDeclaration",
                    "src": "837:23:0"
                  },
                  {
                    "attributes": {
                      "constant": false,
                      "indexed": false,
                      "mutability": "mutable",
                      "name": "amount",
                      "overrides": null,
                      "scope": 69,
                      "stateVariable": false,
                      "storageLocation": "default",
                      "type": "uint256",
                      "value": null,
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "uint256",
                          "type": "uint256"
                        },
                        "id": 66,
                        "name": "ElementaryTypeName",
                        "src": "862:7:0"
                      }
                    ],
                    "id": 67,
                    "name": "VariableDeclaration",
                    "src": "862:14:0"
                  }
                ],
                "id": 68,
                "name": "ParameterList",
                "src": "812:65:0"
              }
            ],
            "id": 69,
            "name": "EventDefinition",
            "src": "802:76:0"
          },
          {
            "attributes": {
              "anonymous": false,
              "documentation": null,
              "name": "Approval"
            },
            "children": [
              {
                "children": [
                  {
                    "attributes": {
                      "constant": false,
                      "indexed": true,
                      "mutability": "mutable",
                      "name": "tokenOwner",
                      "overrides": null,
                      "scope": 77,
                      "stateVariable": false,
                      "storageLocation": "default",
                      "type": "address",
                      "value": null,
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "address",
                          "stateMutability": "nonpayable",
                          "type": "address"
                        },
                        "id": 70,
                        "name": "ElementaryTypeName",
                        "src": "904:7:0"
                      }
                    ],
                    "id": 71,
                    "name": "VariableDeclaration",
                    "src": "904:26:0"
                  },
                  {
                    "attributes": {
                      "constant": false,
                      "indexed": true,
                      "mutability": "mutable",
                      "name": "_spender",
                      "overrides": null,
                      "scope": 77,
                      "stateVariable": false,
                      "storageLocation": "default",
                      "type": "address",
                      "value": null,
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "address",
                          "stateMutability": "nonpayable",
                          "type": "address"
                        },
                        "id": 72,
                        "name": "ElementaryTypeName",
                        "src": "931:7:0"
                      }
                    ],
                    "id": 73,
                    "name": "VariableDeclaration",
                    "src": "931:24:0"
                  },
                  {
                    "attributes": {
                      "constant": false,
                      "indexed": false,
                      "mutability": "mutable",
                      "name": "tokens",
                      "overrides": null,
                      "scope": 77,
                      "stateVariable": false,
                      "storageLocation": "default",
                      "type": "uint256",
                      "value": null,
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "uint",
                          "type": "uint256"
                        },
                        "id": 74,
                        "name": "ElementaryTypeName",
                        "src": "956:4:0"
                      }
                    ],
                    "id": 75,
                    "name": "VariableDeclaration",
                    "src": "956:11:0"
                  }
                ],
                "id": 76,
                "name": "ParameterList",
                "src": "903:65:0"
              }
            ],
            "id": 77,
            "name": "EventDefinition",
            "src": "888:81:0"
          },
          {
            "attributes": {
              "documentation": null,
              "implemented": true,
              "isConstructor": true,
              "kind": "constructor",
              "modifiers": [
                null
              ],
              "name": "",
              "overrides": null,
              "scope": 468,
              "stateMutability": "nonpayable",
              "virtual": false,
              "visibility": "public"
            },
            "children": [
              {
                "children": [
                  {
                    "attributes": {
                      "constant": false,
                      "mutability": "mutable",
                      "name": "name",
                      "overrides": null,
                      "scope": 117,
                      "stateVariable": false,
                      "storageLocation": "memory",
                      "type": "string",
                      "value": null,
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "string",
                          "type": "string"
                        },
                        "id": 78,
                        "name": "ElementaryTypeName",
                        "src": "996:6:0"
                      }
                    ],
                    "id": 79,
                    "name": "VariableDeclaration",
                    "src": "996:18:0"
                  },
                  {
                    "attributes": {
                      "constant": false,
                      "mutability": "mutable",
                      "name": "symbol",
                      "overrides": null,
                      "scope": 117,
                      "stateVariable": false,
                      "storageLocation": "memory",
                      "type": "string",
                      "value": null,
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "string",
                          "type": "string"
                        },
                        "id": 80,
                        "name": "ElementaryTypeName",
                        "src": "1016:6:0"
                      }
                    ],
                    "id": 81,
                    "name": "VariableDeclaration",
                    "src": "1016:20:0"
                  },
                  {
                    "attributes": {
                      "constant": false,
                      "mutability": "mutable",
                      "name": "decimal",
                      "overrides": null,
                      "scope": 117,
                      "stateVariable": false,
                      "storageLocation": "default",
                      "type": "uint8",
                      "value": null,
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "uint8",
                          "type": "uint8"
                        },
                        "id": 82,
                        "name": "ElementaryTypeName",
                        "src": "1038:5:0"
                      }
                    ],
                    "id": 83,
                    "name": "VariableDeclaration",
                    "src": "1038:13:0"
                  },
                  {
                    "attributes": {
                      "constant": false,
                      "mutability": "mutable",
                      "name": "_totalSupply",
                      "overrides": null,
                      "scope": 117,
                      "stateVariable": false,
                      "storageLocation": "default",
                      "type": "uint256",
                      "value": null,
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "uint256",
                          "type": "uint256"
                        },
                        "id": 84,
                        "name": "ElementaryTypeName",
                        "src": "1053:7:0"
                      }
                    ],
                    "id": 85,
                    "name": "VariableDeclaration",
                    "src": "1053:20:0"
                  }
                ],
                "id": 86,
                "name": "ParameterList",
                "src": "995:79:0"
              },
              {
                "attributes": {
                  "parameters": [
                    null
                  ]
                },
                "children": [],
                "id": 87,
                "name": "ParameterList",
                "src": "1082:0:0"
              },
              {
                "children": [
                  {
                    "children": [
                      {
                        "attributes": {
                          "argumentTypes": null,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "operator": "=",
                          "type": "uint256"
                        },
                        "children": [
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "overloadedDeclarations": [
                                null
                              ],
                              "referencedDeclaration": 53,
                              "type": "uint256",
                              "value": "totalSupply_"
                            },
                            "id": 88,
                            "name": "Identifier",
                            "src": "1095:12:0"
                          },
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "overloadedDeclarations": [
                                null
                              ],
                              "referencedDeclaration": 85,
                              "type": "uint256",
                              "value": "_totalSupply"
                            },
                            "id": 89,
                            "name": "Identifier",
                            "src": "1110:12:0"
                          }
                        ],
                        "id": 90,
                        "name": "Assignment",
                        "src": "1095:27:0"
                      }
                    ],
                    "id": 91,
                    "name": "ExpressionStatement",
                    "src": "1095:27:0"
                  },
                  {
                    "children": [
                      {
                        "attributes": {
                          "argumentTypes": null,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "operator": "=",
                          "type": "uint256"
                        },
                        "children": [
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "isConstant": false,
                              "isLValue": true,
                              "isPure": false,
                              "lValueRequested": true,
                              "type": "uint256"
                            },
                            "children": [
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "overloadedDeclarations": [
                                    null
                                  ],
                                  "referencedDeclaration": 45,
                                  "type": "mapping(address => uint256)",
                                  "value": "balances"
                                },
                                "id": 92,
                                "name": "Identifier",
                                "src": "1136:8:0"
                              },
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "isConstant": false,
                                  "isLValue": false,
                                  "isPure": false,
                                  "lValueRequested": false,
                                  "member_name": "sender",
                                  "referencedDeclaration": null,
                                  "type": "address payable"
                                },
                                "children": [
                                  {
                                    "attributes": {
                                      "argumentTypes": null,
                                      "overloadedDeclarations": [
                                        null
                                      ],
                                      "referencedDeclaration": -15,
                                      "type": "msg",
                                      "value": "msg"
                                    },
                                    "id": 93,
                                    "name": "Identifier",
                                    "src": "1145:3:0"
                                  }
                                ],
                                "id": 94,
                                "name": "MemberAccess",
                                "src": "1145:10:0"
                              }
                            ],
                            "id": 95,
                            "name": "IndexAccess",
                            "src": "1136:20:0"
                          },
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "overloadedDeclarations": [
                                null
                              ],
                              "referencedDeclaration": 85,
                              "type": "uint256",
                              "value": "_totalSupply"
                            },
                            "id": 96,
                            "name": "Identifier",
                            "src": "1159:12:0"
                          }
                        ],
                        "id": 97,
                        "name": "Assignment",
                        "src": "1136:35:0"
                      }
                    ],
                    "id": 98,
                    "name": "ExpressionStatement",
                    "src": "1136:35:0"
                  },
                  {
                    "children": [
                      {
                        "attributes": {
                          "argumentTypes": null,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "operator": "=",
                          "type": "address"
                        },
                        "children": [
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "overloadedDeclarations": [
                                null
                              ],
                              "referencedDeclaration": 41,
                              "type": "address",
                              "value": "manager"
                            },
                            "id": 99,
                            "name": "Identifier",
                            "src": "1185:7:0"
                          },
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "lValueRequested": false,
                              "member_name": "sender",
                              "referencedDeclaration": null,
                              "type": "address payable"
                            },
                            "children": [
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "overloadedDeclarations": [
                                    null
                                  ],
                                  "referencedDeclaration": -15,
                                  "type": "msg",
                                  "value": "msg"
                                },
                                "id": 100,
                                "name": "Identifier",
                                "src": "1195:3:0"
                              }
                            ],
                            "id": 101,
                            "name": "MemberAccess",
                            "src": "1195:10:0"
                          }
                        ],
                        "id": 102,
                        "name": "Assignment",
                        "src": "1185:20:0"
                      }
                    ],
                    "id": 103,
                    "name": "ExpressionStatement",
                    "src": "1185:20:0"
                  },
                  {
                    "children": [
                      {
                        "attributes": {
                          "argumentTypes": null,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "operator": "=",
                          "type": "string storage ref"
                        },
                        "children": [
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "overloadedDeclarations": [
                                null
                              ],
                              "referencedDeclaration": 35,
                              "type": "string storage ref",
                              "value": "_name"
                            },
                            "id": 104,
                            "name": "Identifier",
                            "src": "1218:5:0"
                          },
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "overloadedDeclarations": [
                                null
                              ],
                              "referencedDeclaration": 79,
                              "type": "string memory",
                              "value": "name"
                            },
                            "id": 105,
                            "name": "Identifier",
                            "src": "1225:4:0"
                          }
                        ],
                        "id": 106,
                        "name": "Assignment",
                        "src": "1218:11:0"
                      }
                    ],
                    "id": 107,
                    "name": "ExpressionStatement",
                    "src": "1218:11:0"
                  },
                  {
                    "children": [
                      {
                        "attributes": {
                          "argumentTypes": null,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "operator": "=",
                          "type": "string storage ref"
                        },
                        "children": [
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "overloadedDeclarations": [
                                null
                              ],
                              "referencedDeclaration": 37,
                              "type": "string storage ref",
                              "value": "_symbol"
                            },
                            "id": 108,
                            "name": "Identifier",
                            "src": "1243:7:0"
                          },
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "overloadedDeclarations": [
                                null
                              ],
                              "referencedDeclaration": 81,
                              "type": "string memory",
                              "value": "symbol"
                            },
                            "id": 109,
                            "name": "Identifier",
                            "src": "1251:6:0"
                          }
                        ],
                        "id": 110,
                        "name": "Assignment",
                        "src": "1243:14:0"
                      }
                    ],
                    "id": 111,
                    "name": "ExpressionStatement",
                    "src": "1243:14:0"
                  },
                  {
                    "children": [
                      {
                        "attributes": {
                          "argumentTypes": null,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "operator": "=",
                          "type": "uint8"
                        },
                        "children": [
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "overloadedDeclarations": [
                                null
                              ],
                              "referencedDeclaration": 39,
                              "type": "uint8",
                              "value": "_decimals"
                            },
                            "id": 112,
                            "name": "Identifier",
                            "src": "1271:9:0"
                          },
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "overloadedDeclarations": [
                                null
                              ],
                              "referencedDeclaration": 83,
                              "type": "uint8",
                              "value": "decimal"
                            },
                            "id": 113,
                            "name": "Identifier",
                            "src": "1283:7:0"
                          }
                        ],
                        "id": 114,
                        "name": "Assignment",
                        "src": "1271:19:0"
                      }
                    ],
                    "id": 115,
                    "name": "ExpressionStatement",
                    "src": "1271:19:0"
                  }
                ],
                "id": 116,
                "name": "Block",
                "src": "1082:259:0"
              }
            ],
            "id": 117,
            "name": "FunctionDefinition",
            "src": "984:357:0"
          },
          {
            "attributes": {
              "baseFunctions": [
                6
              ],
              "documentation": null,
              "functionSelector": "18160ddd",
              "implemented": true,
              "isConstructor": false,
              "kind": "function",
              "modifiers": [
                null
              ],
              "name": "totalSupply",
              "scope": 468,
              "stateMutability": "view",
              "virtual": false,
              "visibility": "public"
            },
            "children": [
              {
                "attributes": {
                  "overrides": [
                    null
                  ]
                },
                "id": 119,
                "name": "OverrideSpecifier",
                "src": "1376:8:0"
              },
              {
                "attributes": {
                  "parameters": [
                    null
                  ]
                },
                "children": [],
                "id": 118,
                "name": "ParameterList",
                "src": "1366:2:0"
              },
              {
                "children": [
                  {
                    "attributes": {
                      "constant": false,
                      "mutability": "mutable",
                      "name": "",
                      "overrides": null,
                      "scope": 126,
                      "stateVariable": false,
                      "storageLocation": "default",
                      "type": "uint256",
                      "value": null,
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "uint256",
                          "type": "uint256"
                        },
                        "id": 120,
                        "name": "ElementaryTypeName",
                        "src": "1399:7:0"
                      }
                    ],
                    "id": 121,
                    "name": "VariableDeclaration",
                    "src": "1399:7:0"
                  }
                ],
                "id": 122,
                "name": "ParameterList",
                "src": "1398:9:0"
              },
              {
                "children": [
                  {
                    "attributes": {
                      "functionReturnParameters": 122
                    },
                    "children": [
                      {
                        "attributes": {
                          "argumentTypes": null,
                          "overloadedDeclarations": [
                            null
                          ],
                          "referencedDeclaration": 53,
                          "type": "uint256",
                          "value": "totalSupply_"
                        },
                        "id": 123,
                        "name": "Identifier",
                        "src": "1424:12:0"
                      }
                    ],
                    "id": 124,
                    "name": "Return",
                    "src": "1417:19:0"
                  }
                ],
                "id": 125,
                "name": "Block",
                "src": "1408:34:0"
              }
            ],
            "id": 126,
            "name": "FunctionDefinition",
            "src": "1346:96:0"
          },
          {
            "attributes": {
              "baseFunctions": [
                13
              ],
              "documentation": null,
              "functionSelector": "70a08231",
              "implemented": true,
              "isConstructor": false,
              "kind": "function",
              "modifiers": [
                null
              ],
              "name": "balanceOf",
              "scope": 468,
              "stateMutability": "view",
              "virtual": false,
              "visibility": "public"
            },
            "children": [
              {
                "attributes": {
                  "overrides": [
                    null
                  ]
                },
                "id": 130,
                "name": "OverrideSpecifier",
                "src": "1496:8:0"
              },
              {
                "children": [
                  {
                    "attributes": {
                      "constant": false,
                      "mutability": "mutable",
                      "name": "tokenOwner",
                      "overrides": null,
                      "scope": 139,
                      "stateVariable": false,
                      "storageLocation": "default",
                      "type": "address",
                      "value": null,
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "address",
                          "stateMutability": "nonpayable",
                          "type": "address"
                        },
                        "id": 127,
                        "name": "ElementaryTypeName",
                        "src": "1469:7:0"
                      }
                    ],
                    "id": 128,
                    "name": "VariableDeclaration",
                    "src": "1469:18:0"
                  }
                ],
                "id": 129,
                "name": "ParameterList",
                "src": "1468:20:0"
              },
              {
                "children": [
                  {
                    "attributes": {
                      "constant": false,
                      "mutability": "mutable",
                      "name": "balance",
                      "overrides": null,
                      "scope": 139,
                      "stateVariable": false,
                      "storageLocation": "default",
                      "type": "uint256",
                      "value": null,
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "uint256",
                          "type": "uint256"
                        },
                        "id": 131,
                        "name": "ElementaryTypeName",
                        "src": "1519:7:0"
                      }
                    ],
                    "id": 132,
                    "name": "VariableDeclaration",
                    "src": "1519:15:0"
                  }
                ],
                "id": 133,
                "name": "ParameterList",
                "src": "1518:17:0"
              },
              {
                "children": [
                  {
                    "attributes": {
                      "functionReturnParameters": 133
                    },
                    "children": [
                      {
                        "attributes": {
                          "argumentTypes": null,
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "type": "uint256"
                        },
                        "children": [
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "overloadedDeclarations": [
                                null
                              ],
                              "referencedDeclaration": 45,
                              "type": "mapping(address => uint256)",
                              "value": "balances"
                            },
                            "id": 134,
                            "name": "Identifier",
                            "src": "1553:8:0"
                          },
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "overloadedDeclarations": [
                                null
                              ],
                              "referencedDeclaration": 128,
                              "type": "address",
                              "value": "tokenOwner"
                            },
                            "id": 135,
                            "name": "Identifier",
                            "src": "1562:10:0"
                          }
                        ],
                        "id": 136,
                        "name": "IndexAccess",
                        "src": "1553:20:0"
                      }
                    ],
                    "id": 137,
                    "name": "Return",
                    "src": "1546:27:0"
                  }
                ],
                "id": 138,
                "name": "Block",
                "src": "1536:44:0"
              }
            ],
            "id": 139,
            "name": "FunctionDefinition",
            "src": "1450:130:0"
          },
          {
            "attributes": {
              "baseFunctions": [
                22
              ],
              "documentation": null,
              "functionSelector": "a9059cbb",
              "implemented": true,
              "isConstructor": false,
              "kind": "function",
              "modifiers": [
                null
              ],
              "name": "transfer",
              "scope": 468,
              "stateMutability": "nonpayable",
              "virtual": false,
              "visibility": "public"
            },
            "children": [
              {
                "attributes": {
                  "overrides": [
                    null
                  ]
                },
                "id": 145,
                "name": "OverrideSpecifier",
                "src": "1651:8:0"
              },
              {
                "children": [
                  {
                    "attributes": {
                      "constant": false,
                      "mutability": "mutable",
                      "name": "receiver",
                      "overrides": null,
                      "scope": 181,
                      "stateVariable": false,
                      "storageLocation": "default",
                      "type": "address",
                      "value": null,
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "address",
                          "stateMutability": "nonpayable",
                          "type": "address"
                        },
                        "id": 140,
                        "name": "ElementaryTypeName",
                        "src": "1608:7:0"
                      }
                    ],
                    "id": 141,
                    "name": "VariableDeclaration",
                    "src": "1608:16:0"
                  },
                  {
                    "attributes": {
                      "constant": false,
                      "mutability": "mutable",
                      "name": "numTokens",
                      "overrides": null,
                      "scope": 181,
                      "stateVariable": false,
                      "storageLocation": "default",
                      "type": "uint256",
                      "value": null,
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "uint256",
                          "type": "uint256"
                        },
                        "id": 142,
                        "name": "ElementaryTypeName",
                        "src": "1625:7:0"
                      }
                    ],
                    "id": 143,
                    "name": "VariableDeclaration",
                    "src": "1625:17:0"
                  }
                ],
                "id": 144,
                "name": "ParameterList",
                "src": "1607:36:0"
              },
              {
                "children": [
                  {
                    "attributes": {
                      "constant": false,
                      "mutability": "mutable",
                      "name": "",
                      "overrides": null,
                      "scope": 181,
                      "stateVariable": false,
                      "storageLocation": "default",
                      "type": "bool",
                      "value": null,
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "bool",
                          "type": "bool"
                        },
                        "id": 146,
                        "name": "ElementaryTypeName",
                        "src": "1669:4:0"
                      }
                    ],
                    "id": 147,
                    "name": "VariableDeclaration",
                    "src": "1669:4:0"
                  }
                ],
                "id": 148,
                "name": "ParameterList",
                "src": "1668:6:0"
              },
              {
                "children": [
                  {
                    "children": [
                      {
                        "attributes": {
                          "argumentTypes": null,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "isStructConstructorCall": false,
                          "lValueRequested": false,
                          "names": [
                            null
                          ],
                          "tryCall": false,
                          "type": "tuple()",
                          "type_conversion": false
                        },
                        "children": [
                          {
                            "attributes": {
                              "argumentTypes": [
                                {
                                  "typeIdentifier": "t_bool",
                                  "typeString": "bool"
                                }
                              ],
                              "overloadedDeclarations": [
                                -18,
                                -18
                              ],
                              "referencedDeclaration": -18,
                              "type": "function (bool) pure",
                              "value": "require"
                            },
                            "id": 149,
                            "name": "Identifier",
                            "src": "1685:7:0"
                          },
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "commonType": {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              },
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "lValueRequested": false,
                              "operator": ">=",
                              "type": "bool"
                            },
                            "children": [
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "isConstant": false,
                                  "isLValue": true,
                                  "isPure": false,
                                  "lValueRequested": false,
                                  "type": "uint256"
                                },
                                "children": [
                                  {
                                    "attributes": {
                                      "argumentTypes": null,
                                      "overloadedDeclarations": [
                                        null
                                      ],
                                      "referencedDeclaration": 45,
                                      "type": "mapping(address => uint256)",
                                      "value": "balances"
                                    },
                                    "id": 150,
                                    "name": "Identifier",
                                    "src": "1694:8:0"
                                  },
                                  {
                                    "attributes": {
                                      "argumentTypes": null,
                                      "isConstant": false,
                                      "isLValue": false,
                                      "isPure": false,
                                      "lValueRequested": false,
                                      "member_name": "sender",
                                      "referencedDeclaration": null,
                                      "type": "address payable"
                                    },
                                    "children": [
                                      {
                                        "attributes": {
                                          "argumentTypes": null,
                                          "overloadedDeclarations": [
                                            null
                                          ],
                                          "referencedDeclaration": -15,
                                          "type": "msg",
                                          "value": "msg"
                                        },
                                        "id": 151,
                                        "name": "Identifier",
                                        "src": "1703:3:0"
                                      }
                                    ],
                                    "id": 152,
                                    "name": "MemberAccess",
                                    "src": "1703:10:0"
                                  }
                                ],
                                "id": 153,
                                "name": "IndexAccess",
                                "src": "1694:20:0"
                              },
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "overloadedDeclarations": [
                                    null
                                  ],
                                  "referencedDeclaration": 143,
                                  "type": "uint256",
                                  "value": "numTokens"
                                },
                                "id": 154,
                                "name": "Identifier",
                                "src": "1718:9:0"
                              }
                            ],
                            "id": 155,
                            "name": "BinaryOperation",
                            "src": "1694:33:0"
                          }
                        ],
                        "id": 156,
                        "name": "FunctionCall",
                        "src": "1685:43:0"
                      }
                    ],
                    "id": 157,
                    "name": "ExpressionStatement",
                    "src": "1685:43:0"
                  },
                  {
                    "children": [
                      {
                        "attributes": {
                          "argumentTypes": null,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "operator": "-=",
                          "type": "uint256"
                        },
                        "children": [
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "isConstant": false,
                              "isLValue": true,
                              "isPure": false,
                              "lValueRequested": true,
                              "type": "uint256"
                            },
                            "children": [
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "overloadedDeclarations": [
                                    null
                                  ],
                                  "referencedDeclaration": 45,
                                  "type": "mapping(address => uint256)",
                                  "value": "balances"
                                },
                                "id": 158,
                                "name": "Identifier",
                                "src": "1738:8:0"
                              },
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "isConstant": false,
                                  "isLValue": false,
                                  "isPure": false,
                                  "lValueRequested": false,
                                  "member_name": "sender",
                                  "referencedDeclaration": null,
                                  "type": "address payable"
                                },
                                "children": [
                                  {
                                    "attributes": {
                                      "argumentTypes": null,
                                      "overloadedDeclarations": [
                                        null
                                      ],
                                      "referencedDeclaration": -15,
                                      "type": "msg",
                                      "value": "msg"
                                    },
                                    "id": 159,
                                    "name": "Identifier",
                                    "src": "1747:3:0"
                                  }
                                ],
                                "id": 160,
                                "name": "MemberAccess",
                                "src": "1747:10:0"
                              }
                            ],
                            "id": 161,
                            "name": "IndexAccess",
                            "src": "1738:20:0"
                          },
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "overloadedDeclarations": [
                                null
                              ],
                              "referencedDeclaration": 143,
                              "type": "uint256",
                              "value": "numTokens"
                            },
                            "id": 162,
                            "name": "Identifier",
                            "src": "1762:9:0"
                          }
                        ],
                        "id": 163,
                        "name": "Assignment",
                        "src": "1738:33:0"
                      }
                    ],
                    "id": 164,
                    "name": "ExpressionStatement",
                    "src": "1738:33:0"
                  },
                  {
                    "children": [
                      {
                        "attributes": {
                          "argumentTypes": null,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "operator": "+=",
                          "type": "uint256"
                        },
                        "children": [
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "isConstant": false,
                              "isLValue": true,
                              "isPure": false,
                              "lValueRequested": true,
                              "type": "uint256"
                            },
                            "children": [
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "overloadedDeclarations": [
                                    null
                                  ],
                                  "referencedDeclaration": 45,
                                  "type": "mapping(address => uint256)",
                                  "value": "balances"
                                },
                                "id": 165,
                                "name": "Identifier",
                                "src": "1781:8:0"
                              },
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "overloadedDeclarations": [
                                    null
                                  ],
                                  "referencedDeclaration": 141,
                                  "type": "address",
                                  "value": "receiver"
                                },
                                "id": 166,
                                "name": "Identifier",
                                "src": "1790:8:0"
                              }
                            ],
                            "id": 167,
                            "name": "IndexAccess",
                            "src": "1781:18:0"
                          },
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "overloadedDeclarations": [
                                null
                              ],
                              "referencedDeclaration": 143,
                              "type": "uint256",
                              "value": "numTokens"
                            },
                            "id": 168,
                            "name": "Identifier",
                            "src": "1803:9:0"
                          }
                        ],
                        "id": 169,
                        "name": "Assignment",
                        "src": "1781:31:0"
                      }
                    ],
                    "id": 170,
                    "name": "ExpressionStatement",
                    "src": "1781:31:0"
                  },
                  {
                    "children": [
                      {
                        "attributes": {
                          "argumentTypes": null,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "isStructConstructorCall": false,
                          "lValueRequested": false,
                          "names": [
                            null
                          ],
                          "tryCall": false,
                          "type": "tuple()",
                          "type_conversion": false
                        },
                        "children": [
                          {
                            "attributes": {
                              "argumentTypes": [
                                {
                                  "typeIdentifier": "t_address_payable",
                                  "typeString": "address payable"
                                },
                                {
                                  "typeIdentifier": "t_address",
                                  "typeString": "address"
                                },
                                {
                                  "typeIdentifier": "t_uint256",
                                  "typeString": "uint256"
                                }
                              ],
                              "overloadedDeclarations": [
                                null
                              ],
                              "referencedDeclaration": 30,
                              "type": "function (address,address,uint256)",
                              "value": "Transfer"
                            },
                            "id": 171,
                            "name": "Identifier",
                            "src": "1827:8:0"
                          },
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "lValueRequested": false,
                              "member_name": "sender",
                              "referencedDeclaration": null,
                              "type": "address payable"
                            },
                            "children": [
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "overloadedDeclarations": [
                                    null
                                  ],
                                  "referencedDeclaration": -15,
                                  "type": "msg",
                                  "value": "msg"
                                },
                                "id": 172,
                                "name": "Identifier",
                                "src": "1836:3:0"
                              }
                            ],
                            "id": 173,
                            "name": "MemberAccess",
                            "src": "1836:10:0"
                          },
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "overloadedDeclarations": [
                                null
                              ],
                              "referencedDeclaration": 141,
                              "type": "address",
                              "value": "receiver"
                            },
                            "id": 174,
                            "name": "Identifier",
                            "src": "1847:8:0"
                          },
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "overloadedDeclarations": [
                                null
                              ],
                              "referencedDeclaration": 143,
                              "type": "uint256",
                              "value": "numTokens"
                            },
                            "id": 175,
                            "name": "Identifier",
                            "src": "1856:9:0"
                          }
                        ],
                        "id": 176,
                        "name": "FunctionCall",
                        "src": "1827:39:0"
                      }
                    ],
                    "id": 177,
                    "name": "EmitStatement",
                    "src": "1822:44:0"
                  },
                  {
                    "attributes": {
                      "functionReturnParameters": 148
                    },
                    "children": [
                      {
                        "attributes": {
                          "argumentTypes": null,
                          "hexvalue": "74727565",
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "lValueRequested": false,
                          "subdenomination": null,
                          "token": "bool",
                          "type": "bool",
                          "value": "true"
                        },
                        "id": 178,
                        "name": "Literal",
                        "src": "1883:4:0"
                      }
                    ],
                    "id": 179,
                    "name": "Return",
                    "src": "1876:11:0"
                  }
                ],
                "id": 180,
                "name": "Block",
                "src": "1675:219:0"
              }
            ],
            "id": 181,
            "name": "FunctionDefinition",
            "src": "1590:304:0"
          },
          {
            "attributes": {
              "documentation": null,
              "name": "onlyOwner",
              "overrides": null,
              "virtual": false,
              "visibility": "internal"
            },
            "children": [
              {
                "attributes": {
                  "parameters": [
                    null
                  ]
                },
                "children": [],
                "id": 182,
                "name": "ParameterList",
                "src": "1922:0:0"
              },
              {
                "children": [
                  {
                    "children": [
                      {
                        "attributes": {
                          "argumentTypes": null,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "isStructConstructorCall": false,
                          "lValueRequested": false,
                          "names": [
                            null
                          ],
                          "tryCall": false,
                          "type": "tuple()",
                          "type_conversion": false
                        },
                        "children": [
                          {
                            "attributes": {
                              "argumentTypes": [
                                {
                                  "typeIdentifier": "t_bool",
                                  "typeString": "bool"
                                },
                                {
                                  "typeIdentifier": "t_stringliteral_4d0140eda1fc363a2f60e05319b2a31a626cb51369ffbf73d8c82ecae04113de",
                                  "typeString": "literal_string \"only admin can run this function\""
                                }
                              ],
                              "overloadedDeclarations": [
                                -18,
                                -18
                              ],
                              "referencedDeclaration": -18,
                              "type": "function (bool,string memory) pure",
                              "value": "require"
                            },
                            "id": 183,
                            "name": "Identifier",
                            "src": "1932:7:0"
                          },
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "commonType": {
                                "typeIdentifier": "t_address",
                                "typeString": "address"
                              },
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "lValueRequested": false,
                              "operator": "==",
                              "type": "bool"
                            },
                            "children": [
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "isConstant": false,
                                  "isLValue": false,
                                  "isPure": false,
                                  "lValueRequested": false,
                                  "member_name": "sender",
                                  "referencedDeclaration": null,
                                  "type": "address payable"
                                },
                                "children": [
                                  {
                                    "attributes": {
                                      "argumentTypes": null,
                                      "overloadedDeclarations": [
                                        null
                                      ],
                                      "referencedDeclaration": -15,
                                      "type": "msg",
                                      "value": "msg"
                                    },
                                    "id": 184,
                                    "name": "Identifier",
                                    "src": "1940:3:0"
                                  }
                                ],
                                "id": 185,
                                "name": "MemberAccess",
                                "src": "1940:10:0"
                              },
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "overloadedDeclarations": [
                                    null
                                  ],
                                  "referencedDeclaration": 41,
                                  "type": "address",
                                  "value": "manager"
                                },
                                "id": 186,
                                "name": "Identifier",
                                "src": "1954:7:0"
                              }
                            ],
                            "id": 187,
                            "name": "BinaryOperation",
                            "src": "1940:21:0"
                          },
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "hexvalue": "6f6e6c792061646d696e2063616e2072756e20746869732066756e6374696f6e",
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "lValueRequested": false,
                              "subdenomination": null,
                              "token": "string",
                              "type": "literal_string \"only admin can run this function\"",
                              "value": "only admin can run this function"
                            },
                            "id": 188,
                            "name": "Literal",
                            "src": "1963:34:0"
                          }
                        ],
                        "id": 189,
                        "name": "FunctionCall",
                        "src": "1932:66:0"
                      }
                    ],
                    "id": 190,
                    "name": "ExpressionStatement",
                    "src": "1932:66:0"
                  },
                  {
                    "id": 191,
                    "name": "PlaceholderStatement",
                    "src": "2008:1:0"
                  }
                ],
                "id": 192,
                "name": "Block",
                "src": "1922:94:0"
              }
            ],
            "id": 193,
            "name": "ModifierDefinition",
            "src": "1903:113:0"
          },
          {
            "attributes": {
              "documentation": null,
              "functionSelector": "dd62ed3e",
              "implemented": true,
              "isConstructor": false,
              "kind": "function",
              "modifiers": [
                null
              ],
              "name": "allowance",
              "overrides": null,
              "scope": 468,
              "stateMutability": "view",
              "virtual": false,
              "visibility": "public"
            },
            "children": [
              {
                "children": [
                  {
                    "attributes": {
                      "constant": false,
                      "mutability": "mutable",
                      "name": "_owner",
                      "overrides": null,
                      "scope": 209,
                      "stateVariable": false,
                      "storageLocation": "default",
                      "type": "address",
                      "value": null,
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "address",
                          "stateMutability": "nonpayable",
                          "type": "address"
                        },
                        "id": 194,
                        "name": "ElementaryTypeName",
                        "src": "2883:7:0"
                      }
                    ],
                    "id": 195,
                    "name": "VariableDeclaration",
                    "src": "2883:14:0"
                  },
                  {
                    "attributes": {
                      "constant": false,
                      "mutability": "mutable",
                      "name": "_spender",
                      "overrides": null,
                      "scope": 209,
                      "stateVariable": false,
                      "storageLocation": "default",
                      "type": "address",
                      "value": null,
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "address",
                          "stateMutability": "nonpayable",
                          "type": "address"
                        },
                        "id": 196,
                        "name": "ElementaryTypeName",
                        "src": "2899:7:0"
                      }
                    ],
                    "id": 197,
                    "name": "VariableDeclaration",
                    "src": "2899:16:0"
                  }
                ],
                "id": 198,
                "name": "ParameterList",
                "src": "2882:34:0"
              },
              {
                "children": [
                  {
                    "attributes": {
                      "constant": false,
                      "mutability": "mutable",
                      "name": "remaining",
                      "overrides": null,
                      "scope": 209,
                      "stateVariable": false,
                      "storageLocation": "default",
                      "type": "uint256",
                      "value": null,
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "uint256",
                          "type": "uint256"
                        },
                        "id": 199,
                        "name": "ElementaryTypeName",
                        "src": "2938:7:0"
                      }
                    ],
                    "id": 200,
                    "name": "VariableDeclaration",
                    "src": "2938:17:0"
                  }
                ],
                "id": 201,
                "name": "ParameterList",
                "src": "2937:19:0"
              },
              {
                "children": [
                  {
                    "attributes": {
                      "functionReturnParameters": 201
                    },
                    "children": [
                      {
                        "attributes": {
                          "argumentTypes": null,
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "type": "uint256"
                        },
                        "children": [
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "isConstant": false,
                              "isLValue": true,
                              "isPure": false,
                              "lValueRequested": false,
                              "type": "mapping(address => uint256)"
                            },
                            "children": [
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "overloadedDeclarations": [
                                    null
                                  ],
                                  "referencedDeclaration": 51,
                                  "type": "mapping(address => mapping(address => uint256))",
                                  "value": "allowed"
                                },
                                "id": 202,
                                "name": "Identifier",
                                "src": "2974:7:0"
                              },
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "overloadedDeclarations": [
                                    null
                                  ],
                                  "referencedDeclaration": 195,
                                  "type": "address",
                                  "value": "_owner"
                                },
                                "id": 203,
                                "name": "Identifier",
                                "src": "2982:6:0"
                              }
                            ],
                            "id": 204,
                            "name": "IndexAccess",
                            "src": "2974:15:0"
                          },
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "overloadedDeclarations": [
                                null
                              ],
                              "referencedDeclaration": 197,
                              "type": "address",
                              "value": "_spender"
                            },
                            "id": 205,
                            "name": "Identifier",
                            "src": "2990:8:0"
                          }
                        ],
                        "id": 206,
                        "name": "IndexAccess",
                        "src": "2974:25:0"
                      }
                    ],
                    "id": 207,
                    "name": "Return",
                    "src": "2967:32:0"
                  }
                ],
                "id": 208,
                "name": "Block",
                "src": "2957:49:0"
              }
            ],
            "id": 209,
            "name": "FunctionDefinition",
            "src": "2864:142:0"
          },
          {
            "attributes": {
              "documentation": null,
              "functionSelector": "39509351",
              "implemented": true,
              "isConstructor": false,
              "kind": "function",
              "modifiers": [
                null
              ],
              "name": "increaseAllowance",
              "overrides": null,
              "scope": 468,
              "stateMutability": "nonpayable",
              "virtual": true,
              "visibility": "public"
            },
            "children": [
              {
                "children": [
                  {
                    "attributes": {
                      "constant": false,
                      "mutability": "mutable",
                      "name": "spender",
                      "overrides": null,
                      "scope": 235,
                      "stateVariable": false,
                      "storageLocation": "default",
                      "type": "address",
                      "value": null,
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "address",
                          "stateMutability": "nonpayable",
                          "type": "address"
                        },
                        "id": 210,
                        "name": "ElementaryTypeName",
                        "src": "3045:7:0"
                      }
                    ],
                    "id": 211,
                    "name": "VariableDeclaration",
                    "src": "3045:15:0"
                  },
                  {
                    "attributes": {
                      "constant": false,
                      "mutability": "mutable",
                      "name": "addedValue",
                      "overrides": null,
                      "scope": 235,
                      "stateVariable": false,
                      "storageLocation": "default",
                      "type": "uint256",
                      "value": null,
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "uint256",
                          "type": "uint256"
                        },
                        "id": 212,
                        "name": "ElementaryTypeName",
                        "src": "3062:7:0"
                      }
                    ],
                    "id": 213,
                    "name": "VariableDeclaration",
                    "src": "3062:18:0"
                  }
                ],
                "id": 214,
                "name": "ParameterList",
                "src": "3044:37:0"
              },
              {
                "children": [
                  {
                    "attributes": {
                      "constant": false,
                      "mutability": "mutable",
                      "name": "",
                      "overrides": null,
                      "scope": 235,
                      "stateVariable": false,
                      "storageLocation": "default",
                      "type": "bool",
                      "value": null,
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "bool",
                          "type": "bool"
                        },
                        "id": 215,
                        "name": "ElementaryTypeName",
                        "src": "3106:4:0"
                      }
                    ],
                    "id": 216,
                    "name": "VariableDeclaration",
                    "src": "3106:4:0"
                  }
                ],
                "id": 217,
                "name": "ParameterList",
                "src": "3105:6:0"
              },
              {
                "children": [
                  {
                    "children": [
                      {
                        "attributes": {
                          "argumentTypes": null,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "isStructConstructorCall": false,
                          "lValueRequested": false,
                          "names": [
                            null
                          ],
                          "tryCall": false,
                          "type": "tuple()",
                          "type_conversion": false
                        },
                        "children": [
                          {
                            "attributes": {
                              "argumentTypes": [
                                {
                                  "typeIdentifier": "t_address_payable",
                                  "typeString": "address payable"
                                },
                                {
                                  "typeIdentifier": "t_address",
                                  "typeString": "address"
                                },
                                {
                                  "typeIdentifier": "t_uint256",
                                  "typeString": "uint256"
                                }
                              ],
                              "overloadedDeclarations": [
                                null
                              ],
                              "referencedDeclaration": 77,
                              "type": "function (address,address,uint256)",
                              "value": "Approval"
                            },
                            "id": 218,
                            "name": "Identifier",
                            "src": "3126:8:0"
                          },
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "lValueRequested": false,
                              "member_name": "sender",
                              "referencedDeclaration": null,
                              "type": "address payable"
                            },
                            "children": [
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "overloadedDeclarations": [
                                    null
                                  ],
                                  "referencedDeclaration": -15,
                                  "type": "msg",
                                  "value": "msg"
                                },
                                "id": 219,
                                "name": "Identifier",
                                "src": "3135:3:0"
                              }
                            ],
                            "id": 220,
                            "name": "MemberAccess",
                            "src": "3135:10:0"
                          },
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "overloadedDeclarations": [
                                null
                              ],
                              "referencedDeclaration": 211,
                              "type": "address",
                              "value": "spender"
                            },
                            "id": 221,
                            "name": "Identifier",
                            "src": "3147:7:0"
                          },
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "commonType": {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              },
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "lValueRequested": false,
                              "operator": "+",
                              "type": "uint256"
                            },
                            "children": [
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "isConstant": false,
                                  "isLValue": true,
                                  "isPure": false,
                                  "lValueRequested": false,
                                  "type": "uint256"
                                },
                                "children": [
                                  {
                                    "attributes": {
                                      "argumentTypes": null,
                                      "isConstant": false,
                                      "isLValue": true,
                                      "isPure": false,
                                      "lValueRequested": false,
                                      "type": "mapping(address => uint256)"
                                    },
                                    "children": [
                                      {
                                        "attributes": {
                                          "argumentTypes": null,
                                          "overloadedDeclarations": [
                                            null
                                          ],
                                          "referencedDeclaration": 51,
                                          "type": "mapping(address => mapping(address => uint256))",
                                          "value": "allowed"
                                        },
                                        "id": 222,
                                        "name": "Identifier",
                                        "src": "3156:7:0"
                                      },
                                      {
                                        "attributes": {
                                          "argumentTypes": null,
                                          "isConstant": false,
                                          "isLValue": false,
                                          "isPure": false,
                                          "lValueRequested": false,
                                          "member_name": "sender",
                                          "referencedDeclaration": null,
                                          "type": "address payable"
                                        },
                                        "children": [
                                          {
                                            "attributes": {
                                              "argumentTypes": null,
                                              "overloadedDeclarations": [
                                                null
                                              ],
                                              "referencedDeclaration": -15,
                                              "type": "msg",
                                              "value": "msg"
                                            },
                                            "id": 223,
                                            "name": "Identifier",
                                            "src": "3164:3:0"
                                          }
                                        ],
                                        "id": 224,
                                        "name": "MemberAccess",
                                        "src": "3164:10:0"
                                      }
                                    ],
                                    "id": 225,
                                    "name": "IndexAccess",
                                    "src": "3156:19:0"
                                  },
                                  {
                                    "attributes": {
                                      "argumentTypes": null,
                                      "overloadedDeclarations": [
                                        null
                                      ],
                                      "referencedDeclaration": 211,
                                      "type": "address",
                                      "value": "spender"
                                    },
                                    "id": 226,
                                    "name": "Identifier",
                                    "src": "3176:7:0"
                                  }
                                ],
                                "id": 227,
                                "name": "IndexAccess",
                                "src": "3156:28:0"
                              },
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "overloadedDeclarations": [
                                    null
                                  ],
                                  "referencedDeclaration": 213,
                                  "type": "uint256",
                                  "value": "addedValue"
                                },
                                "id": 228,
                                "name": "Identifier",
                                "src": "3187:10:0"
                              }
                            ],
                            "id": 229,
                            "name": "BinaryOperation",
                            "src": "3156:41:0"
                          }
                        ],
                        "id": 230,
                        "name": "FunctionCall",
                        "src": "3126:72:0"
                      }
                    ],
                    "id": 231,
                    "name": "EmitStatement",
                    "src": "3121:77:0"
                  },
                  {
                    "attributes": {
                      "functionReturnParameters": 217
                    },
                    "children": [
                      {
                        "attributes": {
                          "argumentTypes": null,
                          "hexvalue": "74727565",
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "lValueRequested": false,
                          "subdenomination": null,
                          "token": "bool",
                          "type": "bool",
                          "value": "true"
                        },
                        "id": 232,
                        "name": "Literal",
                        "src": "3215:4:0"
                      }
                    ],
                    "id": 233,
                    "name": "Return",
                    "src": "3208:11:0"
                  }
                ],
                "id": 234,
                "name": "Block",
                "src": "3112:114:0"
              }
            ],
            "id": 235,
            "name": "FunctionDefinition",
            "src": "3018:208:0"
          },
          {
            "attributes": {
              "documentation": null,
              "functionSelector": "a457c2d7",
              "implemented": true,
              "isConstructor": false,
              "kind": "function",
              "modifiers": [
                null
              ],
              "name": "decreaseAllowance",
              "overrides": null,
              "scope": 468,
              "stateMutability": "nonpayable",
              "virtual": true,
              "visibility": "public"
            },
            "children": [
              {
                "children": [
                  {
                    "attributes": {
                      "constant": false,
                      "mutability": "mutable",
                      "name": "spender",
                      "overrides": null,
                      "scope": 272,
                      "stateVariable": false,
                      "storageLocation": "default",
                      "type": "address",
                      "value": null,
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "address",
                          "stateMutability": "nonpayable",
                          "type": "address"
                        },
                        "id": 236,
                        "name": "ElementaryTypeName",
                        "src": "3260:7:0"
                      }
                    ],
                    "id": 237,
                    "name": "VariableDeclaration",
                    "src": "3260:15:0"
                  },
                  {
                    "attributes": {
                      "constant": false,
                      "mutability": "mutable",
                      "name": "subtractedValue",
                      "overrides": null,
                      "scope": 272,
                      "stateVariable": false,
                      "storageLocation": "default",
                      "type": "uint256",
                      "value": null,
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "uint256",
                          "type": "uint256"
                        },
                        "id": 238,
                        "name": "ElementaryTypeName",
                        "src": "3277:7:0"
                      }
                    ],
                    "id": 239,
                    "name": "VariableDeclaration",
                    "src": "3277:23:0"
                  }
                ],
                "id": 240,
                "name": "ParameterList",
                "src": "3259:42:0"
              },
              {
                "children": [
                  {
                    "attributes": {
                      "constant": false,
                      "mutability": "mutable",
                      "name": "",
                      "overrides": null,
                      "scope": 272,
                      "stateVariable": false,
                      "storageLocation": "default",
                      "type": "bool",
                      "value": null,
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "bool",
                          "type": "bool"
                        },
                        "id": 241,
                        "name": "ElementaryTypeName",
                        "src": "3326:4:0"
                      }
                    ],
                    "id": 242,
                    "name": "VariableDeclaration",
                    "src": "3326:4:0"
                  }
                ],
                "id": 243,
                "name": "ParameterList",
                "src": "3325:6:0"
              },
              {
                "children": [
                  {
                    "attributes": {
                      "assignments": [
                        245
                      ]
                    },
                    "children": [
                      {
                        "attributes": {
                          "constant": false,
                          "mutability": "mutable",
                          "name": "currentAllowance",
                          "overrides": null,
                          "scope": 271,
                          "stateVariable": false,
                          "storageLocation": "default",
                          "type": "uint256",
                          "value": null,
                          "visibility": "internal"
                        },
                        "children": [
                          {
                            "attributes": {
                              "name": "uint256",
                              "type": "uint256"
                            },
                            "id": 244,
                            "name": "ElementaryTypeName",
                            "src": "3342:7:0"
                          }
                        ],
                        "id": 245,
                        "name": "VariableDeclaration",
                        "src": "3342:24:0"
                      },
                      {
                        "attributes": {
                          "argumentTypes": null,
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "type": "uint256"
                        },
                        "children": [
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "isConstant": false,
                              "isLValue": true,
                              "isPure": false,
                              "lValueRequested": false,
                              "type": "mapping(address => uint256)"
                            },
                            "children": [
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "overloadedDeclarations": [
                                    null
                                  ],
                                  "referencedDeclaration": 51,
                                  "type": "mapping(address => mapping(address => uint256))",
                                  "value": "allowed"
                                },
                                "id": 246,
                                "name": "Identifier",
                                "src": "3369:7:0"
                              },
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "isConstant": false,
                                  "isLValue": false,
                                  "isPure": false,
                                  "lValueRequested": false,
                                  "member_name": "sender",
                                  "referencedDeclaration": null,
                                  "type": "address payable"
                                },
                                "children": [
                                  {
                                    "attributes": {
                                      "argumentTypes": null,
                                      "overloadedDeclarations": [
                                        null
                                      ],
                                      "referencedDeclaration": -15,
                                      "type": "msg",
                                      "value": "msg"
                                    },
                                    "id": 247,
                                    "name": "Identifier",
                                    "src": "3377:3:0"
                                  }
                                ],
                                "id": 248,
                                "name": "MemberAccess",
                                "src": "3377:10:0"
                              }
                            ],
                            "id": 249,
                            "name": "IndexAccess",
                            "src": "3369:19:0"
                          },
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "overloadedDeclarations": [
                                null
                              ],
                              "referencedDeclaration": 237,
                              "type": "address",
                              "value": "spender"
                            },
                            "id": 250,
                            "name": "Identifier",
                            "src": "3389:7:0"
                          }
                        ],
                        "id": 251,
                        "name": "IndexAccess",
                        "src": "3369:28:0"
                      }
                    ],
                    "id": 252,
                    "name": "VariableDeclarationStatement",
                    "src": "3342:55:0"
                  },
                  {
                    "children": [
                      {
                        "attributes": {
                          "argumentTypes": null,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "isStructConstructorCall": false,
                          "lValueRequested": false,
                          "names": [
                            null
                          ],
                          "tryCall": false,
                          "type": "tuple()",
                          "type_conversion": false
                        },
                        "children": [
                          {
                            "attributes": {
                              "argumentTypes": [
                                {
                                  "typeIdentifier": "t_bool",
                                  "typeString": "bool"
                                },
                                {
                                  "typeIdentifier": "t_stringliteral_f8b476f7d28209d77d4a4ac1fe36b9f8259aa1bb6bddfa6e89de7e51615cf8a8",
                                  "typeString": "literal_string \"ERC20: decreased allowance below zero\""
                                }
                              ],
                              "overloadedDeclarations": [
                                -18,
                                -18
                              ],
                              "referencedDeclaration": -18,
                              "type": "function (bool,string memory) pure",
                              "value": "require"
                            },
                            "id": 253,
                            "name": "Identifier",
                            "src": "3407:7:0"
                          },
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "commonType": {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              },
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "lValueRequested": false,
                              "operator": ">=",
                              "type": "bool"
                            },
                            "children": [
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "overloadedDeclarations": [
                                    null
                                  ],
                                  "referencedDeclaration": 245,
                                  "type": "uint256",
                                  "value": "currentAllowance"
                                },
                                "id": 254,
                                "name": "Identifier",
                                "src": "3415:16:0"
                              },
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "overloadedDeclarations": [
                                    null
                                  ],
                                  "referencedDeclaration": 239,
                                  "type": "uint256",
                                  "value": "subtractedValue"
                                },
                                "id": 255,
                                "name": "Identifier",
                                "src": "3435:15:0"
                              }
                            ],
                            "id": 256,
                            "name": "BinaryOperation",
                            "src": "3415:35:0"
                          },
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "hexvalue": "45524332303a2064656372656173656420616c6c6f77616e63652062656c6f77207a65726f",
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "lValueRequested": false,
                              "subdenomination": null,
                              "token": "string",
                              "type": "literal_string \"ERC20: decreased allowance below zero\"",
                              "value": "ERC20: decreased allowance below zero"
                            },
                            "id": 257,
                            "name": "Literal",
                            "src": "3452:39:0"
                          }
                        ],
                        "id": 258,
                        "name": "FunctionCall",
                        "src": "3407:85:0"
                      }
                    ],
                    "id": 259,
                    "name": "ExpressionStatement",
                    "src": "3407:85:0"
                  },
                  {
                    "children": [
                      {
                        "attributes": {
                          "argumentTypes": null,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "isStructConstructorCall": false,
                          "lValueRequested": false,
                          "names": [
                            null
                          ],
                          "tryCall": false,
                          "type": "tuple()",
                          "type_conversion": false
                        },
                        "children": [
                          {
                            "attributes": {
                              "argumentTypes": [
                                {
                                  "typeIdentifier": "t_address_payable",
                                  "typeString": "address payable"
                                },
                                {
                                  "typeIdentifier": "t_address",
                                  "typeString": "address"
                                },
                                {
                                  "typeIdentifier": "t_uint256",
                                  "typeString": "uint256"
                                }
                              ],
                              "overloadedDeclarations": [
                                null
                              ],
                              "referencedDeclaration": 77,
                              "type": "function (address,address,uint256)",
                              "value": "Approval"
                            },
                            "id": 260,
                            "name": "Identifier",
                            "src": "3509:8:0"
                          },
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "lValueRequested": false,
                              "member_name": "sender",
                              "referencedDeclaration": null,
                              "type": "address payable"
                            },
                            "children": [
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "overloadedDeclarations": [
                                    null
                                  ],
                                  "referencedDeclaration": -15,
                                  "type": "msg",
                                  "value": "msg"
                                },
                                "id": 261,
                                "name": "Identifier",
                                "src": "3518:3:0"
                              }
                            ],
                            "id": 262,
                            "name": "MemberAccess",
                            "src": "3518:10:0"
                          },
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "overloadedDeclarations": [
                                null
                              ],
                              "referencedDeclaration": 237,
                              "type": "address",
                              "value": "spender"
                            },
                            "id": 263,
                            "name": "Identifier",
                            "src": "3530:7:0"
                          },
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "commonType": {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              },
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "lValueRequested": false,
                              "operator": "-",
                              "type": "uint256"
                            },
                            "children": [
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "overloadedDeclarations": [
                                    null
                                  ],
                                  "referencedDeclaration": 245,
                                  "type": "uint256",
                                  "value": "currentAllowance"
                                },
                                "id": 264,
                                "name": "Identifier",
                                "src": "3539:16:0"
                              },
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "overloadedDeclarations": [
                                    null
                                  ],
                                  "referencedDeclaration": 239,
                                  "type": "uint256",
                                  "value": "subtractedValue"
                                },
                                "id": 265,
                                "name": "Identifier",
                                "src": "3558:15:0"
                              }
                            ],
                            "id": 266,
                            "name": "BinaryOperation",
                            "src": "3539:34:0"
                          }
                        ],
                        "id": 267,
                        "name": "FunctionCall",
                        "src": "3509:65:0"
                      }
                    ],
                    "id": 268,
                    "name": "EmitStatement",
                    "src": "3504:70:0"
                  },
                  {
                    "attributes": {
                      "functionReturnParameters": 243
                    },
                    "children": [
                      {
                        "attributes": {
                          "argumentTypes": null,
                          "hexvalue": "74727565",
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "lValueRequested": false,
                          "subdenomination": null,
                          "token": "bool",
                          "type": "bool",
                          "value": "true"
                        },
                        "id": 269,
                        "name": "Literal",
                        "src": "3592:4:0"
                      }
                    ],
                    "id": 270,
                    "name": "Return",
                    "src": "3585:11:0"
                  }
                ],
                "id": 271,
                "name": "Block",
                "src": "3332:271:0"
              }
            ],
            "id": 272,
            "name": "FunctionDefinition",
            "src": "3233:370:0"
          },
          {
            "attributes": {
              "documentation": null,
              "functionSelector": "095ea7b3",
              "implemented": true,
              "isConstructor": false,
              "kind": "function",
              "modifiers": [
                null
              ],
              "name": "approve",
              "overrides": null,
              "scope": 468,
              "stateMutability": "nonpayable",
              "virtual": false,
              "visibility": "public"
            },
            "children": [
              {
                "children": [
                  {
                    "attributes": {
                      "constant": false,
                      "mutability": "mutable",
                      "name": "_spender",
                      "overrides": null,
                      "scope": 300,
                      "stateVariable": false,
                      "storageLocation": "default",
                      "type": "address",
                      "value": null,
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "address",
                          "stateMutability": "nonpayable",
                          "type": "address"
                        },
                        "id": 273,
                        "name": "ElementaryTypeName",
                        "src": "3631:7:0"
                      }
                    ],
                    "id": 274,
                    "name": "VariableDeclaration",
                    "src": "3631:16:0"
                  },
                  {
                    "attributes": {
                      "constant": false,
                      "mutability": "mutable",
                      "name": "_value",
                      "overrides": null,
                      "scope": 300,
                      "stateVariable": false,
                      "storageLocation": "default",
                      "type": "uint256",
                      "value": null,
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "uint256",
                          "type": "uint256"
                        },
                        "id": 275,
                        "name": "ElementaryTypeName",
                        "src": "3649:7:0"
                      }
                    ],
                    "id": 276,
                    "name": "VariableDeclaration",
                    "src": "3649:14:0"
                  }
                ],
                "id": 277,
                "name": "ParameterList",
                "src": "3630:34:0"
              },
              {
                "children": [
                  {
                    "attributes": {
                      "constant": false,
                      "mutability": "mutable",
                      "name": "success",
                      "overrides": null,
                      "scope": 300,
                      "stateVariable": false,
                      "storageLocation": "default",
                      "type": "bool",
                      "value": null,
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "bool",
                          "type": "bool"
                        },
                        "id": 278,
                        "name": "ElementaryTypeName",
                        "src": "3681:4:0"
                      }
                    ],
                    "id": 279,
                    "name": "VariableDeclaration",
                    "src": "3681:12:0"
                  }
                ],
                "id": 280,
                "name": "ParameterList",
                "src": "3680:14:0"
              },
              {
                "children": [
                  {
                    "children": [
                      {
                        "attributes": {
                          "argumentTypes": null,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "operator": "=",
                          "type": "uint256"
                        },
                        "children": [
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "isConstant": false,
                              "isLValue": true,
                              "isPure": false,
                              "lValueRequested": true,
                              "type": "uint256"
                            },
                            "children": [
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "isConstant": false,
                                  "isLValue": true,
                                  "isPure": false,
                                  "lValueRequested": false,
                                  "type": "mapping(address => uint256)"
                                },
                                "children": [
                                  {
                                    "attributes": {
                                      "argumentTypes": null,
                                      "overloadedDeclarations": [
                                        null
                                      ],
                                      "referencedDeclaration": 51,
                                      "type": "mapping(address => mapping(address => uint256))",
                                      "value": "allowed"
                                    },
                                    "id": 281,
                                    "name": "Identifier",
                                    "src": "3705:7:0"
                                  },
                                  {
                                    "attributes": {
                                      "argumentTypes": null,
                                      "isConstant": false,
                                      "isLValue": false,
                                      "isPure": false,
                                      "lValueRequested": false,
                                      "member_name": "sender",
                                      "referencedDeclaration": null,
                                      "type": "address payable"
                                    },
                                    "children": [
                                      {
                                        "attributes": {
                                          "argumentTypes": null,
                                          "overloadedDeclarations": [
                                            null
                                          ],
                                          "referencedDeclaration": -15,
                                          "type": "msg",
                                          "value": "msg"
                                        },
                                        "id": 282,
                                        "name": "Identifier",
                                        "src": "3713:3:0"
                                      }
                                    ],
                                    "id": 283,
                                    "name": "MemberAccess",
                                    "src": "3713:10:0"
                                  }
                                ],
                                "id": 285,
                                "name": "IndexAccess",
                                "src": "3705:19:0"
                              },
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "overloadedDeclarations": [
                                    null
                                  ],
                                  "referencedDeclaration": 274,
                                  "type": "address",
                                  "value": "_spender"
                                },
                                "id": 284,
                                "name": "Identifier",
                                "src": "3725:8:0"
                              }
                            ],
                            "id": 286,
                            "name": "IndexAccess",
                            "src": "3705:29:0"
                          },
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "overloadedDeclarations": [
                                null
                              ],
                              "referencedDeclaration": 276,
                              "type": "uint256",
                              "value": "_value"
                            },
                            "id": 287,
                            "name": "Identifier",
                            "src": "3737:6:0"
                          }
                        ],
                        "id": 288,
                        "name": "Assignment",
                        "src": "3705:38:0"
                      }
                    ],
                    "id": 289,
                    "name": "ExpressionStatement",
                    "src": "3705:38:0"
                  },
                  {
                    "children": [
                      {
                        "attributes": {
                          "argumentTypes": null,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "isStructConstructorCall": false,
                          "lValueRequested": false,
                          "names": [
                            null
                          ],
                          "tryCall": false,
                          "type": "tuple()",
                          "type_conversion": false
                        },
                        "children": [
                          {
                            "attributes": {
                              "argumentTypes": [
                                {
                                  "typeIdentifier": "t_address_payable",
                                  "typeString": "address payable"
                                },
                                {
                                  "typeIdentifier": "t_address",
                                  "typeString": "address"
                                },
                                {
                                  "typeIdentifier": "t_uint256",
                                  "typeString": "uint256"
                                }
                              ],
                              "overloadedDeclarations": [
                                null
                              ],
                              "referencedDeclaration": 77,
                              "type": "function (address,address,uint256)",
                              "value": "Approval"
                            },
                            "id": 290,
                            "name": "Identifier",
                            "src": "3758:8:0"
                          },
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "lValueRequested": false,
                              "member_name": "sender",
                              "referencedDeclaration": null,
                              "type": "address payable"
                            },
                            "children": [
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "overloadedDeclarations": [
                                    null
                                  ],
                                  "referencedDeclaration": -15,
                                  "type": "msg",
                                  "value": "msg"
                                },
                                "id": 291,
                                "name": "Identifier",
                                "src": "3767:3:0"
                              }
                            ],
                            "id": 292,
                            "name": "MemberAccess",
                            "src": "3767:10:0"
                          },
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "overloadedDeclarations": [
                                null
                              ],
                              "referencedDeclaration": 274,
                              "type": "address",
                              "value": "_spender"
                            },
                            "id": 293,
                            "name": "Identifier",
                            "src": "3779:8:0"
                          },
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "overloadedDeclarations": [
                                null
                              ],
                              "referencedDeclaration": 276,
                              "type": "uint256",
                              "value": "_value"
                            },
                            "id": 294,
                            "name": "Identifier",
                            "src": "3789:6:0"
                          }
                        ],
                        "id": 295,
                        "name": "FunctionCall",
                        "src": "3758:38:0"
                      }
                    ],
                    "id": 296,
                    "name": "EmitStatement",
                    "src": "3753:43:0"
                  },
                  {
                    "attributes": {
                      "functionReturnParameters": 280
                    },
                    "children": [
                      {
                        "attributes": {
                          "argumentTypes": null,
                          "hexvalue": "74727565",
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "lValueRequested": false,
                          "subdenomination": null,
                          "token": "bool",
                          "type": "bool",
                          "value": "true"
                        },
                        "id": 297,
                        "name": "Literal",
                        "src": "3814:4:0"
                      }
                    ],
                    "id": 298,
                    "name": "Return",
                    "src": "3807:11:0"
                  }
                ],
                "id": 299,
                "name": "Block",
                "src": "3695:130:0"
              }
            ],
            "id": 300,
            "name": "FunctionDefinition",
            "src": "3614:211:0"
          },
          {
            "attributes": {
              "documentation": null,
              "functionSelector": "23b872dd",
              "implemented": true,
              "isConstructor": false,
              "kind": "function",
              "modifiers": [
                null
              ],
              "name": "transferFrom",
              "overrides": null,
              "scope": 468,
              "stateMutability": "nonpayable",
              "virtual": false,
              "visibility": "public"
            },
            "children": [
              {
                "children": [
                  {
                    "attributes": {
                      "constant": false,
                      "mutability": "mutable",
                      "name": "_from",
                      "overrides": null,
                      "scope": 362,
                      "stateVariable": false,
                      "storageLocation": "default",
                      "type": "address",
                      "value": null,
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "address",
                          "stateMutability": "nonpayable",
                          "type": "address"
                        },
                        "id": 301,
                        "name": "ElementaryTypeName",
                        "src": "3863:7:0"
                      }
                    ],
                    "id": 302,
                    "name": "VariableDeclaration",
                    "src": "3863:13:0"
                  },
                  {
                    "attributes": {
                      "constant": false,
                      "mutability": "mutable",
                      "name": "_to",
                      "overrides": null,
                      "scope": 362,
                      "stateVariable": false,
                      "storageLocation": "default",
                      "type": "address",
                      "value": null,
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "address",
                          "stateMutability": "nonpayable",
                          "type": "address"
                        },
                        "id": 303,
                        "name": "ElementaryTypeName",
                        "src": "3878:7:0"
                      }
                    ],
                    "id": 304,
                    "name": "VariableDeclaration",
                    "src": "3878:11:0"
                  },
                  {
                    "attributes": {
                      "constant": false,
                      "mutability": "mutable",
                      "name": "_value",
                      "overrides": null,
                      "scope": 362,
                      "stateVariable": false,
                      "storageLocation": "default",
                      "type": "uint256",
                      "value": null,
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "uint256",
                          "type": "uint256"
                        },
                        "id": 305,
                        "name": "ElementaryTypeName",
                        "src": "3891:7:0"
                      }
                    ],
                    "id": 306,
                    "name": "VariableDeclaration",
                    "src": "3891:14:0"
                  }
                ],
                "id": 307,
                "name": "ParameterList",
                "src": "3862:44:0"
              },
              {
                "children": [
                  {
                    "attributes": {
                      "constant": false,
                      "mutability": "mutable",
                      "name": "success",
                      "overrides": null,
                      "scope": 362,
                      "stateVariable": false,
                      "storageLocation": "default",
                      "type": "bool",
                      "value": null,
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "bool",
                          "type": "bool"
                        },
                        "id": 308,
                        "name": "ElementaryTypeName",
                        "src": "3923:4:0"
                      }
                    ],
                    "id": 309,
                    "name": "VariableDeclaration",
                    "src": "3923:12:0"
                  }
                ],
                "id": 310,
                "name": "ParameterList",
                "src": "3922:14:0"
              },
              {
                "children": [
                  {
                    "attributes": {
                      "assignments": [
                        312
                      ]
                    },
                    "children": [
                      {
                        "attributes": {
                          "constant": false,
                          "mutability": "mutable",
                          "name": "allowance1",
                          "overrides": null,
                          "scope": 361,
                          "stateVariable": false,
                          "storageLocation": "default",
                          "type": "uint256",
                          "value": null,
                          "visibility": "internal"
                        },
                        "children": [
                          {
                            "attributes": {
                              "name": "uint256",
                              "type": "uint256"
                            },
                            "id": 311,
                            "name": "ElementaryTypeName",
                            "src": "3947:7:0"
                          }
                        ],
                        "id": 312,
                        "name": "VariableDeclaration",
                        "src": "3947:18:0"
                      },
                      {
                        "attributes": {
                          "argumentTypes": null,
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "type": "uint256"
                        },
                        "children": [
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "isConstant": false,
                              "isLValue": true,
                              "isPure": false,
                              "lValueRequested": false,
                              "type": "mapping(address => uint256)"
                            },
                            "children": [
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "overloadedDeclarations": [
                                    null
                                  ],
                                  "referencedDeclaration": 51,
                                  "type": "mapping(address => mapping(address => uint256))",
                                  "value": "allowed"
                                },
                                "id": 313,
                                "name": "Identifier",
                                "src": "3968:7:0"
                              },
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "overloadedDeclarations": [
                                    null
                                  ],
                                  "referencedDeclaration": 302,
                                  "type": "address",
                                  "value": "_from"
                                },
                                "id": 314,
                                "name": "Identifier",
                                "src": "3976:5:0"
                              }
                            ],
                            "id": 315,
                            "name": "IndexAccess",
                            "src": "3968:14:0"
                          },
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "lValueRequested": false,
                              "member_name": "sender",
                              "referencedDeclaration": null,
                              "type": "address payable"
                            },
                            "children": [
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "overloadedDeclarations": [
                                    null
                                  ],
                                  "referencedDeclaration": -15,
                                  "type": "msg",
                                  "value": "msg"
                                },
                                "id": 316,
                                "name": "Identifier",
                                "src": "3983:3:0"
                              }
                            ],
                            "id": 317,
                            "name": "MemberAccess",
                            "src": "3983:10:0"
                          }
                        ],
                        "id": 318,
                        "name": "IndexAccess",
                        "src": "3968:26:0"
                      }
                    ],
                    "id": 319,
                    "name": "VariableDeclarationStatement",
                    "src": "3947:47:0"
                  },
                  {
                    "children": [
                      {
                        "attributes": {
                          "argumentTypes": null,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "isStructConstructorCall": false,
                          "lValueRequested": false,
                          "names": [
                            null
                          ],
                          "tryCall": false,
                          "type": "tuple()",
                          "type_conversion": false
                        },
                        "children": [
                          {
                            "attributes": {
                              "argumentTypes": [
                                {
                                  "typeIdentifier": "t_bool",
                                  "typeString": "bool"
                                }
                              ],
                              "overloadedDeclarations": [
                                -18,
                                -18
                              ],
                              "referencedDeclaration": -18,
                              "type": "function (bool) pure",
                              "value": "require"
                            },
                            "id": 320,
                            "name": "Identifier",
                            "src": "4004:7:0"
                          },
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "commonType": {
                                "typeIdentifier": "t_bool",
                                "typeString": "bool"
                              },
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "lValueRequested": false,
                              "operator": "&&",
                              "type": "bool"
                            },
                            "children": [
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "commonType": {
                                    "typeIdentifier": "t_uint256",
                                    "typeString": "uint256"
                                  },
                                  "isConstant": false,
                                  "isLValue": false,
                                  "isPure": false,
                                  "lValueRequested": false,
                                  "operator": ">=",
                                  "type": "bool"
                                },
                                "children": [
                                  {
                                    "attributes": {
                                      "argumentTypes": null,
                                      "isConstant": false,
                                      "isLValue": true,
                                      "isPure": false,
                                      "lValueRequested": false,
                                      "type": "uint256"
                                    },
                                    "children": [
                                      {
                                        "attributes": {
                                          "argumentTypes": null,
                                          "overloadedDeclarations": [
                                            null
                                          ],
                                          "referencedDeclaration": 45,
                                          "type": "mapping(address => uint256)",
                                          "value": "balances"
                                        },
                                        "id": 321,
                                        "name": "Identifier",
                                        "src": "4012:8:0"
                                      },
                                      {
                                        "attributes": {
                                          "argumentTypes": null,
                                          "overloadedDeclarations": [
                                            null
                                          ],
                                          "referencedDeclaration": 302,
                                          "type": "address",
                                          "value": "_from"
                                        },
                                        "id": 322,
                                        "name": "Identifier",
                                        "src": "4021:5:0"
                                      }
                                    ],
                                    "id": 323,
                                    "name": "IndexAccess",
                                    "src": "4012:15:0"
                                  },
                                  {
                                    "attributes": {
                                      "argumentTypes": null,
                                      "overloadedDeclarations": [
                                        null
                                      ],
                                      "referencedDeclaration": 306,
                                      "type": "uint256",
                                      "value": "_value"
                                    },
                                    "id": 324,
                                    "name": "Identifier",
                                    "src": "4031:6:0"
                                  }
                                ],
                                "id": 325,
                                "name": "BinaryOperation",
                                "src": "4012:25:0"
                              },
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "commonType": {
                                    "typeIdentifier": "t_uint256",
                                    "typeString": "uint256"
                                  },
                                  "isConstant": false,
                                  "isLValue": false,
                                  "isPure": false,
                                  "lValueRequested": false,
                                  "operator": ">=",
                                  "type": "bool"
                                },
                                "children": [
                                  {
                                    "attributes": {
                                      "argumentTypes": null,
                                      "overloadedDeclarations": [
                                        null
                                      ],
                                      "referencedDeclaration": 312,
                                      "type": "uint256",
                                      "value": "allowance1"
                                    },
                                    "id": 326,
                                    "name": "Identifier",
                                    "src": "4041:10:0"
                                  },
                                  {
                                    "attributes": {
                                      "argumentTypes": null,
                                      "overloadedDeclarations": [
                                        null
                                      ],
                                      "referencedDeclaration": 306,
                                      "type": "uint256",
                                      "value": "_value"
                                    },
                                    "id": 327,
                                    "name": "Identifier",
                                    "src": "4055:6:0"
                                  }
                                ],
                                "id": 328,
                                "name": "BinaryOperation",
                                "src": "4041:20:0"
                              }
                            ],
                            "id": 329,
                            "name": "BinaryOperation",
                            "src": "4012:49:0"
                          }
                        ],
                        "id": 330,
                        "name": "FunctionCall",
                        "src": "4004:58:0"
                      }
                    ],
                    "id": 331,
                    "name": "ExpressionStatement",
                    "src": "4004:58:0"
                  },
                  {
                    "children": [
                      {
                        "attributes": {
                          "argumentTypes": null,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "operator": "+=",
                          "type": "uint256"
                        },
                        "children": [
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "isConstant": false,
                              "isLValue": true,
                              "isPure": false,
                              "lValueRequested": true,
                              "type": "uint256"
                            },
                            "children": [
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "overloadedDeclarations": [
                                    null
                                  ],
                                  "referencedDeclaration": 45,
                                  "type": "mapping(address => uint256)",
                                  "value": "balances"
                                },
                                "id": 332,
                                "name": "Identifier",
                                "src": "4072:8:0"
                              },
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "overloadedDeclarations": [
                                    null
                                  ],
                                  "referencedDeclaration": 304,
                                  "type": "address",
                                  "value": "_to"
                                },
                                "id": 333,
                                "name": "Identifier",
                                "src": "4081:3:0"
                              }
                            ],
                            "id": 334,
                            "name": "IndexAccess",
                            "src": "4072:13:0"
                          },
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "overloadedDeclarations": [
                                null
                              ],
                              "referencedDeclaration": 306,
                              "type": "uint256",
                              "value": "_value"
                            },
                            "id": 335,
                            "name": "Identifier",
                            "src": "4089:6:0"
                          }
                        ],
                        "id": 336,
                        "name": "Assignment",
                        "src": "4072:23:0"
                      }
                    ],
                    "id": 337,
                    "name": "ExpressionStatement",
                    "src": "4072:23:0"
                  },
                  {
                    "children": [
                      {
                        "attributes": {
                          "argumentTypes": null,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "operator": "-=",
                          "type": "uint256"
                        },
                        "children": [
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "isConstant": false,
                              "isLValue": true,
                              "isPure": false,
                              "lValueRequested": true,
                              "type": "uint256"
                            },
                            "children": [
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "overloadedDeclarations": [
                                    null
                                  ],
                                  "referencedDeclaration": 45,
                                  "type": "mapping(address => uint256)",
                                  "value": "balances"
                                },
                                "id": 338,
                                "name": "Identifier",
                                "src": "4105:8:0"
                              },
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "overloadedDeclarations": [
                                    null
                                  ],
                                  "referencedDeclaration": 302,
                                  "type": "address",
                                  "value": "_from"
                                },
                                "id": 339,
                                "name": "Identifier",
                                "src": "4114:5:0"
                              }
                            ],
                            "id": 340,
                            "name": "IndexAccess",
                            "src": "4105:15:0"
                          },
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "overloadedDeclarations": [
                                null
                              ],
                              "referencedDeclaration": 306,
                              "type": "uint256",
                              "value": "_value"
                            },
                            "id": 341,
                            "name": "Identifier",
                            "src": "4124:6:0"
                          }
                        ],
                        "id": 342,
                        "name": "Assignment",
                        "src": "4105:25:0"
                      }
                    ],
                    "id": 343,
                    "name": "ExpressionStatement",
                    "src": "4105:25:0"
                  },
                  {
                    "children": [
                      {
                        "attributes": {
                          "argumentTypes": null,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "operator": "-=",
                          "type": "uint256"
                        },
                        "children": [
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "isConstant": false,
                              "isLValue": true,
                              "isPure": false,
                              "lValueRequested": true,
                              "type": "uint256"
                            },
                            "children": [
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "isConstant": false,
                                  "isLValue": true,
                                  "isPure": false,
                                  "lValueRequested": false,
                                  "type": "mapping(address => uint256)"
                                },
                                "children": [
                                  {
                                    "attributes": {
                                      "argumentTypes": null,
                                      "overloadedDeclarations": [
                                        null
                                      ],
                                      "referencedDeclaration": 51,
                                      "type": "mapping(address => mapping(address => uint256))",
                                      "value": "allowed"
                                    },
                                    "id": 344,
                                    "name": "Identifier",
                                    "src": "4140:7:0"
                                  },
                                  {
                                    "attributes": {
                                      "argumentTypes": null,
                                      "overloadedDeclarations": [
                                        null
                                      ],
                                      "referencedDeclaration": 302,
                                      "type": "address",
                                      "value": "_from"
                                    },
                                    "id": 345,
                                    "name": "Identifier",
                                    "src": "4148:5:0"
                                  }
                                ],
                                "id": 348,
                                "name": "IndexAccess",
                                "src": "4140:14:0"
                              },
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "isConstant": false,
                                  "isLValue": false,
                                  "isPure": false,
                                  "lValueRequested": false,
                                  "member_name": "sender",
                                  "referencedDeclaration": null,
                                  "type": "address payable"
                                },
                                "children": [
                                  {
                                    "attributes": {
                                      "argumentTypes": null,
                                      "overloadedDeclarations": [
                                        null
                                      ],
                                      "referencedDeclaration": -15,
                                      "type": "msg",
                                      "value": "msg"
                                    },
                                    "id": 346,
                                    "name": "Identifier",
                                    "src": "4155:3:0"
                                  }
                                ],
                                "id": 347,
                                "name": "MemberAccess",
                                "src": "4155:10:0"
                              }
                            ],
                            "id": 349,
                            "name": "IndexAccess",
                            "src": "4140:26:0"
                          },
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "overloadedDeclarations": [
                                null
                              ],
                              "referencedDeclaration": 306,
                              "type": "uint256",
                              "value": "_value"
                            },
                            "id": 350,
                            "name": "Identifier",
                            "src": "4170:6:0"
                          }
                        ],
                        "id": 351,
                        "name": "Assignment",
                        "src": "4140:36:0"
                      }
                    ],
                    "id": 352,
                    "name": "ExpressionStatement",
                    "src": "4140:36:0"
                  },
                  {
                    "children": [
                      {
                        "attributes": {
                          "argumentTypes": null,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "isStructConstructorCall": false,
                          "lValueRequested": false,
                          "names": [
                            null
                          ],
                          "tryCall": false,
                          "type": "tuple()",
                          "type_conversion": false
                        },
                        "children": [
                          {
                            "attributes": {
                              "argumentTypes": [
                                {
                                  "typeIdentifier": "t_address",
                                  "typeString": "address"
                                },
                                {
                                  "typeIdentifier": "t_address",
                                  "typeString": "address"
                                },
                                {
                                  "typeIdentifier": "t_uint256",
                                  "typeString": "uint256"
                                }
                              ],
                              "overloadedDeclarations": [
                                null
                              ],
                              "referencedDeclaration": 30,
                              "type": "function (address,address,uint256)",
                              "value": "Transfer"
                            },
                            "id": 353,
                            "name": "Identifier",
                            "src": "4191:8:0"
                          },
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "overloadedDeclarations": [
                                null
                              ],
                              "referencedDeclaration": 302,
                              "type": "address",
                              "value": "_from"
                            },
                            "id": 354,
                            "name": "Identifier",
                            "src": "4200:5:0"
                          },
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "overloadedDeclarations": [
                                null
                              ],
                              "referencedDeclaration": 304,
                              "type": "address",
                              "value": "_to"
                            },
                            "id": 355,
                            "name": "Identifier",
                            "src": "4207:3:0"
                          },
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "overloadedDeclarations": [
                                null
                              ],
                              "referencedDeclaration": 306,
                              "type": "uint256",
                              "value": "_value"
                            },
                            "id": 356,
                            "name": "Identifier",
                            "src": "4212:6:0"
                          }
                        ],
                        "id": 357,
                        "name": "FunctionCall",
                        "src": "4191:28:0"
                      }
                    ],
                    "id": 358,
                    "name": "EmitStatement",
                    "src": "4186:33:0"
                  },
                  {
                    "attributes": {
                      "functionReturnParameters": 310
                    },
                    "children": [
                      {
                        "attributes": {
                          "argumentTypes": null,
                          "hexvalue": "74727565",
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "lValueRequested": false,
                          "subdenomination": null,
                          "token": "bool",
                          "type": "bool",
                          "value": "true"
                        },
                        "id": 359,
                        "name": "Literal",
                        "src": "4237:4:0"
                      }
                    ],
                    "id": 360,
                    "name": "Return",
                    "src": "4230:11:0"
                  }
                ],
                "id": 361,
                "name": "Block",
                "src": "3937:311:0"
              }
            ],
            "id": 362,
            "name": "FunctionDefinition",
            "src": "3841:407:0"
          },
          {
            "attributes": {
              "documentation": null,
              "functionSelector": "449a52f8",
              "implemented": true,
              "isConstructor": false,
              "kind": "function",
              "name": "mintTo",
              "overrides": null,
              "scope": 468,
              "stateMutability": "nonpayable",
              "virtual": false,
              "visibility": "public"
            },
            "children": [
              {
                "children": [
                  {
                    "attributes": {
                      "constant": false,
                      "mutability": "mutable",
                      "name": "_to",
                      "overrides": null,
                      "scope": 413,
                      "stateVariable": false,
                      "storageLocation": "default",
                      "type": "address",
                      "value": null,
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "address",
                          "stateMutability": "nonpayable",
                          "type": "address"
                        },
                        "id": 363,
                        "name": "ElementaryTypeName",
                        "src": "4283:7:0"
                      }
                    ],
                    "id": 364,
                    "name": "VariableDeclaration",
                    "src": "4283:11:0"
                  },
                  {
                    "attributes": {
                      "constant": false,
                      "mutability": "mutable",
                      "name": "_amount",
                      "overrides": null,
                      "scope": 413,
                      "stateVariable": false,
                      "storageLocation": "default",
                      "type": "uint256",
                      "value": null,
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "uint",
                          "type": "uint256"
                        },
                        "id": 365,
                        "name": "ElementaryTypeName",
                        "src": "4304:4:0"
                      }
                    ],
                    "id": 366,
                    "name": "VariableDeclaration",
                    "src": "4304:12:0"
                  }
                ],
                "id": 367,
                "name": "ParameterList",
                "src": "4273:49:0"
              },
              {
                "attributes": {
                  "parameters": [
                    null
                  ]
                },
                "children": [],
                "id": 370,
                "name": "ParameterList",
                "src": "4352:0:0"
              },
              {
                "attributes": {
                  "arguments": null
                },
                "children": [
                  {
                    "attributes": {
                      "argumentTypes": null,
                      "overloadedDeclarations": [
                        null
                      ],
                      "referencedDeclaration": 193,
                      "type": "modifier ()",
                      "value": "onlyOwner"
                    },
                    "id": 368,
                    "name": "Identifier",
                    "src": "4338:9:0"
                  }
                ],
                "id": 369,
                "name": "ModifierInvocation",
                "src": "4338:9:0"
              },
              {
                "children": [
                  {
                    "children": [
                      {
                        "attributes": {
                          "argumentTypes": null,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "isStructConstructorCall": false,
                          "lValueRequested": false,
                          "names": [
                            null
                          ],
                          "tryCall": false,
                          "type": "tuple()",
                          "type_conversion": false
                        },
                        "children": [
                          {
                            "attributes": {
                              "argumentTypes": [
                                {
                                  "typeIdentifier": "t_bool",
                                  "typeString": "bool"
                                },
                                {
                                  "typeIdentifier": "t_stringliteral_6415f4024abccc400ace23b1948b67fbfd7b265b8fd0d0012b4959c332f95923",
                                  "typeString": "literal_string \"ERC20: to address is not valid\""
                                }
                              ],
                              "overloadedDeclarations": [
                                -18,
                                -18
                              ],
                              "referencedDeclaration": -18,
                              "type": "function (bool,string memory) pure",
                              "value": "require"
                            },
                            "id": 371,
                            "name": "Identifier",
                            "src": "4362:7:0"
                          },
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "commonType": {
                                "typeIdentifier": "t_address",
                                "typeString": "address"
                              },
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "lValueRequested": false,
                              "operator": "!=",
                              "type": "bool"
                            },
                            "children": [
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "overloadedDeclarations": [
                                    null
                                  ],
                                  "referencedDeclaration": 364,
                                  "type": "address",
                                  "value": "_to"
                                },
                                "id": 372,
                                "name": "Identifier",
                                "src": "4370:3:0"
                              },
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "isConstant": false,
                                  "isLValue": false,
                                  "isPure": true,
                                  "isStructConstructorCall": false,
                                  "lValueRequested": false,
                                  "names": [
                                    null
                                  ],
                                  "tryCall": false,
                                  "type": "address payable",
                                  "type_conversion": true
                                },
                                "children": [
                                  {
                                    "attributes": {
                                      "argumentTypes": [
                                        {
                                          "typeIdentifier": "t_rational_0_by_1",
                                          "typeString": "int_const 0"
                                        }
                                      ],
                                      "isConstant": false,
                                      "isLValue": false,
                                      "isPure": true,
                                      "lValueRequested": false,
                                      "type": "type(address)"
                                    },
                                    "children": [
                                      {
                                        "attributes": {
                                          "name": "address",
                                          "type": null
                                        },
                                        "id": 373,
                                        "name": "ElementaryTypeName",
                                        "src": "4377:7:0"
                                      }
                                    ],
                                    "id": 374,
                                    "name": "ElementaryTypeNameExpression",
                                    "src": "4377:7:0"
                                  },
                                  {
                                    "attributes": {
                                      "argumentTypes": null,
                                      "hexvalue": "30",
                                      "isConstant": false,
                                      "isLValue": false,
                                      "isPure": true,
                                      "lValueRequested": false,
                                      "subdenomination": null,
                                      "token": "number",
                                      "type": "int_const 0",
                                      "value": "0"
                                    },
                                    "id": 375,
                                    "name": "Literal",
                                    "src": "4385:1:0"
                                  }
                                ],
                                "id": 376,
                                "name": "FunctionCall",
                                "src": "4377:10:0"
                              }
                            ],
                            "id": 377,
                            "name": "BinaryOperation",
                            "src": "4370:17:0"
                          },
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "hexvalue": "45524332303a20746f2061646472657373206973206e6f742076616c6964",
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "lValueRequested": false,
                              "subdenomination": null,
                              "token": "string",
                              "type": "literal_string \"ERC20: to address is not valid\"",
                              "value": "ERC20: to address is not valid"
                            },
                            "id": 378,
                            "name": "Literal",
                            "src": "4389:32:0"
                          }
                        ],
                        "id": 379,
                        "name": "FunctionCall",
                        "src": "4362:60:0"
                      }
                    ],
                    "id": 380,
                    "name": "ExpressionStatement",
                    "src": "4362:60:0"
                  },
                  {
                    "children": [
                      {
                        "attributes": {
                          "argumentTypes": null,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "isStructConstructorCall": false,
                          "lValueRequested": false,
                          "names": [
                            null
                          ],
                          "tryCall": false,
                          "type": "tuple()",
                          "type_conversion": false
                        },
                        "children": [
                          {
                            "attributes": {
                              "argumentTypes": [
                                {
                                  "typeIdentifier": "t_bool",
                                  "typeString": "bool"
                                },
                                {
                                  "typeIdentifier": "t_stringliteral_2cbc8ec96bf431fc79e605094b9ed0553694f1459b3d65fab3b35f92dd6716dc",
                                  "typeString": "literal_string \"ERC20: amount is not valid\""
                                }
                              ],
                              "overloadedDeclarations": [
                                -18,
                                -18
                              ],
                              "referencedDeclaration": -18,
                              "type": "function (bool,string memory) pure",
                              "value": "require"
                            },
                            "id": 381,
                            "name": "Identifier",
                            "src": "4432:7:0"
                          },
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "commonType": {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              },
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "lValueRequested": false,
                              "operator": ">",
                              "type": "bool"
                            },
                            "children": [
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "overloadedDeclarations": [
                                    null
                                  ],
                                  "referencedDeclaration": 366,
                                  "type": "uint256",
                                  "value": "_amount"
                                },
                                "id": 382,
                                "name": "Identifier",
                                "src": "4440:7:0"
                              },
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "hexvalue": "30",
                                  "isConstant": false,
                                  "isLValue": false,
                                  "isPure": true,
                                  "lValueRequested": false,
                                  "subdenomination": null,
                                  "token": "number",
                                  "type": "int_const 0",
                                  "value": "0"
                                },
                                "id": 383,
                                "name": "Literal",
                                "src": "4450:1:0"
                              }
                            ],
                            "id": 384,
                            "name": "BinaryOperation",
                            "src": "4440:11:0"
                          },
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "hexvalue": "45524332303a20616d6f756e74206973206e6f742076616c6964",
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "lValueRequested": false,
                              "subdenomination": null,
                              "token": "string",
                              "type": "literal_string \"ERC20: amount is not valid\"",
                              "value": "ERC20: amount is not valid"
                            },
                            "id": 385,
                            "name": "Literal",
                            "src": "4453:28:0"
                          }
                        ],
                        "id": 386,
                        "name": "FunctionCall",
                        "src": "4432:50:0"
                      }
                    ],
                    "id": 387,
                    "name": "ExpressionStatement",
                    "src": "4432:50:0"
                  },
                  {
                    "children": [
                      {
                        "attributes": {
                          "argumentTypes": null,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "operator": "=",
                          "type": "uint256"
                        },
                        "children": [
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "overloadedDeclarations": [
                                null
                              ],
                              "referencedDeclaration": 53,
                              "type": "uint256",
                              "value": "totalSupply_"
                            },
                            "id": 388,
                            "name": "Identifier",
                            "src": "4493:12:0"
                          },
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "commonType": {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              },
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "lValueRequested": false,
                              "operator": "+",
                              "type": "uint256"
                            },
                            "children": [
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "overloadedDeclarations": [
                                    null
                                  ],
                                  "referencedDeclaration": 53,
                                  "type": "uint256",
                                  "value": "totalSupply_"
                                },
                                "id": 389,
                                "name": "Identifier",
                                "src": "4508:12:0"
                              },
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "overloadedDeclarations": [
                                    null
                                  ],
                                  "referencedDeclaration": 366,
                                  "type": "uint256",
                                  "value": "_amount"
                                },
                                "id": 390,
                                "name": "Identifier",
                                "src": "4521:7:0"
                              }
                            ],
                            "id": 391,
                            "name": "BinaryOperation",
                            "src": "4508:20:0"
                          }
                        ],
                        "id": 392,
                        "name": "Assignment",
                        "src": "4493:35:0"
                      }
                    ],
                    "id": 393,
                    "name": "ExpressionStatement",
                    "src": "4493:35:0"
                  },
                  {
                    "children": [
                      {
                        "attributes": {
                          "argumentTypes": null,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "operator": "=",
                          "type": "uint256"
                        },
                        "children": [
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "isConstant": false,
                              "isLValue": true,
                              "isPure": false,
                              "lValueRequested": true,
                              "type": "uint256"
                            },
                            "children": [
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "overloadedDeclarations": [
                                    null
                                  ],
                                  "referencedDeclaration": 45,
                                  "type": "mapping(address => uint256)",
                                  "value": "balances"
                                },
                                "id": 394,
                                "name": "Identifier",
                                "src": "4538:8:0"
                              },
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "overloadedDeclarations": [
                                    null
                                  ],
                                  "referencedDeclaration": 364,
                                  "type": "address",
                                  "value": "_to"
                                },
                                "id": 395,
                                "name": "Identifier",
                                "src": "4547:3:0"
                              }
                            ],
                            "id": 396,
                            "name": "IndexAccess",
                            "src": "4538:13:0"
                          },
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "commonType": {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              },
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "lValueRequested": false,
                              "operator": "+",
                              "type": "uint256"
                            },
                            "children": [
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "isConstant": false,
                                  "isLValue": true,
                                  "isPure": false,
                                  "lValueRequested": false,
                                  "type": "uint256"
                                },
                                "children": [
                                  {
                                    "attributes": {
                                      "argumentTypes": null,
                                      "overloadedDeclarations": [
                                        null
                                      ],
                                      "referencedDeclaration": 45,
                                      "type": "mapping(address => uint256)",
                                      "value": "balances"
                                    },
                                    "id": 397,
                                    "name": "Identifier",
                                    "src": "4554:8:0"
                                  },
                                  {
                                    "attributes": {
                                      "argumentTypes": null,
                                      "overloadedDeclarations": [
                                        null
                                      ],
                                      "referencedDeclaration": 364,
                                      "type": "address",
                                      "value": "_to"
                                    },
                                    "id": 398,
                                    "name": "Identifier",
                                    "src": "4563:3:0"
                                  }
                                ],
                                "id": 399,
                                "name": "IndexAccess",
                                "src": "4554:13:0"
                              },
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "isConstant": false,
                                  "isInlineArray": false,
                                  "isLValue": false,
                                  "isPure": false,
                                  "lValueRequested": false,
                                  "type": "uint256"
                                },
                                "children": [
                                  {
                                    "attributes": {
                                      "argumentTypes": null,
                                      "overloadedDeclarations": [
                                        null
                                      ],
                                      "referencedDeclaration": 366,
                                      "type": "uint256",
                                      "value": "_amount"
                                    },
                                    "id": 400,
                                    "name": "Identifier",
                                    "src": "4569:7:0"
                                  }
                                ],
                                "id": 401,
                                "name": "TupleExpression",
                                "src": "4568:9:0"
                              }
                            ],
                            "id": 402,
                            "name": "BinaryOperation",
                            "src": "4554:23:0"
                          }
                        ],
                        "id": 403,
                        "name": "Assignment",
                        "src": "4538:39:0"
                      }
                    ],
                    "id": 404,
                    "name": "ExpressionStatement",
                    "src": "4538:39:0"
                  },
                  {
                    "children": [
                      {
                        "attributes": {
                          "argumentTypes": null,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "isStructConstructorCall": false,
                          "lValueRequested": false,
                          "names": [
                            null
                          ],
                          "tryCall": false,
                          "type": "tuple()",
                          "type_conversion": false
                        },
                        "children": [
                          {
                            "attributes": {
                              "argumentTypes": [
                                {
                                  "typeIdentifier": "t_address_payable",
                                  "typeString": "address payable"
                                },
                                {
                                  "typeIdentifier": "t_address",
                                  "typeString": "address"
                                },
                                {
                                  "typeIdentifier": "t_uint256",
                                  "typeString": "uint256"
                                }
                              ],
                              "overloadedDeclarations": [
                                null
                              ],
                              "referencedDeclaration": 61,
                              "type": "function (address,address,uint256)",
                              "value": "Mint"
                            },
                            "id": 405,
                            "name": "Identifier",
                            "src": "4593:4:0"
                          },
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "lValueRequested": false,
                              "member_name": "sender",
                              "referencedDeclaration": null,
                              "type": "address payable"
                            },
                            "children": [
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "overloadedDeclarations": [
                                    null
                                  ],
                                  "referencedDeclaration": -15,
                                  "type": "msg",
                                  "value": "msg"
                                },
                                "id": 406,
                                "name": "Identifier",
                                "src": "4598:3:0"
                              }
                            ],
                            "id": 407,
                            "name": "MemberAccess",
                            "src": "4598:10:0"
                          },
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "overloadedDeclarations": [
                                null
                              ],
                              "referencedDeclaration": 364,
                              "type": "address",
                              "value": "_to"
                            },
                            "id": 408,
                            "name": "Identifier",
                            "src": "4610:3:0"
                          },
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "overloadedDeclarations": [
                                null
                              ],
                              "referencedDeclaration": 366,
                              "type": "uint256",
                              "value": "_amount"
                            },
                            "id": 409,
                            "name": "Identifier",
                            "src": "4615:7:0"
                          }
                        ],
                        "id": 410,
                        "name": "FunctionCall",
                        "src": "4593:30:0"
                      }
                    ],
                    "id": 411,
                    "name": "EmitStatement",
                    "src": "4588:35:0"
                  }
                ],
                "id": 412,
                "name": "Block",
                "src": "4352:278:0"
              }
            ],
            "id": 413,
            "name": "FunctionDefinition",
            "src": "4258:372:0"
          },
          {
            "attributes": {
              "documentation": null,
              "functionSelector": "79cc6790",
              "implemented": true,
              "isConstructor": false,
              "kind": "function",
              "name": "burnFrom",
              "overrides": null,
              "scope": 468,
              "stateMutability": "nonpayable",
              "virtual": false,
              "visibility": "public"
            },
            "children": [
              {
                "children": [
                  {
                    "attributes": {
                      "constant": false,
                      "mutability": "mutable",
                      "name": "_from",
                      "overrides": null,
                      "scope": 467,
                      "stateVariable": false,
                      "storageLocation": "default",
                      "type": "address",
                      "value": null,
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "address",
                          "stateMutability": "nonpayable",
                          "type": "address"
                        },
                        "id": 414,
                        "name": "ElementaryTypeName",
                        "src": "4663:7:0"
                      }
                    ],
                    "id": 415,
                    "name": "VariableDeclaration",
                    "src": "4663:13:0"
                  },
                  {
                    "attributes": {
                      "constant": false,
                      "mutability": "mutable",
                      "name": "_amount",
                      "overrides": null,
                      "scope": 467,
                      "stateVariable": false,
                      "storageLocation": "default",
                      "type": "uint256",
                      "value": null,
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "uint",
                          "type": "uint256"
                        },
                        "id": 416,
                        "name": "ElementaryTypeName",
                        "src": "4686:4:0"
                      }
                    ],
                    "id": 417,
                    "name": "VariableDeclaration",
                    "src": "4686:12:0"
                  }
                ],
                "id": 418,
                "name": "ParameterList",
                "src": "4653:51:0"
              },
              {
                "attributes": {
                  "parameters": [
                    null
                  ]
                },
                "children": [],
                "id": 421,
                "name": "ParameterList",
                "src": "4734:0:0"
              },
              {
                "attributes": {
                  "arguments": null
                },
                "children": [
                  {
                    "attributes": {
                      "argumentTypes": null,
                      "overloadedDeclarations": [
                        null
                      ],
                      "referencedDeclaration": 193,
                      "type": "modifier ()",
                      "value": "onlyOwner"
                    },
                    "id": 419,
                    "name": "Identifier",
                    "src": "4720:9:0"
                  }
                ],
                "id": 420,
                "name": "ModifierInvocation",
                "src": "4720:9:0"
              },
              {
                "children": [
                  {
                    "children": [
                      {
                        "attributes": {
                          "argumentTypes": null,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "isStructConstructorCall": false,
                          "lValueRequested": false,
                          "names": [
                            null
                          ],
                          "tryCall": false,
                          "type": "tuple()",
                          "type_conversion": false
                        },
                        "children": [
                          {
                            "attributes": {
                              "argumentTypes": [
                                {
                                  "typeIdentifier": "t_bool",
                                  "typeString": "bool"
                                },
                                {
                                  "typeIdentifier": "t_stringliteral_4171c51e4f457093925af92a41380c952c98e8c76bd9595b75e2200d6f060d47",
                                  "typeString": "literal_string \"ERC20: from address is not valid\""
                                }
                              ],
                              "overloadedDeclarations": [
                                -18,
                                -18
                              ],
                              "referencedDeclaration": -18,
                              "type": "function (bool,string memory) pure",
                              "value": "require"
                            },
                            "id": 422,
                            "name": "Identifier",
                            "src": "4744:7:0"
                          },
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "commonType": {
                                "typeIdentifier": "t_address",
                                "typeString": "address"
                              },
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "lValueRequested": false,
                              "operator": "!=",
                              "type": "bool"
                            },
                            "children": [
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "overloadedDeclarations": [
                                    null
                                  ],
                                  "referencedDeclaration": 415,
                                  "type": "address",
                                  "value": "_from"
                                },
                                "id": 423,
                                "name": "Identifier",
                                "src": "4752:5:0"
                              },
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "isConstant": false,
                                  "isLValue": false,
                                  "isPure": true,
                                  "isStructConstructorCall": false,
                                  "lValueRequested": false,
                                  "names": [
                                    null
                                  ],
                                  "tryCall": false,
                                  "type": "address payable",
                                  "type_conversion": true
                                },
                                "children": [
                                  {
                                    "attributes": {
                                      "argumentTypes": [
                                        {
                                          "typeIdentifier": "t_rational_0_by_1",
                                          "typeString": "int_const 0"
                                        }
                                      ],
                                      "isConstant": false,
                                      "isLValue": false,
                                      "isPure": true,
                                      "lValueRequested": false,
                                      "type": "type(address)"
                                    },
                                    "children": [
                                      {
                                        "attributes": {
                                          "name": "address",
                                          "type": null
                                        },
                                        "id": 424,
                                        "name": "ElementaryTypeName",
                                        "src": "4761:7:0"
                                      }
                                    ],
                                    "id": 425,
                                    "name": "ElementaryTypeNameExpression",
                                    "src": "4761:7:0"
                                  },
                                  {
                                    "attributes": {
                                      "argumentTypes": null,
                                      "hexvalue": "30",
                                      "isConstant": false,
                                      "isLValue": false,
                                      "isPure": true,
                                      "lValueRequested": false,
                                      "subdenomination": null,
                                      "token": "number",
                                      "type": "int_const 0",
                                      "value": "0"
                                    },
                                    "id": 426,
                                    "name": "Literal",
                                    "src": "4769:1:0"
                                  }
                                ],
                                "id": 427,
                                "name": "FunctionCall",
                                "src": "4761:10:0"
                              }
                            ],
                            "id": 428,
                            "name": "BinaryOperation",
                            "src": "4752:19:0"
                          },
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "hexvalue": "45524332303a2066726f6d2061646472657373206973206e6f742076616c6964",
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "lValueRequested": false,
                              "subdenomination": null,
                              "token": "string",
                              "type": "literal_string \"ERC20: from address is not valid\"",
                              "value": "ERC20: from address is not valid"
                            },
                            "id": 429,
                            "name": "Literal",
                            "src": "4773:34:0"
                          }
                        ],
                        "id": 430,
                        "name": "FunctionCall",
                        "src": "4744:64:0"
                      }
                    ],
                    "id": 431,
                    "name": "ExpressionStatement",
                    "src": "4744:64:0"
                  },
                  {
                    "children": [
                      {
                        "attributes": {
                          "argumentTypes": null,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "isStructConstructorCall": false,
                          "lValueRequested": false,
                          "names": [
                            null
                          ],
                          "tryCall": false,
                          "type": "tuple()",
                          "type_conversion": false
                        },
                        "children": [
                          {
                            "attributes": {
                              "argumentTypes": [
                                {
                                  "typeIdentifier": "t_bool",
                                  "typeString": "bool"
                                },
                                {
                                  "typeIdentifier": "t_stringliteral_53c0a9b372dd4d10e0466e474511916fb244dbbc3766b7c40c21d1ec47086e63",
                                  "typeString": "literal_string \"ERC20: insufficient balance\""
                                }
                              ],
                              "overloadedDeclarations": [
                                -18,
                                -18
                              ],
                              "referencedDeclaration": -18,
                              "type": "function (bool,string memory) pure",
                              "value": "require"
                            },
                            "id": 432,
                            "name": "Identifier",
                            "src": "4818:7:0"
                          },
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "commonType": {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              },
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "lValueRequested": false,
                              "operator": ">=",
                              "type": "bool"
                            },
                            "children": [
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "isConstant": false,
                                  "isLValue": true,
                                  "isPure": false,
                                  "lValueRequested": false,
                                  "type": "uint256"
                                },
                                "children": [
                                  {
                                    "attributes": {
                                      "argumentTypes": null,
                                      "overloadedDeclarations": [
                                        null
                                      ],
                                      "referencedDeclaration": 45,
                                      "type": "mapping(address => uint256)",
                                      "value": "balances"
                                    },
                                    "id": 433,
                                    "name": "Identifier",
                                    "src": "4826:8:0"
                                  },
                                  {
                                    "attributes": {
                                      "argumentTypes": null,
                                      "overloadedDeclarations": [
                                        null
                                      ],
                                      "referencedDeclaration": 415,
                                      "type": "address",
                                      "value": "_from"
                                    },
                                    "id": 434,
                                    "name": "Identifier",
                                    "src": "4835:5:0"
                                  }
                                ],
                                "id": 435,
                                "name": "IndexAccess",
                                "src": "4826:15:0"
                              },
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "overloadedDeclarations": [
                                    null
                                  ],
                                  "referencedDeclaration": 417,
                                  "type": "uint256",
                                  "value": "_amount"
                                },
                                "id": 436,
                                "name": "Identifier",
                                "src": "4845:7:0"
                              }
                            ],
                            "id": 437,
                            "name": "BinaryOperation",
                            "src": "4826:26:0"
                          },
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "hexvalue": "45524332303a20696e73756666696369656e742062616c616e6365",
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "lValueRequested": false,
                              "subdenomination": null,
                              "token": "string",
                              "type": "literal_string \"ERC20: insufficient balance\"",
                              "value": "ERC20: insufficient balance"
                            },
                            "id": 438,
                            "name": "Literal",
                            "src": "4854:29:0"
                          }
                        ],
                        "id": 439,
                        "name": "FunctionCall",
                        "src": "4818:66:0"
                      }
                    ],
                    "id": 440,
                    "name": "ExpressionStatement",
                    "src": "4818:66:0"
                  },
                  {
                    "children": [
                      {
                        "attributes": {
                          "argumentTypes": null,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "operator": "=",
                          "type": "uint256"
                        },
                        "children": [
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "isConstant": false,
                              "isLValue": true,
                              "isPure": false,
                              "lValueRequested": true,
                              "type": "uint256"
                            },
                            "children": [
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "overloadedDeclarations": [
                                    null
                                  ],
                                  "referencedDeclaration": 45,
                                  "type": "mapping(address => uint256)",
                                  "value": "balances"
                                },
                                "id": 441,
                                "name": "Identifier",
                                "src": "4903:8:0"
                              },
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "overloadedDeclarations": [
                                    null
                                  ],
                                  "referencedDeclaration": 415,
                                  "type": "address",
                                  "value": "_from"
                                },
                                "id": 442,
                                "name": "Identifier",
                                "src": "4912:5:0"
                              }
                            ],
                            "id": 443,
                            "name": "IndexAccess",
                            "src": "4903:15:0"
                          },
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "commonType": {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              },
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "lValueRequested": false,
                              "operator": "-",
                              "type": "uint256"
                            },
                            "children": [
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "isConstant": false,
                                  "isLValue": true,
                                  "isPure": false,
                                  "lValueRequested": false,
                                  "type": "uint256"
                                },
                                "children": [
                                  {
                                    "attributes": {
                                      "argumentTypes": null,
                                      "overloadedDeclarations": [
                                        null
                                      ],
                                      "referencedDeclaration": 45,
                                      "type": "mapping(address => uint256)",
                                      "value": "balances"
                                    },
                                    "id": 444,
                                    "name": "Identifier",
                                    "src": "4921:8:0"
                                  },
                                  {
                                    "attributes": {
                                      "argumentTypes": null,
                                      "overloadedDeclarations": [
                                        null
                                      ],
                                      "referencedDeclaration": 415,
                                      "type": "address",
                                      "value": "_from"
                                    },
                                    "id": 445,
                                    "name": "Identifier",
                                    "src": "4930:5:0"
                                  }
                                ],
                                "id": 446,
                                "name": "IndexAccess",
                                "src": "4921:15:0"
                              },
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "isConstant": false,
                                  "isInlineArray": false,
                                  "isLValue": false,
                                  "isPure": false,
                                  "lValueRequested": false,
                                  "type": "uint256"
                                },
                                "children": [
                                  {
                                    "attributes": {
                                      "argumentTypes": null,
                                      "overloadedDeclarations": [
                                        null
                                      ],
                                      "referencedDeclaration": 417,
                                      "type": "uint256",
                                      "value": "_amount"
                                    },
                                    "id": 447,
                                    "name": "Identifier",
                                    "src": "4938:7:0"
                                  }
                                ],
                                "id": 448,
                                "name": "TupleExpression",
                                "src": "4937:9:0"
                              }
                            ],
                            "id": 449,
                            "name": "BinaryOperation",
                            "src": "4921:25:0"
                          }
                        ],
                        "id": 450,
                        "name": "Assignment",
                        "src": "4903:43:0"
                      }
                    ],
                    "id": 451,
                    "name": "ExpressionStatement",
                    "src": "4903:43:0"
                  },
                  {
                    "children": [
                      {
                        "attributes": {
                          "argumentTypes": null,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "operator": "=",
                          "type": "uint256"
                        },
                        "children": [
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "overloadedDeclarations": [
                                null
                              ],
                              "referencedDeclaration": 53,
                              "type": "uint256",
                              "value": "totalSupply_"
                            },
                            "id": 452,
                            "name": "Identifier",
                            "src": "4956:12:0"
                          },
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "commonType": {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              },
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "lValueRequested": false,
                              "operator": "-",
                              "type": "uint256"
                            },
                            "children": [
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "overloadedDeclarations": [
                                    null
                                  ],
                                  "referencedDeclaration": 53,
                                  "type": "uint256",
                                  "value": "totalSupply_"
                                },
                                "id": 453,
                                "name": "Identifier",
                                "src": "4971:12:0"
                              },
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "isConstant": false,
                                  "isInlineArray": false,
                                  "isLValue": false,
                                  "isPure": false,
                                  "lValueRequested": false,
                                  "type": "uint256"
                                },
                                "children": [
                                  {
                                    "attributes": {
                                      "argumentTypes": null,
                                      "overloadedDeclarations": [
                                        null
                                      ],
                                      "referencedDeclaration": 417,
                                      "type": "uint256",
                                      "value": "_amount"
                                    },
                                    "id": 454,
                                    "name": "Identifier",
                                    "src": "4987:7:0"
                                  }
                                ],
                                "id": 455,
                                "name": "TupleExpression",
                                "src": "4986:9:0"
                              }
                            ],
                            "id": 456,
                            "name": "BinaryOperation",
                            "src": "4971:24:0"
                          }
                        ],
                        "id": 457,
                        "name": "Assignment",
                        "src": "4956:39:0"
                      }
                    ],
                    "id": 458,
                    "name": "ExpressionStatement",
                    "src": "4956:39:0"
                  },
                  {
                    "children": [
                      {
                        "attributes": {
                          "argumentTypes": null,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "isStructConstructorCall": false,
                          "lValueRequested": false,
                          "names": [
                            null
                          ],
                          "tryCall": false,
                          "type": "tuple()",
                          "type_conversion": false
                        },
                        "children": [
                          {
                            "attributes": {
                              "argumentTypes": [
                                {
                                  "typeIdentifier": "t_address_payable",
                                  "typeString": "address payable"
                                },
                                {
                                  "typeIdentifier": "t_address",
                                  "typeString": "address"
                                },
                                {
                                  "typeIdentifier": "t_uint256",
                                  "typeString": "uint256"
                                }
                              ],
                              "overloadedDeclarations": [
                                null
                              ],
                              "referencedDeclaration": 69,
                              "type": "function (address,address,uint256)",
                              "value": "Burn"
                            },
                            "id": 459,
                            "name": "Identifier",
                            "src": "5011:4:0"
                          },
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "lValueRequested": false,
                              "member_name": "sender",
                              "referencedDeclaration": null,
                              "type": "address payable"
                            },
                            "children": [
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "overloadedDeclarations": [
                                    null
                                  ],
                                  "referencedDeclaration": -15,
                                  "type": "msg",
                                  "value": "msg"
                                },
                                "id": 460,
                                "name": "Identifier",
                                "src": "5016:3:0"
                              }
                            ],
                            "id": 461,
                            "name": "MemberAccess",
                            "src": "5016:10:0"
                          },
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "overloadedDeclarations": [
                                null
                              ],
                              "referencedDeclaration": 415,
                              "type": "address",
                              "value": "_from"
                            },
                            "id": 462,
                            "name": "Identifier",
                            "src": "5028:5:0"
                          },
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "overloadedDeclarations": [
                                null
                              ],
                              "referencedDeclaration": 417,
                              "type": "uint256",
                              "value": "_amount"
                            },
                            "id": 463,
                            "name": "Identifier",
                            "src": "5035:7:0"
                          }
                        ],
                        "id": 464,
                        "name": "FunctionCall",
                        "src": "5011:32:0"
                      }
                    ],
                    "id": 465,
                    "name": "EmitStatement",
                    "src": "5006:37:0"
                  }
                ],
                "id": 466,
                "name": "Block",
                "src": "4734:316:0"
              }
            ],
            "id": 467,
            "name": "FunctionDefinition",
            "src": "4636:414:0"
          }
        ],
        "id": 468,
        "name": "ContractDefinition",
        "src": "397:4661:0"
      }
    ],
    "id": 469,
    "name": "SourceUnit",
    "src": "38:5022:0"
  },
  "compiler": {
    "name": "solc",
    "version": "0.6.8+commit.0bbfe453.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "3.4.3",
  "updatedAt": "2021-12-21T05:28:06.479Z",
  "devdoc": {
    "methods": {}
  },
  "userdoc": {
    "methods": {}
  }
};

contractAddress = '0xd9145CCE52D386f254917e481eB44e9943F39138';
// Create contract object
const tokenContract = web3.eth.contract(
    erc20TokenContractAbi, 
    contractAddress
    );

tokenContract.getPastEvents(
  'AllEvents',
  {fromBlock:0 , step:0},
  (err,events) => { console.log(events) }
);

init();
