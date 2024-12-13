import pickle
from pathlib import Path

# Obtener ruta absoluta
BASE_DIR = Path(__file__).resolve().parent
MODEL_PATH = BASE_DIR / "model"

# Cargar modelo y componentes
model = pickle.load(open(MODEL_PATH / 'mental_health_model.pkl', 'rb'))
vectorizer = pickle.load(open(MODEL_PATH / 'vectorizer.pkl', 'rb'))
label_encoder = pickle.load(open(MODEL_PATH / 'label_encoder.pkl', 'rb'))

def predict(text: str):
    # Vectorizar el texto
    vectorized = vectorizer.transform([text])
    # Hacer predicción
    prediction = model.predict(vectorized)
    # Decodificar resultado
    result = label_encoder.inverse_transform(prediction)[0]
    return {"prediction": result}

if __name__ == "__main__":
    print(predict("i'm so feel bad!"))