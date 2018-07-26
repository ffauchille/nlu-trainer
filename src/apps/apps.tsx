import * as React from 'react'
import { connect, Dispatch } from 'react-redux';
import { bindActionCreators } from '../../node_modules/redux';
import { loadApps, LoadApps } from './actions';
import { AppModel } from '../models/app';
import { Grid, Container, Header, Button, Item, Icon } from 'semantic-ui-react';

type AppsOwnProps = React.Props<any> & {}
type AppsProps = AppsOwnProps & {
    apps: AppModel[];
    loadApps: () => LoadApps;
}
type AppsState = {}


class Apps extends React.Component<AppsProps, AppsState> {
    componentWillMount() {
        this.props.loadApps()
    }
    render() {
        return (
        <Container fluid>
            <Grid>
                <Grid.Column width="12">
                    <Header as="h1">
                        My Apps
                    </Header>
                </Grid.Column>
                <Grid.Column width="4">
                    <Button icon="plus" basic color="black">New app</Button>
                </Grid.Column>
            </Grid>
            <Item.Group divided>
            { 
                this.props.apps.map((app,idx) => <Item>
                    <Item.Content>
                        <Grid>
                            <Grid.Column width="6"><Header as="h2">{ app.name }</Header></Grid.Column>
                            <Grid.Column width="5">
                                <Icon name="circle outline" /> Empty
                            </Grid.Column>
                            <Grid.Column width="5">
                            <Button.Group>
                                <Button basic icon="edit" color="black">Edit</Button>
                                <Button basic icon="setting" color="black">Train</Button>
                            </Button.Group>
                        </Grid.Column>
                        </Grid>
                    </Item.Content>
                </Item>)
            }
            </Item.Group>
        </Container>
        )
    }
}

const mapStateToProps = (state: any, ownProps: AppsOwnProps) => ({
    apps: state.apps.all
})
const mapDispatcherToProps = (dispatch: Dispatch) => ({
    loadApps: bindActionCreators(loadApps, dispatch)
})

export default connect(mapStateToProps, mapDispatcherToProps)(Apps)