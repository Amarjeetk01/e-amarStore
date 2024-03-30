type CollectionType = {
  _id: string;
  title: string;
  description: string;
  image: string;
  products: ProductType[];
};

type ProductType = {
  _id: string;
  title: string;
  description: string;
  media: [string];
  category: string;
  collections: [CollectionType];
  tags: [string];
  sizes: [string];
  colors: [string];
  price: number;
  expense: number;
  createdAt: Date;
  updatedAt: Date;
};

type CartItemType = {
  _id: string;
  clerkId: string;
  color: string;
  size: string;
  quantity: number;
  product: [ProductType];
  createdAt: string;
};
type OrderColumnType = {
  _id: string;
  customer: string;
  products: number;
  totalAmount: number;
  createdAt: string;
};

type OrderItemType = {
  product: ProductType;
  color: string;
  size: string;
  quantity: number;
};

type CustomerType = {
  clerkId: string;
  name: string;
  email: string;
};

type CollectionUserType = {
  _id: string;
  title: string;
  products: number;
  image: string;
};

type UserType = {
  clerkId: string;
  wishlist: [string];
  cart: [string];
  createdAt: string;
  updatedAt: string;
};

type ShippingAddress = {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  unit?: string;
};

type OrderType = {
  shippingAddress: ShippingAddress;
  _id: string;
  customerClerkId: string;
  products: [OrderItemType];
  shippingRate: string;
  totalAmount: number;
};
