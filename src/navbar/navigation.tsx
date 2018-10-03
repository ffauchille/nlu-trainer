import { push } from "connected-react-router";
import { Path } from "history";
import * as React from "react";
import { connect } from "react-redux";
import { Action, bindActionCreators, Dispatch } from "redux";
import { Breadcrumb } from "semantic-ui-react";
import { UnselectApp, unselectApp } from "../apps/actions";
import { UnselectCategory, unselectCategory } from "../categories/actions";
import { UnselectIntent, unselectIntent } from "../intents/actions";
import { AppModel } from "../models/app";
import { Category } from "../models/category";
import { Intent } from "../models/intent";
import { StoreState } from "../reducers";
import { serializeName } from "../utils";

type NavigationOwnProps = React.Props<any> & {};

type NavigationActionDispatch = {
  pushRoute: (location: Path) => Action;

  unselectApp: () => UnselectApp;
  unselectIntent: () => UnselectIntent;
  unselectCategory: () => UnselectCategory;
};
type NavigationStore = {
  appSelected?: AppModel;
  categorySelected?: Category;
  intentSelected?: Intent;
  testingApp?: AppModel;
};

type NavigationProps = NavigationOwnProps &
  NavigationActionDispatch &
  NavigationStore;

type NavigationState = {};

const divider = (cpt: number) => (
  <Breadcrumb.Divider key={`divider ${cpt}`}>/</Breadcrumb.Divider>
);

class Navigation extends React.Component<NavigationProps, NavigationState> {
  render() {
    var sections = [
      <Breadcrumb.Section
        key="root-section"
        link={this.props.appSelected !== undefined}
        active={this.props.appSelected === undefined}
        onClick={(e, d) => {
          this.props.pushRoute("/");
          this.props.unselectApp();
          this.props.unselectIntent();
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
            this.props.pushRoute("/" + serializeName(appName));
            this.props.unselectCategory();
          }}
        >
          {appName}
        </Breadcrumb.Section>
      );
      if (this.props.categorySelected) {
        let categoryName = this.props.categorySelected.name;
        sections.push(
          divider(2),
          <Breadcrumb.Section
            key="category-link-section"
            link
            onClick={(e, d) => {
              this.props.pushRoute(
                "/" + serializeName(appName) + "/" + serializeName(categoryName)
              );
              this.props.unselectIntent();
            }}
          >
            {categoryName}
          </Breadcrumb.Section>
        );
        if (this.props.intentSelected) {
          let intentName = this.props.intentSelected.name;
          sections.push(
            divider(3),
            <Breadcrumb.Section
              key="intent-link-section"
              link
              onClick={(e, d) =>
                this.props.pushRoute(
                  "/" + serializeName(appName) + "/" + serializeName(categoryName)
                ) +
                "/" +
                serializeName(intentName)
              }
            >
              {intentName}
            </Breadcrumb.Section>,
            divider(4),
            <Breadcrumb.Section key="examples-section" active>
              Examples
            </Breadcrumb.Section>
          );
        } else {
          sections.push(
            divider(4),
            <Breadcrumb.Section key="intent-section" active>
              Intents
            </Breadcrumb.Section>
          );
        }
      }
    }
    if (this.props.testingApp) {
      sections.push(
        divider(1),
        <Breadcrumb.Section key="testbox-app-section" active link={false}>
          {this.props.testingApp.name}
        </Breadcrumb.Section>
      );
    }
    return <Breadcrumb size="large">{sections}</Breadcrumb>;
  }
}

const mapStateToProps = (state: StoreState, ownProps: NavigationOwnProps) => ({
  appSelected: state.apps.selected,
  intentSelected: state.intents.selected,
  testingApp: state.testbox.app,
  categorySelected: state.category.selected
});
const mapDispatcherToProps = (dispatch: Dispatch) => ({
  pushRoute: bindActionCreators(push, dispatch),
  unselectApp: bindActionCreators(unselectApp, dispatch),
  unselectIntent: bindActionCreators(unselectIntent, dispatch),
  unselectCategory: bindActionCreators(unselectCategory, dispatch)
});

export default connect<
  NavigationStore,
  NavigationActionDispatch,
  NavigationOwnProps,
  StoreState
>(
  mapStateToProps,
  mapDispatcherToProps
)(Navigation);
