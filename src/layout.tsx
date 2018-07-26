import * as React from 'react';
import { Container, Grid } from 'semantic-ui-react';
import NavBar from "./navbar/navbar";

type LayoutOwnProps = React.ClassAttributes<any> & {};

type LayoutProps = LayoutOwnProps & {};

class Layout extends React.Component<LayoutProps> {
  render() {
  return (
      <Container>
          <NavBar />
          <Container className="content-window">
            {this.props.children}
          </Container>
      </Container>
    );
  }
}

export default Layout