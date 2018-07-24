import React from 'react'
import c from '../constants'
import doTimes from '../utils/do_times'
import pad from '../utils/pad'
import rand from '../utils/rand'
import shallowClone from '../utils/shallow_clone'
import zerosToSpace from '../utils/zeros_to_space'
import QuestionEditor from '../question_editor'

const defaultProps = {
  minNumber: 1,
  maxNumber: 8,
}

class ChainedArithmeticGenerator extends React.Component {

  render(){

    let min = this.props.minNumber;
    let max = this.props.maxNumber;

    const SUB = ' - ';
    const ADD = ' + ';
    const ops = [SUB, ADD];


    function makeChain(){
      let runningTotal = rand(min, max);

      let str = '' + runningTotal;

      doTimes(3, () => {
        let op = (runningTotal === 0) ? ADD : rand(ops);
        let num;
        if(op === SUB){
          num = rand(min, Math.min(max, runningTotal));
          runningTotal -= num;
        }
        else{
          num = rand(min, max);
          runningTotal += num;
        }
        
        str += op + num;
      })

      return str + ' =';
    }

    return (
      <div className="simple-addition">
      {
        doTimes(3, (i) => { 
          return (
            <React.Fragment key={ i }>
              <span>{ makeChain() }</span>
              <br/>
            </React.Fragment>
          )
        })
      }
      </div>
    )   
  }
}

ChainedArithmeticGenerator.defaultProps = defaultProps;

class ChainedArithmeticEditor extends QuestionEditor {

  render(){
    return (
      <div className='editor-form'>
        { this.renderMinMaxRange(1, 5, 5, 16) }
      </div>
    )
  }
}

ChainedArithmeticEditor.defaultProps = defaultProps;

const ChainedArithmetic = {
  name: 'chainedArithmetic',
  title: 'Chained Arithmetic',
  description: 'Practise basic arithmetic with a sequence of addition and subtraction of numbers',
  difficultyLevel:2,
  layoutType: c.questionShapes.WIDE_RECT,
  generator: ChainedArithmeticGenerator,
  editor: ChainedArithmeticEditor,
}

module.exports = ChainedArithmetic