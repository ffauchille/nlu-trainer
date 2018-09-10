import * as React from "react";
import { connect } from "react-redux";
import { Form, Button } from "semantic-ui-react";
import { reduxForm, reset } from "redux-form";
import { renderField } from "../forms";

import { Example } from "../models/example";
import {
  createExample,
  CreateExample,
  updateExample,
  UpdateExample
} from "./actions";
import { bindActionCreators } from "redux";

const EXAMPLES_FORM_NAME = "NLUExampleForm";

interface ExampleFormOwnProps extends React.Props<any> {
  example?: Example;
  editMode?: boolean;
  onCreateSubmit?: (input: Example) => any;
  onUpdateSubmit?: (input: Example) => any;
  beforeCreate?: (input: any) => any;
  beforeUpdate?: (input: any) => any;
}

interface ExampleFormProps extends ExampleFormOwnProps {
  handleSubmit?: any;
  onSubmit?: any;
  invalid?: boolean;
  resetForm: any;
  createNLUExample: (pl: Partial<Example>) => CreateExample;
  updateNLUExample: (updt: Example) => UpdateExample;
}

const ExampleFormField = {
  component: "input",
  name: "text",
  label: "Text example",
  placeholder: "Enter a text example for this intent, keep it essential"
};

const validate = values => {
  const errors: any = {};
  if (!values.name) {
    errors.name = "An example name is required";
  }
  return errors;
};

const ExampleForm = (props: ExampleFormProps) => (
  <Form onSubmit={props.handleSubmit}>
    {renderField(ExampleFormField)}
    <Button
      type="submit"
      onSubmit={props.onSubmit}
      primary
      disabled={props.invalid}
    >
      {props.editMode ? "Update" : "Create"}
    </Button>
  </Form>
);

const ExampleReduxForm = (initialValues: any) =>
  reduxForm({
    form: EXAMPLES_FORM_NAME, // this form name is shared by all wizard forms
    validate,
    initialValues
  })(ExampleForm);

const ExampleFormWrapper: React.StatelessComponent<ExampleFormProps> = props => {
  const submission = (i: Example) => {
    var input = i;
    if (props.beforeCreate){
      input = props.beforeCreate(i)
    }
    if (props.beforeUpdate){
      input = props.beforeUpdate(i)
    }
    if (props.editMode) {
      props.updateNLUExample(input);
      if (props.onUpdateSubmit) {
        props.onUpdateSubmit(input)
      }
    } else {
      props.createNLUExample(input);
      props.resetForm(EXAMPLES_FORM_NAME);
      if (props.onCreateSubmit) {
        props.onCreateSubmit(input)
      }
    }
  };
  const NPF = ExampleReduxForm(props.example);
  return <NPF onSubmit={submission} editMode={props.editMode}/>;
};

const mapDispatcherToProps = dispatch => ({
  resetForm: bindActionCreators(reset, dispatch),
  createNLUExample: bindActionCreators(createExample, dispatch),
  updateNLUExample: bindActionCreators(updateExample, dispatch)
});

const mapStateToProps = (state, ownProps: ExampleFormOwnProps) => ({
  ...ownProps
});

export default connect(
  mapStateToProps,
  mapDispatcherToProps
)(ExampleFormWrapper);