import * as React from 'react'
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

type CategoriesOwnProps = React.Props<any> & {}
type CategoriesProps = CategoriesOwnProps & {}
type CategoriesState = {}


class Categories extends React.Component<CategoriesProps, CategoriesState> {
    render() {
        return (
            <div></div>
        )
    }
}

const mapStateToProps = (state: any, ownProps: CategoriesOwnProps) => ({})
const mapDispatcherToProps = (dispatch: Dispatch) => ({})

export default connect(mapStateToProps, mapDispatcherToProps)(Categories)