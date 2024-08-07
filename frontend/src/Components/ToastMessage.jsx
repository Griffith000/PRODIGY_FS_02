import React from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const notifySuccess = (message) => toast.success(message);
const notifyWarning = (message) => toast.warning(message);
const notifyError = (message) => toast.error(message);
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by ErrorBoundary: ", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}
const ToastMessage = () => {
  return (
    <ErrorBoundary>
      <div>
        {/* <button onClick={notify}>Notify!</button> */}
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </ErrorBoundary>
  );
};
export { notifySuccess, notifyWarning, notifyError };
export default ToastMessage;
