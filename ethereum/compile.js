const path = require("path"); //path module
const solc = require("solc"); //sol module
const fs = require("fs-extra"); //

const buildPath = path.resolve(__dirname, "build");
fs.removeSync(buildPath); //remove the existing build folder

const campaignPath = path.resolve(__dirname, "contracts", "Campaign.sol"); //get file path
const source = fs.readFileSync(campaignPath, "utf8"); //read file soucre
const output = solc.compile(source, 1).contracts; //compile the source code 1 is the number of diffrent contracts we have to comaile

fs.ensureDirSync(buildPath); //make the build path again

for (let contract in output) {
  fs.outputJsonSync(
    //this function create the json files inside the suggested path
    path.resolve(buildPath, contract.replace(":", "") + ".json"), //make json files into the build folder with the name of contrats and replace :
    output[contract] //give output inside the json
  );
}
