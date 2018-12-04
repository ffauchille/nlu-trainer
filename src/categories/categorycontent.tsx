import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import Intents from "../intents/intents";
import Examples from "../examples/examples";
import { Loader, Segment, Icon, Header } from "semantic-ui-react";
import { StoreState } from "../reducers";
import { Category } from "../models/category";
import { Intent } from "../models/intent";

type CategoryContentOwnProps = React.Props<any> & {
};
type CategoryContentProps = CategoryContentOwnProps & {
    category?: Category
    intent?: Intent
    loading: boolean;
};
type CategoryContentState = {};

class CategoryContent extends React.Component<
  CategoryContentProps,
  CategoryContentState
> {
  render() {
    let elem = (
      <Segment basic textAlign="center">
        <Header as="h3">
          Hint <Icon name="lightbulb" color="violet" /> Select a category to
          see its intents
        </Header>
      </Segment>
    );
    if (this.props.category) {
      if (this.props.loading) {
        elem = <Loader active size="big" />;
      } else {
        if (this.props.intent) {
          elem = <Examples intent={this.props.intent} />;
        } else {
          elem = <Intents category={this.props.category} />;
        }
      }
    }
    return elem;
  }
}

const mapStateToProps = (state: StoreState, ownProps: CategoryContentOwnProps) => ({
    loading: false, // state.category.loadingContent, TODO: investigate why infinite loop dispatching start / stop loading
    intent: state.intents.selected,
    category: state.category.selected
});
const mapDispatcherToProps = (dispatch: Dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatcherToProps
)(CategoryContent);
