import React, { PropTypes } from 'react';
import validate from '../Decorators/validator.jsx';
import StringField from './String.jsx';

class NumberField extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.value
        };
        this.boundChange = this.onChange.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        if (this.state.value - nextProps.value) { // if values differ: update
            this.setState({
                value: nextProps.value
            });
        }
    }
    onChange(val) {
        const numVal = Number(val);
        this.setState({
            value: val
        }, () => this.props.onChange(isNaN(numVal) ? val : numVal));
    }
    render() {
        return (<StringField {...this.props}
                             value={ this.state.value }
                             onChange={ this.boundChange } />);
    }
}
NumberField.propTypes = {
    value: PropTypes.number,
    onChange: PropTypes.func.isRequired
};

export default validate(NumberField);
