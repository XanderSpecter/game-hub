import React from 'react';
import { Game } from '../../models/Game';
import { User } from '../../models/User';
import { Paper, Typography, Button } from '@material-ui/core';

import './styles.less';
import { EpicIcon, OriginIcon, SteamIcon, TorrentIcon } from '../Icons';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@material-ui/icons/ThumbDownOutlined';

interface GameCardProps {
    game: Game;
    user: User;
}

export const GameCard = (props: GameCardProps) => {
    const { game } = props;

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
                                <div key={`${game.id}-${platform}`} className="game-hub__game-card--platform">
                                    {platform === 'epic' &&
                                        <EpicIcon />
                                    }
                                    {platform === 'origin' &&
                                        <OriginIcon />
                                    }
                                    {platform === 'steam' &&
                                        <SteamIcon />
                                    }
                                    {platform === 'torrent' &&
                                        <TorrentIcon />
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
                    <Button
                        color="primary"
                    >
                        <ThumbUpOutlinedIcon />
                    </Button>
                    <Button
                        color="secondary"
                    >
                        <ThumbDownOutlinedIcon />
                    </Button>
                </div>
            </div>
        </Paper>
    );
};
