// import { useState } from "react";
// import { UploadPhoto } from "../../Components/UploadPhoto.tsx/UploadPhoto";

import { CheckCircle, Eye, FileImage, Upload } from "lucide-react";
import { ParsedDataComponent } from "../../Components/ParsedData/ParsedData";
import { UploadPhoto } from "../../Components/UploadPhoto.tsx/UploadPhoto";
import { AadharServices } from "../../Services/aadhar.service";
import { useRef, useState } from "react";
import type { ParsedData } from "../../Types/parsed-data.types";
import toast from "react-hot-toast";

const AadhaarProcessor: React.FC<any> = ({
  showAadhaarNumber,
  onToggleAadhaarVisibility,
}) => {
  const [parsedData, setParsedData] = useState<ParsedData | null>(null);
  const [processing, setProcessing] = useState(false);
  const parsedDataRef = useRef<HTMLDivElement>(null);

  const handleScrollToParsedData = () => {
    parsedDataRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const onProcess = async (frontImage: File, backImage: File) => {
    try {
      setProcessing(true);
      const formData = new FormData();
      formData.append("frontImage", frontImage);
      formData.append("backImage", backImage);

      const parsedData = await AadharServices.extractAdharData(formData);
      setParsedData(parsedData);
      
      handleScrollToParsedData();
    } catch (error: unknown) {
      toast.error((error as Error).message);
    }finally{
      setProcessing(false)
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Eye className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Aadhaar Lens
              </h1>
              <p className="text-gray-600">
                Extract information from Aadhaar cards instantly
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Smart Aadhaar Card Processing
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Upload both sides of your Aadhaar card and get all the information
            extracted automatically using advanced OCR technology
          </p>
        </div>

        {/* Upload Component */}
        <div>
          <UploadPhoto
            isProcessing={processing}
            onProcess={onProcess}
          />
        </div>

        {/* Parsed Data Component */}
        <div ref={parsedDataRef}>
          <ParsedDataComponent
            parsedData={parsedData}
            showAadhaarNumber={showAadhaarNumber}
            onToggleAadhaarVisibility={onToggleAadhaarVisibility}
          />
        </div>

        {/* Features Section */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Upload className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Easy Upload
            </h3>
            <p className="text-gray-600">
              Simply drag and drop or click to upload both sides of your Aadhaar
              card
            </p>
          </div>

          <div className="text-center p-6">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Accurate Extraction
            </h3>
            <p className="text-gray-600">
              Advanced OCR technology ensures accurate extraction of all
              information
            </p>
          </div>

          <div className="text-center p-6">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileImage className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Secure Processing
            </h3>
            <p className="text-gray-600">
              Your data is processed securely and never stored on our servers
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-gray-400">
              © 2024 Aadhaar Card Processor. Built with React and modern web
              technologies.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AadhaarProcessor;
