import * as React from "react";
import { connect } from "react-redux";
import { Form, Button } from "semantic-ui-react";
import { reduxForm, reset, change } from "redux-form";
import { renderField } from "../forms";

import { Intent } from "../models/intent";
import { createTestSuite, CreateTestSuite } from "./actions";
import { bindActionCreators } from "redux";
import { TestSuite, TestSuiteCreation } from "../models/testsuite";
import CSVImport from "./csvimport";

const TEST_SUITE_FORM_NAME = "testSuiteForm";

interface TestFormOwnProps extends React.Props<any> {
  appId: string;
  testSuite?: TestSuite;
  onCreateSubmit?: (input: TestSuiteCreation) => any;
  beforeCreate?: (input: any) => any;
}

interface TestFormProps extends TestFormOwnProps {
  handleSubmit?: any;
  onSubmit?: any;
  invalid?: boolean;
  resetForm: any;
  changeField: any;
  createTestSuite: (pl: Partial<TestSuiteCreation>) => CreateTestSuite;
}

const TestFormFields = [
  {
    component: "input",
    name: "name",
    label: "Test suite name",
    placeholder: "My awsome test suite"
  }
];

const validate = values => {
  const errors: any = {};
  if (!values.name) {
    errors.name = "A test suite name is required";
  }
  return errors;
};

class TestSuiteForm extends React.Component<TestFormProps> {
  render() {
    return (
      <Form onSubmit={this.props.handleSubmit}>
        {TestFormFields.map((tf, i) =>
          renderField(tf, `test-suite-form-field-${i}`)
        )}
        <Button
          type="submit"
          onSubmit={this.props.onSubmit}
          primary
          disabled={this.props.invalid}
        >
          Create
        </Button>
      </Form>
    );
  }
}

const TestSuiteReduxForm = (initialValues: any) =>
  reduxForm({
    form: TEST_SUITE_FORM_NAME,
    validate,
    initialValues
  })(TestSuiteForm);

const TestSuiteFormWrapper: React.StatelessComponent<TestFormProps> = props => {
  const submission = (ts: TestSuiteCreation) => {
    var input = ts;
    if (props.beforeCreate) {
      input = props.beforeCreate(ts);
    }
    let testSuiteCreation = new TestSuiteCreation({ appId: props.appId, ...input })
    if (props.onCreateSubmit) {
      props.onCreateSubmit(testSuiteCreation);
    }
    props.createTestSuite(testSuiteCreation);
    props.resetForm(TEST_SUITE_FORM_NAME);
  };
  const NPF = TestSuiteReduxForm(props.testSuite);
  return <NPF onSubmit={submission} changeField={props.changeField} />;
};

const mapDispatcherToProps = dispatch => ({
  resetForm: bindActionCreators(reset, dispatch),
  createTestSuite: bindActionCreators(createTestSuite, dispatch),
  changeField: bindActionCreators(change, dispatch)
});

const mapStateToProps = (state, ownProps: TestFormOwnProps) => ({
  ...ownProps
});

export default connect(
  mapStateToProps,
  mapDispatcherToProps
)(TestSuiteFormWrapper);
