import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { getHistory } from '../../../services/api';
import { FileText, ArrowLeft, Package } from 'lucide-react';

export function MyComplaints() {
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getHistory()
      .then(data => {
        setComplaints(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Could not load complaints.');
        setLoading(false);
      });
  }, []);

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
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">My Complaints</h1>
          <p className="text-sm md:text-base text-muted-foreground">View all complaints you've filed</p>
        </div>

        <Card>
          {loading && <p className="text-center py-8 text-muted-foreground">Loading complaints...</p>}
          {error && <p className="text-center text-destructive py-8">{error}</p>}
          {!loading && !error && complaints.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
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
                  {complaints.map((complaint) => (
                    <tr key={complaint.complaint_id} className="border-b border-border hover:bg-muted/50 transition-colors">
                      <td className="py-4 px-4 text-sm font-medium text-foreground">{complaint.complaint_id}</td>
                      <td className="py-4 px-4 text-sm text-foreground">{complaint.category}</td>
                      <td className="py-4 px-4 text-sm text-muted-foreground">{complaint.location}</td>
                      <td className="py-4 px-4 text-sm text-foreground">{complaint.status}</td>
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
            !loading && !error && (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                  <Package className="w-12 h-12 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">No Complaints Yet</h3>
                <p className="text-muted-foreground mb-6">
                  You haven't filed any complaints yet.
                </p>
              </div>
            )
          )}
        </Card>
      </div>
    </div>
  );
}
