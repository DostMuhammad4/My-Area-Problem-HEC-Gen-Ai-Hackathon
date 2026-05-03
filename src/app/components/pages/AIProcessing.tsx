import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Loader2 } from 'lucide-react';

export function AIProcessing() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { id: 1, text: 'Complaint received', delay: 500 },
    { id: 2, text: 'Analyzing your photo...', delay: 1500 },
    { id: 3, text: 'Issue classified: Road Infrastructure', delay: 2500 },
    { id: 4, text: 'Finding responsible authority...', delay: 3500 },
    { id: 5, text: 'CDA Islamabad identified', delay: 4500 },
    { id: 6, text: 'Drafting complaint email...', delay: 5500 },
    { id: 7, text: 'Email ready for review', delay: 6500 }
  ];

  useEffect(() => {
    steps.forEach((step, index) => {
      setTimeout(() => {
        setCurrentStep(index + 1);
      }, step.delay);
    });

    setTimeout(() => {
      navigate('/preview');
    }, 7500);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center p-4 sm:p-6">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-8 md:mb-12">
          <div className="relative w-32 h-32 mx-auto mb-8">
            <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-full opacity-20 animate-ping"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-full opacity-40 animate-pulse"></div>
            <div className="relative w-full h-full bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
              <svg
                className="w-16 h-16 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
            Processing Your Complaint with AI
          </h1>
          <p className="text-sm md:text-base text-muted-foreground">
            Please wait while we analyze and prepare your complaint
          </p>
        </div>

        <div className="bg-card rounded-2xl border border-border shadow-lg p-8 mb-6">
          <div className="space-y-4">
            {steps.map((step, index) => (
              <ProcessingStep
                key={step.id}
                text={step.text}
                completed={currentStep > index}
                active={currentStep === index + 1}
                index={index}
              />
            ))}
          </div>
        </div>

        <div className="bg-primary/10 border border-primary/20 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <Loader2 className="w-5 h-5 text-primary animate-spin" />
            <div className="flex-1">
              <div className="h-2 bg-primary/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-500"
                  style={{ width: `${(currentStep / steps.length) * 100}%` }}
                ></div>
              </div>
            </div>
            <span className="text-sm font-medium text-primary">
              {Math.round((currentStep / steps.length) * 100)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProcessingStep({ text, completed, active, index }: any) {
  return (
    <div
      className={`flex items-start gap-4 transition-all duration-500 ${
        active || completed ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className={`flex-shrink-0 mt-0.5 ${
        completed
          ? 'text-success'
          : active
          ? 'text-processing'
          : 'text-muted-foreground'
      }`}>
        {completed ? (
          <CheckCircle className="w-6 h-6" />
        ) : active ? (
          <Loader2 className="w-6 h-6 animate-spin" />
        ) : (
          <div className="w-6 h-6 rounded-full border-2 border-border"></div>
        )}
      </div>
      <div className="flex-1">
        <p className={`font-medium ${
          completed || active ? 'text-foreground' : 'text-muted-foreground'
        }`}>
          {text}
        </p>
      </div>
    </div>
  );
}
