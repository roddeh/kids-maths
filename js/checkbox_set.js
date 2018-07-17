import React from 'react'

class CheckboxSet extends React.Component {

  constructor(props){
    super(props)
    this.state = {value: props.value}
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event){
    let ct = event.currentTarget
    let currentValues = this.state.value
    let index = currentValues.indexOf(ct.value)
    if(ct.checked){
      if(index === -1){
        currentValues.push(ct.value)
      }
    }
    else{
      if(index !== -1){
        currentValues.splice(index, 1)
      }
    }
    this.setState({value:currentValues}, () => { 
      if(this.props.onChange){
        this.props.onChange(this.state.value)
      }
    })
  }

  render(){
    return (
      <div className='checkbox-set'>
        {
          this.props.options.map((op, i) => {
            let checked = this.state.value.indexOf(op.value) !== -1
            return (
              <div key={ i } className='checkbox-set-option'>
                <label>{ op.label }</label>
                <input type='checkbox' value={ op.value } defaultChecked={ checked } onChange={ this.handleChange }></input>   
              </div>
            )
          })
        }
      </div>
    )
  }
}

module.exports = CheckboxSet

