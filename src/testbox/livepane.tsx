import * as React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Grid, Input, Icon, Label, Loader } from "semantic-ui-react";
import { AppModel } from "../models/app";
import { predict, Predict } from "./actions";
import { ChatMessage } from "./reducer";
import { StoreState } from "../reducers";

const borderColor = "1px solid rgba(100, 53, 201, .4)";

type LivePaneOwnProps = React.Props<any> & {
  app: AppModel;
};

type LivePaneProps = LivePaneOwnProps & {
  predict: (app: AppModel, text: string) => Predict;
  messageLog: ChatMessage[];
  predicting: boolean;
};

type LivePaneState = {
  userInput: string;
};

class LivePane extends React.Component<LivePaneProps, LivePaneState> {
  constructor(props) {
    super(props);
    this.state = {
      userInput: ""
    };
  }

  onPredict() {
    this.setState({ userInput: "" });
    this.props.predict(this.props.app, this.state.userInput);
  }

  renderChatMessage(chatMessage: ChatMessage, idx: number) {
    var elem = <span />;
    if (chatMessage.type === "predict") {
      // user message
      elem = (
        <div
          key={`chat-message-${idx}`}
          style={{
            width: "100%",
            textAlign: "left",
            paddingLeft: "5%"
          }}
        >
          <Icon name="user" color="black" />
          <Label basic pointing="left">
            {chatMessage.text}
          </Label>
        </div>
      );
    } else if (chatMessage.type === "prediction") {
      elem = (
        <div
          key={`chat-message-${idx}`}
          style={{
            width: "100%",
            textAlign: "right",
            paddingRight: "5%"
          }}
        >
          <Label basic pointing="right">
            {chatMessage.text + " "}{" "}
            <Label color="violet">{(chatMessage.score || -1).toFixed(2)}</Label>
          </Label>
          <Icon name="code branch" color="black" />
        </div>
      );
    }
    return elem;
  }

  renderInput() {
    return (
      <input
        style={{
          height: "2em",
          width: "100%",
          border: "none",
          color: "rgba(0,0,0,.6)",
          outline: "none"
        }}
        value={this.state.userInput}
        type="text"
        placeholder="Say something..."
        onSubmit={e => this.onPredict()}
        onKeyPress={e => {
          if (e.key.toLowerCase().trim() === "enter") {
            this.onPredict();
          }
        }}
        onChange={e => this.setState({ userInput: e.currentTarget.value })}
      />
    );
  }

  render() {
    return (
      <Grid
        style={{
          width: "100%",
          padding: "4em 25% 0% 25%"
        }}
      >
        <Grid.Row style={{ backgroundColor: "#6435c9", color: "whitesmoke" }}>
          <Grid.Column textAlign="center">{this.props.app.name}</Grid.Column>
        </Grid.Row>
        <Grid.Row
          style={{
            height: "350px",
            overflowY: "scroll",
            borderLeft: borderColor
          }}
        >
          {this.props.messageLog.map(this.renderChatMessage)}
        </Grid.Row>
        <Grid.Row
          style={{
            border: borderColor,
            paddingLeft: "5%"
          }}
        >
        { this.props.predicting ? <Loader size="large" active /> : this.renderInput() }
        </Grid.Row>
      </Grid>
    );
  }
}

const mapStateToProps = (state: StoreState, ownProps: LivePaneOwnProps) => ({
  app: ownProps.app,
  messageLog: state.testbox.live.messageLog,
  predicting: state.testbox.live.predicting
});

const mapDispatcherToProps = dispatch => ({
  predict: bindActionCreators(predict, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatcherToProps
)(LivePane);
