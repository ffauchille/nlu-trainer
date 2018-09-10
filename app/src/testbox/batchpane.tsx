import * as React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

type BatchPaneOwnProps = React.Props<any> & {}
type BatchPaneProps = BatchPaneOwnProps & {}

type BatchPaneState = {}

class BatchPane extends React.Component<BatchPaneProps, BatchPaneState> {
  render() {
        return <div>Batch pane</div>;
  }
}

const mapStateToProps = (state, ownProps: BatchPaneOwnProps) => ({});

const mapDispatcherToProps = (dispatch) => ({
    //dispatchFn: bindActionCreators(dispatchFn, dispatch)
});

export default connect(mapStateToProps, mapDispatcherToProps)(BatchPane)