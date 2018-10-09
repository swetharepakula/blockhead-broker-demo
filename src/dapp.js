import Web3 from "web3";

var myContract;

export function getContract(services) {
    console.log("Getting the Contract")
        console.log("inside getContract: vcap_services are : " + services)
    var web3;
    if (typeof window.web3 !== "undefined" && typeof window.web3.currentProvider !== "undefined") {
        web3 = new Web3(window.web3.currentProvider);
    } else {
        web3 = new Web3();
    }

    var vcap_services = JSON.parse(services)
    var host = vcap_services["eth"][0]["credentials"]["ContainerInfo"]["ExternalAddress"]
    var port = vcap_services["eth"][0]["credentials"]["ContainerInfo"]["Bindings"]["8545"][0]["Port"]
    var abi = JSON.parse(vcap_services["eth"][0]["credentials"]["NodeInfo"]["abi"])
    var contractAddr = vcap_services["eth"][0]["credentials"]["NodeInfo"]["contract_address"]
    var addr = vcap_services["eth"][0]["credentials"]["NodeInfo"]["address"]

    web3.setProvider(new web3.providers.HttpProvider("http://" + host + ":" + port));
    web3.eth.defaultAccount = addr;

    var VotingContract = web3.eth.contract(abi);
    myContract = VotingContract.at(contractAddr);
    return myContract;
}

export function voteA(vcap_services, func) {
        console.log("voted for option A");
        console.log("vcap_services are : " + vcap_services)
        console.log("func is : " + func)
        var myContract = getContract(vcap_services);
        myContract.voteA();
    // window.location.href = 'results.html';
}

export function voteB(vcap_services, func) {
    console.log("voted for option B");
        console.log("vcap_services are : " + vcap_services)
        console.log("func is : " + func)
    var myContract = getContract(vcap_services);
    myContract.voteB();
    // window.location.href = 'results.html';
}

export function getResults() {
    var myContract = getContract();
    var optionA = myContract.proposalA.toString();
    var valA = parseInt(optionA.substring(optionA.indexOf(',') + 1), 10);
    var optionB = myContract.proposalB.toString();
    var valB = parseInt(optionB.substring(optionB.indexOf(',') + 1), 10);

    var tot = valA + valB;
    var perA = (valA / tot) * 100;
    var perB = (valB / tot) * 100;

    console.log(valA);
    console.log(valB);
    console.log(perA);
    console.log(perB);

    var results = {
        valA: valA,
        valB: valB,
        percentA: perA,
        percentB: perB,
    }

    return results;
}
