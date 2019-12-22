type Platform = 'origin' | 'steam' | 'epic' | 'torrent' | 'other';

export interface PlatformLink {
    name: Platform;
    url: string;
}

export interface Game {
    name: string;
    id: string;
    platforms: PlatformLink[];
    addedBy: string;
    votes: string[];
    rating: number;
}
