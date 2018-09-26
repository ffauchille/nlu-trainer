import * as React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Table, Header, Icon, Grid, Button } from "semantic-ui-react";
import ItemsView from "../items";

type BatchPaneOwnProps = React.Props<any> & {};
type BatchPaneProps = BatchPaneOwnProps & {};

type BatchPaneState = {};

class BatchPane extends React.Component<BatchPaneProps, BatchPaneState> {

  onCreateTestSuite() {

  }

  render() {
    return (
      <React.Fragment>
          <Button.Group basic onClick={(e,d) => this.onCreateTestSuite()}>
            <Icon name="add" /> New Test Suite
          </Button.Group>
          <ItemsView
            renderItem={suite => <Header>TODO</Header>}
            data={[]}
            emptyDataMessage={
              <Header as="h3">
                <Icon name="coffee" color="violet" />
                <Header.Content>No test suites yet for this app</Header.Content>
                <Header.Subheader>
                  You can create a new test suite by using "New Test Suite"
                  button
                </Header.Subheader>
              </Header>
            }
          />
      </React.Fragment>
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
