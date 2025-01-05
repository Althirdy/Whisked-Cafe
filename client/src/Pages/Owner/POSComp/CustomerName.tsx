import { useEffect, useState } from "react";
import InputField from "../../../Components/InputField";
import Modal from "../../../Components/Modal";
import { usePosStateContext } from "../../../Contexts/POSContextProvider";

type CustomerName_T = {
  isOpen: boolean;
  onClose: () => void;
};

export default function CustomerName({ isOpen, onClose }: CustomerName_T) {
  const [customerName, _setCustomerName] = useState("");
  const {setCustomerName} = usePosStateContext()

  useEffect(()=>{
    setCustomerName(customerName)
  },[customerName])


  const handleNameChange = (name:string) => {
    _setCustomerName(name)
  }
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onClose()
    }
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={<div>
        <h1 className="text-brown-600 font-bold">Customer Info</h1>
    </div>}>
      <InputField
        label="Customer Name"
        value={customerName}
        onChange={(e) => handleNameChange(e.target.value.toUpperCase())}
        onKeyPress={handleKeyPress}

      />
    </Modal>
  );
}
