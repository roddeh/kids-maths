import React from 'react'
import c from '../constants'
import rand from '../utils/rand'
import shuffle from '../utils/shuffle'
import doTimes from '../utils/do_times'
import QuestionEditor from '../question_editor'
import GridPicture from './grid_picture'
import emoji from '../utils/emoji'

const defaultProps = {
  
}

class GridPictureTwoGenerator extends GridPicture.generator {



  render(){
    let { picture, colours, pairs, variables, variableValues } = this.collectConfiguration()
    return (
      <div className='grid-picture'>
        {
          this.createLetterQuestions(variableValues)
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

  createLetterQuestions(variableValues){
    let vals = []
    for(let letter in variableValues){
      vals.push({letter, value:variableValues[letter]})
    }
    vals = shuffle(vals)
    let icon = rand(emoji)

    return (
      <div className='equation-set'>
        {
          vals.map((v, i) => {
            return (
              <div key={ i } className='icon-box center'>
                <p className='icons'>
                  {
                    doTimes(v.value, () => { return icon }).join('')
                  }
                </p>
                <p>{ v.letter } = &nbsp;</p>
              </div>
            )
          })
        }
      </div>
    )


    return 'icons'
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
  name: 'gridPictureIcons',
  title: 'Grid Picture Icons',
  description: 'Solve the arithmetic to reveal the colours and finally the picture.',
  difficultyLevel:2,
  layoutType: c.questionShapes.DOUBLE_LARGE_SQUARE,
  generator: GridPictureTwoGenerator,
  editor: GridPictureTwoEditor,
}

module.exports = GridPictureTwo