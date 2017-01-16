import React, { PropTypes } from 'react';

function labeled(Comp) {
    function Label(props) {
        const required = props.schema.required;
        const requiredClassName = required ? 'required' : '';
        return (
            <div>
                <label //eslint-disable-line
                    className={`${props.schema.type}Field ${requiredClassName}`}
                >
                    <span className="title">{props.view.title || props.editKey}</span>
                    <Comp {...props} />
                    <span>{props.view.description}</span>
                    <span>{props.errorMessage}</span>
                </label>
            </div>
        );
    }

    Label.propTypes = {
        schema: PropTypes.shape({
            type: PropTypes.oneOfType([
                PropTypes.oneOf(['object', 'string', 'number', 'array', 'boolean']),
                PropTypes.arrayOf(
                    PropTypes.oneOf(['object', 'string', 'number', 'array', 'boolean', 'null'])
                )
            ]).isRequired,
            required: PropTypes.bool,
            description: PropTypes.string
        }).isRequired,
        editKey: PropTypes.string,
        view: PropTypes.shape({
            title: PropTypes.string,
            description: PropTypes.string
        }).isRequired,
        errorMessage: PropTypes.arrayOf(PropTypes.string)
    };
    Label.defaultProps = {
        editKey: '',
        errorMessage: []
    };
    return Label;
}

export default labeled;
