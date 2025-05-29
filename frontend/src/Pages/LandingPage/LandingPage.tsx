// import { useState } from "react";
// import { UploadPhoto } from "../../Components/UploadPhoto.tsx/UploadPhoto";

import { CheckCircle, FileImage, Upload } from "lucide-react";
import { ParsedDataComponent } from "../../Components/ParsedData/ParsedData";
import { UploadPhoto } from "../../Components/UploadPhoto.tsx/UploadPhoto";
import { AadharServices } from "../../Services/aadhar.service";

// function LandingPage() {
//   const [fronSideUrl, setFrontSideUrl] = useState("");
//   return (
//     <div className="flex w-[100vw] h-[100vh] bg-black ">
//       <UploadPhoto
//         backPreview={fronSideUrl}
//         frontPreview={fronSideUrl}
//         isProcessing={false}
//         onBackUpload={()=>console.log('back')}
//         onFrontUpload={()=>console.log('back')}
//         onReset={()=>console.log('back')}
//         onDragOver={()=>console.log('asdf')}
//         onDrop={()=>console.log('asdfasdf')}
//         onProcess={()=>console.log('adsfasdf')}
//       />
//     </div>
//   );
// }

// export default LandingPage;

const AadhaarProcessor: React.FC<any> = ({
  extractedData,
  isProcessing,
  showAadhaarNumber,
  onToggleAadhaarVisibility,
}) => {
  const onProcess =async (frontImage: File, backImage: File) => {
    const formData = new FormData();
    formData.append("frontImage", frontImage);
    formData.append("backImage", backImage);

    const data = await AadharServices.extractAdharData(formData)
    console.log(data)
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <FileImage className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Aadhaar Card Processor
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
        <UploadPhoto isProcessing={isProcessing} onProcess={onProcess} />

        {/* Parsed Data Component */}
        <ParsedDataComponent
          extractedData={extractedData}
          showAadhaarNumber={showAadhaarNumber}
          onToggleAadhaarVisibility={onToggleAadhaarVisibility}
        />

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
