import * as React from "react";
import { connect } from "react-redux";
import { Form, Button } from "semantic-ui-react";
import { reduxForm, reset } from "redux-form";
import { renderField } from "../forms";

import { Category } from "../models/category";
import {
  CreateCategory,
  createCategory,
  updateCategory,
  UpdateCategory
} from "./actions";
import { bindActionCreators } from "redux";

const CATEGORY_FORM_NAME = "CategoryForm";

interface CategoryFormOwnProps extends React.Props<any> {
  category?: Category;
  editMode?: boolean;
  onCreateSubmit?: (input: Category) => any;
  onUpdateSubmit?: (input: Category) => any;
  beforeCreate?: (input: any) => any;
  beforeUpdate?: (input: any) => any;
}

interface CategoryFormProps extends CategoryFormOwnProps {
  handleSubmit?: any;
  onSubmit?: any;
  invalid?: boolean;
  resetForm: any;
  createCategory: (pl: Partial<Category>) => CreateCategory;
  updateCategory: (updt: Category) => UpdateCategory;
}

const IntentFormField = {
  component: "input",
  name: "name",
  label: "Category name",
  placeholder: "My awsome category"
};

const validate = values => {
  const errors: any = {};
  if (!values.name) {
    errors.name = "An category name is required";
  }
  return errors;
};

const CategoryForm = (props: CategoryFormProps) => (
  <Form onSubmit={props.handleSubmit}>
    {renderField(IntentFormField)}
    <Button
      type="submit"
      onSubmit={props.onSubmit}
      primary
      disabled={props.invalid}
    >
      {props.editMode ? "Update" : "Create"}
    </Button>
  </Form>
);

const CategoryReduxForm = (initialValues: any) =>
  reduxForm({
    form: CATEGORY_FORM_NAME, // this form name is shared by all wizard forms
    validate,
    initialValues
  })(CategoryForm);

const CategoryFormWrapper: React.StatelessComponent<
  CategoryFormProps
> = props => {
  const submission = (i: Category) => {
    var input = i;
    if (props.beforeCreate) {
      input = props.beforeCreate(i);
    }
    if (props.editMode) {
      if (props.beforeUpdate) {
        input = props.beforeUpdate(i);
      }
      if (props.onUpdateSubmit) {
        props.onUpdateSubmit(input);
      }
      props.updateCategory(input);
    } else {
      if (props.onCreateSubmit) {
        props.onCreateSubmit(input);
      }
      props.createCategory(input);
      props.resetForm(CATEGORY_FORM_NAME);
    }
  };
  const NCF = CategoryReduxForm(props.category);
  return <NCF onSubmit={submission} editMode={props.editMode} />;
};

const mapDispatcherToProps = dispatch => ({
  resetForm: bindActionCreators(reset, dispatch),
  createCategory: bindActionCreators(createCategory, dispatch),
  updateCategory: bindActionCreators(updateCategory, dispatch)
});

const mapStateToProps = (state, ownProps: CategoryFormOwnProps) => ({
  ...ownProps
});

export default connect(
  mapStateToProps,
  mapDispatcherToProps
)(CategoryFormWrapper);
