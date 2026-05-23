import { callApi } from '../apiClient';
const API = ''; // Mock API constant
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Onboarding from './Onboarding.jsx';
import VsmeOnboarding from './VsmeOnboarding.jsx';
import QuestionnaireWizard from './QuestionnaireWizard.jsx';
import PrivateDashboard from './PrivateDashboard.jsx';
import Upload from './Upload.jsx';
import FormCompiler from './FormCompiler.jsx';

export default function PmiFlow() {
  const [step, setStep] = useState(1);
  const [org, setOrg] = useState(null);
  const [initialPhase, setInitialPhase] = useState('vsme');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.org) {
      setOrg(location.state.org);
    }
    if (location.state?.phase) {
      setInitialPhase(location.state.phase);
    }

    const path = location.pathname;
    if (path === '/pmi/dashboard') setStep(3);
    else setStep(1); // Default to onboarding if not in dashboard
  }, [location]);

  const completeRegistration = orgData => { 
    setOrg(orgData); 
    setStep(3); 
    navigate('/pmi/dashboard');
  };
  
  const completeSetup = () => { 
    setStep(3); 
    navigate('/pmi/dashboard');
  };

  const restart = () => { setOrg(null); setStep(1); navigate('/pmi'); };
  const backToDash = () => navigate('/pmi/dashboard');

  if (step === 1) return <Onboarding onComplete={completeRegistration} />;
  if (step === 2) return <QuestionnaireWizard org={org} onComplete={completeSetup} initialPhase={initialPhase} />;
  if (step === 3) return <PrivateDashboard org={org} />;
  if (step === 4) return <Upload org={org} onComplete={backToDash} />;
  if (step === 6) return <FormCompiler org={org} onBack={backToDash} />;
}
