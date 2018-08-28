import React from 'react'
import c from '../constants'
import rand from '../utils/rand'
import shuffle from '../utils/shuffle'
import doTimes from '../utils/do_times'
import QuestionEditor from '../question_editor'

const defaultProps = {
  typesOfAnimals: 2,
}

const ANIMALS = [
  ['duck','ducks'],
  ['cow','cows'],
  ['cat','cats'],
  ['chicken','chickens'],
  ['spider','spiders'],
  ['bee','bees'],
]

class AnimalLegMathGenerator extends React.Component {

  render(){

    let sentence = 'On the farm there were '

    let animals = shuffle(ANIMALS)
    let fragments = []
    doTimes(this.props.typesOfAnimals, (i) => {
      let count = rand(1, 10)

      // If it is the first animal force a count greater than 1 to avoid 'was/were' problems
      if(i === 0 && count === 1){
        count++
      }
      fragments.push(count + ' ' + animals[i][count === 1 ? 0 : 1])
    })

    sentence += fragments.slice(0, fragments.length - 1).join(', ')
    sentence += ' and ' + fragments[fragments.length - 1] + '.'

    return (
      <div className='animal-leg-math center'>
        <p>
          { sentence }
        </p>
        <p>
          How many legs all together?
        </p>
        <p>{ '\xA0' }</p>

      </div>
    )
  }
}

AnimalLegMathGenerator.defaultProps = defaultProps

class AnimalLegMathEditor extends QuestionEditor {

  render(){
    return (
      <div className='editor-formcenter'>
        <label>Types of Animals:</label>
        <input type='range' name='typesOfAnimals' min='1' max='4' step='1' value={ this.state.typesOfAnimals } onChange={ this.handleRangeChange }></input>
        <label>{ this.state.typesOfAnimals }</label>
      </div>
    )
  }
}

AnimalLegMathEditor.defaultProps = defaultProps

const AnimalLegMath = {
  name: 'animalLegMath',
  title: 'Animal Leg Math',
  description: 'Practice arithmetic with the help of animals and counting their legs.',
  difficultyLevel:5,
  layoutType: c.questionShapes.WIDE_RECT,
  generator: AnimalLegMathGenerator,
  editor: AnimalLegMathEditor,
}

module.exports = AnimalLegMath