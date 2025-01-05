import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { POS, PosMealOrder } from "../Pages/Owner/POSComp/POS_T";

type POSContext_T = {
  posOrder: POS | null;
  setposOrder: (order: PosMealOrder) => void;
  AddQuantity: (mealOrderId: number) => void;
  SubtractQuantity: (mealOrderId: number) => void;
  RemoveFromCart: (mealOrderId: number) => void;
  setOrderType: (orderType: string) => void;
  setPaymentMethod: (method: string) => void;
  setTender: (tender: number) => void;
  setReferenceNumber: (reference: string) => void;
  setCustomerName: (name: string) => void;
  ResetData: () => void;
};

type POSContextProvider = {
  children: ReactNode;
};

const PosStateContext = createContext<POSContext_T>({
  posOrder: null,
  setposOrder: () => {},
  AddQuantity: () => {},
  SubtractQuantity: () => {},
  RemoveFromCart: () => {},
  setOrderType: () => {},
  setPaymentMethod: () => {},
  setTender: () => {},
  setReferenceNumber: () => {},
  setCustomerName: () => {},
  ResetData: () => {},
});

export const POSContextProvider = ({ children }: POSContextProvider) => {
  const [posOrder, _setPosOrder] = useState<POS>({
    customerName: "",
    paymentMethod: "",
    orderType: "",
    meals: [],
    totalPrice: 0,
    tender: 0,
    change: 0,
    referenceNumber: "",
  });

  useEffect(() => {
    if (
      posOrder?.totalPrice !== undefined &&
      posOrder.tender >= posOrder.totalPrice
    ) {
      _setPosOrder((prev) => ({
        ...prev,
        change: posOrder.tender - posOrder.totalPrice,
      }));
    } else {
      _setPosOrder((prev) => ({
        ...prev,
        change: 0, // Default to 0 if tender is less than totalPrice or totalPrice is undefined
      }));
    }
  }, [posOrder?.tender, posOrder?.totalPrice]);

  const ResetData = () =>
    _setPosOrder({
      customerName: "",
      paymentMethod: "",
      orderType: "",
      meals: [],
      totalPrice: 0,
      tender: 0,
      change: 0,
      referenceNumber: "",
    });

  const setReferenceNumber = (reference: string) =>
    _setPosOrder((prev) => ({ ...prev, referenceNumber: reference }));

  const setTender = (tender: number) =>
    _setPosOrder((prev) => ({ ...prev, tender: tender }));

  const setPaymentMethod = (method: string) =>
    _setPosOrder((prev) => ({ ...prev, paymentMethod: method }));

  const setOrderType = (orderType: string) =>
    _setPosOrder((prev) => ({ ...prev, orderType: orderType }));

  const setposOrder = (meal: PosMealOrder) =>
    _setPosOrder((prev) => ({
      ...prev,
      meals: [...(posOrder?.meals || []), meal],
    }));
  const setCustomerName = (name: string) =>
    _setPosOrder((prev) => ({ ...prev, customerName: name }));

  const AddQuantity = (mealOrderId: number) => {
    if (mealOrderId) {
      _setPosOrder((prev) => ({
        ...prev,
        meals: posOrder.meals.map((n) =>
          n.mealOrderId == mealOrderId
            ? {
                ...n,
                quantity: n.quantity + 1,
                totalPrice: (n.originalPrice || 0) * (n.quantity + 1),
              }
            : n
        ),
      }));
    }
  };
  const SubtractQuantity = (mealOrderId: number) => {
    if (mealOrderId) {
      _setPosOrder((prev) => ({
        ...prev,
        meals: posOrder.meals.map((n) =>
          n.mealOrderId == mealOrderId
            ? {
                ...n,
                quantity: n.quantity - 1,
                totalPrice: (n.originalPrice || 0) * (n.quantity - 1),
              }
            : n
        ),
      }));
    }
  };

  const RemoveFromCart = (mealOrderId: number) => {
    if (mealOrderId) {
      _setPosOrder((prev) => ({
        ...prev,
        meals: posOrder.meals.filter((n) => n.mealOrderId !== mealOrderId),
      }));
    }
  };

  useEffect(() => {
    if (posOrder.meals) {
      const newTotalPrice = posOrder.meals.reduce(
        (acc, meal) => acc + (meal.totalPrice || 0),
        0
      );

      _setPosOrder((prev) => ({
        ...prev,
        totalPrice: newTotalPrice,
      }));
    }
  }, [posOrder.meals]);

  return (
    <PosStateContext.Provider
      value={{
        posOrder,
        setposOrder,
        AddQuantity,
        SubtractQuantity,
        RemoveFromCart,
        setOrderType,
        setPaymentMethod,
        setTender,
        setReferenceNumber,
        setCustomerName,
        ResetData
      }}
    >
      {children}
    </PosStateContext.Provider>
  );
};

export const usePosStateContext = () => useContext(PosStateContext);
