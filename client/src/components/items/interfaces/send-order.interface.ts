export interface SendOrder {
  customer: {
    name: string;
    mobile: string;
    address: string;
  };
  items: {
    id: number;
    name: string;
    quantity: number;
    price: number;
  }[];
  total: number;
}
