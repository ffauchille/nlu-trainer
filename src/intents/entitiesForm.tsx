import * as React from "react";
import { connect } from "react-redux";
import { Form, Button } from "semantic-ui-react";
import { reduxForm, reset } from "redux-form";
import { renderField } from "../forms";

import { Entity } from "../models/entity";
import {
  CreateEntity,
  createEntity,
  updateEntity,
  UpdateEntity
} from "./actions";
import { bindActionCreators } from "redux";

const APPS_FORM_NAME = "EntityForm";

interface EntityFormOwnProps extends React.Props<any> {
  entity?: Entity;
  editMode?: boolean;
  onCreateSubmit?: (input: Entity) => any;
  onUpdateSubmit?: (input: Entity) => any;
  beforeCreate?: (input: any) => any;
  beforeUpdate?: (input: any) => any;
}

interface EntityFormProps extends EntityFormOwnProps {
  handleSubmit?: any;
  onSubmit?: any;
  invalid?: boolean;
  resetForm: any;
  createEntity: (pl: Partial<Entity>) => CreateEntity;
  updateEntity: (updt: Entity) => UpdateEntity;
}

const EntityFormFields = [
  {
    component: "input",
    name: "value",
    label: "Entity value",
    placeholder: "My entity value"
  },
  {
    component: "input",
    name: "synonyms",
    label: "Entity synonyms",
    placeholder: "synonym1; synonym2; ..."
  }
];

const validate = values => {
  const errors: any = {};
  if (!values.value) {
    errors.value = "An entity value is required";
  }
  return errors;
};

const EntityForm = (props: EntityFormProps) => (
  <Form onSubmit={props.handleSubmit}>
    {EntityFormFields.map((field, i) =>
      renderField(field, "entity-form-field-" + i)
    )}
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

const EntityReduxForm = (initialValues: any) =>
  reduxForm({
    form: APPS_FORM_NAME, // this form name is shared by all wizard forms
    validate,
    initialValues
  })(EntityForm);

const EntityFormWrapper: React.StatelessComponent<EntityFormProps> = props => {
  const submission = (i: Entity) => {
    var input = i;
    if (props.beforeCreate) {
      input = props.beforeCreate(i);
    }
    if (props.editMode) {
      if (props.beforeUpdate) {
        input = props.beforeUpdate(i);
      }
      props.updateEntity(input);
      if (props.onUpdateSubmit) {
        props.onUpdateSubmit(input);
      }
    } else {
      props.createEntity(input);
      props.resetForm(APPS_FORM_NAME);
      if (props.onCreateSubmit) {
        props.onCreateSubmit(input);
      }
    }
  };
  const NPF = EntityReduxForm(props.entity);
  return <NPF onSubmit={submission} editMode={props.editMode} />;
};

const mapDispatcherToProps = dispatch => ({
  resetForm: bindActionCreators(reset, dispatch),
  createEntity: bindActionCreators(createEntity, dispatch),
  updateEntity: bindActionCreators(updateEntity, dispatch)
});

const mapStateToProps = (state, ownProps: EntityFormOwnProps) => ({
  ...ownProps
});

export default connect(
  mapStateToProps,
  mapDispatcherToProps
)(EntityFormWrapper);
