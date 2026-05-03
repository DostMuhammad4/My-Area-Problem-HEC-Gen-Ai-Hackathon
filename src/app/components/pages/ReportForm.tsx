import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Input } from '../ui/Input';
import {
  Construction, Droplet, Zap, Trash2, Trees, MoreHorizontal,
  Mic, Upload, MapPin, ArrowLeft, ArrowRight, CheckCircle, X
} from 'lucide-react';

export function ReportForm() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    category: '',
    description: '',
    location: '',
    city: '',
    photos: [] as string[]
  });
  const [isRecording, setIsRecording] = useState(false);

  const categories = [
    { id: 'road', label: 'Road Infrastructure', icon: Construction, color: 'bg-orange-500' },
    { id: 'water', label: 'Water Supply', icon: Droplet, color: 'bg-blue-500' },
    { id: 'electricity', label: 'Electricity', icon: Zap, color: 'bg-yellow-500' },
    { id: 'garbage', label: 'Garbage Collection', icon: Trash2, color: 'bg-green-500' },
    { id: 'parks', label: 'Parks & Recreation', icon: Trees, color: 'bg-emerald-500' },
    { id: 'other', label: 'Other Issues', icon: MoreHorizontal, color: 'bg-gray-500' }
  ];

  const handleSubmit = () => {
    navigate('/processing');
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newPhotos = Array.from(files).map(file => URL.createObjectURL(file));
      setFormData({ ...formData, photos: [...formData.photos, ...newPhotos] });
    }
  };

  const removePhoto = (index: number) => {
    setFormData({
      ...formData,
      photos: formData.photos.filter((_, i) => i !== index)
    });
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
            onNext={() => setStep(2)}
          />
        )}

        {step === 2 && (
          <Step2
            formData={formData}
            setFormData={setFormData}
            onNext={() => setStep(3)}
          />
        )}

        {step === 3 && (
          <Step3
            formData={formData}
            categories={categories}
            onSubmit={handleSubmit}
            onEdit={() => setStep(1)}
          />
        )}
      </div>
    </div>
  );
}

function ProgressBar({ step }: { step: number }) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-foreground">Step {step} of 3</span>
        <span className="text-sm text-muted-foreground">{Math.round((step / 3) * 100)}% Complete</span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-primary transition-all duration-500"
          style={{ width: `${(step / 3) * 100}%` }}
        ></div>
      </div>
    </div>
  );
}

function Step1({ formData, setFormData, categories, isRecording, setIsRecording, handlePhotoUpload, removePhoto, onNext }: any) {
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
        <textarea
          placeholder="Describe your problem in detail... What's happening in your area?"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full px-4 py-3 bg-input-background border border-input rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent min-h-32 resize-y"
        />
      </Card>

      <Card>
        <h2 className="text-xl font-bold text-foreground mb-4">Voice Input (Optional)</h2>
        <p className="text-sm text-muted-foreground mb-4">Hold to speak your complaint in any language</p>
        <button
          onClick={() => setIsRecording(!isRecording)}
          className={`w-full p-8 rounded-xl border-2 border-dashed transition-all ${
            isRecording
              ? 'border-destructive bg-destructive/5'
              : 'border-border hover:border-primary'
          }`}
        >
          <div className={`w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center ${
            isRecording ? 'bg-destructive animate-pulse' : 'bg-primary'
          }`}>
            <Mic className="w-10 h-10 text-white" />
          </div>
          <div className="font-medium text-foreground">
            {isRecording ? 'Recording... Tap to stop' : 'Hold to Record'}
          </div>
          {isRecording && (
            <div className="text-sm text-muted-foreground mt-2">
              <span className="inline-block w-2 h-2 bg-destructive rounded-full mr-2 animate-pulse"></span>
              00:05
            </div>
          )}
        </button>
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

function Step2({ formData, setFormData, onNext }: any) {
  const detectLocation = () => {
    setFormData({
      ...formData,
      location: 'Street 5, F-8 Markaz',
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
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          />

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
                <option value="Lahore">Lahore</option>
                <option value="Karachi">Karachi</option>
                <option value="Rawalpindi">Rawalpindi</option>
                <option value="Peshawar">Peshawar</option>
              </select>
            </div>

            <Input
              label="Area / Sector"
              placeholder="e.g., F-8, DHA Phase 5"
              value={formData.area || ''}
              onChange={(e) => setFormData({ ...formData, area: e.target.value })}
            />
          </div>
        </div>

        <div className="mt-6 h-64 bg-muted rounded-lg flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <MapPin className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p>Map Preview</p>
          </div>
        </div>
      </Card>

      <Button
        onClick={onNext}
        disabled={!formData.location || !formData.city}
        size="lg"
        fullWidth
      >
        Review & Submit
        <ArrowRight className="w-5 h-5" />
      </Button>
    </div>
  );
}

function Step3({ formData, categories, onSubmit, onEdit }: any) {
  const selectedCategory = categories.find((c: any) => c.id === formData.category);

  const emailPreview = `To: CDA Islamabad <complaints@cda.gov.pk>
Subject: Complaint Regarding ${selectedCategory?.label} - ${formData.city}

Dear Sir/Madam,

I am writing to report an issue regarding ${selectedCategory?.label.toLowerCase()} in my area.

Issue Description:
${formData.description}

Location Details:
${formData.location}, ${formData.city}

I kindly request your immediate attention to resolve this matter at the earliest.

Thank you for your consideration.

Sincerely,
Ahmed Khan
Complaint ID: MAP-2024-047`;

  return (
    <div className="space-y-6">
      <Card>
        <h2 className="text-xl font-bold text-foreground mb-6">Review Your Complaint</h2>

        <div className="space-y-4">
          <div>
            <div className="text-sm text-muted-foreground mb-1">Category</div>
            <div className="flex items-center gap-2">
              {selectedCategory && (
                <>
                  <div className={`w-8 h-8 ${selectedCategory.color} rounded-lg flex items-center justify-center`}>
                    <selectedCategory.icon className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-medium text-foreground">{selectedCategory.label}</span>
                </>
              )}
            </div>
          </div>

          <div>
            <div className="text-sm text-muted-foreground mb-1">Description</div>
            <div className="text-foreground">{formData.description}</div>
          </div>

          <div>
            <div className="text-sm text-muted-foreground mb-1">Location</div>
            <div className="text-foreground">{formData.location}, {formData.city}</div>
          </div>

          {formData.photos.length > 0 && (
            <div>
              <div className="text-sm text-muted-foreground mb-2">Photos ({formData.photos.length})</div>
              <div className="grid grid-cols-4 gap-2">
                {formData.photos.map((photo: string, i: number) => (
                  <img
                    key={i}
                    src={photo}
                    alt={`Photo ${i + 1}`}
                    className="w-full h-20 object-cover rounded-lg"
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </Card>

      <Card>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-foreground">AI-Generated Email</h2>
          <Badge variant="processing">
            <Zap className="w-3 h-3" />
            Drafted by AI
          </Badge>
        </div>
        <div className="bg-muted p-4 rounded-lg">
          <pre className="text-sm text-foreground whitespace-pre-wrap font-mono">{emailPreview}</pre>
        </div>
      </Card>

      <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
        <Button variant="outline" onClick={onEdit} className="flex-1">
          Edit Complaint
        </Button>
        <Button onClick={onSubmit} className="flex-1">
          <CheckCircle className="w-4 h-4 md:w-5 md:h-5" />
          Send Email Now
        </Button>
      </div>
    </div>
  );
}
