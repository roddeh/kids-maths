import React from 'react'
import c from '../constants'
import rand from '../utils/rand'
import QuestionEditor from '../question_editor'

const defaultProps = {
  distanceUnit:'km',
  timeUnit:'hours',
  speedUnit:'km/h',
}

class TimeDistanceSpeedGenerator extends React.Component {

  render(){

    function distanceTravelled(){
      let speed = rand(1, 9) * 10;
      let time = rand(2, 8);
      return (
        <React.Fragment>
          A train is travelling at <strong>{ speed + this.props.speedUnit }</strong> for <strong>{ time + this.props.timeUnit }</strong>, how far has the train travelled?
        </React.Fragment>
      )
    }

    function timeTaken(){
      let speed = rand(1, 9) * 10;
      let distance = rand(2, 9) * speed;
      return (
        <React.Fragment>
          A train has travelled <strong>{ distance + this.props.distanceUnit }</strong> at <strong>{ speed + this.props.speedUnit }</strong>, how long did the train take to travel the distance?
        </React.Fragment>
      )
    }

    function speedRequired(){
      let time = rand(2, 9)
      let distance = rand(2, 9) * 10 * time;
      return (
        <React.Fragment>
          A train needs to travel <strong>{ distance + this.props.distanceUnit }</strong> in <strong>{ time + ' ' + this.props.timeUnit }</strong>, how fast does the train need to travel?
        </React.Fragment>
      )
    }

    return (
      <div className='time-distance-speed text-question'>
        { rand([distanceTravelled, timeTaken, speedRequired]).apply(this) }
      </div>
    )
  }
}

TimeDistanceSpeedGenerator.defaultProps = defaultProps

class TimeDistanceSpeedEditor extends QuestionEditor {

  render(){
    return (
      <div className='editor-form'>
        <label>Distance Unit:</label>
        <input type='text' name='distanceUnit' value={ this.state.distanceUnit } onChange={ this.handleTextInputChange }></input>
        <br/>
        <label>Time Unit:</label>
        <input type='text' name='timeUnit' value={ this.state.timeUnit } onChange={ this.handleTextInputChange }></input>
        <br/>
        <label>Speed Unit:</label>
        <input type='text' name='speedUnit' value={ this.state.speedUnit } onChange={ this.handleTextInputChange }></input>
      </div>
    )
  }
}

TimeDistanceSpeedEditor.defaultProps = defaultProps

const TimeDistanceSpeed = {
  name: 'timeDistanceSpeed',
  title: 'Time Distance Speed',
  description: 'Practise arithmetic in the context of time, distance and speed',
  difficultyLevel:7,
  layoutType: c.questionShapes.WIDE_RECT,
  generator: TimeDistanceSpeedGenerator,
  editor: TimeDistanceSpeedEditor,
}

module.exports = TimeDistanceSpeed