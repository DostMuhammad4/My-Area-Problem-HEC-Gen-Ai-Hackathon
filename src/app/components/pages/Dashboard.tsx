import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { getHistory, getHeatmapData } from '../../../services/api';
import {
  LayoutDashboard, PlusCircle, FileText, TrendingUp, Settings,
  LogOut, Bell, MapPin, Calendar, ArrowRight, Search, Package
} from 'lucide-react';

export function Dashboard() {
  const navigate = useNavigate();
  const [userComplaints, setUserComplaints] = useState<any[]>([]);
  const [complaintsLoading, setComplaintsLoading] = useState(true);
  const [mapPoints, setMapPoints] = useState<any[]>([]);

  useEffect(() => {
    getHistory()
      .then(data => {
        setUserComplaints(data);
        setComplaintsLoading(false);
      })
      .catch(() => setComplaintsLoading(false));
  }, []);

  useEffect(() => {
    getHeatmapData()
      .then(data => {
        setMapPoints(data);
      })
      .catch(() => setMapPoints([]));
  }, []);

  const totalComplaints = userComplaints.length;
  const resolvedComplaints = userComplaints.filter(
    c => c.status?.toLowerCase() === 'resolved'
  ).length;
  const openComplaints = userComplaints.filter(
    c => c.status?.toLowerCase() === 'open' || 
         c.status?.toLowerCase() === 'processing'
  ).length;
  const successRate = totalComplaints > 0 
    ? Math.round((resolvedComplaints / totalComplaints) * 100) 
    : 0;
  const recentComplaints = userComplaints.slice(-3).reverse();

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar navigate={navigate} />

      <div className="flex-1 lg:ml-64">
        <TopBar />

        <main className="p-4 sm:p-6 lg:p-8">
          <div className="mb-6 md:mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              Good morning, Ahmed 👋
            </h1>
            <p className="text-sm md:text-base text-muted-foreground">
              {new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-6 md:mb-8">
            <StatCard
              title="Total Complaints"
              value={complaintsLoading ? '...' : totalComplaints}
              icon={<FileText className="w-6 h-6" />}
              color="bg-primary"
            />
            <StatCard
              title="In Process"
              value={complaintsLoading ? '...' : openComplaints}
              icon={<TrendingUp className="w-6 h-6" />}
              color="bg-processing"
            />
            <StatCard
              title="Resolved"
              value={complaintsLoading ? '...' : resolvedComplaints}
              icon={<FileText className="w-6 h-6" />}
              color="bg-success"
            />
            <StatCard
              title="Success Rate"
              value={complaintsLoading ? '...' : successRate + '%'}
              icon={<TrendingUp className="w-6 h-6" />}
              color="bg-accent"
            />
          </div>

          <Card className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-foreground">Recent Complaints</h2>
              <Button variant="ghost" size="sm">View All</Button>
            </div>

            {recentComplaints.length > 0 ? (
              <div className="overflow-x-auto -mx-6 md:mx-0">
                <table className="w-full min-w-[640px]">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">ID</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Category</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Location</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Date</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentComplaints.map((complaint) => (
                      <tr key={complaint.complaint_id} className="border-b border-border hover:bg-muted/50 transition-colors">
                        <td className="py-4 px-4 text-sm font-medium text-foreground">{complaint.complaint_id}</td>
                        <td className="py-4 px-4 text-sm text-foreground">{complaint.category}</td>
                        <td className="py-4 px-4 text-sm text-muted-foreground">{complaint.location}</td>
                        <td className="py-4 px-4">
                          <Badge
                            variant={
                              complaint.status?.toLowerCase() === 'resolved' ? 'success' :
                              complaint.status?.toLowerCase() === 'processing' ? 'processing' :
                              complaint.status?.toLowerCase() === 'sent' ? 'info' : 'default'
                            }
                            pulse={complaint.status?.toLowerCase() === 'processing'}
                          >
                            {complaint.status}
                          </Badge>
                        </td>
                        <td className="py-4 px-4 text-sm text-muted-foreground">
                          {new Date(complaint.timestamp).toLocaleDateString()}
                        </td>
                        <td className="py-4 px-4">
                          <button
                            onClick={() => navigate('/complaint/' + complaint.complaint_id, {
                              state: { complaint }
                            })}
                            className="text-teal-600 hover:text-teal-800 font-semibold 
                                       text-sm transition-colors"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-center py-8 text-gray-400">
                No complaints yet. Click "New Complaint" to get started.
              </p>
            )}
          </Card>

          <div className="bg-white rounded-xl border p-6">
            <h2 className="text-lg font-bold mb-2">🗺️ Live Complaints Map</h2>
            <p className="text-sm text-gray-500 mb-4">
              {mapPoints.length} complaints across Pakistan
            </p>
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-200">
              <p className="text-gray-400">
                Map coming soon — {mapPoints.length} data points loaded ✅
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
            <Card hover className="cursor-pointer" onClick={() => navigate('/report')}>
              <div className="flex items-center gap-3 md:gap-4">
                <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center">
                  <PlusCircle className="w-8 h-8 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-foreground mb-1">Report New Issue</h3>
                  <p className="text-sm text-muted-foreground">File a new complaint about civic issues</p>
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground" />
              </div>
            </Card>

            <Card hover className="cursor-pointer" onClick={() => navigate('/status')}>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-accent/10 rounded-xl flex items-center justify-center">
                  <Search className="w-8 h-8 text-accent" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-foreground mb-1">Track by ID</h3>
                  <p className="text-sm text-muted-foreground">Check status using tracking number</p>
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground" />
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}

function Sidebar({ navigate }: { navigate: any }) {
  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard', active: true },
    { icon: PlusCircle, label: 'New Complaint', path: '/report', active: false },
    { icon: FileText, label: 'My Complaints', path: '/my-complaints', active: false },
    { icon: Search, label: 'Track Status', path: '/status', active: false },
    { icon: Settings, label: 'Settings', path: '/settings', active: false }
  ];

  return (
    <aside className="hidden lg:block fixed left-0 top-0 h-screen w-64 bg-sidebar border-r border-sidebar-border">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
            <MapPin className="w-6 h-6 text-white" />
          </div>
          <span className="text-lg font-bold text-sidebar-foreground">My Area Problems</span>
        </div>

        <div className="flex items-center gap-3 p-3 bg-muted rounded-lg mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-accent to-warning rounded-full flex items-center justify-center text-white font-bold">
            AK
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-medium text-sm text-sidebar-foreground truncate">Ahmed Khan</div>
            <div className="text-xs text-muted-foreground truncate">ahmed@example.com</div>
          </div>
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                item.active
                  ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-sidebar-border">
        <button
          onClick={() => navigate('/')}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sidebar-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="text-sm font-medium">Sign Out</span>
        </button>
      </div>
    </aside>
  );
}

function TopBar() {
  return (
    <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border px-6 lg:px-8 py-4">
      <div className="flex items-center justify-end gap-4">
        <button className="relative p-2 hover:bg-muted rounded-lg transition-colors">
          <Bell className="w-5 h-5 text-muted-foreground" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full"></span>
        </button>
        <div className="w-10 h-10 bg-gradient-to-br from-accent to-warning rounded-full flex items-center justify-center text-white font-bold">
          AK
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, color }: any) {
  return (
    <Card padding="sm">
      <div className="flex items-center justify-between gap-2">
        <div className="min-w-0">
          <p className="text-xs md:text-sm text-muted-foreground mb-1 truncate">{title}</p>
          <p className="text-lg md:text-2xl lg:text-3xl font-bold text-foreground">{value}</p>
        </div>
        <div className={`w-10 h-10 md:w-12 md:h-12 ${color} rounded-xl flex items-center justify-center text-white flex-shrink-0`}>
          <div className="w-5 h-5 md:w-6 md:h-6">
            {icon}
          </div>
        </div>
      </div>
    </Card>
  );
}

function EmptyState({ navigate }: { navigate: any }) {
  return (
    <div className="text-center py-16">
      <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
        <Package className="w-12 h-12 text-muted-foreground" />
      </div>
      <h3 className="text-xl font-bold text-foreground mb-2">No Complaints Yet</h3>
      <p className="text-muted-foreground mb-6 max-w-md mx-auto">
        You haven't filed any complaints yet. Start making a difference by reporting civic issues in your area.
      </p>
      <Button onClick={() => navigate('/report')}>
        <PlusCircle className="w-5 h-5" />
        Report Your First Issue
      </Button>
    </div>
  );
}
