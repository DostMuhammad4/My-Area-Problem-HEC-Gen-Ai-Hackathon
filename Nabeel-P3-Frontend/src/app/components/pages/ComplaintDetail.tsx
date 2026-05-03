import { useLocation, useNavigate } from 'react-router-dom';

const ComplaintDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const complaint = location.state?.complaint;

  if (!complaint) {
    navigate('/dashboard');
    return null;
  }

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'resolved': return 'bg-green-100 text-green-700';
      case 'processing': return 'bg-blue-100 text-blue-700';
      case 'open': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6 md:py-8">
        
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-500 
                     hover:text-gray-800 transition-colors mb-6"
        >
          ← Back
        </button>

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground">Complaint Details</h1>
          <p className="text-gray-500 text-sm mt-1">
            Full information about your submitted complaint
          </p>
        </div>

        {/* Main Details Card */}
        <div className="bg-card rounded-xl border border-border p-6 space-y-4">
          
          {/* ID + Status Row */}
          <div className="flex items-center justify-between">
            <span className="font-mono font-bold text-teal-600 text-lg">
              {complaint.complaint_id}
            </span>
            <span className={`px-3 py-1 rounded-full text-sm font-semibold
                             ${getStatusColor(complaint.status)}`}>
              {complaint.status}
            </span>
          </div>

          <hr className="border-border" />

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-400 uppercase">Category</p>
              <p className="font-semibold mt-1 text-foreground">{complaint.category}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase">Authority</p>
              <p className="font-semibold mt-1 text-foreground">
                {complaint.authority || 'Being processed'}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase">Location</p>
              <p className="font-semibold mt-1 text-foreground">{complaint.location}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase">Urgency</p>
              <p className="font-semibold mt-1 text-foreground">
                {complaint.urgency ? `${complaint.urgency}/10` : 'N/A'}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase">Date Submitted</p>
              <p className="font-semibold mt-1 text-foreground">
                {complaint.timestamp 
                  ? new Date(complaint.timestamp).toLocaleDateString() 
                  : 'N/A'}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase">Complaint ID</p>
              <p className="font-mono text-sm mt-1 text-foreground">{complaint.complaint_id}</p>
            </div>
          </div>

          {/* English Letter */}
          {complaint.english_letter && (
            <div className="mt-4">
              <p className="text-xs text-gray-400 uppercase mb-2">
                Formal Letter
              </p>
              <div className="bg-muted rounded-lg p-4">
                <pre className="text-sm whitespace-pre-wrap text-foreground">
                  {complaint.english_letter}
                </pre>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default ComplaintDetail;
