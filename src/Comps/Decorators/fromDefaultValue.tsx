import * as React from 'react';
import { cloneDeep } from 'lodash-es';
import { setDefaultValue } from '../../Store/actions';
import { Action, Schema } from '../../../typings/types';

export type Props = {
  editKey?: string;
  path: string[];
  status: {
    $$$state?: string;
  };
  value?: {};
  schema: Schema;
  dispatch: (action: Action, ...args: ({} | undefined)[]) => any;
};
function updateDefault({
  value,
  schema: { value: defaultValue },
  dispatch,
  path,
}: Props) {
  const val = value !== undefined ? value : cloneDeep(defaultValue);
  if (val !== value) {
    dispatch(setDefaultValue, path, val);
  }
  return val;
}

function fromDefaultValue<P extends Props>(
  Comp: React.ComponentClass<P> | React.SFC<P>,
) {
  class DefaultValue extends React.Component<P, { val?: {}; init: boolean }> {
    static getDerivedStateFromProps(nextProps: P, state: { init: boolean }) {
      if (state.init) {
        return { init: false };
      }
      return {
        val: nextProps.value,
      };
    }
    state = { val: updateDefault(this.props), init: true };
    render() {
      return <Comp {...this.props} value={this.state.val} />;
    }
  }

  return DefaultValue;
}

export default fromDefaultValue;
