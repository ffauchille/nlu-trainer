import * as React from 'react'
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { StoreState } from '../reducers';
import { AppModel, AppStatus as Status } from '../models/app';
import { Icon } from 'semantic-ui-react';

type AppStatusOwnProps = React.Props<any> & {
    app: AppModel;
}
type AppStatusProps = AppStatusOwnProps & {
    appsStatus: Status[];
}
type AppStatusState = {}


class AppStatus extends React.Component<AppStatusProps, AppStatusState> {
    render() {
        var elem = <React.Fragment><Icon name="question" color="black" /> Unknown</React.Fragment>
        let found = this.props.appsStatus.find(a => a.app._id === this.props.app._id)
        if (found) {
          switch(found.status) {
            case "ready":
            elem = <React.Fragment><Icon name="check" color="green" /> Ready</React.Fragment>
            break;
            case "training":
            elem = <React.Fragment><Icon name="setting" loading color="violet" /> Training</React.Fragment>
            break;
            case "empty":
            elem = <React.Fragment><Icon name="circle outline" color="black" /> Empty</React.Fragment>
            break;
            default:
          }
        }
        return elem
    }
}

const mapStateToProps = (state: StoreState, ownProps: AppStatusOwnProps) => ({
    appsStatus: state.apps.statuses
})
const mapDispatcherToProps = (dispatch: Dispatch) => ({})

export default connect(mapStateToProps, mapDispatcherToProps)(AppStatus)