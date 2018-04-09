import * as React from 'react';
import Widget from './Widget';
import validator from '../Decorators/validator';

import { Schema, Action } from '../../../typings/types';

type Props = {
    schema: Schema & { type: 'number' | 'string' };
    value?: number | string;
    editKey: string;
    path: string[];
    onChange: (value: string | number) => void;
    dispatch: (action: Action, ...args: {}[]) => any;
};

function StringField(props: Props) {
    return <Widget {...props} />;
}

export { StringField as SimpleStringField };
export default validator<Props>(StringField);
