import * as React from 'react';
import immer, { Immutable } from 'immer';

interface StoreProps {
  value?: {};
  schema: {};
  context?: {};
  onValueChange: (value: {}) => void;
  children: (props: {
    dispatch: (
      action: (state: any, ...extraArgs: any[]) => void,
      ...args: any[]
    ) => void;
    schema: {};
    value: {};
    status: {};
    context?: {};
  }) => JSX.Element;
}
export interface FormContext {
  value: Immutable<{}> | undefined | null;
  schema: {};
  context: {};
  status: {};
}
const FormContext = React.createContext<FormContext>({
  value: undefined,
  schema: {},
  context: {},
  status: {},
});
export const FormConsumer = FormContext.Consumer;
export class Store extends React.Component<StoreProps> {
  readonly state = {
    schema: {},
    value: {},
    extValue: {},
    status: {},
    context: {},
    oldProps: {},
  };
  static getDerivedStateFromProps(
    nextProps: StoreProps,
    state: {
      schema: {};
      value: {};
      status: {};
      context: {},
      oldProps: StoreProps;
      extValue: {} | undefined;
    },
  ) {
    if (state.oldProps !== nextProps) {
      const ret: Partial<typeof Store.prototype.state> = {
        value: nextProps.value,
        schema: nextProps.schema,
        context: nextProps.context,
        oldProps: nextProps,
      };
      if (nextProps.value !== state.extValue) {
        ret.status = {};
        ret.extValue = nextProps.value;
      }
      return ret;
    }
    return null;
  }
  dispatch = (
    action: (state: any, ...extraArgs: any[]) => void,
    ...args: any[]
  ) => {
    this.setState(prevState => {
      return (immer(action) as (state: any, ...extraArgs: any[]) => any)(
        prevState,
        ...args,
      );
    });
  };
  shouldComponentUpdate(nextProps: any, nextState: any) {
    return this.state !== nextState;
  }
  componentDidUpdate(prevProps: StoreProps, prevState: { value: {} }) {
    if (
      this.state.value !== prevState.value &&
      // This is not an update due to a props change.
      this.props.value === prevProps.value
    ) {
      const extValue = this.state.value;
      this.setState({ extValue }, () => this.props.onValueChange(extValue));
    }
  }
  render() {
    const { schema, value, status, context } = this.state;
    const cloneValue =
      value != null ? JSON.parse(JSON.stringify(value)) : value;
    return (
      <FormContext.Provider
        value={{
          schema,
          value: cloneValue,
          context,
          status,
        }}
      >
        {this.props.children({
          schema,
          value: cloneValue,
          status,
          context,
          dispatch: this.dispatch,
        })}
      </FormContext.Provider>
    );
  }
}
