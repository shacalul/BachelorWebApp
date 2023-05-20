import React, { useState, useEffect, useRef } from "react";
import { Input, Textarea } from "@material-tailwind/react";
import { createMessage, getMessages } from "../../api/messages";

const ContactForm = () => {
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState([]);
  const emailRef = useRef();
  const subjectRef = useRef();
  const messageRef = useRef();

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    const messagesData = await getMessages();
    setMessages(messagesData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const greatestId = messages.reduce(
      (maxId, message) => Math.max(maxId, message.id),
      0
    );
    const newId = greatestId + 1;

    const messagePayload = {
      id: newId,
      email: emailRef.current.value,
      subject: subjectRef.current.value,
      message: messageRef.current.value,
    };
    for (let key in messagePayload) {
      if (messagePayload[key] === null) {
        delete messagePayload[key];
      }
    }

    console.log(messagePayload);
    const createdMessage = await createMessage(messagePayload);
    console.log(createdMessage);
    alert("Congratulations! Your message has been sent!");
    window.location.reload();
  };

  return (
    <div className="min-h-screen" style={{ overflowY: "scroll" }}>
      <div class="flex items-center justify-center p-10 py-10">
        <div class="mx-auto w-full max-w-[550px]">
          <div class="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
            <h2 class="h2 text-center ">Contact Us</h2>
            <p class="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">
              We're always happy to hear from students and help you find your
              perfect home away from home. We are just a click away!
            </p>

            <div class="mb-5">
              <label class="mb-3 block text-base font-medium text-[#07074D]">
                Email
              </label>
              <div class="flex items-center space-x-6">
                <div class="flex items-center w-full">
                  <input
                    ref={emailRef}
                    type="text"
                    name="email"
                    id="email"
                    placeholder="Email"
                    class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                </div>
              </div>
            </div>
            <div class="mb-5">
              <label class="mb-3 block text-base font-medium text-[#07074D]">
                Subject
              </label>
              <div class="flex items-center space-x-6">
                <div class="flex items-center w-full">
                  <input
                    ref={subjectRef}
                    type="text"
                    name="subject"
                    id="subject"
                    placeholder="Subject"
                    class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                </div>
              </div>
            </div>
            <div class="mb-5">
              <label class="mb-3 block text-base font-medium text-[#07074D]">
                Message
              </label>
              <div class="flex items-center space-x-6">
                <div class="flex items-center w-full">
                  <textarea
                    ref={messageRef}
                    type="text"
                    name="message"
                    id="message"
                    placeholder="Message"
                    class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                </div>
              </div>
            </div>

            <button
              loading={loading}
              onClick={handleSubmit}
              className="btn btn-secondary btn-sm w-full mx-auto"
            >
              Send message
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
