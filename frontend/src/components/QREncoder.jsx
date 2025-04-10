import { useState } from 'react';
import './QREncoder.css';

const qrStyles = [
  { value: '1', label: 'Square', image: 'https://tobiashagenaars-portfolio.netlify.app/images/square.png' },
  { value: '2', label: 'Gapped Square', image: 'https://tobiashagenaars-portfolio.netlify.app/images/gapped_square.png' },
  { value: '3', label: 'Circle', image: 'https://tobiashagenaars-portfolio.netlify.app/images/circle.png' },
  { value: '4', label: 'Rounded', image: 'https://tobiashagenaars-portfolio.netlify.app/images/rounded.png' },
  { value: '5', label: 'Vertical Bars', image: 'https://tobiashagenaars-portfolio.netlify.app/images/vertical.png' },
  { value: '6', label: 'Horizontal Bars', image: 'https://tobiashagenaars-portfolio.netlify.app/images/horizontal.png' },
];

const QREncoder = () => {
  const [data, setData] = useState('');
  const [image, setImage] = useState(null);
  const [moduleDrawer, setModuleDrawer] = useState('1');
  const [qrImageUrl, setQrImageUrl] = useState(null);
  const [message, setMessage] = useState('');

  const handleGenerate = () => {
    setMessage('Generating QR Code...');
    const formData = new FormData();
    formData.append('data', data);
    formData.append('module_drawer', parseInt(moduleDrawer));
    if (image) formData.append('image', image);

    fetch('https://portfoliosite-backend.onrender.com/qr-encoder/', {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.blob())
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        setQrImageUrl(url);
        setMessage('Preview ready!');
      })
      .catch((err) => {
        console.error(err);
        setMessage('Something went wrong!');
      });
  };

  const handleDownload = () => {
    if (!qrImageUrl) return;
    const a = document.createElement('a');
    a.href = qrImageUrl;
    a.download = 'qrcode.png';
    a.click();
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6 bg-white rounded-x1 shadow-md">
      <h1 className="text-4xl font-bold text-center text-gray-800">QR Code Generator</h1>

      <input
        type="text"
        placeholder="Enter link for your qr code"
        value={data}
        onChange={(e) => setData(e.target.value)}
        className="border border-gray-300 p-3 rounded w-full text-lg"
      />

      <label className="block mt-4 text-gray-700 font-medium">Upload center image (optional):</label>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
        className="block"
      />

      <div className="mt-6">
        <p className="font-semibold mt-6 mb-2 text-gray-700">Choose a QR style:</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {qrStyles.map((style) => (
            <img
              key={style.value}
              src={style.image}
              alt={style.label}
              className={`cursor-pointer border-4 rounded-lg overflow-hidden p-1 transition-transform transform hover:scale-105 ${
                moduleDrawer === style.value ? 'border-blue-500' : 'border-transparent'
              }`}
              onClick={() => setModuleDrawer(style.value)}
            />
          ))}
        </div>
      </div>

      <div className="flex gap-4 justify-center mt-4">
        <button onClick={handleGenerate} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-lg">
          Show QR
        </button>
        <button onClick={handleDownload} className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg text-lg">
          Download QR
        </button>
      </div>

      {message && <p className="text-center mt-4 text-gray-600">{message}</p>}
      {qrImageUrl && (
        <div className="flex justify-center mt-6">
          <img
            src={qrImageUrl}
            alt="Generated QR"
            className="max-w-full w-72 h-72 object-contain border border-gray-300 rounded-lg shadow"
          />
        </div>
      )}  
    </div>
  );
};

export default QREncoder;
