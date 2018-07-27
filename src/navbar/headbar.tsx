import * as React from 'react'
import { Menu, MenuItem, Image, Header } from 'semantic-ui-react';
var pkg = require("../../package.json"); 

class HeadBar extends React.Component {
    
    render() {
        return (
            <Menu fixed="top" inverted color="violet">
                <MenuItem position="left"><Image size="mini" inline src="/images/artificial-intelligence.svg" centered></Image></MenuItem>
                <MenuItem>NLU Trainer</MenuItem>
                <MenuItem position="right"><span>v{pkg.version}</span></MenuItem>
            </Menu>
        )
    }
}

export default HeadBar