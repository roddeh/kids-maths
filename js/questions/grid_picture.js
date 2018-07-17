import React from 'react'
import c from '../constants'
import doTimes from '../utils/do_times'
import rand from '../utils/rand'
import shuffle from '../utils/shuffle'
import QuestionEditor from '../question_editor'
import CheckboxSet from '../checkbox_set'

const ADDITION = '+';
const SUBTRACTION = '-';
const MULTIPLICATION = String.fromCodePoint(215)
const DIVISION = String.fromCodePoint(0x00F7)

const defaultProps = {
  operations: [ADDITION, SUBTRACTION, MULTIPLICATION, DIVISION]
}

const COLS = 8;
const ROWS = 8;

const SMILE = `
__YYYY__
_YYYYYY_
Y__YY__Y
Y_BYYB_Y
YYYYYYYY
YYKYYKYY
_YYKKYY_
__YYYY__
`

const LITTLE_MAN = `
_BBBB___
__BBBB__
__SKSK__
__SSPS__
SRBRRBRS
__BBBB__
__BBBB__
__N__N__
`

const SPINOSAURUS = `
GBG_____
_GG_YY__
GGGGYYY_
__GGGYY_
_GGGGGY_
___GGGG_
____G_GG
___GG___
`

const CRAB = `
_EE_EE__
_EK_EK__
_R__R___
_R__R___
RRRRR_RR
RRKKRRR_
RRRRR_RR
R_R_R___
`

const BIRD = `
__EE____
_EKEE___
OEEEE___
_EEEEBBB
__EEBBBE
__EEBBE_
___EEE__
___O_O__
`

const PIKACHU = `
_KK____K
__YO___O
___YYYYY
OY_YBYYB
OY_RYYYY
_O_YOYY_
_OYOYOY_
__YOBBO_
`

const PINEAPPLE = `
__G_G_G_
___GGG__
__ONGON_
_NONONON
_ONONONN
_NONONON
_ONONONN
__NNNNN_
`

const CUPCAKE = `
___PR___
_PPRRPP_
PPPPPPPP
PPPPPPPP
RRRRRRRR
_EBEBEB_
_EBEBEB_
_EBEBEB_
`

const HOUSE = `
___NN___
__NEEN__
_NEEEEB_
NBBEEBBN
_BBEEBB_
_EERREE_
_EERREE_
GEERREEG
`

const MUSHROOM = `
__RR_R__
_R_RRRR_
RRRR_RRR
R_RRRR_R
___NNN__
___SSS__
__SSSS__
__SSS___
`

const PEACH = `
__RRGG__
_OOOGGR_
OYYOOORR
OYYOOORR
OOOOOORR
OYOOOORR
_OOOORR_
__RRRR__
`

const FISH = `
___YYYY_
__YYYY__
_GGGG__Y
GBGGGG_Y
GGGGGGYY
GKKGGG_Y
_GGGGY_Y
__Y_YY__
`

const PAC_GHOST = `
__OOON__
_OOOOON_
OO_KO__N
OO__OK_N
OOOOOOON
OOOOOONN
OOOOOONN
O_OO_ONN
`

const LETTER_POSITIONS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', "H"]
const PICS = [SMILE, LITTLE_MAN, SPINOSAURUS, CRAB, BIRD, PIKACHU, PINEAPPLE, CUPCAKE, HOUSE, MUSHROOM, PEACH, FISH, PAC_GHOST]

let colours = {
  'Y':'YELLOW',
  'K':'BLACK',
  'B':'BLUE',
  'S':'BEIGE',
  'R':'RED',
  'N':'BROWN',
  'P':'PINK',
  'G':'GREEN',
  'E':'SKY BLUE',
  'O':'ORANGE',
}

let colourKeys = {}

function objToArr(o){
  let arr = [];
  for(let key in o){
    arr.push(key);
  }
  return arr;
}

function getColours(pic){
  let cols = {}
  pic.split('').forEach((c) => {
    if(c !== '\n' && c !== '_'){
      cols[c] = true;
    }
  })
  return objToArr(cols).map((c) => colours[c]); 
}

function getPicture(){
  return rand(PICS);
}

function getUniqueLetters(colours){
  let letters = {};
  colours.forEach((col) => {
    col.split('').forEach((l) => {
      if(l !== ' '){
        letters[l] = true;
      }
    });
  })
  return objToArr(letters);
}

class GridPictureGenerator extends React.Component {

  render(){
    this.createColourKeys();
    let picture = getPicture();
    let colours = getColours(picture);
    let pairs = shuffle(getUniqueLetters(colours)
      .map((p, i) => {
        return {letter: p, number: i + 1}
      }));

    let variables = {};
    let variableValues = {};
    pairs.forEach((l) => {
      variables[l.number] = l.letter;
      variableValues[l.letter] = l.number;
    });



    return (
      <div className='grid-picture'>
        <div className='equation-set'>
          {
            pairs.map((pair, ind) => { return this.createEquation(pair, variables, ind) } )
          }
        </div>
        <div className='colour-key-set'>
          {
            colours.map((colour, ind) => { return this.createColourKey(colour, variableValues, picture, ind)})
          }
        </div>
          {
            this.drawGrid()
          }
      </div>
    )
  }

  createEquation(pair, variables, ind){

    function addition(pair){
      let num = rand(0, 10);
      if(Math.random() > 0.5){
        return [pair.letter, num, pair.number + num];
      }
      else{
        return [num, pair.letter, num + pair.number];
      }
    }

    function subtraction(pair){
      if(Math.random() > 0.5){
        let right = pair.number - rand(0, pair.number);
        return [pair.letter, right, pair.number - right];
      }
      else{
        let left = pair.number + rand(0, 10);
        return [left, pair.letter, left - pair.number];
      }
    }

    function multiplication(pair){
      let max = pair.number > 10 ? 3 : 9;
      let multiplier = rand(2, max)
      if(Math.random() > 0.5){
        return [pair.letter, multiplier, pair.number * multiplier];
      }
      else{
        return [multiplier, pair.letter, multiplier * pair.number];
      } 
    }

    function division(a, b){
      let max = pair.number > 10 ? 2 : 9;
      let multiplier = rand(2, max)
      if(Math.random() > 0.5){
        return [pair.number * multiplier, pair.letter, multiplier];
      }
      else{
        return [pair.number * multiplier, multiplier, pair.letter];
      }
    }

    let operationMethodMap = {}
    operationMethodMap[ADDITION] = addition
    operationMethodMap[SUBTRACTION] = subtraction
    operationMethodMap[MULTIPLICATION] = multiplication
    operationMethodMap[DIVISION] = division

    let ops = this.props.operations.map((op) => {
      return {symbol:op, method:operationMethodMap[op]}
    })
    let operation = rand(ops)

    let left;
    let right;
    let answer;

    [left, right, answer] = operation.method(pair);
    let question = left + ' ' + operation.symbol + ' ' + right;    
    let top = question + ' = ' + answer;
    let bottom = `\xA0\xA0${ String.fromCodePoint(0x2234)} ${pair.letter } = `


    return (
      <div className='equation' key={ ind }>
        { top }<br/>
        { bottom }
      </div>
    )
  }

  drawGrid(){
    return (
      <table className='grid'>
        <tbody>
          <tr>
            <th>&nbsp;</th>
            {
              doTimes(ROWS, (i) => {
                return <th key={ i }>{i + 1}</th>
              })
            }
          </tr>
          {
            doTimes(ROWS, (i) => {
              return (
                <tr key={ i }>
                  <th>{ LETTER_POSITIONS[i] }</th>
                  {
                    doTimes(COLS, (j) => {
                      return <td key={ j }>&nbsp;</td>
                    })
                  }
                </tr>
              )
            })
          }
        </tbody>
      </table>
    )
  }

  createColourKeys(){
    for(let key in colours){
      colourKeys[colours[key]] = key;
    }
  }


  createColourKey(colour, variableValues, picture, ind){
    function getKeys(){
      let counter = 0;
      let colourKey = colourKeys[colour];
      let keys = [];
      picture.split('').forEach((p) => {
        if(p === '\n' || p === ' '){
          return;
        }
        let row = Math.floor(counter / COLS);
        let col = counter % COLS;
        if(p === colourKey){
          keys.push(LETTER_POSITIONS[row] + (col + 1));
        }
        counter++
      })
      return keys.join(' ');
    }

    return (
      <div className="colour-key" key={ ind }>
        {
          colour.split('').map(() => '___\xA0').join('')
        }
        <br/>
        {
            colour.split('').map((c) => {
              let val = variableValues[c];
              if(val === undefined){
                return `\xA0\xA0\xA0\xA0`;
              }
              if(val > 9){
                return `\xA0${ val }\xA0`;
              }
              else{
                return `\xA0${ val }\xA0\xA0`;
              }
            }).join('')
        }
        <br/>
        {
          getKeys()
        }
        <br/>
      </div>
    )
  }

}

GridPictureGenerator.defaultProps = defaultProps

class GridPictureEditor extends QuestionEditor {

  render(){
    let options = [
      {label:'Addition', value:ADDITION},
      {label:'Subtraction', value:SUBTRACTION},
      {label:'Multiplication', value:MULTIPLICATION},
      {label:'Division', value:DIVISION},
    ]
    return (
      <div className='editor-form'>
        <label>Included Operations:</label>
        <br/>
        <CheckboxSet value={ this.state.operations } options={ options } onChange={ (val) => this.handleCheckboxSetChange('operations', val) }></CheckboxSet>
      </div>
    )
  }
}

GridPictureEditor.defaultProps = defaultProps

const GridPicture = {
  name: 'gridPicture',
  title: 'Grid Picture',
  description: 'Learn basic algebra and problem solving to discover the mystery picture.  Kids need to solve the algebraic questions to discover the value of the letters.  Then use the letters to determine the colours.  Finally, colour in the grid based on the coordinates associated with each colour.',
  difficultyLevel:0,
  layoutType: c.questionShapes.DOUBLE_LARGE_SQUARE,
  generator: GridPictureGenerator,
  editor: GridPictureEditor,
}

module.exports = GridPicture