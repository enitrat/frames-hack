import { hash } from "starknet";
import inquirer from "inquirer";

inquirer
  .prompt([
    {
      type: "input",
      name: "classHashInput",
      message: "Enter the class hash:",
      validate: (input) => {
        if (input.trim() === "") {
          return "Class hash is required.";
        }
        return true;
      },
    },
    {
      type: "input",
      name: "saltInput",
      message: "Enter the salt",
      default: "0x65766d5f61646472657373",
    },
    {
      type: "input",
      name: "deployerInput",
      message: "Enter the deployer address",
      default:
        "0x1a18210c20241ea7a06224246264a59add11c8358d69826e8bd51f4ba6d3be7",
    },
  ])
  .then((answers) => {
    const classHash = BigInt(answers.classHashInput);
    const salt = BigInt(answers.saltInput);
    const deployerAddress = BigInt(answers.deployerInput);

    const CONSTRUCTOR_CALLDATA = [deployerAddress, salt];

    function compute_starknet_address() {
      return hash.calculateContractAddressFromHash(
        salt,
        classHash,
        CONSTRUCTOR_CALLDATA,
        deployerAddress
      );
    }

    console.log("Pre-computed Starknet Address: " + compute_starknet_address());
  });
