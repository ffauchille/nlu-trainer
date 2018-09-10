import { push } from "connected-react-router";
import { Path } from "history";
import * as React from "react";
import { connect } from "react-redux";
import { Action, bindActionCreators, Dispatch } from "redux";
import { Button, Container, Grid, Header, Icon, Modal } from "semantic-ui-react";
import ItemView from "../items";
import { AppModel } from "../models/app";
import { Intent } from "../models/intent";
import { DeleteIntent, deleteIntent, IntentSelected, intentSelected, loadAppIntents, LoadAppIntents } from "./actions";
import IntentsForm from "./intentsform";

type IntentsOwnProps = React.Props<any> & {};
type IntentsProps = IntentsOwnProps & {
  app: AppModel;
  intents: Intent[];
  loadAppIntents: (app: AppModel | string) => LoadAppIntents;
  deleteIntent: (i: Intent) => DeleteIntent;
  intentSelected: (intent: Intent) => IntentSelected;
  pushRoute: (location: Path) => Action;
};

type IntentsState = {
  createMode: boolean;
  deleteMode: string;
};

class Intents extends React.Component<IntentsProps, IntentsState> {
  constructor(props) {
    super(props);
    this.state = {
      createMode: false,
      deleteMode: ""
    };
  }

  componentWillMount() {
    if (!this.props.app) {
      // Handles refresh on pages
      this.props.pushRoute("/");
    }
    this.props.loadAppIntents(this.props.app);
  }

  onIntentSelected(intent: Intent) {
    this.props.intentSelected(intent);
  }

  confirmIntentDelete(i: Intent, idx: number) {
    let modalId = `confirm-delete-${idx}`
    return (
      <Modal
        trigger={
          <Button basic onClick={(e,d) => this.setState({ deleteMode: modalId })}>
            <Icon name="trash" />Delete
          </Button>
        }
        basic
        open={this.state.deleteMode === modalId}
        size="small"
      >
        <Header icon="archive" content="Are you sure ?" />
        <Modal.Content>
          <p>
            By deleting { i.name }, you are also deleting all of this intent's
            examples.
          </p>
        </Modal.Content>
        <Modal.Actions>
          <Button basic color="red" inverted onClick={(e,d) => {
            this.props.deleteIntent(i);
            this.setState({ deleteMode: "" })
          }}>
            <Icon name="remove" /> Yes, remove { i.name } and all its examples
          </Button>
          <Button color="green" inverted onClick={(e,d) => this.setState( { deleteMode: "" })}>
            <Icon name="checkmark" /> No, I want to keep { i.name }
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }

  renderIntents() {
    var empty = (
      <Header as="h3">
        <Icon name="coffee" color="violet" />
        <Header.Content>No intents created for this app</Header.Content>
        <Header.Subheader>
          You can create a new intent by using "Add Intent" button
        </Header.Subheader>
      </Header>
    );
    return (
      <ItemView
        renderItem={(intent, idx) => (
          <Grid>
            <Grid.Column width="12">
              <a onClick={e => this.onIntentSelected(intent)}>{intent.name}</a>
            </Grid.Column>
            <Grid.Column width="4">
              <Button.Group>
                <Button disabled basic color="black">
                  <Icon name="edit" />Edit
                </Button>
                { this.confirmIntentDelete(intent, idx) }
              </Button.Group>
            </Grid.Column>
          </Grid>
        )}
        data={this.props.intents}
        emptyDataMessage={empty}
      />
    );
  }

  renderIntentForm() {
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
            <Icon name="plus" color="black" />New Intent
          </Button>
        }
        open={this.state.createMode}
        onClose={(e, d) => this.setState({ createMode: false })}
        closeOnEscape={false}
        closeOnTriggerBlur
      >
        <Modal.Header>New Intent</Modal.Header>
        <Modal.Content>
          <IntentsForm
            onCreateSubmit={intent => this.setState({ createMode: false })}
            beforeCreate={pl => ({ ...pl, appId: this.props.app._id })}
          />
        </Modal.Content>
      </Modal>
    );
  }

  render() {
    return (
      <Container fluid>
        {this.renderIntentForm()}
        {this.renderIntents()}
      </Container>
    );
  }
}

const mapStateToProps = (state: any, ownProps: IntentsOwnProps) => ({
  app: state.apps.selected,
  intents: state.intents.all
});
const mapDispatcherToProps = (dispatch: Dispatch) => ({
  loadAppIntents: bindActionCreators(loadAppIntents, dispatch),
  intentSelected: bindActionCreators(intentSelected, dispatch),
  deleteIntent: bindActionCreators(deleteIntent, dispatch),
  pushRoute: bindActionCreators(push, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatcherToProps
)(Intents);
