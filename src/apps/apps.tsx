import * as React from "react";
import { connect, Dispatch } from "react-redux";
import { bindActionCreators } from "../../node_modules/redux";
import { loadApps, LoadApps, appSelected, AppSelected, StartAppTraining, startAppTraining, DeleteApp, deleteApp } from "./actions";
import { AppModel, AppModelType, AppStatus } from "../models/app";
import {
  Grid,
  Container,
  Header,
  Button,
  Item,
  Icon,
  Image,
  Modal
} from "semantic-ui-react";
import { StoreState } from "../reducers";
import ItemsView from "../items";
import AppsForm from "./appsform";
import Status from "./appstatus";

type AppsOwnProps = React.Props<any> & {};
type AppsProps = AppsOwnProps & {
  apps: AppModel[];
  appsOnTraining: AppModel[];
  loadApps: () => LoadApps;
  deleteApp: (app: AppModel) => DeleteApp;
  appSelected: (app: AppModel) => AppSelected;
  startAppTraining: (app: AppModel) => StartAppTraining
};
type AppsState = {
  createMode: boolean;
  deleteMode: boolean;
};

class Apps extends React.Component<AppsProps, AppsState> {
  constructor(props) {
    super(props);
    this.state = {
      createMode: false,
      deleteMode: false
    };
  }

  componentWillMount() {
    this.props.loadApps();
  }

  onAppTrainning(app: AppModel) {
    this.props.startAppTraining(app)
  }

  onAppSelected(app: AppModel) {
    this.props.appSelected(app);
  }


  appIsTraining(app: AppModel): boolean {
    return this.props.appsOnTraining.findIndex(a => a._id === app._id) > -1;
  }

  renderConfirmDelete( app: AppModel ) {
    return (
      <Modal
        size="small"
        basic
        trigger={<Button basic disabled={this.appIsTraining(app)} onClick={(e,d) => this.setState( { deleteMode: true } )}><Icon name="trash" />Delete</Button>}
        open={ this.state.deleteMode }
        closeOnEscape
      >
      <Header icon="archive" content="Are you sure ?" />
        <Modal.Content>
          <p>
            By deleting { app.name }, you are also deleting all of its intents
          </p>
        </Modal.Content>
        <Modal.Actions>
          <Button basic color="red" inverted onClick={(e,d) => {
            this.props.deleteApp(app);
            this.setState({ deleteMode: false })
          }}>
            <Icon name="remove" /> Yes, remove { app.name} and all its intents
          </Button>
          <Button color="green" inverted onClick={(e,d) => this.setState( { deleteMode: false })}>
            <Icon name="checkmark" /> No, I want to keep { app.name }
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }

  renderAppsFormModal() {
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
            <Icon name="plus" color="black" />New app
          </Button>
        }
        open={this.state.createMode}
        onClose={(e, d) => this.setState({ createMode: false })}
        closeOnEscape={false}
        closeOnTriggerBlur
      >
        <Modal.Header>New App</Modal.Header>
        <Modal.Content>
          <AppsForm
            onCreateSubmit={app => this.setState({ createMode: false })}
          />
        </Modal.Content>
      </Modal>
    );
  }

  renderModelType(typ: AppModelType) {
    var elem;
    switch (typ) {
      case "RASA": {
        elem = <Image src="/images/rasa.png" centered inline size="mini" />
        break;
      }
      default: {
        elem = <Icon name="code" size="large" color="violet"/>
      }
    }
    return elem;
  }

  renderStatus(app: AppModel) {
    return <Status app={app} />
  }

  render() {
    return (
      <Container fluid>
        {this.renderAppsFormModal()}
        <ItemsView
          renderItem={(app: AppModel) => (
            <Item.Content>
              <Grid>
                <Grid.Column width="4">
                  <Header size="small">
                    <a onClick={_ => this.onAppSelected(app)}>{app.name}</a>
                  </Header>
                </Grid.Column>
                <Grid.Column width="4">
                  { this.renderModelType(app.type) }
                </Grid.Column>
                <Grid.Column width="3">
                  { this.renderStatus(app) }
                </Grid.Column>
                <Grid.Column width="5">
                  <Button disabled={this.appIsTraining(app)} onClick={(e,d) => this.onAppTrainning(app)} basic color="black">
                    <Icon name="settings" color="black" />
                    Train
                  </Button>
                  <Button.Group>
                    <Button basic disabled color="black"><Icon name="edit"/> Edit</Button>
                    {this.renderConfirmDelete(app)}
                  </Button.Group>
                </Grid.Column>
              </Grid>
            </Item.Content>
          )}
          data={this.props.apps}
          emptyDataMessage="No apps yet created"
        />
      </Container>
    );
  }
}

const mapStateToProps = (state: StoreState, ownProps: AppsOwnProps) => ({
  apps: state.apps.all,
  appsOnTraining: state.apps.onTraining
});
const mapDispatcherToProps = (dispatch: Dispatch) => ({
  loadApps: bindActionCreators(loadApps, dispatch),
  appSelected: bindActionCreators(appSelected, dispatch),
  startAppTraining: bindActionCreators(startAppTraining, dispatch),
  deleteApp: bindActionCreators(deleteApp, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatcherToProps
)(Apps);
