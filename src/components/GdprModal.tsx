// components/GdprModal.tsx
"use client";

import { useEffect, useState } from 'react';

const GdprModal: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isHiding, setIsHiding] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('gdprConsent');
        if (!consent) {
            setIsVisible(true);
        }
    }, []);

    const handleAcceptAll = () => {
        localStorage.setItem('gdprConsent', 'all');
        setIsHiding(true);
        setTimeout(() => {
            setIsVisible(false);
        }, 300);
    };

    const handleAcceptRequired = () => {
        localStorage.setItem('gdprConsent', 'required');
        setIsHiding(true);
        setTimeout(() => {
            setIsVisible(false);
        }, 300);
    };

    if (!isVisible) {
        return null;
    }

    return (
        <div
            className={`fixed bottom-0 left-0 right-0 bg-gray-800 bg-opacity-90 p-6 flex justify-center items-center transition-transform duration-300 ${isHiding ? 'translate-y-full' : 'translate-y-0'}`}
        >
            <div className="bg-white text-black p-6 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-xl font-bold mb-4">GDPR Compliance</h2>
                <p className="mb-4">
                    We use cookies to ensure that we give you the best experience on our website.
                    You can choose to accept all cookies or only the required ones.
                </p>
                <div className="flex justify-between">
                    <button
                        onClick={handleAcceptAll}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Accept All
                    </button>
                    <button
                        onClick={handleAcceptRequired}
                        className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                    >
                        Accept Required
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GdprModal;
