import * as React from "react";
import { connect, Dispatch } from "react-redux";
import { push } from "connected-react-router";
import { bindActionCreators } from "../../node_modules/redux";
import { loadApps, LoadApps, appSelected, AppSelected } from "./actions";
import { AppModel } from "../models/app";
import {
  Grid,
  Container,
  Header,
  Button,
  Item,
  Icon,
  Modal
} from "semantic-ui-react";
import { StoreState } from "../reducers";
import ItemsView from "../items";
import AppsForm from "./appsform";

type AppsOwnProps = React.Props<any> & {};
type AppsProps = AppsOwnProps & {
  apps: AppModel[];
  loadApps: () => LoadApps;
  appSelected: (app: AppModel) => AppSelected;
  pushRoute: any;
};
type AppsState = {
  createMode: boolean;
};

class Apps extends React.Component<AppsProps, AppsState> {
  constructor(props) {
    super(props);
    this.state = {
      createMode: false
    };
  }

  componentWillMount() {
    this.props.loadApps();
  }

  onAppSelected(app: AppModel) {
    this.props.appSelected(app);
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
          <AppsForm  onCreateSubmit={app => this.setState({ createMode: false })} />
        </Modal.Content>
      </Modal>
    );
  }

  render() {
    return (
      <Container fluid>
        { this.renderAppsFormModal() }
        <ItemsView
          renderItem={(app: AppModel) => (
            <Item.Content>
              <Grid>
                <Grid.Column width="6">
                  <Header size="small">
                    <a onClick={e => this.onAppSelected(app)}>{app.name}</a>
                  </Header>
                </Grid.Column>
                <Grid.Column width="6">
                  <Icon name="check" color="green" /> Ready
                </Grid.Column>
                <Grid.Column width="4">
                  <Button basic color="black">
                    <Icon name="settings" color="black" />
                    Train
                  </Button>
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
  apps: state.apps.all
});
const mapDispatcherToProps = (dispatch: Dispatch) => ({
  loadApps: bindActionCreators(loadApps, dispatch),
  appSelected: bindActionCreators(appSelected, dispatch),
  pushRoute: bindActionCreators(push, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatcherToProps
)(Apps);
