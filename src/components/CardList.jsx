import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { useSelector, useDispatch } from "react-redux";
import { deleteCard, setActiveCard } from "./add-card-form/addCardSlice";

export default function CardList() {
  const cards = useSelector((state) => state.cardInfo.cards);
  const activeCard = useSelector((state) => state.cardInfo.activeCard);
  const dispatch = useDispatch();

  const activeCardIndex = cards.findIndex((card) => card.number === activeCard.number);
  const [selected, setSelected] = useState(cards[activeCardIndex]);

  const handleDeleteCard = () => {
    if (selected.number !== activeCard.number) {
      if (cards.length !== 1) {
        dispatch(deleteCard(selected.number));
        setSelected(cards[activeCardIndex]);
      } else {
        alert("Can't delete the last card!");
      }
    }
  };

  const setActive = () => {
    dispatch(setActiveCard(selected));
  };

  return (
    <div className="bg-white shadow-md w-11/12 p-2 rounded">
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-inherit py-2 pl-3 pr-3 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className="block truncate text-xs font-light text-center">
              Select Card
            </span>
            <span className="block p-2 text-center">
              {selected.number.replace(/(.{4})/g, "$1 ")}
            </span>
            <div className="flex items-center">
              <span className="pointer-events-none absolute inset-y-0 top-4 right-4 flex items-center pr-2">
                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </div>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {cards.map((card, cardIdx) => (
                <Listbox.Option
                  key={cardIdx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? "bg-amber-100 text-amber-900" : "text-gray-900"
                    }`
                  }
                  value={card}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {card.number.replace(/(.{4})/g, "$1 ")}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
        <div className="w-full">
          {selected.number !== activeCard.number ? (
            <div className="flex items-center justify-evenly">
              <button
                type="button"
                className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                onClick={handleDeleteCard}
              >
                Delete
              </button>
              <button
                type="button"
                className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                onClick={setActive}
              >
                set Active
              </button>
            </div>
          ) : (
            <p className="text-xs font-light mb-2 text-center">
              This card is active{" "}
              {cards.length === 1 && "and is the last card and cant be deleted"}
            </p>
          )}
        </div>
      </Listbox>
    </div>
  );
}
