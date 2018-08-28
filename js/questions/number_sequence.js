import React from 'react'
import c from '../constants'
import rand from '../utils/rand'
import doTimes from '../utils/do_times'
import QuestionEditor from '../question_editor'

const defaultProps = {
  startAtOne: true,
  includeReccurent:false,
}

const COUNT = 10

class NumberSequenceGenerator extends React.Component {

  renderReccurentSequence(){
    let start = rand(1, 4)
    if(this.props.startAtOne){
      start = 1
    }
    let multiplier = rand(2, 4)
    let sequence = [start]
    doTimes(5, () => {
      let prev = sequence[sequence.length - 1]
      sequence.push(prev * multiplier)
    })
    return sequence
  }

  renderLinearSequence(){
    let start = rand(0, 10)
    if(this.props.startAtOne){
      start = 1
    }

    let increment = rand(1, 5)
    let sequence = []
    doTimes(COUNT, (i) => {
      sequence.push(start + i * increment)
    })
    return sequence
  }

  renderSequence(){
    let sequence;
    if(this.props.includeReccurent && Math.random() > 0.5){
      sequence = this.renderReccurentSequence()
    }
    else{
      sequence = this.renderLinearSequence()
    }

    let i = rand(4)
    while(i < sequence.length){
      sequence[i] = null
      i += rand(4)
    }

    return (
      <React.Fragment>
        {
          sequence.map((s, i) => {
            if(s === null){
              return <span className="missing" key={ i }></span>
            }
            return <span key={ i }>{ s },</span>
          })
        }
      </React.Fragment>
    )

  }

  render(){
    return (
      <div className='number-sequence'>
        { 
          doTimes(3, (i) => { 
            return (
              <div key={ i }>
                { this.renderSequence() }
              </div>
            )
          })
        }
      </div>
    )
  }
}

NumberSequenceGenerator.defaultProps = defaultProps

class NumberSequenceEditor extends QuestionEditor {

  render(){
    return (
      <div className='editor-form'>
        <label>Always start at 1:</label>
        <input type='checkbox' name='startAtOne' defaultChecked={ this.state.startAtOne } onChange={ this.handleCheckboxChange }></input>
        <br/>
        <label>Include Reccurent Sequences:</label>
        <input type='checkbox' name='includeReccurent' defaultChecked={ this.state.includeReccurent } onChange={ this.handleCheckboxChange }></input>
      </div>
    )
  }
}

NumberSequenceEditor.defaultProps = defaultProps

const NumberSequence = {
  name: 'numberSequence',
  title: 'Number Sequence',
  description: 'Fill in the missing numbers in the number sequence.',
  difficultyLevel:6,
  layoutType: c.questionShapes.WIDE_RECT,
  generator: NumberSequenceGenerator,
  editor: NumberSequenceEditor,
}

module.exports = NumberSequence