import React from 'react'
import c from '../constants'
import rand from '../utils/rand'
import emoji from '../utils/emoji'
import doTimes from '../utils/do_times'
import QuestionEditor from '../question_editor'

const defaultProps = {
  maxGroups:4,
  minSymbols:2,
  maxSymbols:8
}

class MultiplicationWithIconsGenerator extends React.Component {

  render(){
    let groups = rand(2, this.props.maxGroups);
    let iconCount = rand(this.props.minSymbols, this.props.maxSymbols);
    let icon = rand(emoji);

    function makeIcons(icon, num){
      return (
        <div className='icons'>
          {
            doTimes(num, (i) => {
              return <React.Fragment key={ i }>{ icon }</React.Fragment>
            })
          }
        </div>
      )
    }


    return (
      <div className='multiplication-with-icons'>
        {
          doTimes(groups, (i) => {
            return (
              <div className='group' key={ i }>
                { makeIcons(icon, iconCount) }
              </div>
            )
          })
        }
      </div>
    )
  }
}

MultiplicationWithIconsGenerator.defaultProps = defaultProps

class MultiplicationWithIconsEditor extends QuestionEditor {

  render(){
    return (
      <div className='editor-form'>
        <label>Group Maximum:</label>
        <input type='range' name='maxGroups' min='2' max='6' step='1' value={ this.state.maxGroups } onChange={ this.handleRangeChange }></input>
        <label>{ this.state.maxGroups }</label>
        <br/>
        <label>Symbol Minimum:</label>
        <input type='range' name='minSymbols' min='1' max='5' step='1' value={ this.state.minSymbols } onChange={ this.handleRangeChange }></input>
        <label>{ this.state.minSymbols }</label>
        <br/>
        <label>Symbol Maximum:</label>
        <input type='range' name='maxSymbols' min='5' max='12' step='1' value={ this.state.maxSymbols } onChange={ this.handleRangeChange }></input>
        <label>{ this.state.maxSymbols }</label>
        <br/>
        
      </div>
    )
  }
}

MultiplicationWithIconsEditor.defaultProps = defaultProps

const MultiplicationWithIcons = {
  name: 'multiplicationWithIcons',
  title: 'Multiplication with Icons',
  description: 'Learn the basics of multiplication by grouping symbols together.',
  difficultyLevel:4,
  layoutType: c.questionShapes.LARGE_SQUARE,
  generator: MultiplicationWithIconsGenerator,
  editor: MultiplicationWithIconsEditor,
}

module.exports = MultiplicationWithIcons