import React, { Component } from 'react';
import shallowCompare from 'react-addons-shallow-compare';
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
        const { legend, title, firstName, lastName, line1, line2, line3, city, state,
            postcode, country } = this.props;
        // for (let i = 0; i < 100000000; i++) {}
        return (
            <fieldset style={styles.root}>
                <legend>{legend}</legend>
                <Input field={title} />
                <Input field={firstName} />
                <Input field={lastName} />
                <Input field={line1} />
                <Input field={line2} />
                <Input field={line3} />
                <Input field={city} />
                <Input field={state} />
                <Input field={postcode} />
                <Input field={country} />
            </fieldset>
        );
    }

}

export default AddressFieldset;
