import * as React from "react";
import { InputOnChangeData, Input } from "semantic-ui-react";

export type DatePickerOwnProps = React.Props<any> & {
  input: any;
};

type DatePickerProps = DatePickerOwnProps & {};

type DatePickerState = {
  selected: string;
};

export class DatePicker extends React.Component<
  DatePickerProps,
  DatePickerState
> {
  constructor(props: DatePickerProps) {
    super(props);
    this.state = {
      selected: props.input.value
    };
  }

  onDateChange(
    event: React.SyntheticEvent<HTMLInputElement>,
    data: InputOnChangeData
  ) {
    this.setState({
      selected: data.value
    });
    this.props.input.onChange(data.value);
  }

  render() {
    return (
      <Input
        type="date"
        pattern="YYYY-MM-DD"
        value={this.state.selected}
        onChange={(e, d) => this.onDateChange(e, d)}
      />
    );
  }
}
