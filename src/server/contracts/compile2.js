"use-strict";

const path = require("path");
const solc = require("solc"); //don"t forget to install the right solc version !
const fs = require("fs-extra");


const pathERC20 = "node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";
const pathIERC20 = "node_modules/@openzeppelin/contracts/token/ERC20/IERC20.sol";
const pathIERC20Metadata = "node_modules/@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";
const pathContext = "node_modules/@openzeppelin/contracts/utils/Context.sol";

// Load the contract source code
const ERC20SourceCode = fs.readFileSync(pathERC20);
const IERC20SourceCode = fs.readFileSync(pathIERC20);
const IERC20SourceCodeMetadata = fs.readFileSync(pathIERC20Metadata);
const ContextSourceCode = fs.readFileSync(pathContext);

async function main() {

    // Compile the source code and retrieve the ABI and Bytecode
    compileContract(["./","", "Forestoken.sol"]);
    const { abi, bytecode } = compile(sourceCode, 'Forestoken');
    // Store the ABI and Bytecode into a JSON file
    const artifact = JSON.stringify({ abi, bytecode }, null, 2);
    await fs.writeFile('Forestoken.json', artifact);
}

function compileContract(Contract) {
    const buildPath = path.resolve(__dirname, "build");
    const contractPath = path.resolve(__dirname, ...Contract);

    const contractSourceCode = fs.readFileSync(contractPath, "utf8");

    fs.removeSync(buildPath);
    fs.ensureDirSync(buildPath);

    var input = {
        language: "Solidity",
        sources: {
            Contract: {
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
    for(let contractName in output.contracts.Contract) {
        fs.outputJsonSync(
            path.resolve(buildPath, `${contractName}.json`),
            output.contracts.Contract[contractName]
        );
    }

    return 'compiled ok';
}

function findImports(path) {
    if (path === pathERC20) return { contents: `${ERC20SourceCode}` };
    if (path === pathIERC20) return { contents: `${IERC20SourceCode}` };
    if (path === pathIERC20Metadata) return { contents: `${IERC20SourceCodeMetadata}` };
    if (path === pathContext) return { contents: `${ContextSourceCode}` };
    else return { error: "File not found" };
}

main().then(() => process.exit(0));

