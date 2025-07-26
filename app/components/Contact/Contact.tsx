"use client";

import s from "./contact.module.css";
import { Dialog, Form, Toast } from "radix-ui";
import { X as CloseIcon } from "lucide-react";
import { useState } from "react";
import emailjs from "@emailjs/browser";

type ContactProps = {
  onClose?: () => void;
  toastOpen?: boolean;
  setToastOpen?: (open: boolean) => void;
  toastMessage?: string;
  setToastMessage?: (message: string) => void;
};

export const Contact = ({
  onClose,
  toastOpen,
  setToastOpen,
  toastMessage,
  setToastMessage,
}: ContactProps) => {
  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent) => {
    const { name, value } = e.target as HTMLInputElement;
    setUserInput({
      ...userInput,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const serviceID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const userID = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceID || !templateID || !userID) {
      console.log("EmailJS environment", {
        serviceID,
        templateID,
        userID,
      });
      console.error("EmailJS environment variables are not set.");
      return;
    }

    emailjs
      .send(serviceID, templateID, userInput, userID)
      .then(() => {
        if (setToastMessage) {
          setToastMessage("Message sent successfully!");
        }
        if (setToastOpen) {
          setToastOpen(true);
        }
        setUserInput({ name: "", email: "", message: "" });
        if (onClose) {
          onClose();
        }
      })
      .catch((error) => {
        console.error("Failed to send message:", error);
        if (setToastMessage) {
          setToastMessage("Failed to send message. Please try again later.");
        }
        if (setToastOpen) {
          setToastOpen(true);
        }
        setUserInput({ name: "", email: "", message: "" });
        if (onClose) {
          onClose();
        }
      });
  };
  return (
    <>
      <Dialog.Portal>
        <Dialog.Overlay className={s["contact-overlay"]}>
          <Dialog.Content className={s["contact-content"]}>
            <div className={s["contact-container"]}>
              <Dialog.Title className={s["contact-title"]}>Contact Me</Dialog.Title>
              <Dialog.Description className={s["contact-description"]}>
                This goes straight to my phone. I will get back to you as soon as possible.
              </Dialog.Description>
              <Form.Root className={s["contact-form"]}>
                <Form.Field name="name" className={s["contact-field"]}>
                  <div className={s["contact-field-wrapper"]}>
                    <Form.Label className={s["contact-label"]}>Name</Form.Label>
                    <Form.Message className={s["contact-message"]} match="valueMissing">
                      Please enter your name
                    </Form.Message>
                  </div>

                  <Form.Control asChild>
                    <input
                      type="text"
                      className={s["contact-input"]}
                      required
                      name="name"
                      onChange={handleChange}
                    />
                  </Form.Control>
                </Form.Field>

                <Form.Field name="email" className={s["contact-field"]}>
                  <div className={s["contact-field-wrapper"]}>
                    <Form.Label className={s["contact-label"]}>Email</Form.Label>
                    <Form.Message className={s["contact-message"]} match="valueMissing">
                      Please enter your email
                    </Form.Message>
                    <Form.Message className={s["contact-message"]} match="typeMismatch">
                      Please provide a valid email
                    </Form.Message>
                  </div>

                  <Form.Control asChild>
                    <input
                      type="email"
                      name="email"
                      className={s["contact-input"]}
                      required
                      onChange={handleChange}
                    />
                  </Form.Control>
                </Form.Field>

                <Form.Field name="message" className={s["contact-field"]}>
                  <div className={s["contact-field-wrapper"]}>
                    <Form.Label className={s["contact-label"]}>Message</Form.Label>
                    <Form.Message className={s["contact-message"]} match="valueMissing">
                      Please enter a message
                    </Form.Message>
                  </div>

                  <Form.Control asChild>
                    <textarea
                      required
                      className={s["contact-textarea"]}
                      name="message"
                      onChange={handleChange}
                    />
                  </Form.Control>
                </Form.Field>
                <div className={s["contact-actions"]}>
                  <Form.Submit asChild>
                    <button type="submit" className={s["contact-submit"]} onClick={handleSubmit}>
                      Send Message
                    </button>
                  </Form.Submit>
                </div>
              </Form.Root>

              <Dialog.Close asChild>
                <button className={s["contact-close"]}>
                  <CloseIcon />
                </button>
              </Dialog.Close>
            </div>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
      <Toast.Root
        className={s["contact-toast-container"]}
        open={toastOpen}
        onOpenChange={setToastOpen}
        duration={5000}
      >
        <Toast.Title className={s["contact-toast-title"]}>Message Status</Toast.Title>
        <Toast.Description asChild>
          <p className={s["contact-toast-description"]}>{toastMessage}</p>
        </Toast.Description>
      </Toast.Root>
      <Toast.Viewport className={s["contact-toast-viewport"]} />
    </>
  );
};
