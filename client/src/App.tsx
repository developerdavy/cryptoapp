import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/toaster";
import { TooltipProvider } from "./components/ui/tooltip";
import { useAuth } from "./hooks/useAuth";
import { useWebSocket } from "./hooks/useWebSocket";
import { ThemeProvider } from "./contexts/ThemeContext";
import NotFound from "./pages/not-found";
import Landing from "./pages/landing";
import Dashboard from "./pages/dashboard";
import Trade from "./pages/trade";
import Wallet from "./pages/wallet";
import Markets from "./pages/markets";
import History from "./pages/history";
import SignIn from "./pages/signin";
import SignUp from "./pages/signup";
import AdminPanel from "./pages/admin";
import Checkout from "./pages/checkout";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Landing} />

      <Route path="/signin" component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <Route path="/login" component={SignIn} />
      <Route path="/checkout" component={Checkout} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/trade" component={Trade} />
      <Route path="/buy/:crypto" component={Trade} />
      <Route path="/sell/:crypto" component={Trade} />
      <Route path="/swap/:crypto" component={Trade} />
      <Route path="/wallet" component={Wallet} />
      <Route path="/markets" component={Markets} />
      <Route path="/history" component={History} />
      <Route path="/admin" component={AdminPanel} />
      <Route component={NotFound} />
    </Switch>
  );
}

function AppContent() {
  // Initialize WebSocket connection for real-time updates
  useWebSocket();
  
  return (
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </ThemeProvider>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
}

export default App;
