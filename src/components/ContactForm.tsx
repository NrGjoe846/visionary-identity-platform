import { useState, useRef } from "react";
import { Send, User, Mail, MessageSquare, CheckCircle, AlertCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const ContactForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    } else if (formData.subject.trim().length < 5) {
      newErrors.subject = "Subject must be at least 5 characters";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setIsSuccess(true);
      toast({
        title: "Message sent successfully!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });
      
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });

      // Reset success state after 3 seconds
      setTimeout(() => setIsSuccess(false), 3000);
    } catch (error) {
      toast({
        title: "Failed to send message",
        description: "Please try again later or contact me directly.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses = (fieldName: keyof FormErrors) => `
    w-full px-4 py-3 bg-royal-black/50 border rounded-lg transition-all duration-300 focus:ring-2 focus:ring-golden focus:border-transparent
    ${errors[fieldName] 
      ? 'border-red-500 focus:ring-red-500' 
      : 'border-golden/20 hover:border-golden/40'
    }
  `;

  return (
    <div className="glass-card p-8 rounded-xl border border-golden/20 relative overflow-hidden">
      {/* Success Overlay */}
      {isSuccess && (
        <div className="absolute inset-0 bg-green-500/10 backdrop-blur-sm flex items-center justify-center z-10 rounded-xl">
          <div className="text-center">
            <CheckCircle size={64} className="text-green-500 mx-auto mb-4 animate-bounce" />
            <h3 className="text-2xl font-bold text-green-500 mb-2">Message Sent!</h3>
            <p className="text-green-400">Thank you for reaching out.</p>
          </div>
        </div>
      )}

      <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold mb-2">Send Me a Message</h3>
          <p className="text-silver/70">Let's discuss your project or collaboration opportunity</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              Your Name *
            </label>
            <div className="relative">
              <User size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-golden" />
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`${inputClasses('name')} pl-10`}
                placeholder="John Doe"
              />
              {errors.name && (
                <div className="flex items-center gap-1 mt-1 text-red-500 text-sm">
                  <AlertCircle size={14} />
                  {errors.name}
                </div>
              )}
            </div>
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email Address *
            </label>
            <div className="relative">
              <Mail size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-golden" />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`${inputClasses('email')} pl-10`}
                placeholder="john@example.com"
              />
              {errors.email && (
                <div className="flex items-center gap-1 mt-1 text-red-500 text-sm">
                  <AlertCircle size={14} />
                  {errors.email}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Subject Field */}
        <div>
          <label htmlFor="subject" className="block text-sm font-medium mb-2">
            Subject *
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
            className={inputClasses('subject')}
            placeholder="Project Collaboration"
          />
          {errors.subject && (
            <div className="flex items-center gap-1 mt-1 text-red-500 text-sm">
              <AlertCircle size={14} />
              {errors.subject}
            </div>
          )}
        </div>

        {/* Message Field */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-2">
            Message *
          </label>
          <div className="relative">
            <MessageSquare size={18} className="absolute left-3 top-3 text-golden" />
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              rows={6}
              className={`${inputClasses('message')} pl-10 resize-none`}
              placeholder="Tell me about your project or inquiry..."
            />
            {errors.message && (
              <div className="flex items-center gap-1 mt-1 text-red-500 text-sm">
                <AlertCircle size={14} />
                {errors.message}
              </div>
            )}
          </div>
          <div className="text-right text-xs text-silver/60 mt-1">
            {formData.message.length}/500 characters
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting || isSuccess}
          className="w-full bg-golden text-royal-black font-semibold py-4 rounded-lg hover:opacity-90 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 relative overflow-hidden group"
        >
          {/* Button Background Animation */}
          <div className="absolute inset-0 bg-gradient-to-r from-golden to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          <div className="relative flex items-center gap-2">
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-royal-black/30 border-t-royal-black rounded-full animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send size={20} />
                Send Message
              </>
            )}
          </div>
        </button>

        {/* Form Info */}
        <div className="text-center text-sm text-silver/60">
          <p>I typically respond within 24 hours</p>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
