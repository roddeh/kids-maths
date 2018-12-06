import React from 'react'
import c from '../constants'
import rand from '../utils/rand'
import shuffle from '../utils/shuffle'
import QuestionEditor from '../question_editor'
import GridPicture from './grid_picture'

const defaultProps = {}

class GridPictureTwoGenerator extends GridPicture.generator {



  render(){
    let { picture, colours, pairs, variables, variableValues } = this.collectConfiguration()
    return (
      <div className='grid-picture'>
        {
          this.createEquationPuzzle(pairs, variables)
        }
        {
          this.createColourKeySet(colours, variableValues, picture)
        }
        {
          this.drawGrid()
        }
      </div>
    )
  }

  createEquationPuzzle(pairs, variables){
    /*
    a + 6 = 15  // a = 9
    2 + a = b   // b = 11
    b - a = c   // c = 2
    b - d = 4   // d = 7
    28 / d = e  // e = 4
    e * c = f   // f = 8
    f + c = d + g  // g = 3
    g * g = g + h  // h = 6
    */

    // Step one, generate all of the equations purely as numbers, make sure each of the variables is in the equation
    // Break down large numbers on either side into equation pairs or triplets.  Do not break down the variable number itself
    // Choose the first equation and replace the single number with the letter
    // Cycle through all other equations and replace that single number with the letter that has been solved.
    // Move to the next equation, replace that single number with the letter
    // Cycle again etc.
    // Shuffle all of the final equations

    // console.log(pairs)

    function createEquation(pair){

      function createExpressionUsing(num){
        function addition(num){
          let num2 = rand(1, 10)
          let value = num2 + num
          let left = num
          let right = num2
          if(Math.random() > 0.5){
            left = num
            right = num2
          }
          else{
            left = num2
            right = num
          }
          return {left, right, value, symbol: c.operations.ADDITION}
        }

        return addition(num)
      }

      function createExpressionEqualTo(value){
        function addition(value){
          let left = rand(1, value - 1)
          let right = value - left
          return {left, right, value, symbol: c.operations.ADDITION}
        }
        return addition(value)
      }


      let exp1 = createExpressionUsing(pair.number)
      let exp2 = createExpressionEqualTo(exp1.value)

      // Expand the expressions sometimes      
      if(Math.random() > 0.5){
        // Don't expand the number that will be replaced with the variable
        if(exp1.left === pair.number){
          exp1.right = createExpressionEqualTo(exp1.right)
        }
        else{
          exp1.left = createExpressionEqualTo(exp1.left) 
        }
      }
      if(Math.random() > 0.5){
        if(Math.random() > 0.5){
          exp2.left = createExpressionEqualTo(exp2.left)
        }
        else{
          exp2.right = createExpressionEqualTo(exp2.right)
        }
      }

      pair.left = exp1
      pair.right = exp2
      pair.symbol = c.operations.EQUALS
    }
    pairs.forEach(createEquation)



    function replaceVariables(pairs){
      let vars = {}
      // vars[pairs[0].number] = pairs[0].letter

      function replaceVars(pair, primaryVar){
        function rep(field){
          if(typeof pair[field] === 'object'){
            replaceVars(pair[field])
          }
          else{
            if(vars[pair[field]] !== undefined){
              pair[field] = vars[pair[field]]
            }
          }          
        }
        // Prepare the letter to replace the numbers        
        rep('right', pair.number)
        // We want to add the variable after the right side has been replaced
        // This avoids the case where you end up with.
        // x + 3 = 3 + x
        // Rather it would be 
        // x + 3 = 3 + 6
        if(pair.letter){
          vars[pair.number] = pair.letter
        }
        rep('left', pair.number)        
      }
      
      pairs.forEach(replaceVars)
    }

    replaceVariables(pairs)

    function stringifyEquations(pairs){
      function stringify(pair){

        let l
        let r
        if(typeof pair.left === 'object'){
          stringify(pair.left)
          l = pair.left.str
        }
        else{
          l = pair.left
        }
        if(typeof pair.right === 'object'){
          stringify(pair.right)
          r = pair.right.str
        }
        else{
          r = pair.right
        }

        pair.str = l + ' ' + pair.symbol + ' ' + r

      }

      pairs.forEach(stringify)
    }


    stringifyEquations(pairs)

    pairs = shuffle(pairs)

    let vars = []
    for(let key in variables){
      vars.push(variables[key])
    }
    vars = shuffle(vars)

    return (
      <React.Fragment>
      <div className='equation-set'>
        {
          pairs.map((pair, ind) => { 
            return (
              <div key={ ind } className='equ'>{ pair.str }</div>
            ) 
          })
        }
      </div>
      <div className='equation-set therefore-set'>
        {
          vars.map((v, ind) => {
            return (
              <div key={ ind }>{ String.fromCodePoint(0x2234) + ' ' + v + ' = '}</div>
            )
          })
        }
      </div>
      </React.Fragment>
    )

  }
}

GridPictureTwoGenerator.defaultProps = defaultProps

class GridPictureTwoEditor extends QuestionEditor {

  render(){
    return (
      <div className='editor-form'>
        
      </div>
    )
  }
}

GridPictureTwoEditor.defaultProps = defaultProps

const GridPictureTwo = {
  name: 'gridPictureTwo',
  title: 'Grid Picture Two',
  description: 'Solve the complete algebra problem to discover the value of the letters.  Then use the letters to determine the colours.  Finally, colour in the grid based on the coordinates associated with each colour to reveal the hidden picture.',
  difficultyLevel:7,
  layoutType: c.questionShapes.DOUBLE_LARGE_SQUARE,
  generator: GridPictureTwoGenerator,
  editor: GridPictureTwoEditor,
}

module.exports = GridPictureTwo