import React, { useState } from "react";
import { Input, Textarea } from "@material-tailwind/react";
import { createMessage } from "../../api/messages";
const ContactForm = () => {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const messageData = {
      email,
      subject,
      message,
    };

    createMessage(messageData)
      .then((response) => {
        // Handle successful response
        console.log(response);
      })
      .catch((error) => {
        // Handle error
        console.error(error);
      });
  };
  return (
    <div className="min-h-screen">
      <section class="bg-white dark:bg-gray-900 py-10">
        <div class="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
          <h2 class="h2 text-center ">Contact Us</h2>
          <p class="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">
            We're always happy to hear from students and help you find your
            perfect home away from home. We are just a click away!
          </p>
          <form action="#" class="space-y-8" onSubmit={handleSubmit}>
            <div>
              <Input
                label="Your email"
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <Input
                label="Subject"
                type="text"
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
              />
            </div>
            <div class="sm:col-span-2">
              <Textarea
                label="Your Message"
                id="message"
                rows="6"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              ></Textarea>
            </div>
            <button
              type="submit"
              className="btn btn-secondary btn-sm w-full mx-auto"
            >
              Send message
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default ContactForm;
