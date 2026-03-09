import { Component, type ErrorInfo, type ReactNode } from "react";

type AppErrorBoundaryProps = {
  children: ReactNode;
};

type AppErrorBoundaryState = {
  hasError: boolean;
  message: string;
};

export class AppErrorBoundary extends Component<AppErrorBoundaryProps, AppErrorBoundaryState> {
  state: AppErrorBoundaryState = {
    hasError: false,
    message: "",
  };

  static getDerivedStateFromError(error: unknown): AppErrorBoundaryState {
    const message = error instanceof Error ? error.message : "Unknown runtime error";
    return { hasError: true, message };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("App crashed:", error, errorInfo);
  }

  render() {
    if (!this.state.hasError) {
      return this.props.children;
    }

    return (
      <main className="min-h-screen bg-neutral-950 px-6 py-16 text-white">
        <div className="mx-auto max-w-3xl rounded-2xl border border-red-400/40 bg-red-500/10 p-6">
          <h1 className="text-2xl font-semibold text-red-200">Runtime error in UI</h1>
          <p className="mt-3 text-sm text-red-100/90">{this.state.message}</p>
          <p className="mt-3 text-sm text-red-100/90">
            Open browser console for stack trace, then share the first error line.
          </p>
        </div>
      </main>
    );
  }
}
