import * as React from "react";
import { Container, SegmentGroup, Segment, Grid, Header, Statistic } from "semantic-ui-react";
import { Intent } from "../models/Intent";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { addUtterance } from "./actions";


type TrainerOwnProps = {

}

type TrainerProps = React.Props<any> & {
    intents: Intent[]
}

class Trainer extends React.Component<TrainerProps, {}> {
  

  renderIntent(intent: Intent) {
      return (
          <Segment>
              <Grid centered columns={2}>
              <Grid.Row>
                <Grid.Column width={14}>
                    <Header as="h3" color="blue">Intent.Name</Header>
                </Grid.Column>
                <Grid.Column width={2}>
                    <Statistic color={intent.utterances.length < 5 ? "red" : "green"}>
                        <Statistic.Value>{intent.utterances.length}</Statistic.Value>
                        <Statistic.Label>Trained phrases</Statistic.Label>
                    </Statistic>
                </Grid.Column>
            </Grid.Row>
            </Grid>
          </Segment>
      )
  }

  render() {
    return (
    <Container>
        {/** Multiselect intent */}
        <SegmentGroup>
            {
                
            }
        </SegmentGroup>
    </Container>);
  }
}

const mapStateToProps = (state: any, ownProps: TrainerOwnProps) => ({
    intents: state.trainer.intents
})

const mapDispatcherToProps = (dispatch: Dispatch) => ({
    addUtterrance: bindActionCreators(addUtterance, dispatch)
})

export default connect(mapStateToProps, mapDispatcherToProps)(Trainer)
