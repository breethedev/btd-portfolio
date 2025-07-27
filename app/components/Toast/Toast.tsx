import s from "./toast.module.css";
import { Toast as ToastComp } from "radix-ui";
import { X as CloseIcon } from "lucide-react";

type ToastProps = {
  toastOpen?: boolean;
  setToastOpen?: (open: boolean) => void;
  toastMessage?: string;
  toastTitle?: string;
};

export const Toast = ({
  toastOpen = false,
  setToastOpen = () => {},
  toastMessage = "",
  toastTitle = "Hi There! 👋",
}: ToastProps) => {
  return (
    <>
      <ToastComp.Root
        className={s["toast-container"]}
        open={toastOpen}
        onOpenChange={setToastOpen}
        duration={5000}
      >
        <ToastComp.Title className={s["toast-title"]}>{toastTitle}</ToastComp.Title>
        <ToastComp.Close asChild>
          <button
            className={s["toast-close-button"]}
            aria-label="Close"
            onClick={() => setToastOpen(false)}
          >
            <CloseIcon size={16} />
          </button>
        </ToastComp.Close>

        <ToastComp.Description asChild>
          <p className={s["toast-description"]}>{toastMessage}</p>
        </ToastComp.Description>
      </ToastComp.Root>
      <ToastComp.Viewport className={s["toast-viewport"]} />
    </>
  );
};
