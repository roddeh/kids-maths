import React from 'react'
import c from '../constants'
import doTimes from '../do_times'
import pad from '../pad'
import rand from '../rand'

class VerticalAddition extends React.Component {

  render(){
    let config = this.props;
    let numDigits = config.numDigits;

    let max = Math.pow(10, numDigits) - 1;
    let top = String(rand(0, max));
    let bottom = String(rand(0, max));

    return (
      <div className='simple-vertical-addition'>
        {pad(2 + numDigits - top.length) + top }
        <br/>
        { '+' + pad(1 + numDigits - bottom.length) + bottom }
        <br/>
        {
          doTimes(numDigits + 2, () => { return '‾'}).join('')
        }
      </div>
    )    
  }
}

VerticalAddition.layoutType = c.questionShapes.SMALL_SQUARE;

VerticalAddition.defaultProps = {
  numDigits: 3,
}

module.exports = VerticalAddition
