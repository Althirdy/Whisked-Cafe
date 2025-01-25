import { Plus } from "lucide-react";
import InputField from "../../Components/InputField";
import { useEffect, useState } from "react";
import { FetchInventory } from "./Util/Inventory_Util";
import { Inventory_T } from "./InventoryComp/Inventory_T";
import AddStockModal from "./InventoryComp/AddStockModal";
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export default function () {
  const [query, setQuery] = useState<string>("");
  const [inventoryData, setInventoryData] = useState<Inventory_T[]>();
  const [addStock, setAddStock] = useState(false);
  const [links, setLinks] = useState<any>();
  const _FetchInventory = async ({ url = "" }) => {
    let Url = url || `${BASE_URL}/v1/inventory`;
    if (query) {
      Url += `?query=${query}`;
    }
    const res = await FetchInventory(Url);
    if (res.success) {
      setInventoryData(res.data.data);
      setLinks(res.data);
      console.log(res.data);
    }
  };

  useEffect(() => {
    _FetchInventory({ url: "" });
  }, [query]);

  return (
    <div>
      {" "}
      <div className="md:flex space-y-2 justify-between items-center">
        <div className="flex flex-col gap-2 md:w-[50%]">
          <h1 className="font-semibold text-md">
            Inventory ({inventoryData?.length})
          </h1>
          <InputField
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Item.."
          />
        </div>
        <button
          onClick={() => setAddStock(true)}
          className="px-3 py-2 bg-brown-600 flex items-center gap-2 text-white rounded-md text-sm hover:bg-opacity-90 focus:outline-1 focus:outline-blue-600"
        >
          <Plus size={16} />
          Add Item
        </button>
      </div>
      {inventoryData && <InventoryTable inventoryData={inventoryData} />}
      {addStock && (
        <AddStockModal
          _FetchInventory={() => _FetchInventory}
          isOpen={addStock}
          onClose={() => setAddStock(false)}
        />
      )}
      {/* Pagination */}
      {links && (
        <div className="mt-4 justify-end flex items-center gap-4">
          <button
            disabled={!links?.links.prev}
            onClick={() => _FetchInventory({ url: links?.links.prev })}
            className="border disabled:cursor-not-allowed disabled:bg-gray-200 text-sm gap-2 px-4 py-2 flex items-center rounded-md bg-white"
          >
            Prev
          </button>
          <p className="flex flex-col items-center text-xs">
            <span>0{links?.meta?.current_page}</span>
            Page
          </p>
          <button
            disabled={!links?.links.next}
            onClick={() => _FetchInventory({ url: links?.links.next })}
            className="border disabled:cursor-not-allowed disabled:bg-gray-200 text-sm gap-2 px-4 py-2 flex items-center rounded-md bg-white"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

function InventoryTable({ inventoryData }: { inventoryData: Inventory_T[] }) {
  const tableHeader = `px-4 py-3 text-left font-semibold border-r text-gray-800`;
  return (
    <div className="overflow-x-auto mt-4">
      <table className="min-w-full bg-white border border-gray-300 text-sm">
        <thead>
          <tr className="bg-white border-b">
            <th className={tableHeader}>Stock ID</th>
            <th className={tableHeader}>Stock Name</th>
            <th className={tableHeader}>Amount/Quantity</th>
            <th className={tableHeader}>Measurement</th>
            <th className={tableHeader}>Current Stock</th>
            <th className={tableHeader}>Supplier</th>
            <th className={tableHeader}>Delivery Date</th>
            <th className={tableHeader}>Expiration Date</th>
          </tr>
        </thead>
        <tbody>
          {inventoryData &&
            inventoryData.map((item, index) => (
              <tr className="border-b" key={index}>
                <td className="px-4 py-5 font-medium">00{item.id}</td>
                <td className="px-4">{item.stockName}</td>
                <td className="px-4">{item.amountPerQuantity}</td>
                <td className="px-4">{item.measurement}</td>
                <td className="px-4">{item.currentStock}</td>
                <td className="px-4">{item.supplier}</td>
                <td className="px-4">{item.deliveryDate}</td>
                <td className="px-4">
                  {item.expirationDate || "No Expiration Date"}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
