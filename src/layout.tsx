import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { Container } from "semantic-ui-react";
import HeadBar from "./navbar/headbar";
import Navigation from "./navbar/navigation";

type LayoutOwnProps = React.Props<any> & {};
type LayoutProps = LayoutOwnProps & {};
type LayoutState = {};

class Layout extends React.Component<LayoutProps, LayoutState> {
  render() {
    return (
      <Container>
        <HeadBar />
        <Container className="content-window">
          <Navigation />
          <div style={{marginTop: "3em"}}>{this.props.children}</div>
        </Container>
      </Container>
    );
  }
}

const mapStateToProps = (state: any, ownProps: LayoutOwnProps) => ({});
const mapDispatcherToProps = (dispatch: Dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatcherToProps
)(Layout);
