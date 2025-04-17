import React from 'react';
import Footer from "../assets/components/Footer";
import Copyright from "../assets/components/Copyright";
import "./NotificationsPage.css";

const NotificationsPage = () => {
  return (
    <>
      <div className="notifications-page">
        <div className="notifications-container">
          <h2>Notifications</h2>
          {/* Add your notifications list here */}
        </div>
      </div>
      <Footer />
      <Copyright />
    </>
  );
};

export default NotificationsPage;