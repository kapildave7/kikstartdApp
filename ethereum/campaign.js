import web3 from "./web3";
import Campaign from "./build/Campaign.json";

export default (address) => {
  return new web3.eth.Contract(JSON.parse(Campaign.interface), address);
};

// 0xB07Ff2bB7a4905FCCB65305F8F877fE5F0b44d8b
