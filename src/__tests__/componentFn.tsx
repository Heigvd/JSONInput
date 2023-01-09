import * as React from 'react';
import { act } from 'react-dom/test-utils';
import { render, cleanup } from '@testing-library/react';
import defaultViews from '../Comps/Views';
import Container, { setDefaultWidgets } from '../index';

describe('Form functions', () => {
  beforeAll(() => {
    setDefaultWidgets(defaultViews as any);
  });
  afterEach(cleanup);
  test('Get current value', () => {
    const value = { a: 1, b: [{ c: 3 }] };
    let form: Container;
    render(
      <Container
        ref={f => (form = f!)}
        schema={{}}
        value={value}
        onChange={() => {}}
      />,
    );
    expect(form.getValue()).toBe(value);

    let validation;
    act(() => {
        validation = form.validate();
    });
    expect(validation).toHaveLength(0);
  });
  test('Validate', () => {
    let form: Container;
    const { getByText } = render(
      <Container
        ref={f => (form = f!)}
        schema={{ type: 'string' }}
        value={1}
        onChange={() => {}}
      />,
    );
    expect(() => getByText('is not of a type(s) string')).toThrow();
    let validationResults;
    act(()=> {
        validationResults = form!.validate();
    });
    expect(() => getByText('is not of a type(s) string')).not.toThrow();
    let validation;
    act(() => {
        validation = form.validate();
    })
    expect(validation).toHaveLength(1);
    expect(validationResults[0].message).toBe('is not of a type(s) string');
  });
});
