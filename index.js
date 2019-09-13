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
      string = string.replace(reg, word.green)    
    } else if (word === 'SELECT') {
      string = string.replace(reg, word.inverse.yellow)    
    } else {
      string = string.replace(reg, word.blue)
    } 
  }

  console.log('\n' + 'Formatted SQL here:'.cyan + '\n\n' + string + '\n\n'+ 'END'.red.italic)
} 
