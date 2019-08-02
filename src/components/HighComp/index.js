import React, { Component } from 'react'
// import PropTypes from 'prop-types'

wrapWithLoadData =  (BoxComponent, name) => {
    class NewComponent extends Component {
        constructor () {
            super()
            this.state={
                data: null
            }
        }
        componentWillMount () {
            let data = localStorage.getItem(name)
            this.setState({data})
        }

        render () {
            return <BoxComponent data={this.state.data} />
        }
    }
    return NewComponent
} 


class InputWithName extends Component {
    render() {
        return <input type="text" value={this.props.data} />
    }
}

InputWithName = wrapWithLoadData(InputWithName, 'username')

export default InputWithName