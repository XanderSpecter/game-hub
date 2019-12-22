import React, { useState, useEffect } from 'react';

import { getCookie, setCookie } from '../../helpers/cookies';
import { Typography, Fab } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import './styles.less';

export const CookiePanel = () => {
    const [show, setShow] = useState(false);

    const checkPanel = () => {
        const isCookieAccepted = getCookie('accepted');

        if (!isCookieAccepted) {
            setShow(true);
        }
    };

    useEffect(() => {
        checkPanel();
    });

    if (!show) {
        return null;
    }

    return (
        <div className="game-hub__cookie">
            <div className="pr-64">
                <Typography variant="h4">
                    Сайт использует cookie
                </Typography>
                <Typography variant="subtitle2">
                    Для корректной работы и чтобы выяснять, какой прон вы смотрите на досуге. Используя сайт, вы даёте согласие на это.
                </Typography>
                <Fab
                    color="primary"
                    className="game-hub__cookie--close"
                    onClick={() => {
                        setCookie('accepted', 'true', 24000);
                        setShow(false);
                    }}
                >
                    <CloseIcon />
                </Fab>
            </div>
        </div>
    );
};
