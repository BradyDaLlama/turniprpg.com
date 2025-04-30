export type Card = {
    cardID: string;
    name?: string;
    description?: string;
    stars: string[];
    energy: number;
    element: string;
    special?: {};
};
