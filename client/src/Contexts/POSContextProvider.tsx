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
  SubtractQuantity:  (mealOrderId: number) => void;
  RemoveFromCart: (mealOrderId: number) => void;
};

type POSContextProvider = {
  children: ReactNode;
};

const PosStateContext = createContext<POSContext_T>({
  posOrder: null,
  setposOrder: () => {},
  AddQuantity: () => {},
  SubtractQuantity: ()=> {},
  RemoveFromCart: () => {}
});

export const POSContextProvider = ({ children }: POSContextProvider) => {
  const [posOrder, _setPosOrder] = useState<POS>({
    customerName: "",
    paymentMethod: "",
    orderType: "",
    meals: [],
    totalPrice: 0,
  });

  const setposOrder = (meal: PosMealOrder) => {
    _setPosOrder((prev) => ({
      ...prev,
      meals: [...(posOrder?.meals || []), meal],
    }));
  };

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
    <PosStateContext.Provider value={{ posOrder, setposOrder, AddQuantity,SubtractQuantity,RemoveFromCart }}>
      {children}
    </PosStateContext.Provider>
  );
};

export const usePosStateContext = () => useContext(PosStateContext);
