import { Button, Result } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Result
        status="404"
        title="404"
        subTitle="Page not found."
        extra={
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Button
              type="primary"
              onClick={() => navigate("/")}
              className="mb-2"
            >
              Home
            </Button>
            <Button onClick={() => navigate(-1)} className="mt-1">
              Back
            </Button>
          </div>
        }
      />
    </div>
  );
};

export default PageNotFound;
