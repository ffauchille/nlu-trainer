import { push, RouterAction } from "connected-react-router";
import { LocationState, Path } from "history";
import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { bindActionCreators, Dispatch } from "redux";
import { Button, Grid, Icon, List, Modal } from "semantic-ui-react";
import { LoadAppByName, loadAppByName } from "../apps/actions";
import { AppModel } from "../models/app";
import { Category } from "../models/category";
import { Intent } from "../models/intent";
import { StoreState } from "../reducers";
import {
  loadCategories,
  LoadCategories,
  selectCategory,
  SelectCategory
} from "./actions";
import CategoriesForm from "./categoriesform";
import CategoryContent from "./categorycontent";

type CategoriesOwnProps = React.Props<any> &
  RouteComponentProps<{
    app: string;
    categoryName?: string;
    intentName?: string;
  }> & {};
type CategoriesProps = CategoriesOwnProps & {
  categories: Category[];
  app?: AppModel;
  category?: Category;
  intent?: Intent;
  select: (cat: Category) => SelectCategory;
  pushRoute: (path: Path, state?: LocationState) => RouterAction;
  loadCategories: (appId: string) => LoadCategories;
  loadAppByName: (appName: string) => LoadAppByName;
};
type CategoriesState = {
  newCategoryOpen: boolean;
};

class Categories extends React.Component<CategoriesProps, CategoriesState> {
  constructor(props) {
    super(props);
    this.state = {
      newCategoryOpen: false
    };
  }

  componentWillMount() {
    if (this.props.app) {
      this.props.loadCategories(this.props.app._id);
    } else if (this.props && this.props.match.params.app) {
      this.props.loadAppByName(this.props.match.params.app);
    }
  }

  categoryIsSelected(category: Category): boolean {
    return !!this.props.category && this.props.category._id === category._id;
  }

  renderCategory(category: Category, key: string) {
    return (
      <List.Item
        key={key}
        as="a"
        onClick={(e, d) => this.props.select(category)}
        active={this.categoryIsSelected(category)}
        className={this.categoryIsSelected(category) ? "color-violet" : ""}
      >
        <List.Icon
          color={this.categoryIsSelected(category) ? "violet" : "grey"}
          name={this.categoryIsSelected(category) ? "folder open" : "folder"}
        />
        {category.name}
      </List.Item>
    );
  }

  renderNewCategoryModal() {
    return (
      <Modal
        trigger={
          <Button
            color="black"
            basic
            onClick={(e, d) => this.setState({ newCategoryOpen: true })}
          >
            <Icon name="plus" /> New category
          </Button>
        }
        onClose={(e, d) => this.setState({ newCategoryOpen: false })}
        closeOnDimmerClick
        closeOnEscape={false}
        open={this.state.newCategoryOpen}
      >
        <Modal.Header>Create a new category of intents</Modal.Header>
        <Modal.Content>
          <CategoriesForm
            onCreateSubmit={_ => {
              console.log("closing modal");
              this.setState({ newCategoryOpen: false });
            }}
            beforeCreate={pl => ({
              ...pl,
              appId: (this.props.app as AppModel)._id
            })}
          />
        </Modal.Content>
      </Modal>
    );
  }

  renderCategoryBrowser() {
    return (
      <Grid>
        <Grid.Row>{this.renderNewCategoryModal()}</Grid.Row>
        <Grid.Row>
          <List link size="large">
            {this.props.categories.map((cat, i) =>
              this.renderCategory(cat, `category-${i}`)
            )}
          </List>
        </Grid.Row>
      </Grid>
    );
  }

  render() {
    let elem = <React.Fragment />;
    if (this.props.app) {
      elem = (
        <Grid>
          <Grid.Column width="3">{this.renderCategoryBrowser()}</Grid.Column>
          <Grid.Column width="13">
            <CategoryContent />
          </Grid.Column>
        </Grid>
      );
    }
    return elem;
  }
}

const mapStateToProps = (state: StoreState, ownProps: CategoriesOwnProps) => ({
  categories: state.category.categories,
  intent: state.intents.selected,
  category: state.category.selected,
  app: state.apps.selected
});
const mapDispatcherToProps = (dispatch: Dispatch) => ({
  select: bindActionCreators(selectCategory, dispatch),
  pushRoute: bindActionCreators(push, dispatch),
  loadCategories: bindActionCreators(loadCategories, dispatch),
  loadAppByName: bindActionCreators(loadAppByName, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatcherToProps
)(Categories);
