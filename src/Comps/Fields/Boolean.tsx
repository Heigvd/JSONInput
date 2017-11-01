import * as React from 'react';
import Widget from './Widget';
import validator from './../Decorators/validator';

import{ Schema, Action } from '../../../typings/types';

function BooleanField(
    props: {
        schema: Schema & { type: 'boolean' },
        editKey: string,
        path: string[],
        value: boolean,
        onChange: (value?: boolean) => void,
        dispatch: (action: Action, ...args: {}[]) => any,
    }
) {
    return <Widget {...(props)} />;
}

export default validator(BooleanField);
