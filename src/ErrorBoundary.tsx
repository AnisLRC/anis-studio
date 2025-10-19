import React from "react";

const isDev = import.meta.env.DEV;

export class ErrorBoundary extends React.Component<
  { name?: string; fallback?: React.ReactNode },
  { hasError: boolean; error?: any; info?: any }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }
  componentDidCatch(error: any, info: any) {
    this.setState({ info });
    console.error(`[ErrorBoundary${this.props.name ? `:${this.props.name}` : ""}]`, error, info);
  }
  render() {
    if (this.state.hasError) {
      if (isDev) {
        return (
          <div style={{ padding: 24, maxWidth: 900 }}>
            <h2>Došlo je do greške u komponenti{this.props.name ? `: ${this.props.name}` : ""}.</h2>
            <p>Provjeri konzolu za detalje, a ovdje je sažetak:</p>
            <pre style={{ whiteSpace: "pre-wrap" }}>
{String(this.state.error?.message || this.state.error)}
            </pre>
            {this.state.info?.componentStack && (
              <details open>
                <summary>Stack</summary>
                <pre>{this.state.info.componentStack}</pre>
              </details>
            )}
          </div>
        );
      }
      return this.props.fallback ?? <div style={{ padding: 24 }}>Došlo je do greške u komponenti.</div>;
    }
    return this.props.children as any;
  }
}
