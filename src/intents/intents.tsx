import { push } from "connected-react-router";
import { Path } from "history";
import * as React from "react";
import { connect } from "react-redux";
import { Action, bindActionCreators, Dispatch } from "redux";
import { Button, Container, Grid, Header, Icon, Menu, Modal, Label } from "semantic-ui-react";
import ItemView from "../items";
import { AppModel } from "../models/app";
import { Entity } from "../models/entity";
import { Intent } from "../models/intent";
import { deleteEntity, DeleteEntity, DeleteIntent, deleteIntent, IntentSelected, intentSelected, LoadAppEntities, loadAppEntities, loadAppIntents, LoadAppIntents } from "./actions";
import EntitiesForm from "./entitiesForm";
import IntentsForm from "./intentsform";

type IntentsOwnProps = React.Props<any> & {};
type IntentsProps = IntentsOwnProps & {
  app: AppModel;
  intents: Intent[];
  entities: Entity[];
  loadAppIntents: (app: AppModel | string) => LoadAppIntents;
  loadAppEntities: (app: AppModel | string) => LoadAppEntities;
  
  deleteIntent: (i: Intent) => DeleteIntent;
  deleteEntity: (i: Entity) => DeleteEntity;
  intentSelected: (intent: Intent) => IntentSelected;
  pushRoute: (location: Path) => Action;
};

type IntentsState = {
  createIntentMode: boolean;
  createEntityMode: boolean;
  viewSelected: ViewName;
  deleteMode: string;
  deleteEntityMode: string;
};

type ViewName = "Entity" | "Intent";

class Intents extends React.Component<IntentsProps, IntentsState> {
  constructor(props) {
    super(props);
    this.state = {
      createIntentMode: false,
      createEntityMode: false,
      viewSelected: "Intent",
      deleteMode: "",
      deleteEntityMode: ""
    };
  }

  componentWillMount() {
    if (!this.props.app) {
      // Handles refresh on pages
      this.props.pushRoute("/");
    }
    this.props.loadAppIntents(this.props.app);
    this.props.loadAppEntities(this.props.app);
  }

  onIntentSelected(intent: Intent) {
    this.props.intentSelected(intent);
  }

  confirmIntentDelete(i: Intent, idx: number) {
    let modalId = `confirm-delete-${idx}`;
    return (
      <Modal
        trigger={
          <Button
            basic
            onClick={(e, d) => this.setState({ deleteMode: modalId })}
          >
            <Icon name="trash" />
            Delete
          </Button>
        }
        basic
        open={this.state.deleteMode === modalId}
        size="small"
      >
        <Header icon="archive" content="Are you sure ?" />
        <Modal.Content>
          <p>
            By deleting {i.name}, you are also deleting all of this intent's
            examples.
          </p>
        </Modal.Content>
        <Modal.Actions>
          <Button
            basic
            color="red"
            inverted
            onClick={(e, d) => {
              this.props.deleteIntent(i);
              this.setState({ deleteMode: "" });
            }}
          >
            <Icon name="remove" /> Yes, remove {i.name} and all its examples
          </Button>
          <Button
            color="green"
            inverted
            onClick={(e, d) => this.setState({ deleteMode: "" })}
          >
            <Icon name="checkmark" /> No, I want to keep {i.name}
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }

  confirmEntityDelete(ety: Entity, idx: number) {
    let modalId = `confirm-delete-entity-${idx}`;
    return (
      <Modal
        trigger={
          <Button
            basic
            onClick={(e, d) => this.setState({ deleteEntityMode: modalId })}
          >
            <Icon name="trash" />
            Delete
          </Button>
        }
        basic
        open={this.state.deleteEntityMode === modalId}
        size="small"
      >
        <Header icon="archive" content="Arch !?" />
        <Modal.Content>
          <p>
            Do you confirm deletion of entity {ety.value}?
          </p>
        </Modal.Content>
        <Modal.Actions>
          <Button
            basic
            color="red"
            inverted
            onClick={(e, d) => {
              this.props.deleteEntity(ety);
              this.setState({ deleteEntityMode: "" });
            }}
          >
            <Icon name="remove" /> Yes, remove {ety.value}
          </Button>
          <Button
            color="green"
            inverted
            onClick={(e, d) => this.setState({ deleteMode: "" })}
          >
            <Icon name="checkmark" /> No, I want to keep {ety.value}
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
                  <Icon name="edit" />
                  Edit
                </Button>
                {this.confirmIntentDelete(intent, idx)}
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
            onClick={(e, d) => this.setState({ createIntentMode: true })}
          >
            <Icon name="plus" color="black" />
            New Intent
          </Button>
        }
        open={this.state.createIntentMode}
        onClose={(e, d) => this.setState({ createIntentMode: false })}
        closeOnEscape={false}
        closeOnTriggerBlur
      >
        <Modal.Header>New Intent</Modal.Header>
        <Modal.Content>
          <IntentsForm
            onCreateSubmit={intent =>
              this.setState({ createIntentMode: false })
            }
            beforeCreate={pl => ({ ...pl, appId: this.props.app._id })}
          />
        </Modal.Content>
      </Modal>
    );
  }

  renderEntityForm() {
    return (
      <Modal
        size="small"
        trigger={
          <Button
            basic
            color="black"
            floated="right"
            onClick={(e, d) => this.setState({ createEntityMode: true })}
          >
            <Icon name="plus" color="black" />
            New Entity
          </Button>
        }
        open={this.state.createEntityMode}
        onClose={(e, d) => this.setState({ createEntityMode: false })}
        closeOnEscape={false}
        closeOnTriggerBlur
      >
        <Modal.Header>New Entity</Modal.Header>
        <Modal.Content>
          Set up an entity for this application. You can also set synonyms.
          <EntitiesForm
            onCreateSubmit={ety => this.setState({ createEntityMode: false })}
            beforeCreate={pl => ({ ...pl, appId: this.props.app._id, synonyms: pl.synonyms.split(/;\s*/) })}
          />
        </Modal.Content>
      </Modal>
    );
  }

  renderEntities() {
    var empty = (
      <Header as="h3">
        <Icon name="coffee" color="violet" />
        <Header.Content>No Entites created for this app</Header.Content>
        <Header.Subheader>
          You can create a new entity by using "Add Entity" button
        </Header.Subheader>
      </Header>
    );
    return (
      <ItemView
        renderItem={(entity, idx) => (
          <Grid>
            <Grid.Column width="4">
              <Label color="violet">{entity.value}</Label>
            </Grid.Column>
            <Grid.Column width="8">
              Synonyms: {entity.synonyms.map((synonym, i) => <Label basic key={`entity-synonym-for-${entity.value}-${i}`}>{synonym}</Label>)}
            </Grid.Column>
            <Grid.Column width="4">
              <Button.Group>
                <Button disabled basic color="black">
                  <Icon name="edit" />
                  Edit
                </Button>
                {this.confirmEntityDelete(entity, idx)}
              </Button.Group>
            </Grid.Column>
          </Grid>
        )}
        data={this.props.entities}
        emptyDataMessage={empty}
      />
    );
  }

  renderContent() {
    var elem = (
      <React.Fragment>
        {this.renderIntentForm()}
        {this.renderIntents()}
      </React.Fragment>
    );
    if (this.state.viewSelected === "Entity") {
      elem = (
        <React.Fragment>
          {this.renderEntityForm()}
          {this.renderEntities()}
        </React.Fragment>
      );
    }

    return elem;
  }

  render() {
    return (
      <Container fluid>
        <Menu pointing secondary color="violet">
          <Menu.Item
            name="Intents"
            active={this.state.viewSelected === "Intent"}
            onClick={(e, d) => this.setState({ viewSelected: "Intent" })}
          />
          <Menu.Item
            name="Entities"
            active={this.state.viewSelected === "Entity"}
            onClick={(e, d) => this.setState({ viewSelected: "Entity" })}
          />
        </Menu>
        {this.renderContent()}
      </Container>
    );
  }
}

const mapStateToProps = (state: any, ownProps: IntentsOwnProps) => ({
  app: state.apps.selected,
  intents: state.intents.all,
  entities: state.intents.entities
});
const mapDispatcherToProps = (dispatch: Dispatch) => ({
  loadAppIntents: bindActionCreators(loadAppIntents, dispatch),
  loadAppEntities: bindActionCreators(loadAppEntities, dispatch),
  intentSelected: bindActionCreators(intentSelected, dispatch),
  deleteIntent: bindActionCreators(deleteIntent, dispatch),
  deleteEntity: bindActionCreators(deleteEntity, dispatch),
  pushRoute: bindActionCreators(push, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatcherToProps
)(Intents);
