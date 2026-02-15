import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import FloorPlans from "./pages/FloorPlans";
import Amenities from "./pages/Amenities";
import Neighborhood from "./pages/Neighborhood";
import Contact from "./pages/Contact";
import Locations from "./pages/Locations";
import LocationPortland from "./pages/LocationPortland";
import LocationBrooklyn from "./pages/LocationBrooklyn";
import Apply from "./pages/Apply";
import ApplicationSuccess from "./pages/ApplicationSuccess";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/floor-plans" element={<FloorPlans />} />
          <Route path="/amenities" element={<Amenities />} />
          <Route path="/neighborhood" element={<Neighborhood />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/locations" element={<Locations />} />
          <Route path="/locations/portland" element={<LocationPortland />} />
          <Route path="/locations/brooklyn" element={<LocationBrooklyn />} />
          <Route path="/apply" element={<Apply />} />
          <Route path="/application-success" element={<ApplicationSuccess />} />
          <Route path="/success" element={<ApplicationSuccess />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
