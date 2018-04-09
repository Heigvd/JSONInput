import * as React from 'react';
import validate from './../../Utils/customValidator';
import { getFormValue, getErrors } from '../../Store/actions';

import { Schema, Action } from '../../../typings/types';
import { ValidationError } from 'jsonschema/lib';

type Props = {
    schema: Schema;
    value?: any;
    dispatch: (action: Action, ...args: {}[]) => any;
    path: string[];
    onChange: (value: any, errors?: ValidationError[]) => void;
};

function validated<P extends Props>(
    Comp: React.ComponentType<P & { errorMessage?: string[] }>
) {
    function Validator(props: P) {
        function onChange(val: {}): void {
            const validation = validate(
                val,
                props.schema,
                props.dispatch(getFormValue)
            );
            props.onChange(val, validation.errors);
        }
        return (
            <Comp
                {...props}
                errorMessage={props.dispatch(getErrors, props.path)}
                onChange={onChange}
            />
        );
    }
    return Validator;
}

export default validated;
