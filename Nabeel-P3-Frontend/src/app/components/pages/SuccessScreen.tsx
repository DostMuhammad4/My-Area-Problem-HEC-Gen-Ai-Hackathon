import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import {
  CheckCircle, Copy, Share2, FileText, ArrowRight, Clock,
  Send, Building2, MapPin
} from 'lucide-react';

export function SuccessScreen() {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const trackingId = 'MAP-2024-047';

  useEffect(() => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  }, []);

  const copyTrackingId = () => {
    navigator.clipboard.writeText(trackingId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareComplaint = () => {
    if (navigator.share) {
      navigator.share({
        title: 'My Area Problems - Complaint Filed',
        text: `I filed a complaint about road infrastructure. Tracking ID: ${trackingId}`,
        url: window.location.origin + '/status'
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-success/5 via-background to-primary/5 flex items-center justify-center p-4 sm:p-6">
      {showConfetti && <Confetti />}

      <div className="max-w-2xl w-full">
        <div className="text-center mb-6 md:mb-8">
          <div className="relative w-32 h-32 mx-auto mb-6">
            <div className="absolute inset-0 bg-success/20 rounded-full animate-ping"></div>
            <div className="relative w-full h-full bg-gradient-to-br from-success to-primary rounded-full flex items-center justify-center">
              <CheckCircle className="w-16 h-16 text-white" strokeWidth={2.5} />
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Complaint Submitted Successfully!
          </h1>
          <p className="text-base md:text-lg text-muted-foreground">
            Your complaint has been sent to the relevant authority
          </p>
        </div>

        <Card className="mb-6">
          <div className="text-center mb-6">
            <div className="text-sm text-muted-foreground mb-2">Your Tracking ID</div>
            <div className="flex items-center justify-center gap-3">
              <div className="text-3xl font-bold text-foreground tracking-wider">
                {trackingId}
              </div>
              <button
                onClick={copyTrackingId}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
                title="Copy tracking ID"
              >
                <Copy className={`w-5 h-5 ${copied ? 'text-success' : 'text-muted-foreground'}`} />
              </button>
            </div>
            {copied && (
              <div className="text-sm text-success mt-2">
                ✓ Copied to clipboard
              </div>
            )}
          </div>

          <div className="bg-muted/50 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-3 mb-3">
              <Send className="w-5 h-5 text-success" />
              <div>
                <div className="text-sm font-medium text-foreground">Email sent to:</div>
                <div className="text-sm text-muted-foreground">CDA Islamabad (complaints@cda.gov.pk)</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-info" />
              <div>
                <div className="text-sm font-medium text-foreground">Submitted on:</div>
                <div className="text-sm text-muted-foreground">
                  {new Date().toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-border pt-6">
            <h3 className="font-bold text-foreground mb-4">Current Status Timeline</h3>
            <div className="space-y-4">
              <TimelineItem
                icon={<CheckCircle className="w-5 h-5" />}
                title="Complaint Submitted"
                subtitle="Successfully received and logged"
                time="Just now"
                status="completed"
              />
              <TimelineItem
                icon={<Send className="w-5 h-5" />}
                title="Email Sent to Authority"
                subtitle="CDA Islamabad notified"
                time="Just now"
                status="completed"
              />
              <TimelineItem
                icon={<Clock className="w-5 h-5" />}
                title="Awaiting Response"
                subtitle="Typical response time: 48-72 hours"
                time="Pending"
                status="pending"
              />
            </div>
          </div>
        </Card>

        <div className="grid sm:grid-cols-2 gap-3 md:gap-4 mb-4 md:mb-6">
          <Button
            variant="outline"
            onClick={shareComplaint}
            fullWidth
          >
            <Share2 className="w-4 h-4 md:w-5 md:h-5" />
            Share Complaint
          </Button>
          <Button
            onClick={() => navigate('/status')}
            fullWidth
          >
            <FileText className="w-4 h-4 md:w-5 md:h-5" />
            Track My Complaint
          </Button>
        </div>

        <div className="grid sm:grid-cols-2 gap-3 md:gap-4">
          <Card padding="sm" hover className="cursor-pointer" onClick={() => navigate('/report')}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div className="text-sm font-medium text-foreground">Report Another Issue</div>
              </div>
              <ArrowRight className="w-5 h-5 text-muted-foreground" />
            </div>
          </Card>

          <Card padding="sm" hover className="cursor-pointer" onClick={() => navigate('/dashboard')}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-accent" />
                </div>
                <div className="text-sm font-medium text-foreground">Go to Dashboard</div>
              </div>
              <ArrowRight className="w-5 h-5 text-muted-foreground" />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function TimelineItem({ icon, title, subtitle, time, status }: any) {
  return (
    <div className="flex items-start gap-4">
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
        status === 'completed'
          ? 'bg-success/10 text-success'
          : 'bg-muted text-muted-foreground'
      }`}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div>
            <div className="font-medium text-foreground">{title}</div>
            <div className="text-sm text-muted-foreground">{subtitle}</div>
          </div>
          <div className="text-xs text-muted-foreground whitespace-nowrap">{time}</div>
        </div>
      </div>
    </div>
  );
}

function Confetti() {
  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-confetti"
          style={{
            left: `${Math.random() * 100}%`,
            top: '-10px',
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${3 + Math.random() * 2}s`
          }}
        >
          <div
            className={`w-2 h-2 ${
              ['bg-primary', 'bg-success', 'bg-accent', 'bg-info', 'bg-warning'][
                Math.floor(Math.random() * 5)
              ]
            }`}
            style={{
              transform: `rotate(${Math.random() * 360}deg)`
            }}
          />
        </div>
      ))}
    </div>
  );
}
