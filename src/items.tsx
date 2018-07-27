import * as React from "react";
import { Item } from "semantic-ui-react";

type ItemsViewProps<T> = React.Props<any> & {
  renderItem: (d: T) => any /** Item */;
  data: T[];
  emptyDataMessage: any
};
type ItemsViewState = {};

class ItemsView<T> extends React.Component<ItemsViewProps<T>, ItemsViewState> {
  render() {
    var elem = (
      this.props.emptyDataMessage
    );
    if ((this.props.data || []).length > 0) {
      elem = (
        <Item.Group divided>
          {this.props.data.map((d, idx) => (
            <Item key={`item-${idx}`}>
              <Item.Content>{this.props.renderItem(d)}</Item.Content>
            </Item>
          ))}
        </Item.Group>
      );
    }
    return elem;
    return undefined;
  }
}

export default ItemsView;
