import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

import './styles.less';

interface AppToolbarProps {
    onLogOut: () => void;
    onAddClick: () => void;
    showAddButton: boolean;
}

export const AppToolbar = (props: AppToolbarProps) => (
    <div className="game-hub__menu-root">
        <AppBar position="fixed">
            <Toolbar>
                <Typography variant="h6" className="game-hub__menu-header">
                    Game Hub
                </Typography>
                {props.showAddButton &&
                    <Button
                        color="inherit"
                        onClick={props.onAddClick}
                    >
                        <AddIcon />
                    </Button>
                }
                <Button
                    color="inherit"
                    onClick={props.onLogOut}
                >
                    Выйти
                </Button>
            </Toolbar>
        </AppBar>
    </div>
);
