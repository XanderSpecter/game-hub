import React from 'react';
import { Game } from '../../models/Game';
import { User } from '../../models/User';
import { Paper, Typography, Fab } from '@material-ui/core';

import { EpicIcon, OriginIcon, SteamIcon, TorrentIcon } from '../Icons';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import CloseIcon from '@material-ui/icons/Close';
import GetAppIcon from '@material-ui/icons/GetApp';

import './styles.less';

interface GameCardProps {
    game: Game;
    user: User;
    onVote: (game: Game) => void;
}

export const GameCard = (props: GameCardProps) => {
    const { game, user } = props;

    const isVotedByUser = game.votes.includes(user.id);

    const onVote = () => {
        const newGame: Game = {...game};
        if (!isVotedByUser) {
            newGame.rating = game.rating + 1;
            newGame.votes = [...game.votes, user.id];
        } else {
            newGame.rating = game.rating - 1;
            newGame.votes = [...game.votes].filter(vote => vote !== user.id);
        }

        props.onVote(newGame);
    };

    return (
        <Paper className="game-hub__game-card">
            <div className="game-hub__game-card--main-info">
                <div className="game-hub__game-card--header">
                    {game.name}
                </div>
                <div className="game-hub__game-card--info">
                    <div className="game-hub__game-card--user">
                        Добавил: {game.addedBy}{' '}
                    </div>
                    <div className="game-hub__game-card--platforms">
                        {
                            game.platforms.map(platform => (
                                <div key={`${game.id}-${platform.name}`} className="game-hub__game-card--platform">
                                    {platform.name === 'epic' &&
                                        <a href={platform.url} target="blank"><EpicIcon /></a>
                                    }
                                    {platform.name === 'origin' &&
                                        <a href={platform.url} target="blank"><OriginIcon /></a>
                                    }
                                    {platform.name === 'steam' &&
                                        <a href={platform.url} target="blank"><SteamIcon /></a>
                                    }
                                    {platform.name === 'torrent' &&
                                        <a href={platform.url} target="blank"><TorrentIcon /></a>
                                    }
                                    {platform.name === 'other' &&
                                        <a href={platform.url} target="blank"><GetAppIcon /></a>
                                    }
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
            <div className="game-hub__game-card--rating">
                <Typography variant="h4" gutterBottom>
                    {game.rating}
                </Typography>
                <div className="game-hub__game-card--vote-controls">
                    <Fab
                        color={isVotedByUser ? 'secondary' : 'primary'}
                        title={isVotedByUser ? 'Отменить голос' : 'Проголосовать'}
                        onClick={onVote}
                    >
                        {!isVotedByUser && <ThumbUpOutlinedIcon />}
                        {isVotedByUser && <CloseIcon />}
                    </Fab>
                </div>
            </div>
        </Paper>
    );
};
