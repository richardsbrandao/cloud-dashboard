import React, { Component } from 'react';

import Link from 'react-router-dom/Link'; 

import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';

class Menu extends Component { 
    constructor(props) {
        super(props);
        this.state = {
            menu: [
                {pathname: '/', label: 'dashboard'},
                {pathname: '/ec2', label: 'ec2'},
                {pathname: '/rds', label: 'rds'},
                {pathname: '/elasticache', label: 'elasticache'}
            ],
            pathname: window.location.pathname
        }
    }

    updateSelectedMenu(pathname) {
        this.setState({pathname});
    }
    
    render() {
        return (
            <MenuList>
                {
                    this.state.menu.map((item) => {
                        return  <MenuItem selected={this.state.pathname === item.pathname}>
                                    <Link to={item.pathname} onClick={() => this.updateSelectedMenu(item.pathname)} className="menu-link">{item.label}</Link>
                                </MenuItem>
                    })
                }
            </MenuList>
        );
    }
}

export default Menu;