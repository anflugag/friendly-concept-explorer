
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster";
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n/config';
import Index from './pages/Index';
import Categories from './pages/Categories';
import Business from './pages/Business';
import Therapy from './pages/Therapy';
import Product from './pages/Product';
import Admin from './pages/Admin';
import NotFound from './pages/NotFound';
import Feedback from './pages/Feedback';
import DistributorAssistance from './pages/DistributorAssistance';

const App = () => {
  return (
    <I18nextProvider i18n={i18n}>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/category/:category" element={<Categories />} />
          <Route path="/category/:category/business/:business" element={<Business />} />
          <Route path="/category/:category/business/:business/therapy/:therapy" element={<Therapy />} />
          <Route path="/category/:category/business/:business/therapy/:therapy/product/:product" element={<Product />} />
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
