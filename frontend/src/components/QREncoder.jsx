import { useState } from 'react';
import './QREncoder.css';

const qrStyles = [
  { value: '1', label: 'Square', image: '/images/square.png' },
  { value: '2', label: 'Gapped Square', image: '/images/gapped_square.png' },
  { value: '3', label: 'Circle', image: '/images/circle.png' },
  { value: '4', label: 'Rounded', image: '/images/rounded.png' },
  { value: '5', label: 'Vertical Bars', image: '/images/vertical.png' },
  { value: '6', label: 'Horizontal Bars', image: '/images/horizontal.png' },
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

    fetch('https://portfoliosite-backend.onrender.com/generate_qr/', {
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
        setMessage('Something went wrong 🥲');
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
    <div className="max-w-3xl mx-auto p-6 space-y-4">
      <h1 className="text-3xl font-bold">QR Code Generator</h1>

      <input
        type="text"
        placeholder="Enter data"
        value={data}
        onChange={(e) => setData(e.target.value)}
        className="border p-2 w-full"
      />

      <label className="block mt-2">Upload center image (optional):</label>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
        className="block"
      />

      <div className="mt-4">
        <p className="font-semibold mb-2">Choose a QR style:</p>
        <div className="flex flex-wrap gap-4">
          {qrStyles.map((style) => (
            <img
              key={style.value}
              src={style.image}
              alt={style.label}
              className={`w-20 h-20 object-contain cursor-pointer border-4 rounded ${
                moduleDrawer === style.value ? 'border-blue-500' : 'border-transparent'
              }`}
              onClick={() => setModuleDrawer(style.value)}
            />
          ))}
        </div>
      </div>

      <div className="flex gap-4 mt-4">
        <button onClick={handleGenerate} className="bg-blue-600 text-white px-4 py-2 rounded">
          Show QR
        </button>
        <button onClick={handleDownload} className="bg-green-600 text-white px-4 py-2 rounded">
          Download QR
        </button>
      </div>

      {message && <p>{message}</p>}
      {qrImageUrl && <img src={qrImageUrl} alt="Generated QR" className="max-w-full mt-4" />}
    </div>
  );
};

export default QREncoder;
