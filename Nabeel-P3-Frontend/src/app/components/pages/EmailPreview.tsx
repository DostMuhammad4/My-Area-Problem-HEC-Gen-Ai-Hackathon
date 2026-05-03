import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Send, Edit, ArrowLeft, Zap, Mail, Building2, FileText } from 'lucide-react';

export function EmailPreview() {
  const navigate = useNavigate();

  const emailData = {
    to: 'CDA Islamabad',
    email: 'complaints@cda.gov.pk',
    subject: 'Complaint Regarding Road Infrastructure - Islamabad F-8',
    body: `Dear Sir/Madam,

I am writing to report a serious issue regarding road infrastructure in my area that requires immediate attention.

Issue Description:
There are major potholes on the main road in F-8 Markaz that have been causing significant problems for commuters. The road condition has deteriorated severely over the past few weeks, making it hazardous for both vehicles and pedestrians. Several accidents have occurred due to these potholes.

Location Details:
Street 5, F-8 Markaz
Islamabad, Pakistan

The issue has been ongoing for approximately 2 weeks and affects daily traffic in the area. I have attached photographs documenting the extent of the damage.

I kindly request your immediate attention to resolve this matter at the earliest. The safety of citizens is at stake, and prompt action would be greatly appreciated.

Thank you for your consideration and support in making our city better.

Sincerely,
Ahmed Khan
Citizen ID: 12345-6789012-3
Contact: +92 300 1234567
Complaint ID: MAP-2024-047

---
This complaint was submitted via My Area Problems platform
Date: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
Time: ${new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`
  };

  const handleSend = () => {
    navigate('/success');
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 md:py-8">
        <button
          onClick={() => navigate('/report')}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Form
        </button>

        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Review Your Complaint Email</h1>
          <p className="text-sm md:text-base text-muted-foreground">AI has drafted this email on your behalf</p>
        </div>

        <div className="grid sm:grid-cols-3 gap-3 md:gap-6 mb-4 md:mb-6">
          <InfoCard
            icon={<Building2 className="w-5 h-5" />}
            label="Authority"
            value={emailData.to}
            color="bg-primary"
          />
          <InfoCard
            icon={<Mail className="w-5 h-5" />}
            label="Email"
            value={emailData.email}
            color="bg-info"
          />
          <InfoCard
            icon={<FileText className="w-5 h-5" />}
            label="Complaint ID"
            value="MAP-2024-047"
            color="bg-accent"
          />
        </div>

        <Card className="mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-foreground">Email Preview</h2>
            <Badge variant="processing">
              <Zap className="w-3 h-3" />
              Drafted by AI
            </Badge>
          </div>

          <div className="bg-muted rounded-xl p-6 mb-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3 pb-4 border-b border-border">
                <div className="text-sm text-muted-foreground min-w-16">To:</div>
                <div className="text-sm text-foreground">
                  {emailData.to} &lt;{emailData.email}&gt;
                </div>
              </div>

              <div className="flex items-start gap-3 pb-4 border-b border-border">
                <div className="text-sm text-muted-foreground min-w-16">Subject:</div>
                <div className="text-sm font-medium text-foreground">
                  {emailData.subject}
                </div>
              </div>

              <div className="flex items-start gap-3 pt-2">
                <div className="text-sm text-muted-foreground min-w-16">Body:</div>
                <div className="flex-1">
                  <pre className="text-sm text-foreground whitespace-pre-wrap font-sans leading-relaxed">
                    {emailData.body}
                  </pre>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-info/10 border border-info/20 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-info flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-medium text-foreground mb-1">
                  Email Delivery Information
                </h3>
                <p className="text-sm text-muted-foreground">
                  This email will be sent from our verified system (noreply@myareaproblems.pk) on your behalf.
                  The authority will receive your complaint along with all attached photos and details.
                </p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="mb-6">
          <h3 className="font-bold text-foreground mb-4">What happens next?</h3>
          <div className="space-y-3">
            <Step
              number="1"
              text="Email will be sent to CDA Islamabad immediately"
            />
            <Step
              number="2"
              text="You'll receive a tracking ID to monitor progress"
            />
            <Step
              number="3"
              text="Authority typically responds within 48-72 hours"
            />
            <Step
              number="4"
              text="You'll be notified of any updates via email"
            />
          </div>
        </Card>

        <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
          <Button
            variant="outline"
            onClick={() => navigate('/report')}
            className="flex-1"
          >
            <Edit className="w-4 h-4 md:w-5 md:h-5" />
            Edit Complaint
          </Button>
          <Button
            onClick={handleSend}
            className="flex-1"
          >
            <Send className="w-4 h-4 md:w-5 md:h-5" />
            Send Email Now
          </Button>
        </div>
      </div>
    </div>
  );
}

function InfoCard({ icon, label, value, color }: any) {
  return (
    <Card padding="sm">
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 ${color} rounded-lg flex items-center justify-center text-white flex-shrink-0`}>
          {icon}
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-xs text-muted-foreground mb-0.5">{label}</div>
          <div className="text-sm font-medium text-foreground truncate">{value}</div>
        </div>
      </div>
    </Card>
  );
}

function Step({ number, text }: any) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
        {number}
      </div>
      <p className="text-sm text-muted-foreground pt-0.5">{text}</p>
    </div>
  );
}
