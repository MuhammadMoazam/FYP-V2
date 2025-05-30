import tensorflow as tf
import numpy as np
import logging

logger = logging.getLogger(__name__)

def preprocess_input(features):
    """
    Preprocess the input features before prediction
    """
    try:
        # Convert to numpy array if not already
        features = np.array(features)
        
        # Add any necessary preprocessing steps here
        # For example: scaling, normalization, etc.
        
        return features
    except Exception as e:
        logger.error(f"Preprocessing error: {str(e)}")
        raise

def postprocess_output(prediction):
    """
    Postprocess the model output if needed
    """
    try:
        # Add any necessary postprocessing steps here
        return prediction
    except Exception as e:
        logger.error(f"Postprocessing error: {str(e)}")
        raise

def load_model(model_path):
    """
    Load a TensorFlow model from the given path
    """
    try:
        model = tf.keras.models.load_model(model_path)
        logger.info(f"Model loaded successfully from {model_path}")
        return model
    except Exception as e:
