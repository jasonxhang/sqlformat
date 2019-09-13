const argv = require('yargs').argv
const colors = require('colors')
//check the colors documentation for supported colors/themes and customize your output below



if (argv) {
  const input = argv._[0]
  const firstNonQuoteChar = input.indexOf('"') + 1
  const lastNonQuoteChar = input.lastIndexOf('"')
  let string = input.substring(firstNonQuoteChar, lastNonQuoteChar).replace(/↵/ig, '\n')

  const keywords = ['SELECT', 'FROM', 'WHERE', 'HAVING', 'GROUP BY', 'LEFT OUTER JOIN', 
                    'RIGHT OUTER JOIN', 'JOIN', 'GROUP EACH', 'ON']

  for (let word of keywords) {
    let reg = new RegExp(`\\b${word}`, 'g')

    if (word === 'ON'){     
      string = string.replace(reg, word.cyan)    
    } else if (word === 'SELECT') {
      string = string.replace(reg, word.inverse.yellow)    
    } else {
      string = string.replace(reg, word.blue)
    } 
  }

  string = string
    .replace(/\"\d{4}-\d{2}-\d{2} \d{2}\:\d{2}\:\d{2}\"/g, function(m){
        return m.green
    })
    .replace(/\"subaction_\d*\"/g, function (m){
        return m.green
    })
    .replace(/\[(triggeredmail\.[^\]]+)\]/g, function(m){
        return m.red
    })

  console.log('\n' + 'Formatted SQL here:'.cyan + '\n\n' + string + '\n\n'+ 'END'.red.italic)
} 
