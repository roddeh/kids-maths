import React from 'react'
import c from '../constants'
import rand from '../utils/rand'
import doTimes from '../utils/do_times'
import QuestionEditor from '../question_editor'

const defaultProps = {
  minNumber: 1,
  maxNumber: 8,
}

const SUB = '-'
const ADD = '+'
const MUL = String.fromCodePoint(215)
const DIV = String.fromCodePoint(0x00F7)
const ops = [SUB, ADD, MUL, DIV]


class OrderOfOperationsGenerator extends React.Component {

  render(){

    let min = this.props.minNumber
    let max = this.props.maxNumber 

    function twoHalves(){
      function makePiece(){
        let op = rand(ops);
        let l = rand(min, max);
        let r = rand(min, max);
        if(op === DIV){
          l = l * r;
        }
        return l + ' ' + op + ' ' + r;
      }

      let left = makePiece();
      let right = makePiece();
      return left + ' ' + rand([SUB, ADD]) + ' ' + right + ' = ';
    }

    function brackets(){
      function makeBracket(){
        return '(' + rand(min, max) + ' ' + rand([SUB, ADD]) + ' ' + rand(min, max) + ')';
      }

      if(rand(0, 1) === 0){
        return makeBracket() + ' ' + MUL + ' ' + makeBracket() + ' = ';
      }
      else{
        return rand(min, max) + ' ' + rand([SUB, ADD, MUL]) + ' ' + makeBracket() + ' ' + rand([SUB, ADD, MUL]) + ' ' + rand(min, max)  + ' = ';
      }
    }  

    return (
      <div className='order-of-operations'>
        {
          doTimes(3, (i) => { 
            return (
              <React.Fragment key={ i }>
                { rand([twoHalves, brackets]).apply() }
                <br/>
              </React.Fragment>
            )
          })
        }
      </div>
    )
  }
}

OrderOfOperationsGenerator.defaultProps = defaultProps

class OrderOfOperationsEditor extends QuestionEditor {

  render(){
    return (
      <div className='editor-form'>
        { this.renderMinMaxRange(1, 5, 5, 16) }
      </div>
    )
  }
}

OrderOfOperationsEditor.defaultProps = defaultProps

const OrderOfOperations = {
  name: 'orderOfOperations',
  title: 'Order of Operations',
  description: 'Practise using arithmetic that requires understanding of the order of operations.',
  difficultyLevel:0,
  layoutType: c.questionShapes.WIDE_RECT,
  generator: OrderOfOperationsGenerator,
  editor: OrderOfOperationsEditor,
}

module.exports = OrderOfOperations