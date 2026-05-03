import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { ArrowLeft, Bell, Lock, User, LogOut, CheckCircle } from 'lucide-react';

export function SettingsPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: localStorage.getItem('userFullName') || 'Ahmed Khan',
    email: localStorage.getItem('userEmail') || 'ahmed@example.com',
    phone: localStorage.getItem('userPhone') || '+92 300 1234567'
  });
  const [notifications, setNotifications] = useState({
    emailNotifications: JSON.parse(localStorage.getItem('emailNotifications') || 'true'),
    smsAlerts: JSON.parse(localStorage.getItem('smsAlerts') || 'true')
  });
  const [saveMessage, setSaveMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNotificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setNotifications(prev => ({ ...prev, [name]: checked }));
  };

  const handleSaveProfile = () => {
    localStorage.setItem('userFullName', formData.fullName);
    localStorage.setItem('userEmail', formData.email);
    localStorage.setItem('userPhone', formData.phone);
    setSaveMessage('Profile saved successfully!');
    setTimeout(() => setSaveMessage(''), 3000);
  };

  const handleSaveNotifications = () => {
    localStorage.setItem('emailNotifications', JSON.stringify(notifications.emailNotifications));
    localStorage.setItem('smsAlerts', JSON.stringify(notifications.smsAlerts));
    setSaveMessage('Notification settings saved!');
    setTimeout(() => setSaveMessage(''), 3000);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 md:py-8">
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Dashboard
        </button>

        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Settings</h1>
          <p className="text-sm md:text-base text-muted-foreground">Manage your account preferences</p>
        </div>

        {saveMessage && (
          <div className="mb-6 p-4 bg-success/10 border border-success rounded-lg flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-success" />
            <span className="text-sm font-medium text-success">{saveMessage}</span>
          </div>
        )}

        <div className="space-y-6">
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                <User className="w-5 h-5" />
                Account Settings
              </h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <Button size="sm" onClick={handleSaveProfile}>Save Changes</Button>
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Notifications
              </h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Email Notifications</p>
                  <p className="text-sm text-muted-foreground">Get updates via email</p>
                </div>
                <input 
                  type="checkbox" 
                  name="emailNotifications"
                  checked={notifications.emailNotifications}
                  onChange={handleNotificationChange}
                  className="w-4 h-4" 
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">SMS Alerts</p>
                  <p className="text-sm text-muted-foreground">Receive SMS notifications</p>
                </div>
                <input 
                  type="checkbox" 
                  name="smsAlerts"
                  checked={notifications.smsAlerts}
                  onChange={handleNotificationChange}
                  className="w-4 h-4" 
                />
              </div>
              <Button size="sm" onClick={handleSaveNotifications}>Save Preferences</Button>
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                <Lock className="w-5 h-5" />
                Security
              </h2>
            </div>
            <div className="space-y-4">
              <Button variant="outline" size="sm">Change Password</Button>
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                  <LogOut className="w-5 h-5" />
                  Sign Out
                </h2>
                <p className="text-sm text-muted-foreground mt-1">Sign out from your account</p>
              </div>
              <Button variant="destructive" size="sm">Sign Out</Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
