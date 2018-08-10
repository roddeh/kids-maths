import React from 'react'
import c from '../constants'
import rand from '../utils/rand'
import QuestionEditor from '../question_editor'

const defaultProps = {
  rangeValue: 3,
  booleanValue:false,
}

let idCounter = 0
const SIZE = 300

class TemplateGenerator extends React.Component {

  updateCanvas(){
    let ctx = document.getElementById(this.canvasID).getContext('2d')
    ctx.clearRect(0, 0, SIZE, SIZE)
  }

  componentDidMount(){
    this.updateCanvas()
  }

  componentDidUpdate(){
    this.updateCanvas()
  }

  render(){
    this.canvasID = 'template-' + (idCounter++);
    return (
      <div className='template'>
        <canvas id={ this.canvasID } width={ SIZE } height={ SIZE }></canvas>
      </div>
    )
  }
}

TemplateGenerator.defaultProps = defaultProps

class TemplateEditor extends QuestionEditor {

  render(){
    return (
      <div className='editor-form'>
        <label>Range example:</label>
        <input type='range' name='rangeValue' min='1' max='5' step='1' value={ this.state.rangeValue } onChange={ this.handleRangeChange }></input>
        <label>{ this.state.rangeValue }</label>
        <br/>
        <label>Boolean Example:</label>
        <input type='checkbox' name='booleanValue' defaultChecked={ this.state.booleanValue } onChange={ this.handleCheckboxChange }></input>
      </div>
    )
  }
}

TemplateEditor.defaultProps = defaultProps

const Template = {
  name: '',
  title: '',
  description: '',
  difficultyLevel:0,
  layoutType: c.questionShapes.WIDE_RECT,
  generator: TemplateGenerator,
  editor: TemplateEditor,
}

module.exports = Template