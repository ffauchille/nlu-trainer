import * as React from "react";
import { connect } from "react-redux";
import { Form, Button } from "semantic-ui-react";
import { reduxForm, reset } from "redux-form";
import { renderField } from "../forms";

import { AppModel } from "../models/app";
import {
  createApp,
  CreateApp,
  updateApp,
  UpdateApp
} from "./actions";
import { bindActionCreators } from "redux";

const APPS_FORM_NAME = "appsForm";

interface AppsFormOwnProps extends React.Props<any> {
  app?: AppModel;
  editMode?: boolean;
  onCreateSubmit?: (input: AppModel) => any;
  onUpdateSubmit?: (input: AppModel) => any;
}

interface AppsFormProps extends AppsFormOwnProps {
  handleSubmit?: any;
  onSubmit?: any;
  invalid?: boolean;
  resetForm: any;
  createApp: (pl: Partial<AppModel>) => CreateApp;
  updateApp: (updt: AppModel) => UpdateApp;
}

const appsFormFields = [
  {
    component: "input",
    name: "name",
    label: "App name",
    placeholder: "My awsome app"
  },
  {
    component: "select",
    name: "type",
    label: "App type",
    placeholder: "Select an app type",
    multipleOptions: [
      { text: "RASA", value: "RASA" }
    ]
  }
]

const validate = values => {
  const errors: any = {};
  if (!values.name) {
    errors.name = "An app name is required";
  }
  if (!values.type) {
    errors.type = "An app type is required";
  }
  return errors;
};

const AppsForm = (props: AppsFormProps) => (
  <Form onSubmit={props.handleSubmit}>
    { appsFormFields.map((appF, idx) => renderField(appF, `appsform-field-${idx}`)) }
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

const appsReduxForm = (initialValues: any) =>
  reduxForm({
    form: APPS_FORM_NAME, // this form name is shared by all wizard forms
    validate,
    initialValues
  })(AppsForm);

const AppsFormWrapper: React.StatelessComponent<AppsFormProps> = props => {
  const submission = (input: AppModel) => {
    if (props.editMode) {
      props.updateApp(input);
      if (props.onUpdateSubmit) {
        props.onUpdateSubmit(input)
      }
    } else {
      props.createApp(input);
      props.resetForm(APPS_FORM_NAME);
      if (props.onCreateSubmit) {
        props.onCreateSubmit(input)
      }
    }
  };
  const NPF = appsReduxForm(props.app);
  return <NPF onSubmit={submission} editMode={props.editMode}/>;
};

const mapDispatcherToProps = dispatch => ({
  resetForm: bindActionCreators(reset, dispatch),
  createApp: bindActionCreators(createApp, dispatch),
  updateApp: bindActionCreators(updateApp, dispatch)
});

const mapStateToProps = (state, ownProps: AppsFormOwnProps) => ({
  ...ownProps
});

export default connect(
  mapStateToProps,
  mapDispatcherToProps
)(AppsFormWrapper);