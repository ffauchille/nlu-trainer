import * as React from "react";
import { connect, Dispatch } from "react-redux";
import { Grid, Container, Button, Icon, Modal } from "semantic-ui-react";
import ItemsView from "../items";
import { Example } from "../models/example";
import { bindActionCreators } from "../../node_modules/redux";
import { loadIntentExample, LoadIntentExample } from "./actions";
import { StoreState } from "../reducers";
import { Intent } from "../models/intent";
import ExamplesForm from "./examplesform";

type ExamplesOwnProps = React.Props<any> & {};
type ExamplesProps = ExamplesOwnProps & {
  examples: Example[];
  intent: Intent;
  loadExamples: (intent: Intent | string) => LoadIntentExample;
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
    this.props.loadExamples(this.props.intent);
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
    <Modal.Header>New Example for {this.props.intent.name}</Modal.Header>
    <Modal.Content>
      <ExamplesForm
        onCreateSubmit={example => this.setState({ createMode: false })}
        beforeCreate={ pl => ({ ...pl, intent: this.props.intent._id })}
      />
    </Modal.Content>
  </Modal>
  }

  renderExamples() {
    return <ItemsView
      data={this.props.examples}
      emptyDataMessage={" No examples yet "}
      renderItem={e => (
        <Grid>
          <Grid.Column width="8">{e.text}</Grid.Column>
          <Grid.Column width="4">
            <Icon name="tag" color="black" />
            {e.intent}
          </Grid.Column>
          <Grid.Column width="4">
            <Button.Group>
            <Button basic color="black" onClick={(e, d) => {}}>
              <Icon name="edit" />Edit
            </Button>
            <Button basic onClick={(e, d) => {}}>
              <Icon name="trash" />Delete
            </Button>
            </Button.Group>
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
  loadExamples: bindActionCreators(loadIntentExample, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatcherToProps
)(Examples);
