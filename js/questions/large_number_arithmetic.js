import React from 'react'
import c from '../constants'
import rand from '../utils/rand'
import QuestionEditor from '../question_editor'
import CheckboxSet from '../checkbox_set'
import SimpleArithmetic from './simple_arithmetic'

class LargeNumberArithmeticGenerator extends SimpleArithmetic.generator {

  createEquation(ops){
    let frags = rand(ops)(this.props.minNumber, this.props.maxNumber)
    let mult = Math.pow(10, rand(1, 3))
    return (frags.left * mult) + ' ' + frags.operation + ' ' + (frags.right * mult) + ' = '
  }
}

class LargeNumberArithmeticEditor extends SimpleArithmetic.editor {

}

const LargeNumberArithmetic = {
  name: 'largeNumberArithmetic',
  title: 'Large Number Arithmetic',
  description: 'Practise arithmetic of larger numbers.',
  difficultyLevel: 4,
  layoutType: c.questionShapes.WIDE_RECT,
  generator: LargeNumberArithmeticGenerator,
  editor: LargeNumberArithmeticEditor,
}

module.exports = LargeNumberArithmetic