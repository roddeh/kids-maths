import React from 'react'
import shallowClone from './utils/shallow_clone'
import QUESTIONS from './questions'
import parseQuery from './utils/parse_query'
import service from './service'
import c from './constants'
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";

class Editor extends React.Component {

  constructor(props){
    super(props)

    
    this.handleAddQuestion = this.handleAddQuestion.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
    this.handleQuestionChange = this.handleQuestionChange.bind(this)
    this.handleLoadConfig = this.handleLoadConfig.bind(this)
    this.handleConfigCreate = this.handleConfigCreate.bind(this)
    this.handleDeleteConfig = this.handleDeleteConfig.bind(this)

    this.state = {configs:[]}

    let query = parseQuery()
    if(query.config){
      this.loadConfig(query.config)
    }

    service.listConfigs()
      .then((result) => {
        this.setState({configs:result.configs})
      })
  }

  loadConfig(configID){
    service.loadConfig(configID)
      .then((result) => {
        this.setState({config:result.config, configID})
      })
  }

  handleLoadConfig(configID){
    // window.location.replace('/editor/?config=' + configID, false)
    this.loadConfig(configID)
  }

  handleConfigCreate(configID){
    service.createConfig(configID)
      .then((result) => {
        let cfgs = this.state.configs
        cfgs.push(configID)
        this.setState({configs:cfgs})
        this.loadConfig(configID)
      })
  }

  save(){
    console.log('TODO: Throttle this function');
    service.saveConfig(this.state.configID, {config:this.state.config})
  }

  handleAddQuestion(name){
    let questions = this.state.config.questions;
    questions.unshift({name, enabled:true})
    this.setState({config:{questions}}, () => {
      this.save()
    })
  }

  handleRemove(name){
    let questions = this.state.config.questions
    let index = questions.findIndex((q) => q.name === name)
    questions.splice(index, 1)
    this.setState({config:{questions}}, () => {
      this.save()  
    })
    
  }

  handleQuestionChange(data){
    let questions = this.state.config.questions;
    let index = questions.findIndex((q) => q.name === data.name)
    questions[index] = data
    this.save()
  }

  handleDeleteConfig(configID){
    service.deleteConfig(configID)
      .then((result) => {
        let cfgs = this.state.configs
        let index = cfgs.indexOf(configID)
        if(index !== - 1){
          cfgs.splice(index, 1)
          this.setState({configs:cfgs, config:null, configID:null})
        }
      })
  }

  render(){
    return (
      <div className='editor'>
        <div className='editor-menu'>
          <ConfigManager 
            configs={ this.state.configs }
            configID={ this.state.configID }
            onLoadConfig={ this.handleLoadConfig }
            onConfigCreate={ this.handleConfigCreate }
            onDeleteConfig={ this.handleDeleteConfig }
          />
          <hr/>
          <QuestionList config={ this.state.config } configID={ this.state.configID } onAddQuestion={ this.handleAddQuestion } />
        </div>
        <QuestionEditor 
          config={ this.state.config }
          configID={ this.state.configID }
          onChange={ this.handleQuestionChange }
          onRemove={ this.handleRemove }
        />
      </div>
    )    
  }
}

class ConfigManager extends React.Component {

  constructor(props){
    super(props)
    this.state = {configText:''}
    this.handleSelectConfig = this.handleSelectConfig.bind(this)
    this.handleConfigTextChange = this.handleConfigTextChange.bind(this)
    this.handleContextCreate = this.handleContextCreate.bind(this)
    this.handleDeleteConfig = this.handleDeleteConfig.bind(this)
  }

  handleSelectConfig(configID){
    if(this.props.onLoadConfig){
      this.props.onLoadConfig(configID)
    }
  }

  handleConfigTextChange(event){
    this.setState({configText:event.currentTarget.value})
  }

  handleContextCreate(){
    if(this.state.configText && this.state.configText !== '' && this.props.onConfigCreate){
      this.props.onConfigCreate(this.state.configText)
      this.setState({configText: ''})
    }
  }

  handleDeleteConfig(configID){
    if(this.props.onDeleteConfig){
      this.props.onDeleteConfig(configID)
    }
  }

  render(){
    return (
      <div className='config-manager'>
        <input type='text' onChange={ this.handleConfigTextChange } value={ this.state.configText }/>
        <br/>
        <button onClick={ this.handleContextCreate }>Create Configuration</button>
        <hr/>
        <ListConfigs 
          configs={ this.props.configs } 
          configID={ this.props.configID }
          onSelect={ this.handleSelectConfig }
          onDelete={ this.handleDeleteConfig }
        />
      </div>
    )
  }
}

class QuestionEditor extends React.Component {

  constructor(props){
    super(props)
    this.handleRemove = this.handleRemove.bind(this)
    this.handleQuestionChange = this.handleQuestionChange.bind(this)
  }

  handleRemove(questionName){
    if(this.props.onRemove){
      this.props.onRemove(questionName)
    }
  }

  handleQuestionChange(data){
    if(this.props.onChange){
      this.props.onChange(data)
    }
  }
  
  render(){
    if(!this.props.config){
      return <div className='loader'></div>
    }

    let questions = this.props.config.questions.map((q) => {
      let question = QUESTIONS.find((v) => v.name === q.name)
      return ({name:question.name, config:q, definition:question})
    })

    return (
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
    if(!this.props.config){
      return <div className='loader'></div>
    }

    let questions = QUESTIONS.sort((a, b) => {
      return a.difficultyLevel - b.difficultyLevel
    })

    let currentLevel = -1

    function renderLevelHeader(q){
      if(q.difficultyLevel === currentLevel){
        return null
      }
      else{
        currentLevel = q.difficultyLevel
        return <div className='question-level-header'>Level { currentLevel }</div>
      }
    }

    return (
      <div className='question-list'>
        <a className='generate-button' href={ '/generator/?config=' + this.props.configID + "&pages=5"} target='_blank'>Generate Questions</a>
        {
          questions.map((q) => {
            let exists = this.props.config.questions.findIndex((cq) => cq.name === q.name) !== -1
            return (
              <React.Fragment key={ q.name }>
                {
                  renderLevelHeader(q)
                }
                <div className='question-item'>
                  { q.title }
                  { exists ? <span className='checkmark'>{ String.fromCodePoint(0x2714) }</span> : <button className='add-button' onClick={ () => { this.handleAdd(q.name) }}>+</button>}
                </div>
              </React.Fragment>
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

  getLayoutClass(def){
    switch(def.layoutType){
      case c.questionShapes.SMALL_SQUARE: return 'small-square-editor'
      case c.questionShapes.TALL_RECT: return 'tall-rect-editor'
      case c.questionShapes.WIDE_RECT: return 'wide-rect-editor'
      case c.questionShapes.LARGE_SQUARE: return 'large-square-editor'
      case c.questionShapes.DOUBLE_LARGE_SQUARE: return 'double-large-square-editor'
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
        <div className={ this.getLayoutClass(def) + ' editor-question' }>
          {
            React.createElement(def.generator, this.state)
          }
        </div>
        <hr/>
      </div>
    )
  }
}

class ListConfigs extends React.Component {

  constructor(props){
    super(props)
    this.state = {selectedConfig:props.configID}
    this.handleSelectChange = this.handleSelectChange.bind(this)
    this.handleLoadConfig = this.handleLoadConfig.bind(this)
    this.handleDeleteConfig = this.handleDeleteConfig.bind(this)
  }

  handleLoadConfig(){
    if(this.state.selectedConfig && this.props.onSelect){
      this.props.onSelect(this.state.selectedConfig)
    }
  }

  handleSelectChange(event){
    console.log(event.currentTarget.value);
    this.setState({selectedConfig:event.currentTarget.value})
  }

  handleDeleteConfig(){
    if(this.state.selectedConfig && this.props.onDelete){
      this.props.onDelete(this.state.selectedConfig)
    }
  }

  render(){


    return (
      <div>
        <select onChange={ this.handleSelectChange } defaultValue={ this.state.selectedConfig }>
          <option key={ null } value={ null }></option>
          {
            this.props.configs.map((cfg) => {
              return <option key={ cfg } value={ cfg }>{ cfg }</option>
            })
          }
        </select>
        <br/>
        <button onClick={ this.handleLoadConfig }>Load Config</button>
        <button onClick={ this.handleDeleteConfig }>Delete Config</button>
      </div>
    )
  }
}

module.exports = Editor