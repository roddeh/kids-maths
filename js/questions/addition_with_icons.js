import React from 'react'
import c from '../constants'
import doTimes from '../do_times'
import rand from '../rand'
import emoji from '../emoji'

class AdditionWithIcons extends React.Component {

  render(){
    let config = this.props;

    let icon = rand(emoji)
    let left = rand(config.minNumber, config.maxNumber)
    let right = rand(config.minNumber, config.maxNumber)

    function makeTop(){
      return (
        <span>
          { makeIcons(icon, left) }
          <span className='operator'>+</span>
          { makeIcons(icon, right) }
          <span className='operator'>=</span>
        </span>
      )
    }

    function makeBottom(){
      if(config.includeTraceNumbers){
        return (
          <span>
            <span className='trace-number'>{ left }</span>
            { makeOp('+') }
            <span className='trace-number'>{ right }</span>
            { makeOp('\x3D\xA0')}
          </span>
        )
      }
      else{
        return (
          <span>
            { makeIcons('\xA0', 12) }
            { makeOp('+') }
            { makeIcons('\xA0', 12) }
            { makeOp('\x3D') }
          </span>
        )
      }
    }

    function makeOp(op){
      return <span className='operator'>{ op }</span>
    }

    function makeIcons(icon, num){      
      return <div className='icons'>
        { doTimes(num, () => { return icon }).join('') }
      </div>
    }

    return (
      <div className='addition-with-icons'>
        { makeTop() }
        <br/>
        { makeBottom() }
        <span className='spacer'/>
      </div>
    )
  }
}

AdditionWithIcons.layoutType = c.questionShapes.WIDE_RECT;

AdditionWithIcons.defaultProps = {
  minNumber: 1,
  maxNumber: 12,
  includeTraceNumbers:false,
}

module.exports = AdditionWithIcons