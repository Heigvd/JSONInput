// @flow
import React from 'react';
import infer from './../../Utils/infer';
import type { Schema, Action } from '../../types.js.flow';
/**
 * Update store's value path.
 * @param {Array<string>} currentValuePath the valuePath the parent
 * @param {string} editKey the key currently edited
 * @returns {Array<string>}the updated valuePath
 */
function updatePath(currentPath: string[], editKey?: string): string[] {
    if (editKey) {
        return currentPath.concat([editKey]);
    }
    return currentPath;
}
type Props = {
    path: string[],
    editKey?: string,
    value?: mixed,
    schema: Schema,
    actions: {
        [string]: Action,
        updateSchema: Action
    }
};

/**
 * HOC, compute schema value from inferred type if schema is missing
 * @param {React.Component} Comp component to decorate.
 * @return {React.Component} the decorated component.
 */
function inference<P: Props>(
    Comp: Class<React.Component<*, P, *>> | ((props: P) => ?React.Element<*>)
): * {
    class Infer extends React.Component<void, P, { schema: Schema }> {
        state: {
            schema: Schema
        };
        constructor(props: P) {
            super(props);
            const { schema } = props;
            let inferedSchema = schema;
            if (!inferedSchema || !('type' in inferedSchema)) {
                inferedSchema = { type: infer(props.value) };
            }
            this.state = { schema: inferedSchema };
        }
        componentWillReceiveProps(nextProps: P) {
            if (this.props.schema !== nextProps.schema) {
                let inferedSchema = nextProps.schema;
                if (!inferedSchema || !('type' in inferedSchema)) {
                    inferedSchema = { type: infer(nextProps.value) };
                }
                this.setState(() => ({ schema: inferedSchema }));
            }
        }
        render() {
            const path = updatePath(this.props.path, this.props.editKey);
            return (
                <Comp {...this.props} path={path} schema={this.state.schema} />
            );
        }
    }
    return Infer;
}

export default inference;
