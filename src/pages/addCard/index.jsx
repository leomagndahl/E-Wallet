// src/pages/index.tsx
import AddCardForm from "../../components/add-card-form/AddCardForm";
export default function AddCard() {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <div className="flex justify-center items-center w-full mb-24">
        <AddCardForm />
      </div>
    </div>
  );
}
