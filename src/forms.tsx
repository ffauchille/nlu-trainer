import * as React from "react";
import { Field } from "redux-form";
import {
  Form,
  Label,
  DropdownItemProps,
  Input,
  Message,
  DropdownProps,
  Dropdown,
  Radio
} from "semantic-ui-react";

import { removeAtIndex, findIndex } from "./utils";
import { DatePickerOwnProps } from "./date";

const renderError = props => {
  if (props.meta.touched && props.meta.error) {
    return <Message color="red" content={props.meta.error} />;
  }
};

class InputWrap extends React.Component<any> {
  render() {
    return (
      <div>
        <Input
          placeholder={this.props.placeholder}
          {...this.props.input} />
        {renderError(this.props)}
      </div>
    );
  }
}

class TextAreaWrap extends React.Component<any> {
  render() {
    return (
      <div>
        <textarea
          className="ui textarea"
          rows={4}
          placeholder={this.props.placeholder}
          {...this.props.input}
        />
        {renderError(this.props)}
      </div>
    );
  }
}

class DateWrap extends React.Component<DatePickerOwnProps> {
  render() {
    return (
      <div>
        <Input input={this.props.input} />
        {renderError(this.props)}
      </div>
    );
  }
}

class RadioWrap extends React.Component<any, { checked: boolean }> {

  constructor(props: any) {
    super(props);
    props.input.value = !!props.checked
    this.state = {
      checked: !!props.checked
    }
  }

  onRadioChange() {
    this.setState({ checked: !this.state.checked })
    this.props.input.value = this.state.checked;
  }

  render() {
    return (
    <div>
      <Radio label={this.props.label} defaultChecked={this.props.checked} onChange={(e,d) => this.setState({ checked: !this.state.checked })}></Radio>
      {renderError(this.props)}
    </div>
    )
  }
}

type SelectWrapProps = {
  options: DropdownItemProps[];
  input: any; // meta from redux-form.Field
  placeholder: string;
};

type SelectWrapState = {
  valueSelected: string;
  textSelected: string;
};

class SelectWrap extends React.Component<SelectWrapProps, SelectWrapState> {
  constructor(props: SelectWrapProps) {
    super(props);
    let v = (this.props.input.value as string) || "";
    this.state = {
      textSelected: v,
      valueSelected: v
    };
  }

  handleSelectedItem(
    event: React.SyntheticEvent<HTMLElement>,
    data: DropdownProps
  ): void {
    let idx = findIndex(this.props.options, opt => opt.value === data.value);
    let found = idx > -1 ? this.props.options[idx] : null;
    this.setState({
      valueSelected: data.value as string,
      textSelected: found ? (found.text as string) : (data.value as string)
    });
    this.props.input.onChange(data.value);
  }

  render() {
    return (
      <Dropdown
        selection
        search
        placeholder={this.props.placeholder}
        onChange={(e, d) => this.handleSelectedItem(e, d)}
        value={this.state.valueSelected}
        text={this.state.textSelected}
        options={this.props.options}
      />
    );
  }
}

type MultiSeclectProps = {
  options: DropdownItemProps[];
  placeholder: string;
  input: any;
};

type MultiSelectState = {
  selected: string[];
  options: DropdownItemProps[];
};

class MultiSeclect extends React.Component<
  MultiSeclectProps,
  MultiSelectState
> {
  constructor(props: MultiSeclectProps) {
    super(props);
    this.state = {
      selected: (props.input.value as string[]) || [],
      options: props.options || []
    };
  }

  handleSelectedItem(
    event: React.SyntheticEvent<HTMLElement>,
    data: DropdownProps
  ): void {
    this.setState({
      options: removeAtIndex(this.state.options, k => k.value === data.value),
      selected: data.value as string[]
    });
    this.props.input.onChange(data.value);
  }

  render() {
    return (
      <Dropdown
        multiple
        selection
        search
        placeholder={this.props.placeholder}
        onChange={(e, d) => this.handleSelectedItem(e, d)}
        value={this.state.selected}
        options={this.state.options}
      />
    );
  }
}

type FormFieldWrapProps = {
  /** name of the field, must be unique in this form */
  name: string;
  /** name shown as placeholder then label when field clicked or contains values */
  label: string;
  /** Placeholders for searchable components */
  placeholder?: string;
  /** type of the input (text, email, password ...) */
  type?: string;
  /** Ref key for date inputs */
  refKey?: string;
  /** input, select, multipleSelect or custom component */
  component: string;
  /** ONLY for multiple select, and Time Select */
  multipleOptions?: DropdownItemProps[];
  /** ONLY for multi select */
  selected?: string[];
  /** in case of fields array */
  fieldKey?: string;
  /** extra css on form-input */
  inputExtraCss?: string;
  /** grouped of input, they are wrapped in a row flex displayed div */
  grouped?: FormFieldWrapProps[];
  /** for check component; if it's checked by default */
  checked?: boolean;
};

const computeFieldKey = (formField: FormFieldWrapProps) =>
  formField.fieldKey ? formField.fieldKey : formField.name;

const renderField = (formField: FormFieldWrapProps, key?: string) => {
  let fieldKey = computeFieldKey(formField);
  let commonFieldProps = {
    name: formField.name,
    id: fieldKey
  };
  switch (formField.component) {
    case "select":
      return (
        <Form.Field key={fieldKey}>
          <Label>{formField.label}</Label>
          <Field
            {...commonFieldProps}
            component={SelectWrap}
            placeholder={formField.placeholder || "Select a value ..."}
            options={formField.multipleOptions || []}
          />
        </Form.Field>
      );
    case "multiselect":
      return (
        <Form.Field key={fieldKey}>
          <Label>{formField.label}</Label>
          <Field
            {...commonFieldProps}
            component={MultiSeclect}
            placeholder={formField.placeholder || "Select multiple ..."}
            options={formField.multipleOptions || []}
          />
        </Form.Field>
      );
    case "input":
      return (
        <Form.Field key={fieldKey}>
          <Label htmlFor={formField.name}>{formField.label}</Label>
          <Field
            {...commonFieldProps}
            component={InputWrap}
            placeholder={formField.placeholder || formField.label}
          />
        </Form.Field>
      );
    case "textarea":
      return (
        <Form.Field key={fieldKey}>
          <Label>{formField.label}</Label>
          <Field
            {...commonFieldProps}
            component={TextAreaWrap}
            placeholder={formField.placeholder || formField.label}
          />
        </Form.Field>
      );
    case "date":
      return (
        <Form.Field key={fieldKey}>
          <Label htmlFor={formField.name}>{formField.label}</Label>
          <Field {...commonFieldProps} component={DateWrap} />
        </Form.Field>
      );
    case "group":
      return (
        <Form.Group key={fieldKey}>
          {(formField.grouped || []).map(ff => renderField(ff))}
        </Form.Group>
      );
    case "check":
        return(
          <Form.Field key={fieldKey}>
            <Field {...commonFieldProps} component={RadioWrap} label={formField.placeholder} defaultChecked={formField.checked}></Field>
          </Form.Field>
        )
    default:
      return <span>Not a valid component key for a form field</span>;
  }
};

export { FormFieldWrapProps, renderField };
