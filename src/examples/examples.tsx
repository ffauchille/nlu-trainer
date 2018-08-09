import * as React from "react";
import { connect, Dispatch } from "react-redux";
import { Grid, Container, Button, Icon, Modal, Header } from "semantic-ui-react";
import ItemsView from "../items";
import { Example } from "../models/example";
import { bindActionCreators, Action } from "redux";
import { loadIntentExample, LoadIntentExample, deleteExample, DeleteExample } from "./actions";
import { StoreState } from "../reducers";
import { Intent } from "../models/intent";
import ExamplesForm from "./examplesform";
import { LocationDescriptor, LocationState } from "history";
import { push } from "connected-react-router";

type ExamplesOwnProps = React.Props<any> & {};
type ExamplesProps = ExamplesOwnProps & {
  examples: Example[];
  intent: Intent;
  deleteExample: (e:Example) => DeleteExample;
  loadExamples: (intent: Intent | string) => LoadIntentExample;
  pushRoute: (
    location: LocationDescriptor,
    state?: LocationState
  ) => Action;
};
type ExamplesState = {
  createMode: boolean;
};

class Examples extends React.Component<ExamplesProps, ExamplesState> {

  constructor(props) {
    super(props);
    this.state = {
      createMode: false
    }
  }

  componentWillMount() {
    if (!this.props.intent) {
      this.props.pushRoute("/")
    } else {
      this.props.loadExamples(this.props.intent);
    }
  }

  renderExamplesForm() {
    return <Modal
    size="small"
    trigger={
      <Button
        basic
        color="black"
        floated="right"
        onClick={(e, d) => this.setState({ createMode: true })}
      >
        <Icon name="plus" color="black" />New Example
      </Button>
    }
    open={this.state.createMode}
    onClose={(e, d) => this.setState({ createMode: false })}
    closeOnEscape={false}
    closeOnTriggerBlur
  >
    <Modal.Header>New Example for {this.props.intent? this.props.intent.name : ""}</Modal.Header>
    <Modal.Content>
      <ExamplesForm
        onCreateSubmit={example => this.setState({ createMode: false })}
        beforeCreate={ pl => ({ ...pl, intentId: this.props.intent._id, intentName: this.props.intent.name })}
      />
    </Modal.Content>
  </Modal>
  }

  renderExamples() {
    return <ItemsView
      data={this.props.examples}
      emptyDataMessage={" No examples yet "}
      renderItem={(ex, idx) => (
        <Grid>
          <Grid.Column width="8">{ex.text}</Grid.Column>
          <Grid.Column width="4">
            <Icon name="tag" color="black" />
            {ex.intentName}
          </Grid.Column>
          <Grid.Column width="4">
            <Button basic onClick={(e, d) => {this.props.deleteExample(ex)}}>
              <Icon name="trash" />Delete
            </Button>
          </Grid.Column>
        </Grid>
      )}
    />;
  }

  render() {
    return (
      <Container fluid>
        {this.renderExamplesForm()}
        {this.renderExamples()}
      </Container>
    );
  }
}

const mapStateToProps = (state: StoreState, ownProps: ExamplesOwnProps) => ({
  examples: state.examples.all,
  intent: state.intents.selected
});
const mapDispatcherToProps = (dispatch: Dispatch) => ({
  loadExamples: bindActionCreators(loadIntentExample, dispatch),
  deleteExample: bindActionCreators(deleteExample, dispatch),
  pushRoute: bindActionCreators(push, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatcherToProps
)(Examples);
