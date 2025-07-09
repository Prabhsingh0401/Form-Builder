import { Smartphone, Tablet, Monitor } from "lucide-react";

const MobileMessage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
        <div className="flex justify-center space-x-4 mb-6">
          <Smartphone className="text-purple-600" size={32} />
          <Tablet className="text-blue-600" size={32} />
        </div>
        
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Coming Soon to Mobile & Tablet
        </h1>
        
        <p className="text-gray-600 mb-6 leading-relaxed">
          We're working continuously to bring our Form Builder to mobile and tablet devices. 
          Stay tuned for updates!
        </p>
        
        <div className="flex items-center justify-center space-x-2 text-purple-600 mb-6">
          <Monitor size={20} />
          <span className="font-medium">For now, please use a desktop or PC</span>
        </div>
        
        <div className="animate-pulse">
          <div className="h-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default MobileMessage;