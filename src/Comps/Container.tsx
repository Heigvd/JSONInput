import * as React from 'react';
import { Store } from '../Store/index';
import SchemaType from './SchemaType';
import validate from './../Utils/customValidator';
import { setValidationErrors } from '../Store/actions';

import { Schema } from '../../typings/types';

const EMPTY_ARRAY: any[] = [];

export type Props = {
  onChange: (value: {} | undefined, errors: {}[]) => void;
  schema: Schema;
  context?: {};
  value?: {};
};
/**
 * Top Component
 */
class Container extends React.Component<Props> {
  store: Store | null = null;
  static defaultProps = { schema: {} };
  getValue() {
    return this.store!.state.value;
  }
  update = (value: {} | undefined) => {
    this.props.onChange(
      value,
      validate(value, this.props['schema'], value).errors,
    );
  };
  validate() {
    const validationResult = validate(
      this.store!.state.value,
      this.store!.state.schema,
      this.store!.state.value,
    );
    this.store!.dispatch(setValidationErrors, [], validationResult.errors);
    return validationResult.errors;
  }
  render() {
    return (
      <Store
        ref={s => {
          this.store = s;
        }}
        value={this.props.value}
        schema={this.props.schema}
        context={this.props.context}
        onValueChange={this.update}
      >
        {({ schema, value, status, dispatch, context}) => (
          <SchemaType
            schema={schema}
            context={context}
            dispatch={dispatch}
            value={value}
            path={EMPTY_ARRAY}
            status={status}
          />
        )}
      </Store>
    );
  }
}

export default Container;
