import * as React from "react";
import { connect } from "react-redux";
import { Dispatch, bindActionCreators } from "redux";
import { Table, Header, Grid, Button, Icon, Loader } from "semantic-ui-react";
import {
  TestSuite,
  TestSuiteEvaluation,
  TestExample
} from "../models/testsuite";
import { StartTestSuiteEvaluation, startTestSuiteEvaluation, closeTestSuiteEvaluation, CloseTestSuiteEvaluation } from "./actions";
import { Prediction } from "../models/testsuite";
import { StoreState } from "../reducers";
import CSVImport from "./csvimport";
import { throws } from "assert";

type BatchDetailOwnProps = React.Props<any> & {};
type BatchDetailProps = BatchDetailOwnProps & {
  testSuite: TestSuite;
  evaluation?: TestSuiteEvaluation;
  startEvaluation: (ts: TestSuite) => StartTestSuiteEvaluation;
  goBack: () => CloseTestSuiteEvaluation;
  loading: boolean;
};
type BatchDetailState = {};

class BatchDetail extends React.Component<BatchDetailProps, BatchDetailState> {
  renderEvaluationRow(prediction: Prediction, k: string) {
    return (
      <Table.Row key={k}>
        <Table.Cell>{prediction.text}</Table.Cell>
        <Table.Cell>{prediction.intent}</Table.Cell>
        <Table.Cell>{prediction.predicted}</Table.Cell>
        <Table.Cell>{prediction.confidence}</Table.Cell>
      </Table.Row>
    );
  }

  renderTestExampleRow(testExample: TestExample, k: string) {
    return (
      <Table.Row key={k}>
        <Table.Cell>{testExample.text}</Table.Cell>
        <Table.Cell>{testExample.intent}</Table.Cell>
        <Table.Cell>{}</Table.Cell>
        <Table.Cell>{}</Table.Cell>
      </Table.Row>
    );
  }

  renderEvaluationLoader() {
    return (
      <Table.Row key="evaluation-loading">
        <Table.Cell>{}</Table.Cell>
        <Table.Cell>{<Loader active size="big" />}</Table.Cell>
        <Table.Cell>{}</Table.Cell>
        <Table.Cell>{}</Table.Cell>
      </Table.Row>
    )
  }

  renderTableContent() {
    let content;
    if (this.props.loading) {
      content = this.renderEvaluationLoader();
    } else if (!!this.props.evaluation) {
      content = this.props.evaluation.predictions.map((pred, i) =>
        this.renderEvaluationRow(pred, `test-suite-prediction-${i}`)
      );
    } else {
      content = this.props.testSuite.testExamples.map((ex, i) =>
        this.renderTestExampleRow(ex, `test-suite-example-row-${i}`)
      );
    }
    return content;
  }

  render() {
    return (
      <Grid>
        <Grid.Row>
          <Grid.Column width="6">
            <Header>{this.props.testSuite.name}</Header>
          </Grid.Column>
          <Grid.Column width="10" textAlign="right">
            <CSVImport testSuiteId={this.props.testSuite._id}/>
            <Button
              color="purple"
              onClick={(e, d) =>
                this.props.startEvaluation(this.props.testSuite)
              }
            >
              <Icon name="play" /> Evaluate
            </Button>
            <Button basic onClick={(e,d) => this.props.goBack()}>
              <Icon name="arrow left" /> Go back
            </Button>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Table basic="very">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Example</Table.HeaderCell>
                <Table.HeaderCell>Intent</Table.HeaderCell>
                <Table.HeaderCell>
                  {!!this.props.evaluation ? "Predicted" : ""}
                </Table.HeaderCell>
                <Table.HeaderCell>
                  {!!this.props.evaluation ? "Confidence" : ""}
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>{this.renderTableContent()}</Table.Body>
          </Table>
        </Grid.Row>
      </Grid>
    );
  }
}

const mapStateToProps = (state: StoreState, ownProps: BatchDetailOwnProps) => ({
  testSuite: state.testbox.batch.suiteSelected || new TestSuite({}),
  evaluation: state.testbox.batch.evaluation,
  loading: state.testbox.batch.processingEvaluation
});
const mapDispatcherToProps = (dispatch: Dispatch) => ({
  startEvaluation: bindActionCreators(startTestSuiteEvaluation, dispatch),
  goBack: bindActionCreators(closeTestSuiteEvaluation, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatcherToProps
)(BatchDetail);
