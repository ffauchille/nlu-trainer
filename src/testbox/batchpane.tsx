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

type BatchPaneOwnProps = React.Props<any> & {};
type BatchPaneProps = BatchPaneOwnProps & {};

type BatchPaneState = {
  newSuiteModalOpen: boolean;
};

class BatchPane extends React.Component<BatchPaneProps, BatchPaneState> {

  constructor(props: BatchPaneProps) {
    super(props);
    this.state = {
      newSuiteModalOpen: false
    }
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
        onClose={(e,d) => this.setState({ newSuiteModalOpen: false })}
        size="small"
      >
        <Header icon="plus" content="Create a new test suite" />
        <Modal.Content>
          <TestSuiteForm />
        </Modal.Content>
      </Modal>
    )
  }

  render() {
    return (
      <Container fluid>
        { this.renderNewTestSuiteModal() }
        <ItemsView
          renderItem={suite => <Header>TODO</Header>}
          data={[]}
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
      </Container>
    );
  }
}

const mapStateToProps = (state, ownProps: BatchPaneOwnProps) => ({});

const mapDispatcherToProps = dispatch => ({
  //dispatchFn: bindActionCreators(dispatchFn, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatcherToProps
)(BatchPane);
