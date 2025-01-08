import Modal from "../../../Components/Modal"
import { Meal_T } from "../POSComp/POS_T"

type MenuInfoModal = {
    isOpen: boolean,
    onClose: () => void,
    meal: Meal_T
}

export default function MenuInfoModal({isOpen,onClose,meal}:MenuInfoModal) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
        <div className="">
            {/* <img src={meal.image} alt="meal image" className="h-32 rounded-md mx-auto w-32 border p-4 object-contain" /> */}
        </div>
    </Modal>
  )
}
