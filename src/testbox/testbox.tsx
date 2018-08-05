import * as React from "react";
import { bindActionCreators, Action } from "redux";
import { connect } from "react-redux";
import { Container, Menu, Header, Radio, Label, Grid } from "semantic-ui-react";
import LivePane from "./livepane";
import BatchPane from "./batchpane";
import { StoreState } from "../reducers";
import { AppModel } from "../models/app";
import { push } from "connected-react-router";
import { LocationState, LocationDescriptor } from "history";

type TestBoxOwnProps = React.Props<any> & {};
type TestBoxProps = TestBoxOwnProps & {
  app?: AppModel;

  pushRoute: (location: LocationDescriptor, state?: LocationState) => Action;
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
      elem = <LivePane />;
    }
    return elem;
  }

  radioColor(item: string) {
    return this.state.active === item ? "violet" : "black";
  }

  render() {
    return (
      <Grid>
        <Grid.Row>
          <Grid.Column width="7" textAlign="right">
            <Label basic color={this.radioColor("Live")} onClick={(e,d) => this.setState({ active: 'Live' })}>
              Live
            </Label>
          </Grid.Column>
          <Grid.Column width="2" textAlign="center">
            <Radio
              onClick={(e, d) =>
                this.setState({
                  active: this.state.active === "Live" ? "Batch" : "Live"
                })
              }
              slider
              checked={this.state.active === "Batch"}
            />
          </Grid.Column>
          <Grid.Column width="7" textAlign="left">
            <Label basic color={this.radioColor("Batch")} onClick={(e,d) => this.setState({ active: 'Batch' })}>
              Batch
            </Label>
          </Grid.Column>
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
