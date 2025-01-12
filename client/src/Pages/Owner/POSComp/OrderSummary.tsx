import { CirclePlus, MinusCircle, ShoppingBag, Trash } from "lucide-react";
import Modal from "../../../Components/Modal";
import { usePosStateContext } from "../../../Contexts/POSContextProvider";
import { PosMealOrder } from "./POS_T";
import { useRef, useState } from "react";
import Payment from "./Payment";
import { useStateContext } from "../../../Contexts/ContextProvider";
import PickUpOptionModal from "../../Customer/PickUpOptionModal";
import OrderType from "./OrderType";
import { Description, Field, Textarea } from "@headlessui/react";
import clsx from "clsx";

type OrderSummaryModal_T = {
  isOpen: boolean;
  onClose: () => void;
};

export default function OrderSummary({ ...props }: OrderSummaryModal_T) {
  const note = useRef<HTMLTextAreaElement>(null);
  const { posOrder, setMutatePos } = usePosStateContext();
  const { user } = useStateContext();
  const [modals, setModals] = useState({
    pickUpOption: false,
    orderType: false,
    payment: false,
  });
  const handleProceedToPayment = () => {
    if (user?.role !== "Customer") {
      setModals({ ...modals, orderType: true });
    } else {
      setModals({ ...modals, pickUpOption: true });
      setMutatePos({ prop: "note", value: note.current?.value });
    }
    props.onClose();
  };

  const handleOrderTypeProceed = () => {
    setModals({ ...modals, orderType: false, payment: true });
  };

  return (
    <>
      <Modal
        isOpen={props.isOpen}
        onClose={props.onClose}
        title={<OrderSummaryTitle />}
      >
        <div className="space-y-3">
          <span className="text-gray-700">
            items: ({posOrder?.meals.length})
          </span>
          <div className="space-y-2 max-h-[60vh] overflow-auto pr-2 OrderSummaryScroll">
            {posOrder?.meals.length != 0 &&
              posOrder?.meals.map((item) => (
                <OrderItem key={item.mealOrderId} meal={item} />
              ))}
          </div>
          <div className="pt-4 border-t">
            <h3 className="text-gray-800">
              Total Price: ₱ {posOrder?.totalPrice}.00
            </h3>
          </div>
          {user?.role === "Customer" && (
            <Field className="mt-4">
              <Description className="text-sm/6 text-gray-800">
                Note for your order:
              </Description>
              <Textarea
                ref={note}
                placeholder="Your order: Your Note"
                className={clsx(
                  "block w-full resize-none rounded-lg border border-gray-300 bg-white/5 py-1.5 px-3 text-sm/6 text-black",
                  "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                )}
                rows={3}
              />
            </Field>
          )}
          {posOrder?.meals && posOrder.meals.length >= 1 && (
            <button
              onClick={handleProceedToPayment}
              className="bg-brown-600 text-white w-full p-2 rounded-md hover:bg-opacity-95"
            >
              Proceed to Payment
            </button>
          )}
        </div>
      </Modal>
      {user?.role != "Customer" ? (
        <>
          <OrderType
            isOpen={modals.orderType}
            onClose={() => setModals({ ...modals, orderType: false })}
            handleOrderTypeProceed={handleOrderTypeProceed}
          />
          {posOrder?.orderType && (
            <Payment
              isOpen={modals.payment}
              onClose={() => setModals({ ...modals, payment: false })}
            />
          )}
        </>
      ) : (
        <>
          <PickUpOptionModal
            isOpen={modals.pickUpOption}
            onClose={() => setModals({ ...modals, pickUpOption: false })}
          />
        </>
      )}
    </>
  );
}

function OrderSummaryTitle() {
  return (
    <div className="pb-4 border-b">
      <h1 className="flex gap-2 items-center font-semibold text-brown-600 text-xl">
        <ShoppingBag size={20} /> Order Summary
      </h1>
    </div>
  );
}

function OrderItem({ meal }: { meal: PosMealOrder }) {
  const { AddQuantity, SubtractQuantity, RemoveFromCart } =
    usePosStateContext();

  return (
    <div className="flex justify-between">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="font-bold text-slate-800">{meal.mealName}</h1>
          {meal.mealCategory != 5 && (
            <span className="text-xs">
              {typeof meal.mealPrice === "object"
                ? meal.mealPrice?.size
                : meal.mealPrice}
            </span>
          )}
        </div>
        {meal.mealCategory != 5 ? (
          <>
            <div className="ml-2 flex flex-col">
              <span className="text-sm font-semibold text-gray-800">
                Sugar Level: {meal.sugarLevel}
              </span>
              <span className="text-sm font-medium text-gray-600">
                Add ons:
              </span>
            </div>
            <div className="ml-4 flex flex-col">
              {meal.addOns?.length != 0 &&
                meal.addOns?.map((add, index) => (
                  <span key={index} className="text-sm  text-gray-600">
                    {add.name}
                  </span>
                ))}
            </div>
          </>
        ) : (
          <span className="text-sm  text-gray-600">
            ₱ {meal.originalPrice}.00
          </span>
        )}
      </div>
      <div className="space-y-2">
        <div className="text-gray-800 flex items-center gap-4 p-1 justify-center border rounded-md">
          {meal.quantity == 1 ? (
            <Trash
              onClick={() =>
                meal.mealOrderId !== undefined &&
                RemoveFromCart(meal.mealOrderId)
              }
              className="cursor-pointer hover:text-brown-600"
              size={18}
            />
          ) : (
            <MinusCircle
              onClick={() =>
                meal.mealOrderId !== undefined &&
                SubtractQuantity(meal.mealOrderId)
              }
              className="cursor-pointer hover:text-brown-600"
              size={18}
            />
          )}
          <span className="text-md">{meal.quantity}</span>
          <CirclePlus
            onClick={() =>
              meal.mealOrderId !== undefined && AddQuantity(meal.mealOrderId)
            }
            size={18}
            className="cursor-pointer hover:text-brown-600"
          />
        </div>
        <p className="text-gray-800 text-sm">Total: ₱ {meal.totalPrice}.00</p>
      </div>
    </div>
  );
}
