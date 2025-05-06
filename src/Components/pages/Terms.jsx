import React from 'react';
import { useNavigate } from 'react-router-dom';

const TermsAndConditionsPopup = ({ isOpen, termsContent, onIAgreeChecked }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-md shadow-xl overflow-hidden max-w-3xl w-full m-4">
        <div className="px-6 py-4 border-b">
          <h2 className="text-xl font-semibold text-gray-800">
            Terms and Conditions
          </h2>
        </div>
        <div className="px-6 py-6 overflow-y-auto max-h-[70vh]">
          {termsContent.map((section, index) => (
            <section key={index} className="mb-4">
              {section.title && (
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {section.title}
                </h3>
              )}
              <p className="text-gray-700 leading-relaxed">
                {section.content}
              </p>
              {section.list && (
                <ul className="list-disc pl-5 mt-3">
                  {section.list.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
          <div className="mt-6 flex items-center">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500 mr-2"
              onChange={(e) => onIAgreeChecked(e.target.checked)}
            />
            <label className="text-sm text-gray-700">
              I agree to the terms and conditions
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

const PrivacyPolicyPage = () => {
  const navigate = useNavigate();

  const handleIAgreeChecked = (isChecked) => {
    if (isChecked) {
      navigate('/register');
    }
  };

  const termsAndConditionsContent = [
    {
      title: 'Introduction',
      content:
        'These Terms and Conditions govern your use of Quickcart (the "Site", "we", "us", or "our") and the services, features, content or applications we offer (collectively, the "Services"). By accessing or using the Services, you agree to be bound by these Terms.',
    },
    {
      title: 'Acceptance of Terms',
      content:
        'Please read these Terms carefully before using the Services. If you do not agree to all of these Terms, do not access or use the Services.',
    },
    {
      title: 'User Accounts',
      content:
        'You may need to register for an account to access some of our Services. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.',
    },
    {
      title: 'How We Collect and Use Your Personal Information',
      content:
        'We collect and have collected personal information about you from various sources. The information we collect varies depending on how you interact with us.',
      list: [
        'Basic contact details including your name, address, phone number, email.',
        'Order information including billing address, shipping address, payment confirmation, email address.',
        'Account information including your username, password, security questions.',
        'Shopping information such as items viewed or added to your cart or wishlist.',
        'Customer support information such as messages you send us.',
      ],
    },
    {
      title: 'How We Use Your Personal Information',
      list: [
        'To provide products and services, including processing payments and fulfilling orders.',
        'For marketing and advertising purposes to send promotions or personalized ads.',
        'To detect and prevent fraud and malicious activity.',
        'For customer support and improving our services.',
      ],
    },
    {
      title: 'Cookies',
      content:
        'We use cookies to improve your experience on our site. Cookies help us remember your actions and preferences, and may also be used by third parties to tailor services or ads. You can control cookie settings through your browser settings, but disabling cookies may affect your user experience.',
    },
    {
      title: 'How We Disclose Personal Information',
      content:
        'We may disclose your personal information to third parties for legitimate purposes, such as to our service providers and payment processors, to comply with legal obligations, or to protect our rights.',
    },
    {
      title: 'Intellectual Property',
      content:
        'The content and materials available through the Services are protected by copyright, trademark, and other intellectual property laws.',
    },
    {
      title: 'Limitation of Liability',
      content:
        'To the maximum extent permitted by applicable law, Quickcart shall not be liable for any indirect, incidental, special, consequential or punitive damages.',
    },
  ];

  // We can now directly set isOpen to true as the popup is always visible on this page
  return (
    <div className="p-4">
      <h1>Welcome to Quickcart</h1>
      <p>Please review our terms and conditions below.</p>

      <TermsAndConditionsPopup
        isOpen={true}
        termsContent={termsAndConditionsContent}
        onIAgreeChecked={handleIAgreeChecked}
      />
    </div>
  );
};

export default PrivacyPolicyPage;