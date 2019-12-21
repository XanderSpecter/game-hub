import React, { FormEvent, useState, ChangeEvent } from 'react';

import { TextField, Typography, FormControlLabel, Checkbox, Button } from '@material-ui/core';

import uuid from 'uuid/v4';

import { loginUser } from '../../helpers/api';
import { User } from '../../models/User';

import './styles.less';
import { setCookie } from '../../helpers/cookies';

interface AuthProps {
    onSuccess: (user: User) => void;
}

export const Auth = (props: AuthProps) => {
    const [isNewUser, setIsNewUser] = useState(false);
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [nameError, setNameError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const [isFetching, setIsFetching] = useState(false);
    const [fetchError, setFetchError] = useState('');

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setFetchError('');

        if (name && password) {
            setIsFetching(true);
            const form = new FormData();

            form.append('name', name);
            form.append('password', password);

            if (isNewUser) {
                form.append('register', 'true');
                form.append('id', uuid());
            }

            const userData = await loginUser(form);

            if (userData.error) {
                setFetchError(userData.error);
                setIsFetching(false);
                setTimeout(() => {
                    setFetchError('');
                }, 3000);
            } else if (userData.user) {
                setIsFetching(false);
                setCookie('user', userData.user.id, 2400);
                props.onSuccess(userData.user);
            }

            return;
        }

        if (!name) {
            setNameError('Нужно ввести имя');
        }

        if (!password) {
            setPasswordError('Нужно ввести пароль');
        }
    };

    return (
        <div className="game-hub__auth">
            <div className={`game-hub__auth--error-message ${Boolean(fetchError) ? 'show' : ''}`}>
                {fetchError}
            </div>
            <div className="game-hub__auth--form-wrapper">
                <Typography variant="h5" className="game-hub__auth--header">
                    Авторизация/Регистрация
                </Typography>
                <form onSubmit={onSubmit}>
                    <TextField
                        className="game-hub__auth--input"
                        label="Имя"
                        name="name"
                        type="text"
                        autoComplete="name"
                        variant="outlined"
                        value={name}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            setName(e.target.value);
                            setNameError('');
                        }}
                        helperText={nameError}
                        error={Boolean(nameError)}
                        disabled={isFetching}
                    />
                    <TextField
                        className="game-hub__auth--input"
                        label="Пароль"
                        name="password"
                        type="password"
                        autoComplete="password"
                        variant="outlined"
                        value={password}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            setPassword(e.target.value);
                            setPasswordError('');
                        }}
                        helperText={passwordError}
                        error={Boolean(passwordError)}
                        disabled={isFetching}
                    />
                    <FormControlLabel
                        className="game-hub__auth--input"
                        control={
                            <Checkbox
                                name="newuser"
                                value="new-user"
                                color="primary"
                                checked={isNewUser}
                                onChange={() => setIsNewUser(!isNewUser)}
                                disabled={isFetching}
                            />
                        }
                        label="Новый пользователь"
                    />
                    <div>
                        <Button
                            className="game-hub__auth--submit"
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={isFetching}
                        >
                            {isNewUser ? 'Регистрация' : 'Авторизация'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
};
