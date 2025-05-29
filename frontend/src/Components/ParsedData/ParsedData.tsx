import {
  Calendar,
  CheckCircle,
  Eye,
  EyeOff,
  Hash,
  MapPin,
  Phone,
  User,
} from "lucide-react";
import type {
  ParsedData,
  ParsedDataComponentProps,
} from "../../Types/parsed-data.types";
import { useEffect, useState } from "react";

export const ParsedDataComponent: React.FC<ParsedDataComponentProps> = ({
  parsedData,
}) => {
  const [extractedData, setExtractedData] = useState<ParsedData>(parsedData as ParsedData);
   const [showAadhaarNumber ,setShowAadharNum] = useState(false)
  useEffect(()=>{
    if(parsedData){
        setExtractedData(parsedData)
    }
  },[parsedData])
  if (!extractedData) return null;

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gray-900">
          Extracted Information
        </h3>
        <div className="flex items-center text-green-600">
          <CheckCircle className="w-6 h-6 mr-2" />
          <span className="font-medium">Successfully Processed</span>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Personal Information */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-gray-800 border-b pb-2">
            Personal Information
          </h4>

          <div className="flex items-start space-x-3">
            <User className="w-5 h-5 text-blue-600 mt-1" />
            <div>
              <p className="font-medium text-gray-700">Full Name</p>
              <p className="text-gray-900">{extractedData?.name}</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Hash className="w-5 h-5 text-blue-600 mt-1" />
            <div>
              <p className="font-medium text-gray-700">Aadhaar Number</p>
              <div className="flex items-center space-x-2">
                <p className="text-gray-900 font-mono">
                  {showAadhaarNumber
                    ? extractedData?.aadharNumber
                    : "••••  ••••  ••••"}
                </p>
                <button
                  onClick={()=>setShowAadharNum((p)=>!p)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  {showAadhaarNumber ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Calendar className="w-5 h-5 text-blue-600 mt-1" />
            <div>
              <p className="font-medium text-gray-700">Date of Birth</p>
              <p className="text-gray-900">{extractedData?.dateOfBirth}</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <User className="w-5 h-5 text-blue-600 mt-1" />
            <div>
              <p className="font-medium text-gray-700">Gender</p>
              <p className="text-gray-900">{extractedData?.gender}</p>
            </div>
          </div>
        </div>

        {/* Contact & Address Information */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-gray-800 border-b pb-2">
            Contact & Address
          </h4>

          <div className="flex items-start space-x-3">
            <MapPin className="w-5 h-5 text-blue-600 mt-1" />
            <div>
              <p className="font-medium text-gray-700">Address</p>
              <p className="text-gray-900">{extractedData?.address}</p>
            </div>
          </div>

          {/* <div className="flex items-start space-x-3">
            <User className="w-5 h-5 text-blue-600 mt-1" />
            <div>
              <p className="font-medium text-gray-700">Father's Name</p>
              <p className="text-gray-900">{extractedData.fatherName}</p>
            </div>
          </div> */}

          {/* <div className="flex items-start space-x-3">
            <Phone className="w-5 h-5 text-blue-600 mt-1" />
            <div>
              <p className="font-medium text-gray-700">Mobile Number</p>
              <p className="text-gray-900">{extractedData.mobileNumber}</p>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};
