export type ProductType = {
    id: number;
    imageUrl: string;
    title: string;
    prices: PriceType[];
    url: string;
};

export type PriceType = {
    amount: number;
    currency: string; // Currently SEK and EUR
};

export type ItemType = {
    product: ProductType;
    quantity: number;
}