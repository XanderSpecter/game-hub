import React, { FormEvent, useState, ChangeEvent } from 'react';

import { TextField, Typography, Button } from '@material-ui/core';
import { getData } from '../../helpers/api';
import { User } from '../../models/User';
import { Game, PlatformLink } from '../../models/Game';
import uuid from 'uuid/v4';

import './styles.less';

interface AddGameFromProps {
    onSubmit: (game: Game) => void;
    onCancel: () => void;
    user: User;
}

export const AddGameFrom = (props: AddGameFromProps) => {
    const [name, setName] = useState('');
    const [nameError, setNameError] = useState('');
    const [steam, setSteam] = useState('');
    const [origin, setOrigin] = useState('');
    const [epic, setEpic] = useState('');
    const [torrent, setTorrent] = useState('');
    const [other, setOther] = useState('');

    const [existGames, setExistGames] = useState<Game[]>([]);

    const onSubmit = (e: MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        if (!name) {
            setNameError('Нужно ввести имя');

            return;
        }

        const newGame: Game = {
            name,
            rating: 1,
            votes: [props.user.id],
            addedBy: props.user.name,
            id: uuid(),
            platforms: [],
        };

        if (steam) {
            newGame.platforms.push({
                name: 'steam',
                url: steam,
            } as PlatformLink);
        }

        if (origin) {
            newGame.platforms.push({
                name: 'origin',
                url: origin,
            } as PlatformLink);
        }

        if (epic) {
            newGame.platforms.push({
                name: 'epic',
                url: epic,
            } as PlatformLink);
        }

        if (torrent) {
            newGame.platforms.push({
                name: 'torrent',
                url: torrent,
            } as PlatformLink);
        }

        if (other) {
            newGame.platforms.push({
                name: 'other',
                url: other,
            } as PlatformLink);
        }

        props.onSubmit(newGame);
    };

    const checkGame = async (gameName: string) => {
        const gamesData = await getData<Game[]>('/games');

        if (gamesData.data) {
            const actualExistGames = gamesData.data.filter(game => game.name.toLowerCase().includes(gameName.toLowerCase()));

            setExistGames([...actualExistGames]);
        }
    };

    const onNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
        setNameError('');

        if (e.target.value.length > 3) {
            checkGame(e.target.value);
        }
    };

    return (
        <div className="game-hub__add-game">
            <div className="game-hub__add-game--form-wrapper">
                <Typography variant="h5" className="game-hub__add-game--header">
                    Добавить игру
                </Typography>
                <form>
                    <TextField
                        className="game-hub__add-game--input"
                        label="Имя"
                        name="name"
                        type="text"
                        autoComplete="name"
                        variant="outlined"
                        value={name}
                        onChange={onNameChange}
                        helperText={nameError}
                        error={Boolean(nameError)}
                    />
                    <TextField
                        className="game-hub__add-game--input"
                        label="Сcылка Steam (если есть)"
                        name="name"
                        type="text"
                        variant="outlined"
                        value={steam}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            setSteam(e.target.value);
                        }}
                    />
                    <TextField
                        className="game-hub__add-game--input"
                        label="Сcылка Origin (если есть)"
                        name="name"
                        type="text"
                        variant="outlined"
                        value={origin}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            setOrigin(e.target.value);
                        }}
                    />
                    <TextField
                        className="game-hub__add-game--input"
                        label="Сcылка Epic (если есть)"
                        name="name"
                        type="text"
                        variant="outlined"
                        value={epic}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            setEpic(e.target.value);
                        }}
                    />
                    <TextField
                        className="game-hub__add-game--input"
                        label="Другой магазин или лаунчер (если есть)"
                        name="name"
                        type="text"
                        variant="outlined"
                        value={other}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            setOther(e.target.value);
                        }}
                    />
                    <TextField
                        className="game-hub__add-game--input"
                        label="Торрент"
                        name="name"
                        type="text"
                        variant="outlined"
                        value={torrent}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            setTorrent(e.target.value);
                        }}
                        helperText="Если можно поиграть, спиратив. Желательно ссылку сразу на инструкцию."
                    />
                    {Boolean(existGames.length) &&
                        <div className="game-hub__add-game--exist-games">
                            <Typography color="error" variant="h6">
                                Может игра уже есть?
                            </Typography>
                            {
                                existGames.map(game => (
                                    <div className="game-hub__add-game--exist-game">
                                        <Typography color="textPrimary" variant="subtitle2" className="game-hub__add-game--exist-game-name">
                                            {game.name}
                                        </Typography>
                                        <Typography color="textPrimary" variant="subtitle2">
                                            {game.rating}
                                        </Typography>
                                    </div>
                                ))
                            }
                        </div>
                    }
                    <div>
                        {!existGames.length &&
                            <Button
                                className="game-hub__add-game--submit"
                                type="submit"
                                variant="contained"
                                color="primary"
                                onClick={onSubmit}
                            >
                                Сохранить
                            </Button>
                        }
                        <Button
                            className="game-hub__add-game--cancel"
                            type="submit"
                            variant="contained"
                            color="secondary"
                            onClick={props.onCancel}
                        >
                            Отмена
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};
