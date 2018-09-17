import { push } from "connected-react-router";
import { Path } from "history";
import * as React from "react";
import { connect } from "react-redux";
import { Action, bindActionCreators } from "redux";
import { Grid, Label, Radio, Menu } from "semantic-ui-react";
import { AppModel } from "../models/app";
import { StoreState } from "../reducers";
import BatchPane from "./batchpane";
import LivePane from "./livepane";

type TestBoxOwnProps = React.Props<any> & {};
type TestBoxProps = TestBoxOwnProps & {
  app?: AppModel;

  pushRoute: (location: Path) => Action;
};

type TestBoxState = {
  active: "Live" | "Batch";
};

class TestBox extends React.Component<TestBoxProps, TestBoxState> {
  constructor(props) {
    super(props);
    this.state = {
      active: "Live"
    };
  }

  get app(): AppModel { 
    return this.props.app || { _id: "", name: "", type: "RASA" }
  }

  componentWillMount() {
    if (!this.props.app) {
      this.props.pushRoute("/");
    }
  }

  renderContent() {
    var elem = <span />;
    if (this.state.active === "Batch") {
      elem = <BatchPane />;
    }
    if (this.state.active === "Live") {
      elem = <LivePane app={this.app}/>;
    }
    return elem;
  }

  render() {
    return (
      <Grid>
        <Grid.Row>
        <Menu pointing secondary color="violet">
          <Menu.Item
            name="Live"
            active={this.state.active === "Live"}
            onClick={(e, d) => this.setState({ active: "Live" })}
          />
          <Menu.Item
            name="Batch"
            active={this.state.active === "Batch"}
            onClick={(e, d) => this.setState({ active: "Batch" })}
          />
        </Menu>
        </Grid.Row>
        <Grid.Row>{this.renderContent()}</Grid.Row>
      </Grid>
    );
  }
}

const mapStateToProps = (state: StoreState, ownProps: TestBoxOwnProps) => ({
  app: state.testbox.app
});

const mapDispatcherToProps = dispatch => ({
  pushRoute: bindActionCreators(push, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatcherToProps
)(TestBox);
