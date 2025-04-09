from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from helpers.qr_helper import generate_qr_code_with_image
from helpers.youtube_helper import download_youtube_video_temp
import os
import tempfile

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return "QR & YouTube API Server"

@app.route('/generate_qr_direct', methods=['POST'])
def generate_qr_direct():
    data = request.form.get('data')
    image_file = request.files.get('image')

    if not data or not image_file:
        return jsonify({'error': "Both 'data' and image file are required."}), 400

    try:
        qr_buffer = generate_qr_code_with_image(data, image_file)
        return send_file(qr_buffer, mimetype='image/png', as_attachment=True, download_name='qr_code.png')
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/download_video_direct', methods=['POST'])
def download_video_direct():
    video_url = request.form.get('video_url')

    if not video_url:
        return jsonify({'error': 'No video URL provided'}), 400

    try:
        temp_path = download_youtube_video_temp(video_url)
        return send_file(temp_path, as_attachment=True, download_name='video.mp4', mimetype='video/mp4')
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)