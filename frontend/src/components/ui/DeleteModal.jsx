import React from "react";
import {
  DialogBackdrop,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { IoClose } from "react-icons/io5";
import { BsBuildings } from "react-icons/bs";

const DeleteModal = ({ isOpen, setIsOpen, title, children, afterClose }) => {
  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-50 focus:outline-none"
      onClose={() => {
        // setIsOpen(defaultModalStatus);
        afterClose && afterClose();
      }}
    >
      <DialogBackdrop className="fixed inset-0 bg-black/30" />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex items-center justify-center min-h-full p-4">
          <DialogPanel
            transition
            className="overflow-auto w-[98%] md:w-[50%] lg:w-[30%] max-h-[90vh] px-6 lg:px-8 py-5 rounded-xl bg-white p-8  backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
          >
            <div className="flex justify-end w-full ">
              <button
                type="button"
                className="text-white bg-red-500 hover:opacity-70"
                onClick={() => {
                  setIsOpen(defaultModalStatus);
                  afterClose && afterClose();
                }}
              >
                <IoClose />
              </button>
            </div>
            <DialogTitle
              as="h2"
              className="flex items-center gap-2 justify-start text-2xl font-semibold font-inter text-[#16192C]"
            >
              <p className="p-1 border rounded-md border-[#A3A0AE] mr-1">
                <BsBuildings className="text-[#A3A0AE] text-3xl w-5 h-5  rounded-md font-bold" />
              </p>
              {title}
            </DialogTitle>
            {children}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default DeleteModal;
