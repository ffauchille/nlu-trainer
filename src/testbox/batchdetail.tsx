import * as React from 'react'
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Table } from 'semantic-ui-react';

type BatchDetailOwnProps = React.Props<any> & {}
type BatchDetailProps = BatchDetailOwnProps & {}
type BatchDetailState = {}


class BatchDetail extends React.Component<BatchDetailProps, BatchDetailState> {
    render() {
        return (
            <Table>
                TODO
            </Table>
        )
    }
}

const mapStateToProps = (state: any, ownProps: BatchDetailOwnProps) => ({})
const mapDispatcherToProps = (dispatch: Dispatch) => ({})

export default connect(mapStateToProps, mapDispatcherToProps)(BatchDetail)