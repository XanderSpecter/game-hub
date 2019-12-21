type Platform = 'origin' | 'steam' | 'epic' | 'torrent';

interface Vote {
    userId: string;
    value: number;
}

export interface Game {
    name: string;
    id: string;
    platforms: Platform[];
    addedBy: string;
    votes: Vote[];
    rating: number;
}
