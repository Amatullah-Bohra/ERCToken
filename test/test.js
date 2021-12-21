const ERCTOKEN = artifacts.require('ERCToken');
const Assert = require('truffle-assertions');

contract('testing the contract', (accounts) => {

    const tokenName = 'token';
    const tokenSymbol = 'TKN';
    const tokenDecimals = 18;
    const tokenTotalSupply = 1000000;

    let contractInstance;
    const ownerAddress = accounts[0];
    const address1 = accounts[1];
    const address2 = accounts[2];


    before(() => {
        web3.eth.defaultAccount = ownerAddress;
    });

    beforeEach(async () => {
      contractInstance = await ERCTOKEN.new(tokenName, tokenSymbol, tokenDecimals, tokenTotalSupply);
    })

    it('set totalSupply', async () => {
        const result = await contractInstance.totalSupply();
        
        assert.equal(tokenTotalSupply, result, 'totalSupply is wrong');
    });

    it('balanceOf success', async () => {
      const result = await contractInstance.balanceOf(ownerAddress, { from: ownerAddress });
      
      assert.equal(result.toNumber(), tokenTotalSupply, 'balance is wrong');
  });

it('transfer success', async () => {
    const result = await contractInstance.transfer(address1, 1000, { from: ownerAddress });
   
    Assert.eventEmitted(result, 'Transfer');
});

it('approve success', async () => {
  const result = await contractInstance.approve(address1, 1000, { from: ownerAddress });
  
  Assert.eventEmitted(result, 'Approval');
});

it('transferFrom success', async () => {
  await contractInstance.transfer(address1, 1000, { from: ownerAddress });
  await contractInstance.approve(address1, 1000, { from: ownerAddress });
  const result = await contractInstance.transferFrom(ownerAddress, address2, 1000, { from: address1 });
  
  Assert.eventEmitted(result, 'Transfer');
});


it('not allowance', async () => {
  const result = await contractInstance.allowance(ownerAddress, address1, { from: ownerAddress });
  
  assert.equal(0, result.toNumber(), 'wrong result');
});

it('allowance', async () => {
  const expectedAmount = 1000;
  
  await contractInstance.approve(address1, expectedAmount, { from: ownerAddress });
  const result = await contractInstance.allowance(ownerAddress, address1, { from: ownerAddress });
  
  assert.equal(expectedAmount, result.toNumber(), 'wrong result');
});

it('increaseApproval success', async () => {
  const initialAmount = 1000;
  const expectedAmount = 2000;
  
  await contractInstance.approve(address1, initialAmount, { from: ownerAddress });
  const resultIncrease = await contractInstance.increaseAllowance(address1, initialAmount, { from: ownerAddress });
  Assert.eventEmitted(resultIncrease, 'Approval');
});

it('decreaseApproval success', async () => {
  const initialAmount =  web3.utils.toWei('2','ether');
  const expectedAmount = web3.utils.toWei('1','ether');
  
  await contractInstance.approve(address1, initialAmount, { from: ownerAddress });
  const resultDecrease = await contractInstance.decreaseAllowance(address1, expectedAmount, { from: ownerAddress });
  Assert.eventEmitted(resultDecrease, 'Approval');
});

it('mintTo should throw if to address is invalid', async () => {
  await Assert.reverts(
      contractInstance.mintTo('0x0000000000000000000000000000000000000000', 1000, { from: ownerAddress }),
      'ERC20: to address is not valid'
  );
});

it('mintTo should throw if amount is invalid', async () => {
  await Assert.reverts(
      contractInstance.mintTo(address1, 0, { from: ownerAddress }),
      'ERC20: amount is not valid'
  );
});

it('mintTo success', async () => {
  const mintValue = 1000;

  const resultBeforeMint = await contractInstance.totalSupply();
  await contractInstance.mintTo(address1, mintValue, { from: ownerAddress });
  const expectedTotalSupply = resultBeforeMint.toNumber() + mintValue;
  const resultAfterMint = await contractInstance.totalSupply();
  const resultBalanceOf = await contractInstance.balanceOf(address1, { from: address1 });

  assert.equal(tokenTotalSupply, resultBeforeMint, 'wrong totalSupply before');
  assert.equal(expectedTotalSupply, resultAfterMint, 'wrong totalSupply after');
  assert.equal(mintValue, resultBalanceOf, 'wrong balance');
});

it('burnFrom should throw if from address is invalid', async () => {
  await Assert.reverts(
      contractInstance.burnFrom('0x0000000000000000000000000000000000000000', 1000, { from: ownerAddress }),
      'ERC20: from address is not valid'
  );
});

it('burnFrom should throw if balance is insufficient', async () => {
  await Assert.reverts(
      contractInstance.burnFrom(address1, 1000, { from: ownerAddress }),
      'ERC20: insufficient balance'
  );
});

it('burnFrom success', async () => {
  const mintValue = 1000;
  const burnValue = 500;
  const expectedBalance = 500;

  await contractInstance.mintTo(address1, mintValue, { from: ownerAddress });
  await contractInstance.burnFrom(address1, burnValue, { from: ownerAddress });
  const expectedTotalSupply = (tokenTotalSupply + mintValue) - burnValue;
  const resultAfterBurn = await contractInstance.totalSupply();
  const resultBalanceOf = await contractInstance.balanceOf(address1, { from: address1 });

  assert.equal(expectedTotalSupply, resultAfterBurn, 'wrong totalSupply after');
  assert.equal(expectedBalance, resultBalanceOf, 'wrong balance');
});

});

