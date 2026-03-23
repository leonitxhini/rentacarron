import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { Component, type ErrorInfo, type ReactNode } from "react";

class ErrorBoundary extends Component<{ children: ReactNode }, { error: Error | null }> {
  state = { error: null };
  static getDerivedStateFromError(error: Error) { return { error }; }
  componentDidCatch(_error: Error, _info: ErrorInfo) {}
  render() {
    if (this.state.error) {
      return (
        <div className="min-h-screen bg-[#0a0c14] flex items-center justify-center p-8">
          <div className="text-center">
            <p className="text-2xl font-bold text-white mb-2">Something went wrong</p>
            <p className="text-gray-400 mb-6">Please refresh the page to try again.</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-500 transition-colors"
            >
              Refresh
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// Pages
import Home from "@/pages/Home";
import Fleet from "@/pages/Fleet";
import Services from "@/pages/Services";
import FAQ from "@/pages/FAQ";
import Contact from "@/pages/Contact";
import Booking from "@/pages/Booking";
import BookingConfirm from "@/pages/BookingConfirm";
import Admin from "@/pages/Admin";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/services" component={Services} />
      <Route path="/faq" component={FAQ} />
      <Route path="/contact" component={Contact} />
      <Route path="/fleet" component={Fleet} />
      <Route path="/booking/:carId" component={Booking} />
      <Route path="/booking/confirm/:id" component={BookingConfirm} />
      <Route path="/rron-secure-4x9k" component={Admin} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
