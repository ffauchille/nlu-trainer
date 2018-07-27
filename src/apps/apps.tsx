import * as React from "react";
import { connect, Dispatch } from "react-redux";
import { push, RouterAction } from "react-router-redux";
import { bindActionCreators } from "../../node_modules/redux";
import { loadApps, LoadApps, appSelected, AppSelected } from "./actions";
import { AppModel } from "../models/app";
import { Grid, Container, Header, Button, Item, Icon } from "semantic-ui-react";
import { StoreState } from "../reducers";
import { LocationState, LocationDescriptor } from "history";
import ItemsView from "../items";

type AppsOwnProps = React.Props<any> & {};
type AppsProps = AppsOwnProps & {
  apps: AppModel[];
  loadApps: () => LoadApps;
  appSelected: (app: AppModel) => AppSelected;
  pushRoute: (
    location: LocationDescriptor,
    state?: LocationState
  ) => RouterAction;
};
type AppsState = {};

class Apps extends React.Component<AppsProps, AppsState> {
  componentWillMount() {
    this.props.loadApps();
  }

  onAppSelected(app: AppModel) {
    this.props.appSelected(app);
  }

  render() {
    return (
      <Container fluid>
        <Button basic color="black" floated="right" onClick={(e,d) => {}}><Icon name="plus" color="black"/>New app</Button>
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
                  <Button basic icon="setting" color="black">
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
