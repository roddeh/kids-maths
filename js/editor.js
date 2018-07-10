import React from 'react'

import VerticalAddition from './questions/vertical_addition'
import AdditionWithIcons from './questions/addition_with_icons'
import AngleTypes from './questions/angle_types'
import ArithmeticPyramid from './questions/arithmetic_pyramid'

import shallowClone from './shallow_clone'

class Editor extends React.Component {




  render(){

    // let questions = [
    //   {
    //     // config:{numDigits:1},
    //     definition: VerticalAddition
    //   },
    //   // {
    //   //   definition: AdditionWithIcons
    //   // },
    //   // {
    //   //   definition: AngleTypes
    //   // },
    //   // {
    //   //   definition: ArithmeticPyramid
    //   // }
    // ]

    let questionDefinitions = [
      VerticalAddition,
      AdditionWithIcons,
    ]

    let config = {
      questions:{
        "verticalAddition":{"numDigits":4, carryOver:false},
        "additionWithIcons":{"minNumber":3, "maxNumber":12, includeTraceNumbers:true},
      }
    }

    let questions = []

    for(let key in config.questions){
      let cfg = config.questions[key];

      let question = questionDefinitions.find((v) => v.name === key)

      if(question){
        questions.push({config: cfg, definition: question})
      }
    }

    return (
      <div className='editor'>
        {
          questions.map((question, i) => {
            return (
              <EditorQuestion key={ i } definition={ question.definition } config={ question.config }/>
            )
          })
        }
      </div>
    )    
  }
}

class EditorQuestion extends React.Component {

  constructor(props){
    super(props)
    this.state = shallowClone(this.props.config)
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(config){
    this.setState(config)
  }

  render(){
    let def = this.props.definition
    return (
      <div className='editor-question'>
        <h1>{ def.title }</h1>
        <p>{ def.description }</p>
        {
          React.createElement(def.editor, {config:this.state, onChange:this.handleChange})
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