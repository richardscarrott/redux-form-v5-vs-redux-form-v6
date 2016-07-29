import React, { Component } from 'react';
import classNames from 'classNames';
import shallowCompare from 'react-addons-shallow-compare';

class Input extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        // return shallowCompare(this, nextProps, nextState);
        return true;
    }

    render() {
        const { field } = this.props;
        const { type, field: { touched, error, name }, ...other } = this.props;
        const hasError = touched && error;
        return (
            <div {...other} className={classNames('form-group', {
                'has-error': hasError
            })}>
                <label htmlFor={name}>{name}</label>
                <input type={type} placeholder={name} className="form-control" {...field} />
                {hasError && <p className="help-block">{error}</p>}
            </div>
        );
    }

}

Input.defaultProps = {
    type: 'text'
};

export default Input;
