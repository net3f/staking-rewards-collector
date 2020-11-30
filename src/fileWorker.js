import fs from 'fs';

export function exportVariable(data, name){
    try {
        fs.writeFileSync(name, data);
        console.log("Result is exported to " + name + '.');
        } catch (err) {
        console.error(err);
        }
}

export function readJSON(filePath) {
    const rawContent = fs.readFileSync(filePath);

    return JSON.parse(rawContent);
  }

  export function writeCSV(obj, name){
      const filename = name;

      fs.writeFileSync(filename, extractAsCSV(obj), err => {
          if(err) {
              console.log('Error writing .csv file', err);
          } else {
              console.log('Exported as .csv file');
          }  
      });
  }

  function extractAsCSV(obj){
    const header = [
        "Day, Price in " + obj.currency +
        ", Staking Rewards in" + ((obj.network == 'polkadot') ? ' DOT' : ' KSM') + 
        ", Number of Payouts" +
        ", Value in Fiat" +
        ", Income tax (" + (obj.incomeTax*100).toFixed(2) + "%)"
    ]; 
    
    const rows = obj.data.list
        .filter(entry => entry.numberPayouts > 0)
        .map(entry => `${entry.day}, ${entry.price}, ${entry.amountHumanReadable}, ${entry.numberPayouts}, ${entry.valueFiat}, ${entry.valueTaxable}`);

      return header.concat(rows).join("\n");
  }