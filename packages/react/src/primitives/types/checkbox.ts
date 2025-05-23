import type { ChangeEvent, Dispatch, SetStateAction } from 'react';
import type { BaseFlexProps } from './flex';
import type { BaseInputProps } from './input';
import type { FieldProps, LabelPositions } from './field';
import type { BaseStyleProps } from './style';
import type { ElementType, PrimitiveProps } from './view';

/** @deprecated For internal use only */
export interface BaseCheckboxProps extends BaseFlexProps, BaseInputProps {
  /**
   * @description
   * Sets the label text
   */
  label: FieldProps['label'];

  /**
   * Visually hide label (not recommended in most cases)
   * @default
   * false
   */
  labelHidden?: boolean;

  /**
   * The name of the input field in a checkbox (Useful for form submission).
   */
  name: string;

  /**
   * The submitted value when checked
   * Shows on form submission as key pair `name:value`
   */
  value?: string;

  /**
   * @description
   * Sets the position of label in relation to the CheckboxField,
   * @default
   * "start"
   */
  labelPosition?: LabelPositions;

  /**
   * @description
   * Determines whether a checkbox is in indeterminate state
   * @default false
   */
  isIndeterminate?: boolean;

  /**
   * @description
   * Style props to be applied to the input element
   */
  inputStyles?: BaseStyleProps;
}

export type CheckboxProps<Element extends ElementType = 'input'> =
  PrimitiveProps<BaseCheckboxProps, Element>;

export interface UseCheckbox {
  dataChecked?: boolean;
  dataFocus: boolean;
  onBlur: () => void;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onFocus: () => void;
  setDataChecked: Dispatch<SetStateAction<boolean | undefined>>;
}
