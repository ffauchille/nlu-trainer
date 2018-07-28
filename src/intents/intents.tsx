import * as React from "react";
import { connect, Dispatch } from "react-redux";
import { Grid, Container, Header, Button, Item, Icon } from "semantic-ui-react";
import { AppModel } from "../models/app";
import { bindActionCreators } from "redux";
import { loadAppIntents, LoadAppIntents } from "./actions";
import { Intent } from "../models/intent";
import ItemView from "../items";

type IntentsOwnProps = React.Props<any> & {};
type IntentsProps = IntentsOwnProps & {
  app: AppModel;
  intents: Intent[];
  loadAppIntents: (app: AppModel) => LoadAppIntents;
};
type IntentsState = {};

class Intents extends React.Component<IntentsProps, IntentsState> {
  componentWillMount() {
    this.props.loadAppIntents(this.props.app);
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
            <Grid.Column width="12">{intent.name}</Grid.Column>
            <Grid.Column width="4">
              <Button.Group>
                <Button basic color="black">
                  <Icon name="edit" />Edit
                </Button>
                <Button basic colot="black">
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

  render() {
    return (
      <Container fluid>
        <Button basic color="black" floated="right">
          <Icon name="plus" />New Intent
        </Button>
        <br />
        {this.renderIntents()}
      </Container>
    );
  }
}

const mapStateToProps = (state: any, ownProps: IntentsOwnProps) => ({
  app: state.apps.selected,
  intents: state.intents.appIntents
});
const mapDispatcherToProps = (dispatch: Dispatch) => ({
  loadAppIntents: bindActionCreators(loadAppIntents, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatcherToProps
)(Intents);
