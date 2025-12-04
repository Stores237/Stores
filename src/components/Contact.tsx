import { X, Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';

interface ContactProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Contact({ isOpen, onClose }: ContactProps) {
  const handleWhatsAppContact = () => {
    const message = "Hi! I'd like to get in touch regarding your electronics services.";
    window.open(`https://wa.me/237659802679?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleEmailContact = () => {
    window.open('mailto:storefix237@gmail.com?subject=Inquiry&body=Hi, I would like to inquire about your services.');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
      <div className="bg-white w-full max-w-md h-full overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
            Contact Information
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Business Info */}
          <div className="text-center pb-6 border-b border-gray-200">
            <img
              src="/3D_S-Logo-removebg.png"
              alt="Store Logo"
              className="w-16 h-16 rounded-lg mb-3 object-cover inline-block"
            />
            <p className="text-gray-600">Your All in One Electronic and Trusted Accessories Provider in Cameroon</p>
          </div>

          {/* Contact Methods */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900 mb-3">Get in Touch</h4>
            
            {/* Phone */}
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="bg-green-100 p-2 rounded-full">
                <Phone className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">Phone</p>
                <a href="tel:+237659802679" className="text-blue-600 hover:text-primary-600">
                  +237 659 802 679
                </a>
              </div>
            </div>

            {/* WhatsApp */}
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="bg-green-100 p-2 rounded-full">
                <MessageCircle className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">WhatsApp</p>
                <button 
                  onClick={handleWhatsAppContact}
                  className="text-blue-600 hover:text-orange-600"
                >
                  +237 659 802 679
                </button>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="bg-blue-100 p-2 rounded-full">
                <Mail className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">Email</p>
                <button 
                  onClick={handleEmailContact}
                  className="text-blue-600 hover:text-primary-600"
                >
                  storefix237@gmail.com
                </button>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900 mb-3">Visit Our Store</h4>
            
            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="bg-red-100 p-2 rounded-full">
                <MapPin className="w-5 h-5 text-red-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">Address</p>
                <p className="text-gray-600">
                  Akwa Carrefour Ancien Number One (Immeuble Day Market)<br />
                  Douala, Littoral Region<br />
                  Cameroon
                </p>
              </div>
            </div>

            {/* Business Hours */}
            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="bg-purple-100 p-2 rounded-full">
                <Clock className="w-5 h-5 text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">Business Hours</p>
                <div className="text-gray-600 text-sm space-y-1">
                  <p>Monday - Friday: 8:00 AM - 7:00 PM</p>
                  <p>Saturday: 9:00 AM - 6:00 PM</p>
                  <p>Sunday: On Appointment</p>
                </div>
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900 mb-3">Our Services</h4>
            <div className="grid grid-cols-1 gap-2 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                <span className="text-gray-700">Computer Sales & Repair</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                <span className="text-gray-700">Phone Sales & Screen Repair</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                <span className="text-gray-700">Tech Accessories</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                <span className="text-gray-700">CyberSecurity</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                <span className="text-gray-700">Marketing Expert</span>
              </div>
            </div>
          </div>

          {/* Contact Buttons */}
          <div className="space-y-3 pt-4 border-t border-gray-200">
            <button
              onClick={handleWhatsAppContact}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Chat on WhatsApp</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}