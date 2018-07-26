import * as React from 'react'
import { connect, Dispatch } from 'react-redux';

type SideBarOwnProps = React.Props<any> & {}
type SideBarProps = SideBarOwnProps & {}
type SideBarState = {}


class SideBar extends React.Component<SideBarProps, SideBarState> {
    render() {
        return (
            <div style={{ backgroundColor: "black", minHeight: "100%" }}>
                {}
            </div>
        )
    }
}

const mapStateToProps = (state: any, ownProps: SideBarOwnProps) => ({
    intents: []
})
const mapDispatcherToProps = (dispatch: Dispatch) => ({})

export default connect(mapStateToProps, mapDispatcherToProps)(SideBar)