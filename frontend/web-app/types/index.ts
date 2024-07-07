export type PagedResult<T> = {
  results: T[];
  pageCount: number;
  totalCount: number;
};

export type Enchere = {
  _id: string;
  id: string;
  reservePrice: number;
  seller: string;
  winner?: any;
  soldAmount: number;
  currentHighBid: number;
  createdAt: string;
  updatedAt: string;
  auctionStart: string;
  auctionEnd: string;
  status: string;
  make: string;
  name: string;
  year: number;
  color: string;
  description: string;
  imageUrl: string;
  category: string;
  state: string;
};

export type Offre = {
  id: string;
  auctionId: string;
  bidder: string;
  bidTime: string;
  amount: number;
  bidStatus: string;
};

export type EnchereStarted = {
  auctionId: string;
  seller: string;
};

export type EnchereFinished = {
  itemSold: boolean;
  auctionId: string;
  winner?: string;
  seller: string;
  amount?: number;
};

export type FilterOption = {
  name: string;
  count: number;
};

export type FilterCategory = {
  name: string;
  options: FilterOption[];
};
