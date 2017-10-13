import { ValidationError } from 'jsonschema/lib';

/*
Every tree should be of type Baobab
*/
const VALUE = 'value';
const STATUS = 'status';
const STATE = 'state';
const ERRORS = 'errors';
const NO_ERRORS: string[] = [];

function setErrors(tree: any, path: string[] = [], errors: string[]) {
    const errorPath = [STATUS].concat(path).concat([ERRORS]);
    const errorsCursor = tree.select(errorPath);
    if (errors && errors.length && Array.isArray(errorsCursor.get())) {
        errorsCursor.splice([0, errorsCursor.get().length]);
        errorsCursor.concat(errors || []);
    } else {
        errorsCursor.set(errors || NO_ERRORS);
    }
}
export function setValidationErrors(
    tree: any,
    path: string[] = [],
    errors: ValidationError[]
) {
    const errorMap = new Map<string, string[]>();
    // Collect each error associated with a given path
    errors.forEach(error => {
        const errors = errorMap.get(error.property) || [];
        errors.push(error.message); // Add new error
        errorMap.set(error.property, errors);
    });
    setErrors(tree, path, NO_ERRORS);
    errorMap.forEach((value, key) => {
        setErrors(
            tree,
            path.concat(
                key
                    .split(/\.|\[|\]/)
                    .filter(x => x !== '')
                    .slice(1)
            ),
            value
        );
    });
}

/**
 * Update a value in the tree
 *
 * @param {Baobab} tree the tree
 * @param {Array<string>} path path's value to update
 * @param value value to set
 * @param {Array<string>} errors errors relative to the value
 */
export function update(
    tree: any,
    path: string[] = [],
    value: {},
    errors: ValidationError[]
) {
    const statusPath = [STATUS].concat(path);
    tree.set([VALUE].concat(path), value);
    tree.set(statusPath.concat([STATE]), 'dirty');
    setValidationErrors(tree, path, errors);
}

export function setDefaultValue(tree: any, path: string[] = [], value: {}) {
    tree.set([VALUE].concat(path), value);
    tree.set([STATUS].concat(path).concat([STATE]), 'pristine');
}

export function getStatus(tree: any, path: string[] = []) {
    const statePath = [STATUS].concat(path).concat([STATE]);
    if (tree.exists(statePath)) {
        return tree.get([STATUS].concat(path).concat([STATE]));
    }
    return undefined;
}

export function getErrors(tree: any, path: string[] = []) {
    return tree.get([STATUS].concat(path).concat([ERRORS])) || NO_ERRORS;
}

export function getFormValue(tree: any) {
    return tree.get(VALUE);
}
