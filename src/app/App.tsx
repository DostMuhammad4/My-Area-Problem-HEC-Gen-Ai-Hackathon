import { BrowserRouter, Routes, Route } from 'react-router';
import { LandingPage } from './components/pages/LandingPage';
import { SignUpPage } from './components/pages/SignUpPage';
import { SignInPage } from './components/pages/SignInPage';
import { Dashboard } from './components/pages/Dashboard';
import { ReportForm } from './components/pages/ReportForm';
import { AIProcessing } from './components/pages/AIProcessing';
import { EmailPreview } from './components/pages/EmailPreview';
import { SuccessScreen } from './components/pages/SuccessScreen';
import { StatusTracker } from './components/pages/StatusTracker';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/report" element={<ReportForm />} />
        <Route path="/processing" element={<AIProcessing />} />
        <Route path="/preview" element={<EmailPreview />} />
        <Route path="/success" element={<SuccessScreen />} />
        <Route path="/status" element={<StatusTracker />} />
      </Routes>
    </BrowserRouter>
  );
}
