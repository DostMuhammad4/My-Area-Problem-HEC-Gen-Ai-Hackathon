import { useNavigate } from 'react-router';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import {
  MapPin, MessageSquare, Send, CheckCircle, Droplet, Building2,
  ArrowRight, Zap, Shield, Users, TrendingUp, Star,
  FileText, Bell, ChevronRight
} from 'lucide-react';

export function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Navbar navigate={navigate} />
      <HeroSection navigate={navigate} />
      <LiveStatsTicker />
      <ImpactNumbers />
      <HowItWorks />
      <ComplaintsShowcase />
      <SDGImpact />
      <Testimonials />
      <CallToAction navigate={navigate} />
      <Footer />
    </div>
  );
}

function Navbar({ navigate }: { navigate: any }) {
  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 md:py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <MapPin className="w-4 h-4 md:w-6 md:h-6 text-white" />
            </div>
            <span className="text-base md:text-xl font-bold text-foreground">My Area Problems</span>
          </div>

          <div className="hidden lg:flex items-center gap-8">
            <a href="#home" className="text-foreground hover:text-primary transition-colors text-sm">Home</a>
            <a href="#how-it-works" className="text-foreground hover:text-primary transition-colors text-sm">How It Works</a>
            <a href="#impact" className="text-foreground hover:text-primary transition-colors text-sm">Impact</a>
            <a href="#about" className="text-foreground hover:text-primary transition-colors text-sm">About</a>
          </div>

          <div className="flex items-center gap-2 md:gap-3">
            <Button variant="ghost" onClick={() => navigate('/signin')} size="sm" className="md:size-md">Sign In</Button>
            <Button onClick={() => navigate('/signup')} size="sm" className="md:size-md">Get Started</Button>
          </div>
        </div>
      </div>
    </nav>
  );
}

function HeroSection({ navigate }: { navigate: any }) {
  return (
    <section className="pt-12 pb-16 md:pt-20 md:pb-32 px-4 sm:px-6" id="home">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <div>
            <Badge variant="success" className="mb-4">
              <Zap className="w-3.5 h-3.5" />
              AI-Powered Civic Action
            </Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 md:mb-6 leading-tight">
              Solve Local Problems
              <br />
              <span className="text-primary">With AI Power</span>
            </h1>
            <p className="text-base md:text-lg lg:text-xl text-muted-foreground mb-6 md:mb-8 leading-relaxed">
              Report civic issues in your area through voice or text. Our AI analyzes your complaint,
              drafts a formal email, and sends it to the right government authority automatically.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 md:gap-4 mb-6 md:mb-8">
              <Button size="lg" onClick={() => navigate('/signup')} className="w-full sm:w-auto">
                Report a Problem
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                See How It Works
                <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
              </Button>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 text-xs sm:text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-success" />
                <span>Voice & Text Support</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-success" />
                <span>AI-Powered Analysis</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-success" />
                <span>Automatic Routing</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative z-10 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-8 border border-border">
              <img
                src="https://images.unsplash.com/photo-1711185697402-44155bf67785?w=600&h=400&fit=crop"
                alt="Islamabad Pakistan"
                className="w-full h-80 object-cover rounded-xl mb-6"
              />
              <div className="space-y-4">
                <FloatingCard
                  icon={<MessageSquare className="w-5 h-5" />}
                  title="Road damaged reported"
                  subtitle="Sent to CDA Islamabad"
                  status="success"
                  delay="0s"
                />
                <FloatingCard
                  icon={<Droplet className="w-5 h-5" />}
                  title="Water supply issue"
                  subtitle="Processing with AI"
                  status="processing"
                  delay="0.2s"
                />
                <FloatingCard
                  icon={<Building2 className="w-5 h-5" />}
                  title="Garbage collection"
                  subtitle="Authority notified"
                  status="info"
                  delay="0.4s"
                />
              </div>
            </div>
            <div className="absolute -top-6 -right-6 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-6 -left-6 w-72 h-72 bg-secondary/10 rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FloatingCard({ icon, title, subtitle, status, delay }: any) {
  const statusColors = {
    success: 'border-success/30 bg-success/5',
    processing: 'border-processing/30 bg-processing/5',
    info: 'border-info/30 bg-info/5'
  };

  return (
    <div
      className={`flex items-center gap-3 p-3 rounded-lg border ${statusColors[status]} backdrop-blur-sm animate-fade-in`}
      style={{ animationDelay: delay }}
    >
      <div className="w-10 h-10 rounded-lg bg-background flex items-center justify-center">
        {icon}
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-foreground">{title}</p>
        <p className="text-xs text-muted-foreground">{subtitle}</p>
      </div>
      <Badge variant={status} pulse={status === 'processing'}>
        {status === 'success' ? '✓' : status === 'processing' ? '●' : '!'}
      </Badge>
    </div>
  );
}

function LiveStatsTicker() {
  const stats = [
    '247 complaints filed',
    'Road fixed in Lahore DHA',
    'WASA responded in 3 days',
    'Electricity restored in Karachi',
    'Garbage collected in Rawalpindi',
    'Water issue resolved in Islamabad'
  ];

  return (
    <div className="bg-gradient-to-r from-primary to-secondary py-3 overflow-hidden">
      <div className="flex animate-scroll whitespace-nowrap">
        {[...stats, ...stats, ...stats].map((stat, i) => (
          <span key={i} className="inline-flex items-center gap-2 mx-8 text-white">
            <CheckCircle className="w-4 h-4" />
            {stat}
          </span>
        ))}
      </div>
    </div>
  );
}

function ImpactNumbers() {
  const stats = [
    { number: '2,400+', label: 'Complaints Filed', icon: FileText },
    { number: '89%', label: 'Email Delivery Rate', icon: Send },
    { number: '4', label: 'Cities Active', icon: Building2 },
    { number: '48hrs', label: 'Avg Response Time', icon: Zap }
  ];

  return (
    <section className="py-12 md:py-20 px-4 sm:px-6 bg-muted/30" id="impact">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, i) => (
            <Card key={i} className="text-center" hover>
              <stat.icon className="w-8 h-8 md:w-12 md:h-12 text-primary mx-auto mb-3 md:mb-4" />
              <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-1 md:mb-2">{stat.number}</div>
              <div className="text-xs md:text-sm lg:text-base text-muted-foreground">{stat.label}</div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    {
      number: '1',
      title: 'Report Your Issue',
      description: 'Use voice, text, or upload photos to describe the problem in your area',
      icon: MessageSquare
    },
    {
      number: '2',
      title: 'AI Processes',
      description: 'Our AI analyzes your complaint, classifies the issue, and drafts a formal email',
      icon: Zap
    },
    {
      number: '3',
      title: 'Authority Notified',
      description: 'Email automatically sent to the correct government department with tracking ID',
      icon: Send
    }
  ];

  return (
    <section className="py-12 md:py-20 px-4 sm:px-6" id="how-it-works">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3 md:mb-4">How It Works</h2>
          <p className="text-base md:text-lg lg:text-xl text-muted-foreground">Three simple steps to get your voice heard</p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {steps.map((step, i) => (
            <div key={i} className="relative">
              <Card className="text-center h-full" hover>
                <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center text-white text-xl md:text-2xl font-bold mx-auto mb-4 md:mb-6">
                  {step.number}
                </div>
                <step.icon className="w-8 h-8 md:w-12 md:h-12 text-primary mx-auto mb-3 md:mb-4" />
                <h3 className="text-lg md:text-xl font-bold text-foreground mb-2 md:mb-3">{step.title}</h3>
                <p className="text-sm md:text-base text-muted-foreground">{step.description}</p>
              </Card>
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/3 -right-4 text-muted-foreground">
                  <ArrowRight className="w-8 h-8" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ComplaintsShowcase() {
  const complaints = [
    {
      id: 'MAP-2024-041',
      category: 'Road Infrastructure',
      issue: 'Major potholes on Jinnah Avenue causing traffic issues',
      location: 'Islamabad, F-8',
      authority: 'CDA Islamabad',
      status: 'Resolved',
      date: '2 days ago'
    },
    {
      id: 'MAP-2024-038',
      category: 'Water Supply',
      issue: 'No water supply for past 3 days in residential area',
      location: 'Lahore, DHA Phase 5',
      authority: 'WASA Lahore',
      status: 'In Progress',
      date: '5 days ago'
    },
    {
      id: 'MAP-2024-035',
      category: 'Electricity',
      issue: 'Frequent load shedding beyond scheduled hours',
      location: 'Karachi, Gulshan-e-Iqbal',
      authority: 'K-Electric',
      status: 'Submitted',
      date: '1 week ago'
    }
  ];

  return (
    <section className="py-12 md:py-20 px-4 sm:px-6 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3 md:mb-4">Real Complaints, Real Impact</h2>
          <p className="text-base md:text-lg lg:text-xl text-muted-foreground">See how citizens are making a difference</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {complaints.map((complaint, i) => (
            <Card key={i} hover>
              <div className="flex items-start justify-between mb-4">
                <Badge variant={
                  complaint.status === 'Resolved' ? 'success' :
                  complaint.status === 'In Progress' ? 'processing' : 'info'
                }>
                  {complaint.status}
                </Badge>
                <span className="text-xs text-muted-foreground">{complaint.date}</span>
              </div>
              <h3 className="font-bold text-foreground mb-2">{complaint.category}</h3>
              <p className="text-sm text-muted-foreground mb-4">{complaint.issue}</p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  {complaint.location}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Send className="w-4 h-4" />
                  {complaint.authority}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <FileText className="w-4 h-4" />
                  {complaint.id}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function SDGImpact() {
  return (
    <section className="py-12 md:py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3 md:mb-4">Contributing to UN SDGs</h2>
          <p className="text-base md:text-lg lg:text-xl text-muted-foreground px-4">Aligned with United Nations Sustainable Development Goals</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
          <Card hover className="flex items-start gap-6">
            <div className="w-20 h-20 bg-info/10 rounded-xl flex items-center justify-center flex-shrink-0">
              <Droplet className="w-10 h-10 text-info" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground mb-2">SDG 6: Clean Water</h3>
              <p className="text-muted-foreground">Ensuring access to clean water and sanitation for all communities through accountability</p>
            </div>
          </Card>

          <Card hover className="flex items-start gap-6">
            <div className="w-20 h-20 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0">
              <Building2 className="w-10 h-10 text-accent" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground mb-2">SDG 11: Sustainable Cities</h3>
              <p className="text-muted-foreground">Making cities inclusive, safe, resilient, and sustainable through civic engagement</p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const testimonials = [
    {
      name: 'Ahmed Khan',
      city: 'Islamabad',
      rating: 5,
      quote: 'So easy to use! I reported a water issue and got a response in 2 days.',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed'
    },
    {
      name: 'Fatima Ali',
      city: 'Lahore',
      rating: 5,
      quote: 'Finally, a platform that actually works. The AI made it so simple to file my complaint.',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Fatima'
    },
    {
      name: 'Hassan Malik',
      city: 'Karachi',
      rating: 5,
      quote: 'Road in my area was fixed within a week after I reported it. Great initiative!',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Hassan'
    }
  ];

  return (
    <section className="py-12 md:py-20 px-4 sm:px-6 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3 md:mb-4">What Citizens Say</h2>
          <p className="text-base md:text-lg lg:text-xl text-muted-foreground">Real feedback from real people</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {testimonials.map((testimonial, i) => (
            <Card key={i} hover>
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <div className="font-bold text-foreground">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.city}</div>
                </div>
              </div>
              <div className="flex gap-1 mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-muted-foreground italic">{testimonial.quote}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function CallToAction({ navigate }: { navigate: any }) {
  return (
    <section className="py-16 md:py-24 lg:py-32 px-4 sm:px-6 bg-gradient-to-br from-primary via-primary to-secondary relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
      </div>
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 md:mb-6">
          Make Your Voice Heard Today
        </h2>
        <p className="text-base md:text-lg lg:text-xl text-white/90 mb-6 md:mb-8 px-4">
          Join thousands of Pakistani citizens making their areas better, one complaint at a time
        </p>
        <Button size="lg" variant="secondary" onClick={() => navigate('/signup')} className="w-full sm:w-auto">
          Start Reporting Issues
          <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
        </Button>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-foreground text-white py-8 md:py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-6 md:mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold">My Area Problems</span>
            </div>
            <p className="text-white/70 text-sm">
              Empowering Pakistani citizens through AI-powered civic engagement
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <div className="space-y-2 text-sm text-white/70">
              <div><a href="#home" className="hover:text-white transition-colors">Home</a></div>
              <div><a href="/report" className="hover:text-white transition-colors">Report Issue</a></div>
              <div><a href="/status" className="hover:text-white transition-colors">Track Status</a></div>
              <div><a href="/dashboard" className="hover:text-white transition-colors">Dashboard</a></div>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-4">SDG Goals</h4>
            <div className="space-y-2 text-sm text-white/70">
              <div>SDG 6: Clean Water</div>
              <div>SDG 11: Sustainable Cities</div>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-4">Tech Stack</h4>
            <div className="space-y-2 text-sm text-white/70">
              <div>Next.js • React</div>
              <div>FastAPI • Python</div>
              <div>LangChain • OpenAI</div>
              <div>Whisper AI • ChromaDB</div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/70">
            © 2026 My Area Problems. Built for Pakistan 🇵🇰
          </p>
          <div className="flex items-center gap-6 text-sm text-white/70">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
