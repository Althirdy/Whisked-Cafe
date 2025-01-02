import { RadioGroup } from "@headlessui/react";
import Modal from "../../../Components/Modal";
import { useState } from "react";

const sizes = [
  { name: "12oz", price: 50 },
  { name: "16oz", price: 60 },
  { name: "22oz", price: 80 },
];

const addOnOptions = [
  { name: "Espresso Shot", price: 20 },
  { name: "Heavy Cream", price: 15 },
  { name: "Coffee Jelly", price: 15 },
  { name: "Nata", price: 10 },
  { name: "Pearl", price: 10 },
];
const sugarLevels = ["100%", "70%", "50%", "30%", "No Sugar"];

type AddOnsModalProps_T = {
  isOpen: boolean;
  onClose: () => void;
};

export default function AddOnsModal({ isOpen, onClose }: AddOnsModalProps_T) {
  const [selectedSize, setSelectedSize] = useState("12oz");
  const [addOns, setAddOns] = useState<Object[]>([]);
  const [sugarLevel, setSugarLevel] = useState("Default (100%)");

  const handleAddOnToggle = (addon: Object) => {
    setAddOns((prev) =>
      prev.includes(addon) ? prev.filter((a) => a !== addon) : [...prev, addon]
    );
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={<AddOnsModalTitle />}>
      <div>
        <div className="bg-brown-50/50 rounded-lg ">
          <h4 className="text-sm font-medium mb-2">Size</h4>
          <RadioGroup value={selectedSize} onChange={setSelectedSize}>
            <div className="space-y-1">
              {sizes.map((size) => (
                <RadioGroup.Option
                  key={size.name}
                  value={size.name}
                  className={({ checked }) =>
                    `${checked ? "text-brown-800" : "text-gray-600"}
                              relative flex cursor-pointer items-center justify-between p-2 focus:outline-none`
                  }
                >
                  {({ checked }) => (
                    <>
                      <div className="flex items-center">
                        <div
                          className={`rounded-full border-2 w-4 h-4 flex items-center justify-center mr-2
                                    ${
                                      checked
                                        ? "border-brown-600"
                                        : "border-gray-300"
                                    }`}
                        >
                          {checked && (
                            <div className="rounded-full bg-brown-600 w-2 h-2" />
                          )}
                        </div>
                        <span className="text-md">{size.name}</span>
                      </div>
                      <span className="text-sm">₱ {size.price}</span>
                    </>
                  )}
                </RadioGroup.Option>
              ))}
            </div>
          </RadioGroup>
        </div>
        {/* AddOns */}
        <div className="my-3">
          <h4 className="text-sm font-medium mb-2">Add-ons</h4>
          <div className="space-y-1">
            {addOnOptions.map((addon) => (
              <label
                key={addon.name}
                className="flex items-center justify-between p-2 cursor-pointer"
              >
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={addOns.includes(addon.name)}
                    onChange={() => handleAddOnToggle(addon.name)}
                    className="rounded border-gray-300 text-brown-600 focus:ring-brown-600"
                  />
                  <span className="ml-2 text-gray-600">{addon.name}</span>
                </div>
                <span className="text-gray-600 text-sm">+ ₱{addon.price}</span>
              </label>
            ))}
          </div>
        </div>
        {/* sugar Level */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-medium">Sugar Level</h4>
          </div>
          <select
            value={sugarLevel}
            onChange={(e) => setSugarLevel(e.target.value)}
            className="w-full rounded-md p-2 border border-gray-300 focus:border-brown-600 focus:ring-brown-600"
          >
            {sugarLevels.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </div>
        {/* CTA */}

        <button className="bg-brown-600 mt-4 rounded-md font-medium hover:bg-opacity-95 text-white px-4 py-2 w-full">
          Place Order
        </button>
      </div>
    </Modal>
  );
}

function AddOnsModalTitle() {
  return (
    <div className="space-y-[-.2rem] pb-4 border-b">
      <h1 className="text-brown-600 font-semibold text-lg">Customize</h1>
      <p className="text-sm text-gray-700">Add-Ons</p>
    </div>
  );
}
