import React, { Component, ErrorInfo } from 'react';

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<{ children: React.ReactNode }, State> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): State {
    // Update state to render fallback UI on error
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can also log error information to an error reporting service
    console.error('ErrorBoundary caught an error', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Render fallback UI
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
