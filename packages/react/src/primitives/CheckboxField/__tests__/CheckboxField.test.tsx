import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { CheckboxField } from '../CheckboxField';
import { CheckboxFieldProps } from '../../types/checkboxField';
import { ComponentClassName } from '@aws-amplify/ui';

describe('CheckboxField test suite', () => {
  const basicProps = {
    label: 'Subscribe',
    name: 'testName',
    value: 'testValue',
    testId: 'testId',
  };

  const getCheckboxField = (props: CheckboxFieldProps) => {
    return <CheckboxField {...props} />;
  };
  const ControlledCheckboxField = () => {
    const [checked, setChecked] = React.useState(false);
    return (
      <CheckboxField
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
        {...basicProps}
      />
    );
  };
  it('should render default and custom classname', async () => {
    const className = 'class-test';
    render(getCheckboxField({ ...basicProps, className }));

    const checkboxField = await screen.findByTestId(basicProps.testId);
    expect(checkboxField).toHaveClass(
      ComponentClassName.Field,
      ComponentClassName.CheckboxField,
      className
    );
  });

  it('should have no default labelPosition', async () => {
    render(getCheckboxField({ ...basicProps }));
    const checkboxField = await screen.findByTestId(basicProps.testId);
    expect(checkboxField.querySelector('label')).not.toHaveAttribute(
      'data-label-position'
    );
  });

  it('should work with labelPosition', async () => {
    render(getCheckboxField({ ...basicProps, labelPosition: 'end' }));
    const checkboxField = await screen.findByTestId(basicProps.testId);
    expect(checkboxField.querySelector('label')).toHaveClass(
      'amplify-label-end'
    );
  });

  it('should forward ref to DOM element', async () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<CheckboxField {...basicProps} ref={ref} />);

    await screen.findByTestId(basicProps.testId);
    expect(ref.current?.nodeName).toBe('INPUT');
  });

  describe('Checkbox functionality', () => {
    const expectFunctionality = async (component: React.JSX.Element) => {
      render(component);

      const checkbox = await screen.findByTestId(
        `${basicProps.testId}-${ComponentClassName.Checkbox}`
      );
      userEvent.click(checkbox);

      const input = await screen.findByRole('checkbox');
      expect(input).toBeChecked();
      userEvent.click(checkbox);
      expect(input).not.toBeChecked();
    };
    it('should work in uncontrolled way', () => {
      expectFunctionality(getCheckboxField({ ...basicProps }));
    });

    it('should work in controlled way', () => {
      expectFunctionality(<ControlledCheckboxField />);
    });
  });

  describe('Error messages', () => {
    const errorMessage = 'This is an error message';
    it('should not show when hasError is false', () => {
      render(getCheckboxField({ ...basicProps }));

      const errorText = screen.queryByText(errorMessage);
      expect(errorText).not.toBeInTheDocument();
    });

    it('should show when hasError and errorMessage', () => {
      render(getCheckboxField({ ...basicProps, hasError: true, errorMessage }));
      const errorText = screen.queryByText(errorMessage);
      expect(errorText).toContainHTML(errorMessage);
    });
  });
});
