import React, { useState, useEffect } from 'react';
import { AppToolbar } from '../Toolbar';
import { Container, Typography } from '@material-ui/core';
import { Loader } from '../Loader';
import { User } from '../../models/User';
import { Game } from '../../models/Game';
import { getData, uploadData } from '../../helpers/api';
import { GameCard } from '../GameCard';
import { AddGameFrom } from '../AddGameForm';

import './styles.less';

interface GamesProps {
    onLogOut: () => void;
    user: User;
}

export const Games = (props: GamesProps) => {
    const [isFetching, setIsFetching] = useState(true);
    const [fetchError, setFetchError] = useState('');
    const [showAddForm, setShowAddForm] = useState(false);
    const [gameList, setGameList] = useState<Game[]>([
        {
            name: 'Star Wars Battlefront',
            id: '123',
            platforms: [
                {
                    name: 'origin',
                    url: 'ololo',
                },
                {
                    name: 'other',
                    url: 'ololo',
                },
            ],
            addedBy: 'Name',
            rating: 2,
            votes: []
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

    const onGameUpdate = async (newGame: Game) => {
        const gameData = await getData<Game[]>('/games');

        if (gameData.data) {
            const games = gameData.data.filter(game => game.id !== newGame.id);

            const uploadResult = await uploadData('/games', JSON.stringify([...games, newGame]));

            if (uploadResult.success) {
                getGamesList();
            } else {
                setFetchError(gameData.error || 'Проблемы на сервере');
            }
        } else {
            setFetchError(gameData.error || 'Проблемы на сервере');
        }
    };

    useEffect(() => {
		getGamesList();
	}, []);

    return (
        <div className="game-hub__games">
            <AppToolbar
                onLogOut={props.onLogOut}
                showAddButton={!showAddForm}
                onAddClick={() => setShowAddForm(true)}
            />
            {isFetching && <Loader />}
            {!isFetching && !showAddForm &&
                <Container>
                    {Boolean(fetchError) &&
                        <Typography variant="h6" color="error" className="game-hub__games--error">
                            {fetchError}
                        </Typography>
                    }
                    {!fetchError && Boolean(gameList.length) &&
                        gameList.map((game) => (
                            <GameCard
                                key={game.id}
                                game={{...game}}
                                user={props.user}
                                onVote={onGameUpdate}
                            />
                        ))
                    }
                </Container>
            }
            {!isFetching && showAddForm &&
                <AddGameFrom
                    onSubmit={onGameUpdate}
                    onCancel={() => setShowAddForm(false)}
                    user={props.user}
                />
            }
        </div>
    );
};
