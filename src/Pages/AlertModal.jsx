import React from "react";

const AlertModal = ({ isOpen, onClose, message }) => {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "8px",
          maxWidth: "350px",
          width: "90%",
          textAlign: "center",
          position: "relative"
        }}
      >
  
        <img
          src="https://img.freepik.com/premium-vector/warning-icon-red-vector-graphics_292645-287.jpg"
          alt="Alert"
          style={{ width: "100px", marginBottom: "-20px" }}
        />
        <h2 style={{ color: "#EA3C3C", marginBottom: "10px" }}>ERROR!</h2>
        <p style={{ fontSize: "14px", margin: "0" }}>{message}</p>
        <button
          onClick={onClose}
          style={{
            marginTop: "20px",
            padding: "8px 16px",
            backgroundColor: "#EA3C3C",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default AlertModal;
