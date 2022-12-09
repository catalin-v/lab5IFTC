// const a = require('./input.in')
var fs = require('fs')
const data = fs.readFileSync('./inputLab5.in',
{encoding:'utf8', flag:'r'})
// console.log(data)



const [nonterminals, terminals, productions, initialStates, finalStates] = data.split('\n')

const text = `Select Option:
  0: exit
  1: see nonterminals
  2: see terminals
  3: see prductions
  4: see production for given nonterminal
  5: CFG check\n
`

const ask = function(q){
  const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  })

  var response;

  readline.setPrompt(q);
  readline.prompt();

  return new Promise(( resolve , reject) => {

      readline.on('line', (userInput) => {
          response = userInput;
          readline.close();
      });

      readline.on('close', () => {
          resolve(response);
      });

  });
} 

const cfgCheck = (productions, nonterminals) => productions.every(prod => nonterminals.indexOf(prod.split(':=')[0]) !== -1)

const againLogic = (seq) => {
  const result = productions.split(',').filter(prod => prod.indexOf(seq) === 0)
  console.log()
  result.forEach(res => console.log(res))
  console.log()
}

const logic = (option) => {
  option = Number(option)
  switch (option) {
    case 0:
      console.log('END')
      return false
    case 1:
      console.log(nonterminals)
      break
    case 2:
      console.log(terminals.split('|').join(','))
      break
    case 3:
      console.log(productions.replace(/,/g, '\n'))
      break;
    case 4:
      return 'some more logic required'
      break;
    case 5:
      // console.log()
      productions.split(',').every(prod => {
        console.log(nonterminals.indexOf(prod.split(':=')[0]), prod.split(':=')[0], nonterminals)
        return nonterminals.indexOf(prod.split(':=')[0]) !== -1
      })
      console.log(cfgCheck(productions.split(','), nonterminals) ? 'It is\n' : 'it is not \n')
      
      break;
    default:
      console.log(`Bad input\n`)
  }
  console.log('\n')
  return true

}

const otherLogicMenu = () => {
  ask('What is the nonterminal?\n').then(nonterminal => {
    againLogic(nonterminal)
  })
  .then(menu)
}

const menu = () => {
  ask(text).then(res => {
    if (typeof logic(res) === 'string') otherLogicMenu()
    else if (logic(res)) menu()
    else console.log('ended')
  })
}

menu()
