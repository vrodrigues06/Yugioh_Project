// components/ui/ConfirmModal.tsx
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
  duelista: string;
}

export const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirmar ação",
  duelista,
}: ConfirmModalProps) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-150"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-sm transform overflow-hidden rounded-2xl bg-azul-950 p-6 text-left align-middle shadow-xl transition-all border border-sky-500">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-semibold leading-6 text-orange-400"
                >
                  {title}
                </Dialog.Title>
                <div className="mt-2 text-slate-400 text-sm">
                  Você está prestes a definir{" "}
                  <span className="font-bold bg-gradient-to-r from-orange-400 to-yellow-300 bg-clip-text text-transparent">
                    {duelista}{" "}
                  </span>
                  como vencedor. Essa ação não poderá ser desfeita.
                </div>

                <div className="mt-4 flex justify-end gap-2">
                  <button
                    type="button"
                    className="px-4 py-1.5 rounded-md text-sm bg-slate-700 hover:bg-slate-600 text-white transition"
                    onClick={onClose}
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    className="px-4 py-1.5 rounded-md text-sm bg-orange-500 hover:bg-orange-600 text-white font-semibold transition"
                    onClick={onConfirm}
                  >
                    Confirmar
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
