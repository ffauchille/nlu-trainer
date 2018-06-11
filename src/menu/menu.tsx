import * as React from "react";
import { Menu } from "semantic-ui-react";

type State = {
  activeItem: AppMenuItem;
};

export type AppMenuItem = "trainer" | "library";

export type AppMenuProps = React.Props<any> & {
  defaultMenu?: AppMenuItem;
};

export class AppMenu extends React.Component<AppMenuProps, State> {
  constructor(props: AppMenuProps) {
    super(props);
    this.state = {
      activeItem: props.defaultMenu || "trainer"
    };
  }

  handleItemClick(item: AppMenuItem) {
      this.setState({ activeItem: item })
  }

  render() {
    let activeItem = this.state.activeItem;

    return (
      <Menu pointing secondary>
        <Menu.Item
          name="trainer"
          active={activeItem === "trainer"}
          onClick={(e, d) => this.handleItemClick("trainer")}
        />
        <Menu.Item
          name="library"
          active={activeItem === "library"}
          onClick={(e,d) => this.handleItemClick("library")}
        />
      </Menu>
    );
  }
}
