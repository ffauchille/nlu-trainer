import * as React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  Table,
  Header,
  Icon,
  Grid,
  Button,
  Container,
  Modal
} from "semantic-ui-react";
import ItemsView from "../items";
import TestSuiteForm from "./testsuiteform";
import { AppModel } from "../models/app";
import { StoreState } from "../reducers";
import { TestSuite } from "../models/testsuite";
import {
  LoadTestSuites,
  loadTestSuites,
  selectSuiteForEvaluation,
  SelectSuiteForEvaluation
} from "./actions";
import BatchDetail from "./batchdetail";

type BatchPaneOwnProps = React.Props<any> & {
  app: AppModel;
};
type BatchPaneProps = BatchPaneOwnProps & {
  suites: TestSuite[];
  loadAppSuites: (aid: string) => LoadTestSuites;
  selectSuite: (suite: TestSuite) => SelectSuiteForEvaluation;
  suiteSelected?: TestSuite;
};

type BatchPaneState = {
  newSuiteModalOpen: boolean;
};

class BatchPane extends React.Component<BatchPaneProps, BatchPaneState> {
  constructor(props: BatchPaneProps) {
    super(props);
    this.state = {
      newSuiteModalOpen: false
    };
  }

  componentWillMount() {
    this.props.loadAppSuites(this.props.app._id);
  }

  renderNewTestSuiteModal() {
    return (
      <Modal
        trigger={
          <Button
            basic
            color="black"
            floated="right"
            onClick={(e, d) => this.setState({ newSuiteModalOpen: true })}
          >
            <Icon name="plus" />
            New Test Suite
          </Button>
        }
        closeOnTriggerBlur
        open={this.state.newSuiteModalOpen}
        onClose={(e, d) => this.setState({ newSuiteModalOpen: false })}
        size="small"
      >
        <Header icon="plus" content="Create a new test suite" />
        <Modal.Content>
          <TestSuiteForm
            onCreateSubmit={i => this.setState({ newSuiteModalOpen: false })}
            appId={this.props.app._id}
          />
        </Modal.Content>
      </Modal>
    );
  }

  onSuiteSelect(suite: TestSuite) {
    this.props.selectSuite(suite);
  }

  renderTestSuiteSummary(suite: TestSuite) {
    return (
      <Grid>
        <Grid.Column width={12}>
          <a onClick={_ => this.onSuiteSelect(suite)}>{suite.name}</a>
        </Grid.Column>
        <Grid.Column width={4}>
          <Button.Group>
            <Button basic disabled>
              <Icon name="edit" /> Edit
            </Button>
            <Button basic disabled>
              <Icon name="trash" /> Delete
            </Button>
          </Button.Group>
        </Grid.Column>
      </Grid>
    );
  }

  renderTestSuites() {
    return (
      <React.Fragment>
        {this.renderNewTestSuiteModal()}
        <ItemsView
          renderItem={s => this.renderTestSuiteSummary(s)}
          data={this.props.suites}
          emptyDataMessage={
            <Header as="h3">
              <Icon name="coffee" color="violet" />
              <Header.Content>No test suites yet for this app</Header.Content>
              <Header.Subheader>
                You can create a new test suite by using "New Test Suite" button
              </Header.Subheader>
            </Header>
          }
        />
      </React.Fragment>
    );
  }

  render() {
    return (
      <Container fluid>
        {!!this.props.suiteSelected ? <BatchDetail /> : this.renderTestSuites()}
      </Container>
    );
  }
}

const mapStateToProps = (state: StoreState, ownProps: BatchPaneOwnProps) => ({
  app: ownProps.app,
  suites: state.testbox.batch.suites,
  suiteSelected: state.testbox.batch.suiteSelected
});

const mapDispatcherToProps = dispatch => ({
  loadAppSuites: bindActionCreators(loadTestSuites, dispatch),
  selectSuite: bindActionCreators(selectSuiteForEvaluation, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatcherToProps
)(BatchPane);
