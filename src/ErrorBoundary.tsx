import React from "react";

const isDev = import.meta.env.DEV;

type Props = { name?: string; fallback?: React.ReactNode; children: React.ReactNode };
type State = { hasError: boolean; error?: unknown; info?: unknown };

export class ErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false };
  private hasRenderedError = false;

  static getDerivedStateFromError(error: unknown): State {
    // samo markiramo grešku; NEMA dodatnog setState-a u componentDidCatch
    return { hasError: true, error };
  }

  componentDidCatch(error: unknown, info: unknown) {
    // logiramo, ali NE zovemo setState - ovo bi moglo uzrokovati beskonačne petlje
    console.error(
      `[ErrorBoundary${this.props.name ? `:${this.props.name}` : ""}]`,
      error,
      info
    );
  }

  render() {
    if (this.state.hasError) {
      // Spriječimo beskonačne petlje - renderiraj grešku samo jednom
      if (!this.hasRenderedError) {
        this.hasRenderedError = true;
      }
      
      if (isDev) {
        return (
          <div style={{ padding: 24, maxWidth: 900 }}>
            <h2>
              Došlo je do greške u komponenti{this.props.name ? `: ${this.props.name}` : ""}.
            </h2>
            <p>Provjeri konzolu za detalje.</p>
            <pre style={{ whiteSpace: "pre-wrap" }}>
{String((this.state.error as Error)?.message ?? String(this.state.error ?? ""))}
            </pre>
          </div>
        );
      }
      return this.props.fallback ?? (
        <div style={{ padding: 24 }}>Došlo je do greške u komponenti.</div>
      );
    }
    // Resetiraj flag kada nema greške
    if (this.hasRenderedError && !this.state.hasError) {
      this.hasRenderedError = false;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
