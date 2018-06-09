import React, { Component } from 'react';

import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';

class Menu extends Component { 
    render() {
        return (
            <MenuList>
                <MenuItem>Dashboard</MenuItem>
                <MenuItem>EC2</MenuItem>
                <MenuItem>RDS</MenuItem>
                <MenuItem>ElastiCache</MenuItem>
                <MenuItem>S3</MenuItem>
            </MenuList>
        );
    }
}

export default Menu;