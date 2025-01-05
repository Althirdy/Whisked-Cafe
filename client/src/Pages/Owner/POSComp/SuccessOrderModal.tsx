import { useEffect } from "react";
import Modal from "../../../Components/Modal";
import { usePosStateContext } from "../../../Contexts/POSContextProvider";

type modal_T = {
  isOpen: boolean;
  onClose: () => void;
};

export default function SuccessOrderModal(props: modal_T) {
  const { ResetData } = usePosStateContext();

  useEffect(() => {
    if (props.isOpen) {
      const timer = setTimeout(() => {
        ResetData();
        props.onClose();
      }, 1600);
      return () => clearTimeout(timer);
    }
  }, [props.isOpen, ResetData, props.onClose]);

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <div className="flex flex-col items-center justify-center">
        <img src="https://media.tenor.com/bm8Q6yAlsPsAAAAj/verified.gif" alt=""/>
        <span className="text-lg font-bold text-green-600">Order Saved Successfully!</span>
      </div>
    </Modal>
  );
}
