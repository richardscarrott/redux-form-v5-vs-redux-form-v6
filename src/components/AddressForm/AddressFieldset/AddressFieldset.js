import React, { Component } from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import { Field } from 'redux-form';
import Input from '../Input/Input';

const styles = {
    root: {
        background: '#ccc',
        border: '1px solid black',
        padding: '30px',
        margin: '0 0 40px'
    }
};

class AddressFieldset extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        return shallowCompare(this, nextProps, nextState);
        // return true;
    }

    render() {
        const { name, legend } = this.props;
        // for (let i = 0; i < 100000000; i++) {}
        return (
            <fieldset style={styles.root}>
                <legend>{legend}</legend>
                <Field name={`${name}.title`} component={Input} />
                <Field name={`${name}.firstName`} component={Input} />
                <Field name={`${name}.lastName`} component={Input} />
                <Field name={`${name}.line1`} component={Input} />
                <Field name={`${name}.line2`} component={Input} />
                <Field name={`${name}.line3`} component={Input} />
                <Field name={`${name}.city`} component={Input} />
                <Field name={`${name}.state`} component={Input} />
                <Field name={`${name}.postcode`} component={Input} />
                <Field name={`${name}.country`} component={Input} />
            </fieldset>
        );
    }

}

export default AddressFieldset;
