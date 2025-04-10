import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import "./Contactus.css";
import contact from "../imges/contactus.png";

const Contactus = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_z67oxwo",       // Replace with your EmailJS service ID
        "template_dv4b3vj",      // Replace with your EmailJS template ID
        form.current,
        "AIk-CyT_TeHvIr6_0"        // Replace with your EmailJS public key
      )
      .then(
        (result) => {
          console.log("Email sent successfully!", result.text);
          alert("Message sent successfully!");
        },
        (error) => {
          console.error("Email sending failed:", error.text);
          alert("Failed to send message. Please try again.");
        }
      );

    e.target.reset(); // Optional: clears the form after submit
  };

  return (
    <section className="contactus" id="Contactus">
      <div className="form">
        <h2 className="titre">Get in touch</h2>
        <p className="paragraph">We are here for you! How can we help?</p>
        <form ref={form} onSubmit={sendEmail} className="inputs">
          <label htmlFor="name" className="name">Name</label>
          <input type="text" id="name" name="user_name" required />

          <label htmlFor="email" className="email">Email</label>
          <input type="email" id="email" name="user_email" required />

          <label htmlFor="msg" className="msg">Message</label>
          <textarea id="msg" name="message" rows="5" required />

          <button type="submit" className="button">Submit</button>
        </form>
      </div>
      <div className="contact-pic">
        <img src={contact} alt="Contact Us Illustration" />
      </div>
    </section>
  );
};

export default Contactus;

