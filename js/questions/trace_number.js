import React from 'react'
import c from '../constants'
import rand from '../utils/rand'
import doTimes from '../utils/do_times'
import emoji from '../utils/emoji'
import QuestionEditor from '../question_editor'

const defaultProps = {
  minNumber: 1,
  maxNumber: 12,
}

class TraceNumberGenerator extends React.Component {

  render(){
    let min = this.props.minNumber;
    let max = this.props.maxNumber;
    let icon = rand(emoji);
    let num = rand(min, max);

    function makeIcons(icon, num){      
      return <div className='icons'>
        { doTimes(num, () => { return icon }).join('') }
      </div>
    }

    return  (
      <div className='trace-number'>
        { makeIcons(icon, num)  }
        <span className='number'>{ num }</span>
      </div>
    )
  }
}

TraceNumberGenerator.defaultProps = defaultProps

class TraceNumberEditor extends QuestionEditor {

  render(){
    return (
      <div className='editor-form'>
        { this.renderMinMaxRange(1, 5, 5, 16) }
      </div>
    )
  }
}

TraceNumberEditor.defaultProps = defaultProps

const TraceNumber = {
  name: 'traceNumber',
  title: 'Trace Number',
  description: 'Practise writing numbers and associating them with quantities using trace guides.',
  difficultyLevel:1,
  layoutType: c.questionShapes.WIDE_RECT,
  generator: TraceNumberGenerator,
  editor: TraceNumberEditor,
}

module.exports = TraceNumber