import React, { Component } from 'react';

import Link from 'react-router-dom/Link'; 

import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';

class Menu extends Component { 
    render() {
        return (
            <MenuList>
                <MenuItem selected><Link to="/" className="menu-link">Dashboard</Link></MenuItem>
                <MenuItem><Link to="/ec2" className="menu-link">EC2</Link></MenuItem>
                <MenuItem><Link to="/rds" className="menu-link">RDS</Link></MenuItem>
                <MenuItem><Link to="/elasticache" className="menu-link">ElastiCache</Link></MenuItem>
                <MenuItem><Link to="/s3" className="menu-link">S3</Link></MenuItem>
            </MenuList>
        );
    }
}

export default Menu;