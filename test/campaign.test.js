const compiledFactory = require("../ethereum/build/campaignFectory.json");
const compileCampagin = require("../ethereum/build/Campaign.json");
const { Eth } = require("web3/types");

let accounts;
let factory;
let campaignAddress;
let campaign;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploye({
      data: compiledFactory.bytecode,
    })
    .send({
      from: accounts[0],
      gas: "1000000",
    });

  await factory.methods.createCampaign("100").send({
    form: accounts[0],
    gas: "1000000",
  });

  [campaignAddress] = await factory.methods.getDeployedCampaign().call(); //[campaignAddress] takes the first element of the address array

  campaign = await new web3.eth.Contract(
    JSON.parse(compileCampagin.interface),
    campaignAddress
  );
});

describe("campagain", () => {
  it("deploys a factory and a campaign", () => {
    assert.ok(factory.options.address);
    assert.ok(campaign.options.address);
  });
});
