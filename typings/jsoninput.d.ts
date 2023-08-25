import * as React from 'react';
import { Schema } from './types';
import { ValidationError } from 'jsonschema/lib';

type WidgetMap = {
  [key: string]: React.ComponentType<any>;
};
export function setDefaultWidgets(map: WidgetMap): void;

declare class Form extends React.Component<
  {
    schema?: {};
    value?: {};
    onChange: (value: any, errors: ValidationError[]) => void;
    /**
     *  context - This attribute is used to give the form input value to embedded components in the form.
     *  Important : If you make components that make use of context, throw error if context is missing in order to understand a misusage of the component. 
     */
    context?: {};
  },
  any
> {
  /**
   * Retrieve current form's value
   */
  getValue: () => {} | void;
  /**
   * Validate the entire form and pass errors down to views
   *
   */
  validate: () => ValidationError[];
}
export { Schema };
export default Form;
