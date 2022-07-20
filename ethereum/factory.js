import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0xf93be9e9478034c1Cd1848CF0965Bf63120350e9'
);


export default instance;

// 0xB07Ff2bB7a4905FCCB65305F8F877fE5F0b44d8b