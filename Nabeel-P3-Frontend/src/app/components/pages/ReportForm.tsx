import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { submitComplaint } from '../../../services/api';
import {
  Construction, Droplet, Zap, Trash2, Trees, MoreHorizontal,
  Mic, Square, Upload, MapPin, ArrowLeft, ArrowRight, X
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
  const [speechLanguage, setSpeechLanguage] = useState('en-US');
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

  const startVoiceInput = () => {
    const SpeechRecognition = 
      (window as any).SpeechRecognition || 
      (window as any).webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      alert('Please use Chrome browser for voice input.');
      return;
    }

    // If already recording - STOP
    if (isRecording) {
      if ((window as any).currentRecognition) {
        (window as any).currentRecognition.stop();
        (window as any).currentRecognition = null;
      }
      setIsRecording(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US'; // Changed from 'ur-PK' to 'en-US'
    recognition.continuous = true;        // Keep listening
    recognition.interimResults = true;    // Show words as spoken
    recognition.maxAlternatives = 1;

    // Save reference to stop later
    (window as any).currentRecognition = recognition;

    recognition.onstart = () => setIsRecording(true);

    recognition.onresult = (event: any) => {
      let finalTranscript = '';
      let interimTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript + ' ';
        } else {
          interimTranscript += transcript;
        }
      }

      if (finalTranscript) {
        setFormData(prev => ({
          ...prev,
          description: prev.description 
            ? prev.description + ' ' + finalTranscript.trim()
            : finalTranscript.trim()
        }));
      }
    };

    recognition.onerror = (event: any) => {
      if (event.error === 'not-allowed') {
        alert('Please allow microphone access.');
        setIsRecording(false);
      }
      // Ignore 'no-speech' error - just keep listening
    };

    // Auto restart if stopped unexpectedly (keeps it continuous)
    recognition.onend = () => {
      if ((window as any).currentRecognition) {
        try {
          recognition.start(); // Restart automatically
        } catch {
          setIsRecording(false);
        }
      }
    };

    recognition.start();
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
            speechLanguage={speechLanguage}
            setSpeechLanguage={setSpeechLanguage}
            handlePhotoUpload={handlePhotoUpload}
            removePhoto={removePhoto}
            handleChange={handleChange}
            startVoiceInput={startVoiceInput}
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
  const progressWidthClass = step === 1 ? 'w-1/3' : step === 2 ? 'w-2/3' : 'w-full';

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-foreground">Step {displayStep} of 3</span>
        <span className="text-sm text-muted-foreground">{percent}% Complete</span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div
          className={`h-full bg-primary transition-all duration-500 ${progressWidthClass}`}
        ></div>
      </div>
    </div>
  );
}

function Step1({ formData, setFormData, categories, isRecording, speechLanguage, setSpeechLanguage, handlePhotoUpload, removePhoto, handleChange, startVoiceInput, onNext }: any) {
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
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-semibold text-gray-700">
            Describe the Issue
          </label>
          <div className="flex gap-1 bg-gray-100 p-1 rounded-full">
            <button
              type="button"
              onClick={() => setSpeechLanguage('en-US')}
              className={`px-3 py-1 text-xs rounded-full font-semibold
                          transition-all ${speechLanguage === 'en-US'
                          ? 'bg-teal-600 text-white shadow-sm' 
                          : 'text-gray-500 hover:text-gray-700'}`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => setSpeechLanguage('ur-PK')}
              className={`px-3 py-1 text-xs rounded-full font-semibold
                          transition-all ${speechLanguage === 'ur-PK'
                          ? 'bg-teal-600 text-white shadow-sm' 
                          : 'text-gray-500 hover:text-gray-700'}`}
            >
              اردو
            </button>
          </div>
        </div>
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
            onClick={startVoiceInput}
            className={`absolute bottom-3 right-3 p-2 rounded-full transition-all duration-200 ${isRecording ? 'bg-red-500 text-white animate-pulse scale-110' : 'bg-teal-600 text-white hover:bg-teal-700'}`}
            title={isRecording ? 'Click to STOP' : 'Click to speak'}
          >
            {isRecording ? (
              <Square size={18} />
            ) : (
              <Mic size={18} />
            )}
          </button>
        </div>
        {isRecording && (
          <div className="flex items-center gap-2 mt-2 px-1">
            <div className="flex gap-1">
              <div className="w-1.5 h-4 bg-red-500 rounded-full 
                              animate-bounce" 
                   style={{animationDelay: '0ms'}}/>
              <div className="w-1.5 h-4 bg-red-500 rounded-full 
                              animate-bounce" 
                   style={{animationDelay: '150ms'}}/>
              <div className="w-1.5 h-4 bg-red-500 rounded-full 
                              animate-bounce" 
                   style={{animationDelay: '300ms'}}/>
            </div>
            <p className="text-xs text-red-500 font-semibold">
              Listening in {speechLanguage === 'ur-PK' ? 'Urdu' : 'English'}... 
              Speak now
            </p>
          </div>
        )}
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
                  type="button"
                  aria-label="Remove uploaded photo"
                  title="Remove uploaded photo"
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
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationDetected, setLocationDetected] = useState(false);
  const [mapCoords, setMapCoords] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const detectLocation = async () => {
    if (!navigator.geolocation) {
      alert('Location not supported by your browser');
      return;
    }

    setLocationLoading(true);
    setLocationDetected(false);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&addressdetails=1`,
            {
              headers: {
                'Accept-Language': 'en',
                'User-Agent': 'MyAreaProblems/1.0'
              }
            }
          );
          const data = await response.json();
          const addr = data.address;

          const street = [
            addr.road,
            addr.pedestrian,
            addr.house_number
          ].filter(Boolean).join(' ') || '';

          const area = [
            addr.suburb,
            addr.neighbourhood,
            addr.quarter,
            addr.village
          ].filter(Boolean)[0] || addr.county || '';

          const city =
            addr.city ||
            addr.town ||
            addr.municipality ||
            addr.state_district ||
            addr.state || '';

          setFormData((prev: any) => ({
            ...prev,
            street: street,
            area: area,
            city: city,
          }));

          setLocationDetected(true);
          setMapCoords({ lat: latitude, lng: longitude });

        } catch {
          alert('Could not fetch address. Please enter manually.');
        } finally {
          setLocationLoading(false);
        }
      },
      (error) => {
        setLocationLoading(false);
        switch(error.code) {
          case error.PERMISSION_DENIED:
            alert('Please allow location access in browser settings.');
            break;
          case error.POSITION_UNAVAILABLE:
            alert('Location unavailable. Please enter manually.');
            break;
          case error.TIMEOUT:
            alert('Location request timed out. Try again.');
            break;
          default:
            alert('Could not get location. Please enter manually.');
        }
      },
      {
        timeout: 10000,
        maximumAge: 0,
        enableHighAccuracy: true
      }
    );
  };

  return (
    <div className="space-y-6">
      <Card>
        <h2 className="text-xl font-bold text-foreground mb-4">Issue Location</h2>

        <button
          type="button"
          onClick={detectLocation}
          disabled={locationLoading}
          className={`w-full py-4 border-2 border-dashed rounded-xl flex items-center justify-center gap-3 font-semibold transition-all duration-200 ${locationDetected ? 'border-green-500 bg-green-50 text-green-700' : 'border-gray-300 hover:border-teal-500 hover:bg-teal-50 text-gray-600'} disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {locationLoading ? (
            <>
              <svg className="animate-spin h-5 w-5 text-teal-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
              </svg>
              <span>Fetching your location...</span>
            </>
          ) : locationDetected ? (
            <>
              <span>✅</span>
              <span>Location Detected! Click to refresh</span>
            </>
          ) : (
            <>
              <span>📍</span>
              <span>Detect My Location Automatically</span>
            </>
          )}
        </button>

        {locationDetected && (
          <div className="mt-2 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
            <span className="text-green-600">✅</span>
            <div>
              <p className="text-xs text-green-700 font-semibold">
                Location detected successfully!
              </p>
              <p className="text-xs text-green-600 mt-0.5">
                {[formData.street, formData.area, formData.city]
                  .filter(Boolean).join(', ')}
              </p>
            </div>
          </div>
        )}

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
                title="Select city"
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
            <div className="p-3 bg-teal-50 rounded-lg border border-teal-200">
              <p className="text-xs text-teal-600 font-semibold mb-1">
                📍 Location being sent to AI:
              </p>
              <p className="text-sm text-teal-800 font-medium">
                {[formData.street, formData.area, formData.city]
                  .filter(Boolean).join(', ')}
              </p>
            </div>
          )}
        </div>

        <div className="mt-4 rounded-xl overflow-hidden border-2 border-gray-200 bg-gray-50">
          <div className="px-4 py-2 bg-white border-b flex items-center justify-between">
            <p className="text-sm font-semibold text-gray-700">
              🗺️ Map Preview
            </p>
            {mapCoords && (
              <p className="text-xs text-gray-400">
                {mapCoords.lat.toFixed(4)}, {mapCoords.lng.toFixed(4)}
              </p>
            )}
          </div>

          {mapCoords ? (
            <iframe
              key={`${mapCoords.lat}-${mapCoords.lng}`}
              title="OpenStreetMap location preview"
              width="100%"
              height="250"
              frameBorder="0"
              scrolling="no"
              src={`https://www.openstreetmap.org/export/embed.html?bbox=${mapCoords.lng - 0.01}%2C${mapCoords.lat - 0.01}%2C${mapCoords.lng + 0.01}%2C${mapCoords.lat + 0.01}&layer=mapnik&marker=${mapCoords.lat}%2C${mapCoords.lng}`}
              className="border-0"
            />
          ) : (
            <div className="h-48 flex flex-col items-center justify-center gap-2">
              <span className="text-4xl">📍</span>
              <p className="text-sm text-gray-400 font-medium">
                Click "Detect My Location" to see map
              </p>
              <p className="text-xs text-gray-300">
                Or enter address manually above
              </p>
            </div>
          )}
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
