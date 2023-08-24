import ErrorMessage from "../errorMessage/errorMessage.jsx";
import { Link } from "react-router-dom";

const Page404 = () => {
  return (
    <div>
      <ErrorMessage />
      <p
        style={{
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "24px",
          marginBottom: "50px",
        }}
      >
        <span style={{ color: "#9f0013" }}>404</span> - page doesn't exist
      </p>
      <Link
        style={{
          display: "block",
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "24px",
        }}
        to={"/"}
      >
        Back to the <span style={{ color: "#9f0013" }}>main page</span>
      </Link>
    </div>
  );
};

export default Page404;
