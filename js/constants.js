let constants = {
  questionShapes:{
    SMALL_SQUARE: 1,
    TALL_RECT: 2,
    WIDE_RECT: 4,
    LARGE_SQUARE: 8,
    DOUBLE_LARGE_SQUARE: 16,
  },

  gender:{
  	MALE:'m',
  	FEMALE:'f',
  },

  operations:{
    ADDITION: '+',
    SUBTRACTION: '-',
    MULTIPLICATION: String.fromCodePoint(215),
    DIVISION: String.fromCodePoint(0x00F7),
    EQUALS: '=',
  }

}

constants.operationsWithLabels = [
  {label:'Addition', value: constants.operations.ADDITION},
  {label:'Subtraction', value: constants.operations.SUBTRACTION},
  {label:'Multiplication', value: constants.operations.MULTIPLICATION},
  {label:'Division', value: constants.operations.DIVISION},
]

constants.operationsArray = [
  constants.operations.ADDITION,
  constants.operations.SUBTRACTION,
  constants.operations.MULTIPLICATION,
  constants.operations.DIVISION
]

module.exports = constants;