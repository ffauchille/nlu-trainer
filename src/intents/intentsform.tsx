import * as React from "react";
import { connect } from "react-redux";
import { Form, Button } from "semantic-ui-react";
import { reduxForm, reset } from "redux-form";
import { renderField } from "../forms";

import { Intent } from "../models/intent";
import {
  createIntent,
  CreateIntent,
  updateIntent,
  UpdateIntent
} from "./actions";
import { bindActionCreators } from "redux";

const APPS_FORM_NAME = "IntentForm";

interface IntentFormOwnProps extends React.Props<any> {
  intent?: Intent;
  editMode?: boolean;
  onCreateSubmit?: (input: Intent) => any;
  onUpdateSubmit?: (input: Intent) => any;
  beforeCreate?: (input: any) => any;
  beforeUpdate?: (input: any) => any;
}

interface IntentFormProps extends IntentFormOwnProps {
  handleSubmit?: any;
  onSubmit?: any;
  invalid?: boolean;
  resetForm: any;
  createIntent: (pl: Partial<Intent>) => CreateIntent;
  updateIntent: (updt: Intent) => UpdateIntent;
}

const IntentFormField = {
  component: "input",
  name: "name",
  label: "Intent name",
  placeholder: "My awsome intent"
};

const validate = values => {
  const errors: any = {};
  if (!values.name) {
    errors.name = "An intent name is required";
  }
  return errors;
};

const IntentForm = (props: IntentFormProps) => (
  <Form onSubmit={props.handleSubmit}>
    {renderField(IntentFormField)}
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

const IntentReduxForm = (initialValues: any) =>
  reduxForm({
    form: APPS_FORM_NAME, // this form name is shared by all wizard forms
    validate,
    initialValues
  })(IntentForm);

const IntentFormWrapper: React.StatelessComponent<IntentFormProps> = props => {
  const submission = (i: Intent) => {
    var input = i;
    if (props.beforeCreate) {
      input = props.beforeCreate(i)
    }
    if (props.editMode) {
      if (props.beforeUpdate) {
        input = props.beforeUpdate(i)
      }
      props.updateIntent(input);
      if (props.onUpdateSubmit) {
        props.onUpdateSubmit(input)
      }
    } else {
      props.createIntent(input);
      props.resetForm(APPS_FORM_NAME);
      if (props.onCreateSubmit) {
        props.onCreateSubmit(input)
      }
    }
  };
  const NPF = IntentReduxForm(props.intent);
  return <NPF onSubmit={submission} editMode={props.editMode}/>;
};

const mapDispatcherToProps = dispatch => ({
  resetForm: bindActionCreators(reset, dispatch),
  createIntent: bindActionCreators(createIntent, dispatch),
  updateIntent: bindActionCreators(updateIntent, dispatch)
});

const mapStateToProps = (state, ownProps: IntentFormOwnProps) => ({
  ...ownProps
});

export default connect(
  mapStateToProps,
  mapDispatcherToProps
)(IntentFormWrapper);