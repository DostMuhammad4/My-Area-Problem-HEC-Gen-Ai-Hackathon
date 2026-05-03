import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { submitComplaint } from '../../../services/api';
import {
  Construction, Droplet, Zap, Trash2, Trees, MoreHorizontal,
  Mic, Upload, MapPin, ArrowLeft, ArrowRight, X
} from 'lucide-react';

export function ReportForm() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    category: '',
    description: '',
    street: '',
    city: '',
    area: '',
    photos: [] as string[]
  });
  const [isRecording, setIsRecording] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<any>(null);
  const [submitError, setSubmitError] = useState('');

  const categories = [
    { id: 'road', label: 'Road Infrastructure', icon: Construction, color: 'bg-orange-500' },
    { id: 'water', label: 'Water Supply', icon: Droplet, color: 'bg-blue-500' },
    { id: 'electricity', label: 'Electricity', icon: Zap, color: 'bg-yellow-500' },
    { id: 'garbage', label: 'Garbage Collection', icon: Trash2, color: 'bg-green-500' },
    { id: 'parks', label: 'Parks & Recreation', icon: Trees, color: 'bg-emerald-500' },
    { id: 'other', label: 'Other Issues', icon: MoreHorizontal, color: 'bg-gray-500' }
  ];

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError('');
    try {
      const fullLocation = [
        formData.street,
        formData.area,
        formData.city
      ].filter(Boolean).join(', ');

      const result = await submitComplaint(
        formData.description,
        fullLocation,
        formData.email || ''
      );
      setSubmitResult(result);
      setStep(3);
    } catch (error) {
      setSubmitError('Submission failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Define missing functions
  const startRecording = () => {
    console.log('Recording started');
  };

  const stopRecording = () => {
    console.log('Recording stopped');
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newPhotos = Array.from(files).map((file: File) => URL.createObjectURL(file));
      setFormData({ ...formData, photos: [...formData.photos, ...newPhotos] });
    }
  };

  const removePhoto = (index: number) => {
    setFormData({
      ...formData,
      photos: formData.photos.filter((_, i: number) => i !== index)
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({ ...formData, description: e.target.value });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 md:py-8">
        <button
          onClick={() => step === 1 ? navigate('/dashboard') : setStep(step - 1)}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>

        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Report a Problem</h1>
          <p className="text-sm md:text-base text-muted-foreground">Help us make your area better</p>
        </div>

        <ProgressBar step={step} />

        {step === 1 && (
          <Step1
            formData={formData}
            setFormData={setFormData}
            categories={categories}
            isRecording={isRecording}
            setIsRecording={setIsRecording}
            handlePhotoUpload={handlePhotoUpload}
            removePhoto={removePhoto}
            handleChange={handleChange}
            startRecording={startRecording}
            stopRecording={stopRecording}
            onNext={() => setStep(2)}
          />
        )}

        {step === 2 && (
          <Step2
            formData={formData}
            setFormData={setFormData}
            handleSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        )}

        {step === 3 && submitResult && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold">Review Your Email</h2>
              <p className="text-gray-500 text-sm mt-1">
                AI has drafted this complaint email on your behalf
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="bg-teal-50 rounded-xl p-4 text-center">
                <p className="text-xs text-gray-500">Authority</p>
                <p className="font-bold text-sm mt-1">
                  {submitResult.authority}
                </p>
              </div>
              <div className="bg-blue-50 rounded-xl p-4 text-center">
                <p className="text-xs text-gray-500">Email</p>
                <p className="font-bold text-sm mt-1 break-all">
                  {submitResult.email}
                </p>
              </div>
              <div className="bg-orange-50 rounded-xl p-4 text-center">
                <p className="text-xs text-gray-500">Urgency</p>
                <p className="font-bold text-sm mt-1">
                  {submitResult.urgency}/10
                </p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-5 border">
              <div className="flex items-center justify-between mb-3">
                <p className="font-semibold text-gray-700">
                  ✉️ Email Preview
                </p>
                <span className="text-xs bg-teal-100 text-teal-700 px-2 py-1 rounded-full">
                  ✨ Drafted by AI
                </span>
              </div>
              <div className="space-y-2 text-sm text-gray-600 mb-3">
                <p><span className="font-medium">To:</span> {submitResult.authority} &lt;{submitResult.email}&gt;</p>
                <p><span className="font-medium">Complaint ID:</span> {submitResult.complaint_id}</p>
              </div>
              <hr className="mb-3"/>
              <pre className="text-sm whitespace-pre-wrap text-gray-700 font-sans leading-relaxed">
                {submitResult.english_letter}
              </pre>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(2)}
                className="flex-1 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all"
              >
                ← Edit Location
              </button>
              <button
                onClick={() => navigate('/dashboard')}
                className="flex-1 py-3 bg-teal-600 text-white rounded-xl font-semibold hover:bg-teal-700 transition-all"
              >
                ✅ Submit Complaint
              </button>
            </div>

            {submitError && (
              <p className="text-red-500 text-sm text-center">
                {submitError}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function ProgressBar({ step }: { step: number }) {
  const displayStep = Math.min(step, 3);
  const percent = step === 1 ? 33 : step === 2 ? 66 : 100;

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-foreground">Step {displayStep} of 3</span>
        <span className="text-sm text-muted-foreground">{percent}% Complete</span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-primary transition-all duration-500"
          style={{ width: `${percent}%` }}
        ></div>
      </div>
    </div>
  );
}

function Step1({ formData, setFormData, categories, isRecording, setIsRecording, handlePhotoUpload, removePhoto, handleChange, startRecording, stopRecording, onNext }: any) {
  return (
    <div className="space-y-6">
      <Card>
        <h2 className="text-xl font-bold text-foreground mb-4">Select Issue Category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4">
          {categories.map((category: any) => (
            <button
              key={category.id}
              onClick={() => setFormData({ ...formData, category: category.id })}
              className={`p-4 rounded-xl border-2 transition-all ${
                formData.category === category.id
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <div className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center mx-auto mb-3`}>
                <category.icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-sm font-medium text-foreground text-center">{category.label}</div>
            </button>
          ))}
        </div>
      </Card>

      <Card>
        <h2 className="text-xl font-bold text-foreground mb-4">Describe the Issue</h2>
        <div className="relative">
          <textarea
            className="w-full p-4 pr-12 border rounded-lg resize-none h-32 
                   focus:outline-none focus:ring-2 focus:ring-teal-600"
            placeholder="Describe your problem in detail... What's happening in your area?"
            value={formData.description}
            onChange={handleChange}
          />
          <button
            type="button"
            onMouseDown={startRecording}
            onMouseUp={stopRecording}
            onTouchStart={startRecording}
            onTouchEnd={stopRecording}
            className={`absolute bottom-3 right-3 p-2 rounded-full transition-all
                   ${isRecording 
                     ? 'bg-red-500 text-white animate-pulse' 
                     : 'bg-teal-600 text-white hover:bg-teal-700'}`}
            title="Hold to speak"
          >
            <Mic size={18} />
          </button>
        </div>
      </Card>

      <Card>
        <h2 className="text-xl font-bold text-foreground mb-4">Upload Photos (Optional)</h2>
        <p className="text-sm text-muted-foreground mb-4">Add photos to help describe the issue</p>

        {formData.photos.length > 0 && (
          <div className="grid grid-cols-3 gap-4 mb-4">
            {formData.photos.map((photo: string, i: number) => (
              <div key={i} className="relative group">
                <img
                  src={photo}
                  alt={`Upload ${i + 1}`}
                  className="w-full h-24 object-cover rounded-lg"
                />
                <button
                  onClick={() => removePhoto(i)}
                  className="absolute top-2 right-2 w-6 h-6 bg-destructive rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>
            ))}
          </div>
        )}

        <label className="block w-full p-8 rounded-xl border-2 border-dashed border-border hover:border-primary transition-all cursor-pointer">
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handlePhotoUpload}
            className="hidden"
          />
          <div className="text-center">
            <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
            <div className="font-medium text-foreground mb-1">Click to upload photos</div>
            <div className="text-sm text-muted-foreground">PNG, JPG up to 10MB each</div>
          </div>
        </label>
      </Card>

      <Button
        onClick={onNext}
        disabled={!formData.category || !formData.description}
        size="lg"
        fullWidth
      >
        Continue to Location
        <ArrowRight className="w-5 h-5" />
      </Button>
    </div>
  );
}

function Step2({ formData, setFormData, handleSubmit, isSubmitting }: any) {
  const detectLocation = () => {
    setFormData({
      ...formData,
      street: 'Street 5',
      area: 'F-8 Markaz',
      city: 'Islamabad'
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <h2 className="text-xl font-bold text-foreground mb-4">Issue Location</h2>

        <Button
          onClick={detectLocation}
          variant="outline"
          fullWidth
          className="mb-6"
        >
          <MapPin className="w-5 h-5" />
          Detect My Location
        </Button>

        <div className="space-y-4">
          <Input
            label="Address / Street"
            placeholder="Enter street address"
            value={formData.street || ''}
            onChange={(e) => setFormData({ ...formData, street: e.target.value })}
          />
          <p className="text-xs text-gray-400 mt-1">
            💡 Be specific — include street name, area, city 
            for better department matching
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 text-sm text-foreground">City</label>
              <select
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full px-4 py-3 bg-input-background border border-input rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="">Select City</option>
                <option value="Islamabad">Islamabad</option>
                <option value="Rawalpindi">Rawalpindi</option>
                <option value="Lahore">Lahore</option>
                <option value="Karachi">Karachi</option>
                <option value="Peshawar">Peshawar</option>
                <option value="Quetta">Quetta</option>
                <option value="Multan">Multan</option>
                <option value="Faisalabad">Faisalabad</option>
              </select>
            </div>

            <Input
              label="Area / Sector"
              placeholder="e.g., F-8, DHA Phase 5"
              value={formData.area || ''}
              onChange={(e) => setFormData({ ...formData, area: e.target.value })}
            />
          </div>

          {(formData.street || formData.area || formData.city) && (
            <div className="mt-3 p-3 bg-teal-50 rounded-lg border border-teal-200">
              <p className="text-xs text-teal-600 font-semibold">
                📍 Location being sent to AI:
              </p>
              <p className="text-sm text-teal-800 font-medium mt-1">
                {[formData.street, formData.area, formData.city]
                  .filter(Boolean).join(', ')}
              </p>
            </div>
          )}
        </div>

        <div className="mt-6 h-64 bg-muted rounded-lg flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <MapPin className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p>Map Preview</p>
          </div>
        </div>
      </Card>

      <button
        onClick={handleSubmit}
        disabled={isSubmitting}
        className="w-full py-4 bg-teal-600 text-white rounded-xl font-semibold text-lg hover:bg-teal-700 disabled:opacity-50 transition-all"
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center gap-3">
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
            </svg>
            AI Generating Email... (3-8 sec)
          </span>
        ) : (
          '📧 Review AI Email →'
        )}
      </button>
    </div>
  );
}
