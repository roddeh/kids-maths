import React from 'react'
import shallowClone from './shallow_clone'
import QUESTIONS from './questions'

class Editor extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      config: {
        questions:[
          {name:"verticalAddition", enabled:true, "numDigits":4, carryOver:false},
          {name:"additionWithIcons", enabled:true, "minNumber":3, "maxNumber":12, includeTraceNumbers:true},
          {name:"arithmeticPyramid", enabled:true, "minNumber":6, "maxNumber":12},
          {name:"angleTypes", enabled:true},
        ]
      }
    }

    this.handleAddQuestion = this.handleAddQuestion.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
  }

  handleAddQuestion(name){
    let questions = this.state.config.questions;
    questions.unshift({name, enabled:true})
    this.setState({config:{questions}})
  }

  handleRemove(name){
    let questions = this.state.config.questions
    // delete questions[key]
    let index = questions.findIndex((q) => q.name === name)
    questions.splice(index, 1)
    this.setState({config:{questions}})
  }

  render(){
    let questions = this.state.config.questions.map((q) => {
      let question = QUESTIONS.find((v) => v.name === q.name)
      return ({name:question.name, config:q, definition:question})
    })

    return (
      <div className='editor'>
        <QuestionList config={ this.state.config } onAddQuestion={ this.handleAddQuestion }/>
        <div className='current-questions'>
          {
            questions.map((question, i) => {
              return (
                <EditorSection 
                  key={ question.name }
                  definition={ question.definition }
                  config={ question.config }
                  onRemove={ () => { this.handleRemove(question.name) } }
                />
              )
            })
          }
        </div>
      </div>
    )    
  }
}

class QuestionList extends React.Component {

  constructor(props){
    super(props)
    this.state = {config:props.config}
    this.handleAdd = this.handleAdd.bind(this)
  }

  handleAdd(questionName){
    if(this.props.onAddQuestion){
      this.props.onAddQuestion(questionName)
    }
  }

  render(){
    let questions = QUESTIONS.sort((a, b) => {
      return a.difficultyLevel - b.difficultyLevel
    })

    return (
      <div className='question-list'>
        {
          questions.map((q) => {
            // console.log(q);
            // let exists = Boolean(this.state.config.questions[q.name])
            let exists = this.state.config.questions.findIndex((cq) => cq.name === q.name) !== -1
            return (
              <div className='question-item' key={ q.name }>
                { q.title }
                { exists ? <span className='checkmark'>{ String.fromCodePoint(0x2714) }</span> : <button className='add-button' onClick={ () => { this.handleAdd(q.name) }}>+</button>}
              </div>
            )
          })
        } 
      </div>
    )
  }

}

class EditorSection extends React.Component {

  constructor(props){
    super(props)
    this.state = shallowClone(this.props.config)
    this.handleChange = this.handleChange.bind(this);
    this.handleEnableToggle = this.handleEnableToggle.bind(this);
    this.handleRemoveQuestion = this.handleRemoveQuestion.bind(this);
  }

  handleChange(config){
    this.setState(config)
  }

  handleEnableToggle(){
    this.setState({enabled:event.currentTarget.checked})
  }

  handleRemoveQuestion(){
    if(this.props.onRemove){
      this.props.onRemove()
    }
  }

  render(){
    let def = this.props.definition
    let editorProps = shallowClone(this.state)
    editorProps.onChange = this.handleChange
    return (
      <div className='editor-question'>
        <div className='title'>
          <h1>{ def.title }</h1>
          <div>
            <label>Enabled</label>
            <input type='checkbox' defaultChecked={ this.state.enabled } onChange={ this.handleEnableToggle }/>
            <button onClick={ this.handleRemoveQuestion }>Remove</button>
          </div>
        </div>
        <p>{ def.description }</p>
        {

          
          def.editor ? React.createElement(def.editor, editorProps) : <div/>
          // def.editor ? React.createElement(def.editor, {config:this.state, onChange:this.handleChange}) : <div/>
        }
        <br/>
        {
          React.createElement(def.generator, this.state)
        }
        <hr/>
      </div>
    )
  }

}

module.exports = Editor