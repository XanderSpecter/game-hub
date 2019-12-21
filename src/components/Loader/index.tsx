import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

import './styles.less';

export const Loader = () => (
    <div className="loader">
        <CircularProgress />
    </div>
);
