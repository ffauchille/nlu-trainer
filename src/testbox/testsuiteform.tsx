import * as React from "react";
import { connect } from "react-redux";
import { Form, Button } from "semantic-ui-react";
import { reduxForm, reset } from "redux-form";
import { renderField } from "../forms";

import { Intent } from "../models/intent";
import { createTestSuite, CreateTestSuite } from "./actions";
import { bindActionCreators } from "redux";
import { TestSuite } from "../models/testsuite";

const TEST_SUITE_FORM_NAME = "testSuiteForm";

interface TestFormOwnProps extends React.Props<any> {
  testSuite?: TestSuite;
  onCreateSubmit?: (input: TestSuite) => any;
  beforeCreate?: (input: any) => any;
}

interface TestFormProps extends TestFormOwnProps {
  handleSubmit?: any;
  onSubmit?: any;
  invalid?: boolean;
  resetForm: any;
  createTestSuite: (pl: Partial<Intent>) => CreateTestSuite;
}

const TestFormFields = [ 
    {
  component: "input",
  name: "name",
  label: "Test suite name",
  placeholder: "My awsome intent"
},{
    component: "check",
    name: "fromTraining",
    label: "Include training examples",
    placeholder: "Include training examples"
}
]

const validate = values => {
  const errors: any = {};
  if (!values.name) {
    errors.name = "A test suite name is required";
  }
  return errors;
};

const TestSuiteForm = (props: TestFormProps) => (
  <Form onSubmit={props.handleSubmit}>
    {TestFormFields.map((tf, i) => renderField(tf, `test-suite-form-field-${i}`))}
    <Button
      type="submit"
      onSubmit={props.onSubmit}
      primary
      disabled={props.invalid}
    >Create</Button>
  </Form>
);

const TestSuiteReduxForm = (initialValues: any) =>
  reduxForm({
    form: TEST_SUITE_FORM_NAME, 
    validate,
    initialValues
  })(TestSuiteForm);

const TestSuiteFormWrapper: React.StatelessComponent<TestFormProps> = props => {
  const submission = (ts: TestSuite) => {
    var input = ts;
    if (props.beforeCreate) {
      input = props.beforeCreate(ts);
    }
    props.createTestSuite(input);
    props.resetForm(TEST_SUITE_FORM_NAME);
    if (props.onCreateSubmit) {
      props.onCreateSubmit(input);
    }
  };
  const NPF = TestSuiteReduxForm(props.testSuite);
  return <NPF onSubmit={submission} />;
};

const mapDispatcherToProps = dispatch => ({
  resetForm: bindActionCreators(reset, dispatch),
  createTestSuite: bindActionCreators(createTestSuite, dispatch)
});

const mapStateToProps = (state, ownProps: TestFormOwnProps) => ({
  ...ownProps
});

export default connect(
  mapStateToProps,
  mapDispatcherToProps
)(TestSuiteFormWrapper);
