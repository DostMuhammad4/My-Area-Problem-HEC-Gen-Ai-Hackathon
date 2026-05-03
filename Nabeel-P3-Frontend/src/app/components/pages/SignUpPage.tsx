import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { MapPin, CheckCircle, Shield, Users, TrendingUp } from 'lucide-react';

export function SignUpPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="hidden lg:flex flex-col justify-center p-12 bg-gradient-to-br from-primary via-primary to-secondary text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-md">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <MapPin className="w-7 h-7" />
            </div>
            <span className="text-2xl font-bold">My Area Problems</span>
          </div>

          <h2 className="text-4xl font-bold mb-6">
            Join thousands of citizens making Pakistan better
          </h2>

          <p className="text-white/90 text-lg mb-8">
            Report civic issues, get AI-powered assistance, and track progress—all in one platform.
          </p>

          <div className="space-y-4">
            <BenefitItem
              icon={<Shield className="w-5 h-5" />}
              text="Secure and verified complaint system"
            />
            <BenefitItem
              icon={<Users className="w-5 h-5" />}
              text="Direct connection to government authorities"
            />
            <BenefitItem
              icon={<TrendingUp className="w-5 h-5" />}
              text="Track your complaint's progress in real-time"
            />
          </div>

          <div className="mt-12 p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
            <img
              src="https://images.unsplash.com/photo-1623261216813-fbbe4fb7df44?w=400&h=250&fit=crop"
              alt="Pakistan City"
              className="w-full h-40 object-cover rounded-lg mb-4"
            />
            <p className="text-sm text-white/80">
              "This platform helped me get my road fixed in just 5 days. Amazing work!"
            </p>
            <p className="text-xs text-white/60 mt-2">— Ahmed Khan, Islamabad</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-12 bg-background">
        <div className="w-full max-w-md mx-auto">
          <div className="mb-6 md:mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Create Account</h1>
            <p className="text-sm md:text-base text-muted-foreground">Start reporting issues in your area today</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
            <Input
              label="Full Name"
              type="text"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              required
            />

            <Input
              label="Email Address"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />

            <Input
              label="Password"
              type="password"
              placeholder="Create a strong password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />

            <Input
              label="Confirm Password"
              type="password"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              required
            />

            <Button type="submit" fullWidth size="lg">
              Create Account
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-background text-muted-foreground">Or continue with</span>
            </div>
          </div>

          <Button variant="outline" fullWidth className="mb-6">
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Sign up with Google
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{' '}
            <button
              type="button"
              onClick={() => navigate('/signin')}
              className="text-primary font-medium hover:underline"
            >
              Sign In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

function BenefitItem({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <span className="text-white/90">{text}</span>
    </div>
  );
}
