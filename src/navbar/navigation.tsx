import * as React from "react";
import { connect, Dispatch } from "react-redux";
import { Breadcrumb } from "semantic-ui-react";
import { AppModel } from "../models/app";
import { Intent } from "../models/Intent";
import { bindActionCreators } from "redux";
import { push, RouterAction } from "react-router-redux";
import { LocationState, LocationDescriptor } from "history";
import { StoreState } from "../reducers";
import { UnselectApp, unselectApp } from "../apps/actions";
import { UnselectIntent, unselectIntent } from "../intents/actions";
import { urlify } from "../utils";

type NavigationOwnProps = React.Props<any> & {};

type NavigationProps = NavigationOwnProps & {
  appSelected?: AppModel;
  intentSelected?: Intent;

  pushRoute: (
    location: LocationDescriptor,
    state?: LocationState
  ) => RouterAction;

  unselectApp: () => UnselectApp;
  unselectIntent: () => UnselectIntent;
};
type NavigationState = {};

const divider = <Breadcrumb.Divider>/</Breadcrumb.Divider>;

class Navigation extends React.Component<NavigationProps, NavigationState> {
  render() {
    var sections = [
      <Breadcrumb.Section
        link={this.props.appSelected !== undefined}
        active={this.props.appSelected === undefined}
        onClick={(e, d) => { 
          this.props.pushRoute("/apps")
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
        divider,
        <Breadcrumb.Section
          link
          onClick={(e, d) => { 
            this.props.pushRoute("/apps/" + urlify(appName))
            this.props.unselectIntent()
          }}
        >
          {appName}
        </Breadcrumb.Section>
      );
      if (this.props.intentSelected) {
        let intentName = this.props.intentSelected.name;
        sections.push(
          divider,
          <Breadcrumb.Section
            link
            onClick={(e, d) => this.props.pushRoute("/apps/" + urlify(appName) + "/" + urlify(intentName))}
          >
            {intentName}
          </Breadcrumb.Section>,
          divider,
          <Breadcrumb.Section active>Examples</Breadcrumb.Section>
        );
      } else {
        sections.push(
          divider,
          <Breadcrumb.Section active>Intents</Breadcrumb.Section>
        );
      }
    }
    return <Breadcrumb size="large">{sections}</Breadcrumb>;
  }
}

const mapStateToProps = (state: StoreState, ownProps: NavigationOwnProps) => ({
    appSelected: state.apps.selected,
    intentSelected: state.intents.selected
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
