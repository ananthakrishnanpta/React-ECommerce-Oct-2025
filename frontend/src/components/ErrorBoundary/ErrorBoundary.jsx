import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    // setting up state for the Error Boundary objects to track errors.
    // hasError is boolean and stores if error is present.
    // error will track the actual error.
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    // Update state to trigger fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    // Optional: log error to a service or console
    console.error("Error caught by ErrorBoundary:", error, info);
  }

  // defining function to reload the particular page if error occurs. 
  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        // rendering error UI for front-end; This is not for console.
        <div className="container text-center mt-5">
          <h2 className="text-danger">Something went wrong 😞</h2>
          <p className="text-muted">{this.state.error?.message}</p>

          {/* Button to call handleReload function declared above
            in `this` object context. */}
          <button className="btn btn-primary mt-3" onClick={this.handleReload}>
            Reload Page 😢
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
