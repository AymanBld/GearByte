import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import "./Contactus.css";
import contact from "../imges/contactus.png";

const Contactus = () => {
  const form = useRef();
  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    message: ""
  });
  const [isValid, setIsValid] = useState({
    email: null
  });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateEmail = (value) => {
    const trimmedValue = value.trim().toLowerCase();
    const isEmailValid = emailRegex.test(trimmedValue);

    setIsValid(prev => ({
      ...prev,
      email: trimmedValue.length > 0 ? isEmailValid : null
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === 'user_email') {
      validateEmail(value);
    }
  };

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_z67oxwo",
        "template_dv4b3vj",
        form.current,
        "AIk-CyT_TeHvIr6_0"
      )
      .then(
        (result) => {
          console.log("Email sent successfully!", result.text);
          alert("Message sent successfully!");
          setFormData({ user_name: "", user_email: "", message: "" });
          setIsValid({ email: null });
        },
        (error) => {
          console.error("Email sending failed:", error.text);
          alert("Failed to send message. Please try again.");
        }
      );
  };

  return (
    <section className="contactus" id="Contactus">
      <div className="form">
        <h2 className="titre">Get in touch</h2>
        <p className="paragraph">We are here for you! How can we help?</p>
        <form ref={form} onSubmit={sendEmail} className="inputs">
          <div className="form-group">
            <label htmlFor="name" className="name">Name</label>
            <input 
              type="text" 
              id="name" 
              name="user_name" 
              value={formData.user_name}
              onChange={handleChange}
              required 
              placeholder="Enter your name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email" className="email">Email</label>
            <div className="email-input-container">
              <input
                type="email"
                id="email"
                name="user_email"
                value={formData.user_email}
                onChange={handleChange}
                required
                placeholder="Enter your email address"
                className={
                  isValid.email === true
                    ? "input-valid"
                    : isValid.email === false
                    ? "input-error"
                    : ""
                }
              />
              {formData.user_email.trim().length > 0 && !isValid.email && (
                <span className="email-icon email-error">✖</span>
              )}
              {formData.user_email.trim().length > 0 && isValid.email && (
                <span className="email-icon email-valid">&#10003;</span>
              )}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="msg" className="msg">Message</label>
            <textarea 
              id="msg" 
              name="message" 
              rows="5" 
              value={formData.message}
              onChange={handleChange}
              required 
              placeholder="Type your message here..."
            />
          </div>

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

