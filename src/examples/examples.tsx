import * as React from 'react'
import { connect, Dispatch } from 'react-redux';
import { Grid, Container, Button, Icon } from "semantic-ui-react";
import ItemsView from '../items';
import { NLUExample } from '../models/example';
import { bindActionCreators } from '../../node_modules/redux';
import { loadIntentExample, LoadIntentExample } from './actions';
import { StoreState } from '../reducers';

type ExamplesOwnProps = React.Props<any> & {}
type ExamplesProps = ExamplesOwnProps & {
    examples: NLUExample[];

    loadExamples: () => LoadIntentExample;
}
type ExamplesState = {}


class Examples extends React.Component<ExamplesProps, ExamplesState> {

    componentWillMount() {
        this.props.loadExamples();
    }

    render() {
        return (
            <Container fluid>
                <Button basic color="black" floated="right" onClick={(e,d) => {}}><Icon name="plus"/>New Example</Button>
                <ItemsView
                    data={this.props.examples}
                    emptyDataMessage={" No examples yet "}
                    renderItem={e => <Grid>
                        <Grid.Column width="8">{e.text}</Grid.Column>
                        <Grid.Column width="4"><Icon name="tag" color="black" />{e.intent}</Grid.Column>
                        <Grid.Column width="4"><Button basic color="black" onClick={(e,d) => {}}><Icon name="plus" />New example</Button></Grid.Column>
                    </Grid>}
                />
            </Container>
        )
    }
}

const mapStateToProps = (state: StoreState, ownProps: ExamplesOwnProps) => ({
    examples: state.examples.all
})
const mapDispatcherToProps = (dispatch: Dispatch) => ({
    loadIntentExamples: bindActionCreators(loadIntentExample, dispatch)
})

export default connect(mapStateToProps, mapDispatcherToProps)(Examples)