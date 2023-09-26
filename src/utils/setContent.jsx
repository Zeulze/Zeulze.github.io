import Skeleton from "../components/skeleton/Skeleton.jsx";
import Spinner from "../components/spinner/spinner.jsx";
import ErrorMessage from "../components/errorMessage/errorMessage.jsx";

export const setContent = (process, Component, data) => {
  switch (process) {
    case "waiting":
      return <Skeleton />;
    case "loading":
      return <Spinner />;
    case "confirmed":
      return <Component data={data} />;
    case "error":
      return <ErrorMessage />;
    default:
      throw new Error("Unexpected process state");
  }
};
