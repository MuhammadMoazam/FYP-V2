from flask import Flask, request, jsonify
import joblib
import numpy as np
from tensorflow import keras
import logging

app = Flask(__name__)

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Load the trained model
try:
    model = keras.models.load_model('fyp_model.h5')
    logger.info("Model loaded successfully")
except Exception as e:
    logger.error(f"Error loading model: {str(e)}")
    model = None

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        
        # Extract features from the request
        features = np.array(data['features']).reshape(1, -1)
        
        # Make prediction
        prediction = model.predict(features)
        
        # Return prediction
        return jsonify({
            'status': 'success',
            'prediction': prediction.tolist()
        })
    
    except Exception as e:
        logger.error(f"Prediction error: {str(e)}")
        return jsonify({
            'status': 'error',
            'message': str(e)
        }), 500

@app.route('/health', methods=['GET'])
def health_check():
    if model is not None:
        return jsonify({'status': 'healthy'}), 200
    return jsonify({'status': 'unhealthy'}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
