import React, { useState, useEffect } from 'react';
import { AppToolbar } from '../Toolbar';
import { Container, Typography } from '@material-ui/core';
import { Loader } from '../Loader';
import { User } from '../../models/User';
import { Game } from '../../models/Game';
import { getData } from '../../helpers/api';

import './styles.less';
import { GameCard } from '../GameCard';

interface GamesProps {
    onLogOut: () => void;
    user: User;
}

export const Games = (props: GamesProps) => {
    const [isFetching, setIsFetching] = useState(true);
    const [fetchError, setFetchError] = useState('');
    const [gameList, setGameList] = useState<Game[]>([
        {
            name: 'Star Wars Battlefront',
            id: '123',
            platforms: ['origin', 'steam', 'torrent', 'epic'],
            addedBy: 'Name',
            rating: 2,
            votes: [
                {
                    userId: '123',
                    value: -1,
                }
            ]
        }
    ]);

    const getGamesList = async () => {
        const gameData = await getData<Game[]>('/games');

        if (gameData.error) {
            // setFetchError(gameData.error);
            setIsFetching(false);
        } else if (gameData.data && gameData.data.length) {
            setGameList(gameData.data.sort((a, b) => b.rating - a.rating));
            setIsFetching(false);
        }
    };

    useEffect(() => {
		getGamesList();
	}, []);

    return (
        <div className="game-hub__games">
            <AppToolbar
                onLogOut={props.onLogOut}
                onAddClick={() => {}}
            />
            <Container>
                {isFetching && <Loader />}
                {Boolean(fetchError) &&
                    <Typography variant="h6" color="error" className="game-hub__games--error">
                        {fetchError}
                    </Typography>
                }
                {Boolean(gameList.length) &&
                    gameList.map((game) => (
                        <GameCard key={game.id} game={{...game}} user={props.user} />
                    ))
                }
            </Container>
        </div>
    );
};
