type addOns_T = {
  name: string;
  price: number;
};
type User_T = {
  fullName: string;
  role: string;
};
type mealPrice_T = {
  size: string;
  price: number;
};

type meals_T = {
  id: number;
  mealName: string;
  mealPrice: number | mealPrice_T;
  quantity: number;
  mealCategory: number;
  originalPrice: number;
  totalPrice: number;
  addOns?: addOns_T[];
  sugarLevel?: string;
};

export type Report_T = {
  id: number;
  change: number;
  customerName: string;
  createdAt: string;
  invoiceNo: string;
  meals: meals_T[];
  orderType: string;
  paymentMethod: string;
  referenceNumber?: string;
  tender: number;
  totalPrice: number;
  user: User_T;
};

export type OnlineOrderReport = {
  id: number;
  invoiceNo: string;
  meals: meals_T[];
  referenceNumber: string;
  totalPrice: number;
  status: string;
  pickUp: string;
  time: string;
  orderNote: string
  cancelReason?: string
  customer: {
    fullName: string;
    phoneNumber: string;
  };
  crew?: {
    fullName: string;
    phoneNumber: string;
  };
};
