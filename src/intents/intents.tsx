import * as React from "react";
import { connect, Dispatch } from "react-redux";
import { Grid, Container, Header, Button, Item, Icon, Modal } from "semantic-ui-react";
import { AppModel } from "../models/app";
import { bindActionCreators } from "redux";
import { loadAppIntents, LoadAppIntents, IntentSelected, intentSelected } from "./actions";
import { Intent } from "../models/intent";
import ItemView from "../items";
import IntentsForm from "./intentsform";

type IntentsOwnProps = React.Props<any> & {};
type IntentsProps = IntentsOwnProps & {
  app: AppModel;
  intents: Intent[];
  loadAppIntents: (app: AppModel | string) => LoadAppIntents;
  intentSelected: (intent: Intent) => IntentSelected
};
type IntentsState = {
  createMode: boolean;
};

class Intents extends React.Component<IntentsProps, IntentsState> {
  
  constructor(props) {
    super(props);
    this.state = {
      createMode: false
    }
  }
  
  componentWillMount() {
    this.props.loadAppIntents(this.props.app);
  }

  onIntentSelected(intent: Intent) {
    this.props.intentSelected(intent)
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
        renderItem={intent => (
          <Grid>
            <Grid.Column width="12"><a onClick={(e) => this.onIntentSelected(intent)}>{intent.name}</a></Grid.Column>
            <Grid.Column width="4">
              <Button.Group>
                <Button basic color="black">
                  <Icon name="edit" />Edit
                </Button>
                <Button basic>
                  <Icon name="trash" />Delete
                </Button>
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
    return <Modal
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
            beforeCreate={ pl => ({ ...pl, appId: this.props.app._id })}
          />
        </Modal.Content>
      </Modal>
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
  intentSelected: bindActionCreators(intentSelected, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatcherToProps
)(Intents);
