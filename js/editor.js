import React from 'react'
import shallowClone from './utils/shallow_clone'
import QUESTIONS from './questions'
import parseQuery from './utils/parse_query'
import service from './service'

class Editor extends React.Component {

  constructor(props){
    super(props)

    this.state = {loading:true}
    this.handleAddQuestion = this.handleAddQuestion.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
    this.handleQuestionChange = this.handleQuestionChange.bind(this)

    let query = parseQuery()

    if(query.config){
      service.loadConfig(query.config)
        .then((result) => {
          this.setState({loading:false, configID:query.config, config:result.config})
        })
        .catch((error) => {
          console.log('Handle the error', error);
        })  
    }
    else{
     // this.state.createConfig = true 
     console.log('No config provided');
    }

    

  }

  save(){
    // 'Need to throttle this function'
    console.log('TODO: Throttle this function');
    service.saveConfig(this.state.configID, {config:this.state.config})
  }

  handleAddQuestion(name){
    let questions = this.state.config.questions;
    questions.unshift({name, enabled:true})
    this.setState({config:{questions}})
    this.save()
  }

  handleRemove(name){
    let questions = this.state.config.questions
    let index = questions.findIndex((q) => q.name === name)
    questions.splice(index, 1)
    this.setState({config:{questions}})
    this.save()
  }

  handleQuestionChange(data){
    let questions = this.state.config.questions;
    let index = questions.findIndex((q) => q.name === data.name)
    questions[index] = data
    this.save()
  }

  render(){
    if(this.state.loading){
      return <div className='loader'>Loading...</div>
    }
    // if(this.state.noConfig){
    //   return <CreateConfiguration/>
    // }

    let questions = this.state.config.questions.map((q) => {
      let question = QUESTIONS.find((v) => v.name === q.name)
      return ({name:question.name, config:q, definition:question})
    })

    return (
      <div className='editor'>
        <QuestionList config={ this.state.config } configID={ this.state.configID } onAddQuestion={ this.handleAddQuestion }/>
        <div className='current-questions'>
          {
            questions.map((question, i) => {
              return (
                <EditorSection 
                  key={ question.name }
                  definition={ question.definition }
                  config={ question.config }
                  onRemove={ () => { this.handleRemove(question.name) } }
                  onChange={ this.handleQuestionChange }
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
    this.state = {config:props.config, configID:props.configID}
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
        <a className='generate-button' href={ '/generator/?config=' + this.state.configID + "&pages=5"} target='_blank'>Generate Questions</a>
        {
          questions.map((q) => {
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
    if(this.props.onChange){
      this.props.onChange(config)
    }
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

// class CreateConfiguration extends React.Component {


// }

module.exports = Editor