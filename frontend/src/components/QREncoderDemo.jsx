// src/components/QREncoderDemo.jsx
import QREncoder from './QREncoder';  // Assuming you want to display the same QR Encoder functionality here

const QREncoderDemo = () => {
  return (
    <div className="max-w-3xl mx-auto p-6 space-y-4">
      <h1 className="text-3xl font-bold">QR Code Demo</h1>
      <QREncoder />  {/* Display the QR Encoder component */}
    </div>
  );
};

export default QREncoderDemo;
