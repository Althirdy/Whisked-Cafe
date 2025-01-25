import { useEffect, useState } from "react";
import InputField from "../../../Components/InputField";
import Modal from "../../../Components/Modal";
import ComboBox from "../../../Components/ComboBox";
import {
  addInventoryStock,
  FetchInventoryCategory,
} from "../Util/Inventory_Util";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";

type AddStockModal_T = {
  isOpen: boolean;
  onClose: () => void;
  _FetchInventory: () => void;
};
type InventoryCategory = {
  id: number;
  category: string;
};

export default function AddStockModal({
  isOpen,
  onClose,
  _FetchInventory,
}: AddStockModal_T) {
  const [orderData, setOrderData] = useState({
    stockName: "",
    quantity: "",
    amountPerQuantity: "",
    measurement: "",
    category: null,
    supplier: "",
    deliveryDate: new Date().toLocaleDateString("en-CA"),
    expirationDate: new Date().toLocaleDateString("en-CA"),
  });
  const [category, setSelectedCategory] = useState<InventoryCategory | null>();
  const [CategoryData, setCategoryData] = useState<InventoryCategory[]>();
  const [error, setError] = useState<any>();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { ...orderData, category: category?.id };
    const res = await addInventoryStock(data);
    if (!res.success) {
      setError(res.errors);
    } else {
      setOrderData({
        stockName: "",
        quantity: "",
        amountPerQuantity: "",
        measurement: "",
        category: null,
        supplier: "",
        deliveryDate: new Date().toLocaleDateString("en-CA"),
        expirationDate: new Date().toLocaleDateString("en-CA"),
      });
      toast.success("Stock Save Successfully");
      _FetchInventory();
      onClose();
      setError(null);
    }
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setOrderData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const _FetchInventoryCategory = async () => {
      const res = await FetchInventoryCategory();
      if (res.success) {
        setCategoryData(res.data);
      }
    };
    _FetchInventoryCategory();
  }, []);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div>
          <h1 className="font-bold text-brown-600 pb-4 border-b">
            Add Stock to inventory
          </h1>
        </div>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <span className="text-sm text-gray-700 font-semibold">
          Inventory Category
        </span>
        {CategoryData && (
          <ComboBox
            combo_data={CategoryData}
            setSelectedData={(newCategory: InventoryCategory | null) =>
              setSelectedCategory(newCategory)
            }
          />
        )}
        <InputField
          name="stockName"
          label="Stock Name"
          onChange={handleInputChange}
          value={orderData.stockName}
        />
        {error?.stockName &&
          error?.stockName.map((item, index) => (
            <span className="text-xs text-red-600" key={index}>
              {item}
            </span>
          ))}
        <InputField
          name="quantity"
          label="Quantity"
          type="number"
          onChange={handleInputChange}
          value={orderData.quantity}
        />
        {error?.quantity &&
          error?.quantity.map((item, index) => (
            <span className="text-xs text-red-600" key={index}>
              {item}
            </span>
          ))}
        <InputField
          name="measurement"
          label="Measurement"
          onChange={handleInputChange}
          value={orderData.measurement}
        />
        {error?.measurement &&
          error?.measurement.map((item, index) => (
            <span className="text-xs text-red-600" key={index}>
              {item}
            </span>
          ))}
        <InputField
          name="amountPerQuantity"
          label="Amount Per Quantity"
          placeholder="e.g 5 kilograms"
          onChange={handleInputChange}
          value={orderData.amountPerQuantity}
        />
        {error?.amountPerQuantity &&
          error?.amountPerQuantity.map((item, index) => (
            <span className="text-xs text-red-600" key={index}>
              {item}
            </span>
          ))}
        <InputField
          name="supplier"
          label="Supplier"
          onChange={handleInputChange}
          value={orderData.supplier}
        />
        {error?.supplier &&
          error?.supplier.map((item, index) => (
            <span className="text-xs text-red-600" key={index}>
              {item}
            </span>
          ))}
        <div className="flex gap-2">
          <div className="flex flex-col gap-1">
            <span className="text-sm text-gray-700 font-semibold">
              Delivery Date
            </span>
            <DatePicker
              selected={orderData.deliveryDate}
              onChange={(date) =>
                setOrderData((prev) => ({
                  ...prev,
                  deliveryDate: date.toLocaleDateString("en-CA"), // Formats as YYYY-MM-DD
                }))
              }
              name="deliveryDate"
              className="py-2 px-3 border w-full border-gray-300 text-gray-800 text-sm rounded-md flex items-center"
            />
            {error?.deliveryDate &&
              error?.deliveryDate.map((item, index) => (
                <span className="text-xs text-red-600" key={index}>
                  {item}
                </span>
              ))}
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-sm text-gray-700 font-semibold">
              Expiration Date
            </span>
            <DatePicker
              selected={orderData.expirationDate}
              onChange={(date) =>
                setOrderData((prev) => ({
                  ...prev,
                  expirationDate: date.toLocaleDateString("en-CA"), // Formats as YYYY-MM-DD
                }))
              }
              name="expirationDate"
              className="py-2 px-3 border w-full border-gray-300 text-gray-800 text-sm rounded-md flex items-center"
            />
            {error?.expirationDate &&
              error?.expirationDate.map((item, index) => (
                <span className="text-xs text-red-600" key={index}>
                  {item}
                </span>
              ))}
          </div>
        </div>
        <button
          type="submit"
          className="bg-brown-600 text-white w-full p-2 mt-3 rounded-md"
        >
          Add Stock
        </button>
      </form>
    </Modal>
  );
}
