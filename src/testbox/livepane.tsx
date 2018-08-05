import * as React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

type LivePaneOwnProps = React.Props<any> & {}
type LivePaneProps = LivePaneOwnProps & {}

type LivePaneState = {}

class LivePane extends React.Component<LivePaneProps, LivePaneState> {
  render() {
        return <div>Live pane</div>;
  }
}

const mapStateToProps = (state, ownProps: LivePaneOwnProps) => ({});

const mapDispatcherToProps = (dispatch) => ({
    //dispatchFn: bindActionCreators(dispatchFn, dispatch)
});

export default connect(mapStateToProps, mapDispatcherToProps)(LivePane)