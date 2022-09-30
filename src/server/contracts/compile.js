const path = require("path");
const solc = require("solc"); //don"t forget to install the right solc version !
const fs = require("fs-extra");

const CONTRACT_NAME = "Forestoken";

const pathERC20 = "node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";
const pathIERC20 = "node_modules/@openzeppelin/contracts/token/ERC20/IERC20.sol";
const pathIERC20Metadata = "node_modules/@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";
const pathContext = "node_modules/@openzeppelin/contracts/utils/Context.sol";

async function main() {
    const buildPath = path.resolve(__dirname, "build");
    fs.removeSync(buildPath);
    fs.ensureDirSync(buildPath);
    // Compile the source code and retrieve the ABI and Bytecode
    // These are the only two things we need to deploy a contract
    const { abi, bytecode } = compileContract(["./","", CONTRACT_NAME+".sol"]);

    // Store the ABI and Bytecode into a JSON file
    let outputPath = path.resolve(buildPath, CONTRACT_NAME+'.json');
    fs.outputJsonSync(outputPath, { abi, bytecode }, { spaces: 2 });
    console.log('----------------- Compiled contract written to ' + CONTRACT_NAME+'.json ----------------- \n');
}

function compileContract(Contract) {
    const contractPath = path.resolve(__dirname, ...Contract);
    const contractSourceCode = fs.readFileSync(contractPath, "utf8");

    var input = {
        language: "Solidity",
        sources: {
            ForestokenContract: {
                content: contractSourceCode
            }
        },
        settings: {
            optimizer: {
                enabled: true
            },
            outputSelection: {
                "*": {
                    "*": [ "*" ]
                }
            }
        }
    };


    let output = JSON.parse(solc.compile(JSON.stringify(input), { import: findImports }));
    console.log(output);
    let contractObject = output.contracts.ForestokenContract[CONTRACT_NAME];
    return {
        abi: contractObject.abi,
        bytecode: contractObject.evm.bytecode.object,
    };
}

// Load the contract source code
// /forestoken/node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol
// node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol
//this will break if you move this file to another directory
const baseProjectPath = path.resolve(process.cwd() + '/../../../');
const ERC20SourceCode = fs.readFileSync(baseProjectPath+"/"+pathERC20);
const IERC20SourceCode = fs.readFileSync(baseProjectPath+"/"+pathIERC20);
const IERC20SourceCodeMetadata = fs.readFileSync(baseProjectPath+"/"+pathIERC20Metadata);
const ContextSourceCode = fs.readFileSync(baseProjectPath+"/"+pathContext);

function findImports(path) {
    if (path === pathERC20) return { contents: `${ERC20SourceCode}` };
    if (path === pathIERC20) return { contents: `${IERC20SourceCode}` };
    if (path === pathIERC20Metadata) return { contents: `${IERC20SourceCodeMetadata}` };
    if (path === pathContext) return { contents: `${ContextSourceCode}` };
    else return { error: "File not found" };
}

main().then(() => process.exit(0));

