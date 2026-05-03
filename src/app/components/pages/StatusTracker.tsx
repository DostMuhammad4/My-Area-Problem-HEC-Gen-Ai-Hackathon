import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Input } from '../ui/Input';
import {
  Search, MapPin, Calendar, Building2, CheckCircle, Loader2,
  Clock, Mail, FileText, ExternalLink, ArrowLeft, Zap
} from 'lucide-react';

export function StatusTracker() {
  const navigate = useNavigate();
  const [trackingId, setTrackingId] = useState('');
  const [searchResult, setSearchResult] = useState<any>(null);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingId) return;

    setIsSearching(true);
    setTimeout(() => {
      setSearchResult({
        id: 'MAP-2024-047',
        category: 'Road Infrastructure',
        description: 'Major potholes on main road in F-8 Markaz causing traffic issues and safety hazards',
        location: 'Street 5, F-8 Markaz',
        city: 'Islamabad',
        authority: 'CDA Islamabad',
        email: 'complaints@cda.gov.pk',
        status: 'In Progress',
        submittedDate: '2024-05-01T10:30:00',
        timeline: [
          {
            stage: 'Submitted',
            title: 'Complaint Received',
            description: 'Complaint received and logged in the system',
            timestamp: '2024-05-01T10:30:00',
            status: 'completed'
          },
          {
            stage: 'AI Processing',
            title: 'AI Analysis Complete',
            description: 'Issue classified as Road Infrastructure. Authority identified: CDA Islamabad',
            timestamp: '2024-05-01T10:31:00',
            status: 'completed'
          },
          {
            stage: 'Email Drafted',
            title: 'Formal Complaint Letter Generated',
            description: 'AI drafted formal complaint email with all details',
            timestamp: '2024-05-01T10:32:00',
            status: 'completed'
          },
          {
            stage: 'Sent to Authority',
            title: 'Email Sent to CDA Islamabad',
            description: 'Complaint email delivered to complaints@cda.gov.pk',
            timestamp: '2024-05-01T10:33:00',
            status: 'active'
          },
          {
            stage: 'Response Received',
            title: 'Awaiting Authority Response',
            description: 'Waiting for acknowledgment from the authority',
            timestamp: null,
            status: 'pending'
          }
        ],
        emailPreview: `To: CDA Islamabad <complaints@cda.gov.pk>
Subject: Complaint Regarding Road Infrastructure - Islamabad F-8

Dear Sir/Madam,

I am writing to report a serious issue regarding road infrastructure in my area...

(Full email content available in system)`
      });
      setIsSearching(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 md:py-8">
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Dashboard
        </button>

        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Track Complaint Status</h1>
          <p className="text-sm md:text-base text-muted-foreground">Enter your tracking ID to check complaint progress</p>
        </div>

        <Card className="mb-8">
          <form onSubmit={handleSearch} className="flex gap-3">
            <Input
              placeholder="Enter Tracking ID (e.g., MAP-001)"
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" disabled={isSearching}>
              {isSearching ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Search className="w-5 h-5" />
              )}
              Search
            </Button>
          </form>
        </Card>

        {searchResult ? (
          <>
            <Card className="mb-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-2xl font-bold text-foreground">{searchResult.id}</h2>
                    <Badge variant="processing" pulse>
                      {searchResult.status}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground">{searchResult.category}</p>
                </div>
                <div className="text-right">
                  <div className="text-sm text-muted-foreground mb-1">Submitted</div>
                  <div className="text-sm font-medium text-foreground">
                    {new Date(searchResult.submittedDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <InfoItem
                  icon={<MapPin className="w-4 h-4" />}
                  label="Location"
                  value={`${searchResult.location}, ${searchResult.city}`}
                />
                <InfoItem
                  icon={<Building2 className="w-4 h-4" />}
                  label="Authority"
                  value={searchResult.authority}
                />
                <InfoItem
                  icon={<Mail className="w-4 h-4" />}
                  label="Email"
                  value={searchResult.email}
                />
              </div>

              <div className="bg-muted/50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-foreground mb-2">Issue Description</h3>
                <p className="text-sm text-muted-foreground">{searchResult.description}</p>
              </div>
            </Card>

            <Card className="mb-6">
              <h2 className="text-xl font-bold text-foreground mb-6">Complaint Timeline</h2>
              <div className="space-y-6">
                {searchResult.timeline.map((item: any, index: number) => (
                  <TimelineItem
                    key={index}
                    item={item}
                    isLast={index === searchResult.timeline.length - 1}
                  />
                ))}
              </div>
            </Card>

            <Card>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-foreground">Email Preview</h2>
                <Badge variant="processing">
                  <Zap className="w-3 h-3" />
                  AI Generated
                </Badge>
              </div>
              <div className="bg-muted rounded-lg p-4 mb-4">
                <pre className="text-sm text-foreground whitespace-pre-wrap font-mono">
                  {searchResult.emailPreview}
                </pre>
              </div>
              <Button variant="outline" size="sm">
                <ExternalLink className="w-4 h-4" />
                View Full Email
              </Button>
            </Card>
          </>
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  );
}

function TimelineItem({ item, isLast }: any) {
  const getIcon = () => {
    if (item.status === 'completed') return <CheckCircle className="w-6 h-6" />;
    if (item.status === 'active') return <Loader2 className="w-6 h-6 animate-spin" />;
    return <Clock className="w-6 h-6" />;
  };

  const getColor = () => {
    if (item.status === 'completed') return 'text-success border-success bg-success/10';
    if (item.status === 'active') return 'text-processing border-processing bg-processing/10';
    return 'text-muted-foreground border-border bg-muted';
  };

  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center ${getColor()}`}>
          {getIcon()}
        </div>
        {!isLast && (
          <div className={`w-0.5 flex-1 mt-2 ${
            item.status === 'completed' ? 'bg-success' : 'bg-border'
          }`} style={{ minHeight: '40px' }}></div>
        )}
      </div>
      <div className="flex-1 pb-6">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div>
            <h3 className="font-bold text-foreground mb-1">{item.title}</h3>
            <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
            {item.timestamp && (
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Calendar className="w-3 h-3" />
                {new Date(item.timestamp).toLocaleString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </div>
            )}
          </div>
          <Badge
            variant={
              item.status === 'completed' ? 'success' :
              item.status === 'active' ? 'processing' : 'default'
            }
            pulse={item.status === 'active'}
          >
            {item.stage}
          </Badge>
        </div>
      </div>
    </div>
  );
}

function InfoItem({ icon, label, value }: any) {
  return (
    <div className="flex items-start gap-2">
      <div className="text-muted-foreground mt-0.5">{icon}</div>
      <div>
        <div className="text-xs text-muted-foreground mb-0.5">{label}</div>
        <div className="text-sm font-medium text-foreground">{value}</div>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <Card>
      <div className="text-center py-16">
        <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
          <Search className="w-12 h-12 text-muted-foreground" />
        </div>
        <h3 className="text-xl font-bold text-foreground mb-2">Enter Tracking ID</h3>
        <p className="text-muted-foreground max-w-md mx-auto">
          Enter your complaint tracking ID in the search box above to view the current status and timeline
        </p>
        <div className="mt-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-muted rounded-lg">
            <FileText className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              Example: <span className="font-mono font-medium text-foreground">MAP-2024-047</span>
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}
