import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { Grid, Container, Button, Icon, Modal, Label } from "semantic-ui-react";
import ItemsView from "../items";
import { Example } from "../models/example";
import { bindActionCreators, Action } from "redux";
import {
  loadIntentExample,
  LoadIntentExample,
  deleteExample,
  DeleteExample
} from "./actions";
import { StoreState } from "../reducers";
import { Intent } from "../models/intent";
import ExamplesForm from "./examplesform";
import { Path } from "history";
import { push } from "connected-react-router";

type ExamplesOwnProps = React.Props<any> & {
  intent: Intent;
};
type ExamplesStateProps = {
  examples: Example[];
  
};
type ExamplesDispatchProps = {
  deleteExample: (e: Example) => DeleteExample;
  loadExamples: (intent: Intent | string) => LoadIntentExample;
  pushRoute: (location: Path) => Action;
};

type ExamplesProps = ExamplesOwnProps &
  ExamplesStateProps &
  ExamplesDispatchProps;

type ExamplesState = {
  createMode: boolean;
};

class Examples extends React.Component<ExamplesProps, ExamplesState> {
  constructor(props) {
    super(props);
    this.state = {
      createMode: false
    };
  }

  get intent() {
    return this.props.intent || new Intent({});
  }

  componentWillMount() {
    this.props.loadExamples(this.props.intent);
  }

  renderExamplesForm() {
    return (
      <Modal
        size="small"
        trigger={
          <Button
            basic
            color="black"
            floated="right"
            onClick={(e, d) => this.setState({ createMode: true })}
          >
            <Icon name="plus" color="black" />
            New Example
          </Button>
        }
        open={this.state.createMode}
        onClose={(e, d) => this.setState({ createMode: false })}
        closeOnEscape={false}
        closeOnTriggerBlur
      >
        <Modal.Header>New Example for {this.intent.name}</Modal.Header>
        <Modal.Content>
          <ExamplesForm
            onCreateSubmit={example => this.setState({ createMode: false })}
            beforeCreate={pl => ({
              ...pl,
              intentId: this.intent._id,
              intentName: this.intent.name
            })}
          />
        </Modal.Content>
      </Modal>
    );
  }

  /**
   * 
   * Render entity as `Label` in the example's text, based on entities extracted.
   * 
   * @param example 
   */
  renderWithEntities(example: Example) {
    let elem = [<span key={`${example._id}-span-full-entity-text`}>{example.text}</span>];
    if (example.entities.length > 0) {
      let reduced = example.entities.reduce<JSX.Element[]>((all, entity, i) => {
        let k = `${example._id}-${entity.value}-${i}`;
        let prev = example.entities[i - 1];
        let prevEndIdx = prev ? prev.end : 0;
        let before = example.text.slice(prevEndIdx, entity.start);
        return all.concat(
          <span key={`${example._id}-span-entity-text-${i}`}>{before}</span>,
          <Label key={k} color="violet">
            { entity.value }
          </Label>
        );
      }, []);
      let endStr = example.text.slice(example.entities[example.entities.length - 1].end, example.text.length);
      elem = reduced.concat(<span key={`${example._id}-span-entity-text-end`}>{endStr}</span>);
    }
    return <React.Fragment>{...elem}</React.Fragment>;
  }

  renderExamples() {
    return (
      <ItemsView
        data={this.props.examples}
        emptyDataMessage={" No examples yet "}
        renderItem={(ex, idx) => (
          <Grid>
            <Grid.Column width="8">{this.renderWithEntities(ex)}</Grid.Column>
            <Grid.Column width="4">
              <Icon name="tag" color="black" />
              {ex.intentName}
            </Grid.Column>
            <Grid.Column width="4">
              <Button
                basic
                onClick={(e, d) => {
                  this.props.deleteExample(ex);
                }}
              >
                <Icon name="trash" />
                Delete
              </Button>
            </Grid.Column>
          </Grid>
        )}
      />
    );
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
  examples: state.examples.all
});
const mapDispatcherToProps = (dispatch: Dispatch) => ({
  loadExamples: bindActionCreators(loadIntentExample, dispatch),
  deleteExample: bindActionCreators(deleteExample, dispatch),
  pushRoute: bindActionCreators(push, dispatch)
});

export default connect<
  ExamplesStateProps,
  ExamplesDispatchProps,
  ExamplesOwnProps,
  StoreState
>(
  mapStateToProps,
  mapDispatcherToProps
)(Examples);
