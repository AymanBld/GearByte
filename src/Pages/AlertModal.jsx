import React from "react";

const AlertModal = ({ isOpen, onClose, message, type = "error" }) => {
  if (!isOpen) return null;

  const isSuccess = type === "success";

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
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "12px",
          maxWidth: "400px",
          width: "90%",
          textAlign: "center",
          position: "relative",
          boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
        }}
      >
        {isSuccess ? (
          <div style={{ marginBottom: "10px" }}>
            <div
              style={{
                width: "60px",
                height: "60px",
                borderRadius: "50%",
                backgroundColor: "#E8F5E9",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 10px",
              }}
            >
              <svg
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"
                  fill="#4CAF50"
                />
              </svg>
            </div>
            <h2 style={{ color: "#2E7D32", fontSize: "20px", margin: "0" }}>
              Success!
            </h2>
          </div>
        ) : (
          <div style={{ marginBottom: "10px" }}>
            <div
              style={{
                width: "60px",
                height: "60px",
                borderRadius: "50%",
                backgroundColor: "#FFEBEE",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 10px",
              }}
            >
              <svg
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"
                  fill="#E53935"
                />
              </svg>
            </div>
            <h2 style={{ color: "#C62828", fontSize: "20px", margin: "0" }}>
              Error
            </h2>
          </div>
        )}
        
        <p style={{ 
          fontSize: "14px", 
          margin: "10px 0 15px", 
          color: "#555", 
          lineHeight: "1.4" 
        }}>
          {message}
        </p>
        
        <button
          onClick={onClose}
          style={{
            padding: "8px 20px",
            backgroundColor: isSuccess ? "#4CAF50" : "#EA3C3C",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "500",
            transition: "background-color 0.2s",
            outline: "none",
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = isSuccess ? "#388E3C" : "#D32F2F"}
          onMouseOut={(e) => e.target.style.backgroundColor = isSuccess ? "#4CAF50" : "#EA3C3C"}
        >
          {isSuccess ? "Great!" : "Close"}
        </button>
      </div>
    </div>
  );
};

export default AlertModal;
