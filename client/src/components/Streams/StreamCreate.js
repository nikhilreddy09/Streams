import React from 'react';
import {Field, reduxForm} from 'redux-form'

class StreamCreate extends React.Component {

    renderError({error,touched}){
        if(touched && error) {
            return (
                <div className="ui error message">
                    <div className="header">{error}</div>
                </div>
            )
        }
    }

    renderInput = ({label,input, meta}) => {

        const className = `field ${meta.error && meta.touched ? 'error' : ''}`
        // the ... formprops.input adds all the key value pairs such as value and onchange as props to the input tag.
        return (
            <div className={className}>
                <label>{label}</label>
                <input {...input} autoComplete="off" />
                {this.renderError(meta)}
            </div>
        )
    }

    onSubmit(formValues) {
        console.log(formValues)
    }


    render() {
        console.log(this.props)
        return (
            <form className="ui form error" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                <Field name="title" component={this.renderInput} label="Enter Title" />
                <Field name="description" component={this.renderInput} label="Enter Description" />
                <button className="ui button primary">Submit</button>
            </form>
        )
    }
}

const validate = (formValues) => {
    const errors = {};
    if(!formValues.title) {
        errors.title = 'You must enter a title';
    }
    if(!formValues.description) {
        errors.description = 'You must enter a descripion'
    }
    return errors;
}

//get the redux form and use it as connect which has an object of form
export default reduxForm({
    form: 'streamCreate',
    validate
})(StreamCreate); 