
import * as React from "react";
import { connect, Dispatch } from "react-redux";
import { Breadcrumb } from "semantic-ui-react";
import { AppModel } from "../models/app";
import { Intent } from "../models/intent";
import { bindActionCreators, Action } from "redux";
import { push } from "connected-react-router";
import { LocationState, LocationDescriptor } from "history";
import { StoreState } from "../reducers";
import { UnselectApp, unselectApp } from "../apps/actions";
import { UnselectIntent, unselectIntent } from "../intents/actions";
import { urlify } from "../utils";

type NavigationOwnProps = React.Props<any> & {};

type NavigationProps = NavigationOwnProps & {
  appSelected?: AppModel;
  intentSelected?: Intent;
  testingApp?: AppModel;

  pushRoute: (
    location: LocationDescriptor,
    state?: LocationState
  ) => Action;

  unselectApp: () => UnselectApp;
  unselectIntent: () => UnselectIntent;
};
type NavigationState = {};

const divider = (cpt: number) => <Breadcrumb.Divider key={`divider ${cpt}`}>/</Breadcrumb.Divider>;

class Navigation extends React.Component<NavigationProps, NavigationState> {
  render() {
    var sections = [
      <Breadcrumb.Section
        key="root-section"
        link={this.props.appSelected !== undefined}
        active={this.props.appSelected === undefined}
        onClick={(e, d) => { 
          this.props.pushRoute("/")
          this.props.unselectApp()
          this.props.unselectIntent()
        }}
      >
        My Apps
      </Breadcrumb.Section>
    ];
    if (this.props.appSelected) {
      let appName = this.props.appSelected.name;
      sections.push(
        divider(1),
        <Breadcrumb.Section
          key="app-section"
          link
          onClick={(e, d) => { 
            this.props.pushRoute("/" + urlify(appName))
            this.props.unselectIntent()
          }}
        >
          {appName}
        </Breadcrumb.Section>
      );
      if (this.props.intentSelected) {
        let intentName = this.props.intentSelected.name;
        sections.push(
          divider(2),
          <Breadcrumb.Section
            key="intent-link-section"
            link
            onClick={(e, d) => this.props.pushRoute("/" + urlify(appName) + "/" + urlify(intentName))}
          >
            {intentName}
          </Breadcrumb.Section>,
          divider(3),
          <Breadcrumb.Section key="examples-section" active>Examples</Breadcrumb.Section>
        );
      } else {
        sections.push(
          divider(4),
          <Breadcrumb.Section key="intent-section" active>Intents</Breadcrumb.Section>
        );
      }
    }
    if (this.props.testingApp) {
      sections.push(
        divider(1),
      <Breadcrumb.Section key="testbox-app-section" active link={false}>{this.props.testingApp.name}
      </Breadcrumb.Section>)
    }
    return <Breadcrumb size="large">{sections}</Breadcrumb>;
  }
}

const mapStateToProps = (state: StoreState, ownProps: NavigationOwnProps) => ({
    appSelected: state.apps.selected,
    intentSelected: state.intents.selected,
    testingApp: state.testbox.app
});
const mapDispatcherToProps = (dispatch: Dispatch) => ({
  pushRoute: bindActionCreators(push, dispatch),
  unselectApp: bindActionCreators(unselectApp, dispatch),
  unselectIntent: bindActionCreators(unselectIntent, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatcherToProps
)(Navigation);
