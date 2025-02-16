
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster";
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n/config';
import Index from './pages/Index';
import Library from './pages/Library';
import Admin from './pages/Admin';
import NotFound from './pages/NotFound';
import Feedback from './pages/Feedback';
import DistributorAssistance from './pages/DistributorAssistance';
import Product from './pages/Product';

const App = () => {
  return (
    <I18nextProvider i18n={i18n}>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/library/*" element={<Library />} />
          <Route path="/product/*" element={<Product />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/distributor-assistance" element={<DistributorAssistance />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </Router>
    </I18nextProvider>
  );
};

export default App;
