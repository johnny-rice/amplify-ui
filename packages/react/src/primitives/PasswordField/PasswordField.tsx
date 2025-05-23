import { classNames } from '@aws-amplify/ui';
import * as React from 'react';

import { ComponentClassName } from '@aws-amplify/ui';
import type {
  BasePasswordFieldProps,
  PasswordFieldProps,
  PasswordFieldType,
  ForwardRefPrimitive,
  Primitive,
} from '../types';
import { ShowPasswordButton } from './ShowPasswordButton';
import { TextField } from '../TextField';
import { primitiveWithForwardRef } from '../utils/primitiveWithForwardRef';

const PasswordFieldPrimitive: Primitive<PasswordFieldProps, 'input'> = (
  {
    autoComplete = 'current-password',
    label,
    className,
    hideShowPassword = false,
    passwordIsHiddenLabel,
    passwordIsShownLabel,
    showPasswordButtonLabel,
    showPasswordButtonRef,
    size,
    hasError,
    ...rest
  },
  ref
) => {
  const [type, setType] = React.useState<PasswordFieldType>('password');

  const showPasswordOnClick = React.useCallback(() => {
    if (type === 'password') {
      setType('text');
    } else {
      setType('password');
    }
  }, [setType, type]);

  return (
    <TextField
      autoComplete={autoComplete}
      outerEndComponent={
        hideShowPassword ? null : (
          <ShowPasswordButton
            fieldType={type}
            onClick={showPasswordOnClick}
            passwordIsHiddenLabel={passwordIsHiddenLabel}
            passwordIsShownLabel={passwordIsShownLabel}
            ref={showPasswordButtonRef}
            size={size}
            showPasswordButtonLabel={showPasswordButtonLabel}
            hasError={hasError}
          />
        )
      }
      size={size}
      type={type}
      label={label}
      className={classNames(ComponentClassName.PasswordField, className)}
      ref={ref}
      hasError={hasError}
      {...rest}
    />
  );
};

/**
 * [📖 Docs](https://ui.docs.amplify.aws/react/components/passwordfield)
 */
export const PasswordField: ForwardRefPrimitive<
  BasePasswordFieldProps,
  'input'
> = primitiveWithForwardRef(PasswordFieldPrimitive);

PasswordField.displayName = 'PasswordField';
