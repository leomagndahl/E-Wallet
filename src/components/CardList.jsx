import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import CreditCard from "./CreditCard";

const cards = [
  {
    name: "Card 1",
    card: <CreditCard color="bg-amber-500" shadowSize={"xl"} />,
  },
  {
    name: "Card 2",
    card: <CreditCard color="bg-violet-300" shadowSize={"xl"} />,
  },
  {
    name: "Card 3",
    card: <CreditCard color="bg-indigo-400" shadowSize={"xl"} />,
  },
];

export default function Example() {
  const [selected, setSelected] = useState(cards[0]);

  return (
    <div className="bg-white shadow-md w-11/12 p-2 rounded">
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-inherit py-2 pl-3 pr-3 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className="block truncate text-xs font-light text-center ">
              Select Card
            </span>
            <span className="block p-2">{selected.card}</span>
            <div className="flex items-center">
              {/* <span className="h-fit pointer-events-none inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon className="h-8 w-8 text-gray-400" aria-hidden="true" />
              </span> */}
            </div>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute max-h-60 w-1/2 left-24 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {cards.map((person, personIdx) => (
                <Listbox.Option
                  key={personIdx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? "bg-amber-100 text-amber-900" : "text-gray-900"
                    }`
                  }
                  value={person}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {person.name}
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
        <div className="flex items-center justify-evenly">
          <button
            type="button"
            className="mt-px text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center  dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
          >
            Delete
          </button>
        </div>
      </Listbox>
    </div>
  );
}
