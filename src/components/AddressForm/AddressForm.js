import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import memoize from 'memoizejs';
import AddressFieldset from './AddressFieldset/AddressFieldset';

const ADDRESS_COUNT = 40;

// function getFields() {
//     const fields = [];
//     for (let i = 1; i <= ADDRESS_COUNT; i++) {
//         fields.push(
//             `address${i}.title`,
//             `address${i}.firstName`,
//             `address${i}.lastName`,
//             `address${i}.line1`,
//             `address${i}.line2`,
//             `address${i}.line3`,
//             `address${i}.city`,
//             `address${i}.state`,
//             `address${i}.postcode`,
//             `address${i}.country`
//         );
//     }
//     return fields;
// }

class AddressForm extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(state) {
        console.log(state)
    }

    render() {
        const { handleSubmit } = this.props;
        // console.log('FORM RENDER')
        return (
            <form onSubmit={handleSubmit(this.handleSubmit)}>
                <div className="row">
                    {this.renderAddressFieldsets()}
                </div>
                <button type="submit" className="btn btn-primary btn-block">
                    Submit
                </button>
            </form>
        );
    }

    renderAddressFieldsets() {
        const fieldsets = [];
        for (let i = 1; i <= ADDRESS_COUNT; i++) {
            const name = `address${i}`;
            fieldsets.push(
                <div className="col-xs-6 col-md-4">
                    <AddressFieldset name={name} legend={name} key={name} />
                </div>
            );
        }
        return fieldsets;
    }

}

AddressForm.propTypes = {
    foo: PropTypes.string.isRequired
};

function validateAddress(address) {
    return Object.keys(address)
        .reduce((errors, field) => {
            if (!address[field]) {
                errors[field] = `${field} is required`;
            }
            return errors;
        }, {});
}

// It's not slow enough for this to be beneficial.
// validateAddress = memoize(validateAddress);

// Validate could potentially contribute to poor performance on large forms as
// even if the render is optimised by `shouldComponentUpdate` this will still
// need to iterate as many times as there are fields.
// I wonder if there'd be anything wrong with running the value through a validate
// function during render of an individual input, i.e. `validateAddress1Title`.
// Or pass `reduxForm` an object of validators, e.g. { address1: { title: () => {}, ... } }

// NOTE: Validation doesn't currently work in v6 as if a field has no value it simply
// doesn't exist on the form `state` which unfortuantely this 'dynamic' validation
// currently relies on...this means v6 has an unfair advantage but results seem
// to suggest it still can't be as well tuned as v5.
function validate(state) {
    // console.time('validate')
    // for (let i = 0; i < 100000000; i++) {}
    const errors = Object.keys(state)
        .reduce((errors, address) => {
            const err = validateAddress(state[address]);
            if (Object.keys(err)) {
                errors[address] = err;
            }
            return errors;
        }, {});
    // console.timeEnd('validate')
    return errors;
}

export default reduxForm({
    form: 'addressForm',
    // fields: getFields(),
    validate
})(AddressForm);
