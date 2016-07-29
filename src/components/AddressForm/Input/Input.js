import React, { Component } from 'react';
import classNames from 'classNames';
import shallowCompare from 'react-addons-shallow-compare';

class Input extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        // return shallowCompare(this, nextProps, nextState);
        return true;
    }

    render() {
        const { input } = this.props;
        const { type, touched, error, input: { name }, ...other } = this.props;
        const hasError = touched && error;
        // debugger
        return (
            <div {...other} className={classNames('form-group', {
                'has-error': hasError
            })}>
                <label htmlFor={name}>{name}</label>
                <input type={type} placeholder={name} name={name} className="form-control" {...input} />
                {hasError && <p className="help-block">{error}</p>}
            </div>
        );
    }

}

Input.defaultProps = {
    type: 'text'
};

export default Input;
