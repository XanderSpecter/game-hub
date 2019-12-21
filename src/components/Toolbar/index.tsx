import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

interface AppToolbarProps {
    onLogOut: () => void;
}

export const AppToolbar = (props: AppToolbarProps) => (
    <div className="game-hub__menu-root">
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" className="game-hub__menu-header">
                    Game Hub
                </Typography>
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
