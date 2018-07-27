import React from 'react'
import c from '../constants'
import doTimes from '../utils/do_times'
import rand from '../utils/rand'
import shuffle from '../utils/shuffle'
import emoji from '../utils/emoji'
import QuestionEditor from '../question_editor'

const defaultProps = {
  minNumber: 1,
  maxNumber: 9,
}

const SET_COUNT = 3;

class ConnectIconsToNumbersGenerator extends React.Component {

  render(){
    let icon = rand(emoji);
    let numbers = [];
    for(let i = this.props.minNumber; i <= this.props.maxNumber; i++){
      numbers.push(i);
    }
    numbers = shuffle(numbers).slice(0, SET_COUNT)

    function makeIcons(icon, num){
      return <div className='icons'>{ doTimes(num, (i) => icon).join('') }</div>
    }

    return (
      <div className='connect-icons-to-numbers'>
      {
        numbers.map((n, i) => {
          return <div className='group' key={ i }>{ makeIcons(icon, n) }</div>
        })
      }
      {
        shuffle(numbers).map((n) => {
          return <span className='number' key={ n }>{ n }</span>
        })
      }
      </div>
    )
  }
}

ConnectIconsToNumbersGenerator.defaultProps = defaultProps

class ConnectIconsToNumbersEditor extends QuestionEditor {

  render(){
    return (
      <div className='editor-form'>
        { this.renderMinMaxRange(1, 5, 5, 12) }
      </div>
    )
  }
}

ConnectIconsToNumbersEditor.defaultProps = defaultProps

const ConnectIconsToNumbers = {
  name: 'connectIconsToNumbers',
  title: 'Connect Icons To Numbers',
  description: 'Learn the association between quantity and written numbers',
  difficultyLevel:1,
  layoutType: c.questionShapes.WIDE_RECT,
  generator: ConnectIconsToNumbersGenerator,
  editor: ConnectIconsToNumbersEditor,
}

module.exports = ConnectIconsToNumbers