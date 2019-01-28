#!/usr/local/bin/node
 //require modules
const _ = require("underscore");

//setup variables
var bruteforcePairs, gekkoPairs
var pairsToUnite = [], tradingPairs = [];

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//                      CONFIGURATION ELEMENTS
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

//Do you want to use the manually entered list below as input?
// TODO Reformat this to the format gekko.js expects
const pairsFromList = true;
const listPairs = [
  ["binance", "USDT", "BTC"],
  ["binance", "BTC", "DLT"],
  ["binance", "BTC", "ETH"],
  ["binance", "BTC", "TRX"],
  ["binance", "BTC", "QKC"],
  ["binance", "BTC", "VIBE"],
  ["binance", "BTC", "LINK"],
  ["binance", "PAX", "BTC"],
  ["binance", "BTC", "XRP"],
  ["binance", "BTC", "BNB"],
  ["binance", "BTC", "QLC"],
  ["binance", "BTC", "WAVES"],
  ["binance", "BTC", "TUSD"],
  ["binance", "BTC", "BCHABC"],
  ["binance", "BTC", "TNT"],
  ["binance", "USDC", "BTC"],
  ["binance", "BTC", "ADA"],
  ["binance", "BTC", "REP"],
  ["binance", "BTC", "LTC"],
  ["binance", "BTC", "BCHSV"],
  ["binance", "BTC", "EOS"],
  ["binance", "BTC", "XLM"],
  ["binance", "BTC", "ZIL"],
  ["binance", "BTC", "NEO"],
  ["binance", "BTC", "PHX"]
];

//And do you want to import currency pairs from your bruteforce setup?
const pairsFromBruteforce = true;
const bruteforceScript = "../bruteforce/bruteforce.js";

//And those from your gekko config file?
const pairsFromGekkoConfig = true;
const gekkoDir = "../gekko"; //Set this, even if you're not using gekko's config file
const gekkoConfig = gekkoDir + "/config-with-strategies.js";

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//                     /CONFIGURATION ELEMENTS
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function getBruteforcePairs(scriptLocation) {
  //Get pairs from bruteforce script (should match format of listPairs already)
  let bruteforce = require(scriptLocation);
  if (typeof bruteforce.tradingPairs !== 'undefined') {
    console.log(bruteforce.tradingPairs);
  } else {
    throw "tradingPairs couldn't be read from bruteforce script (" + scriptLocation + ").";
  }
}

function getGekkoPairs(configLocation) {
  //Get pairs from gekko config and parse to format of listPairs
  let gekko = require(configLocation);
  if (typeof gekko.config !== 'undefined'
      && typeof gekko.config.watch !== 'undefined') {
    console.log(gekko.config.watch);
  } else {
    throw "gekko.config.watch couldn't be read from gekko config (" + configLocation + ").";
  }
}

if (pairsFromList) {
  pairsToUnite.push(listPairs);
}

if (pairsFromBruteforce) {
  bruteforcePairs = getBruteforcePairs(bruteforceScript);
  pairsToUnite.push(bruteforcePairs);
}

if (pairsFromGekkoConfig) {
  gekkoPairs = getGekkoPairs(gekkoConfig);
  pairsToUnite.push(gekkoPairs);
}

if (pairsToUnite.length > 1) {
  console.log("Warning: Multiple sources selected, lists from these sources "
              + "will be merged...");
}

tradingPairs = _.union(pairsToUnite);

console.log(tradingPairs);
