import { Fragment, useEffect, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { ChevronsUpDownIcon, CheckIcon } from "lucide-react";
import { mealCategory } from "../Pages/Owner/Util/Meal_Util";

type ComboBoxProps = {
  combo_data: mealCategory[] | string[];
  setSelectedData: (newRole: string | null | mealCategory) => void;
};

export default function ComboBox({
  combo_data,
  setSelectedData,
}: ComboBoxProps) {
  const [selected, setSelected] = useState<mealCategory | string | null>(
    Array.isArray(combo_data) && combo_data.length > 0 ? combo_data[0] : null
  );

  useEffect(() => {
    setSelectedData(selected);
  }, [selected]);

  return (
    <div className="w-72">
      <Combobox value={selected} onChange={setSelected}>
        <div className="relative mt-1">
          <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left border border-gray-200 focus-within:ring-2 focus-within:ring-primary focus-within:ring-opacity-75 focus-within:ring-offset-2 focus-within:ring-offset-primary">
            <Combobox.Button className="w-full py-2.5 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:outline-none">
              <span className="block truncate">
                {typeof selected === "string"
                  ? selected
                  : selected?.category || ""}
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronsUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Combobox.Options className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {combo_data.map((category) => (
                <Combobox.Option
                  key={
                    typeof category === "string" ? category : category?.category
                  }
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 hover:bg-gray-100 ${
                      active ? "bg-primary/5 text-primary" : "text-gray-900"
                    }`
                  }
                  value={category}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {typeof category === "string"
                          ? category
                          : category?.category}
                      </span>
                      {selected ? (
                        <span
                          className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                            active ? "text-primary" : "text-primary"
                          }`}
                        >
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Combobox.Option>
              ))}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
}
