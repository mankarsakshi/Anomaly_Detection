from fastapi import FastAPI
import pandas as pd
import numpy as np
import joblib
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ==========================================================
# LOAD MODEL & SCALER
# ==========================================================
model = joblib.load("model.joblib")
scaler = joblib.load("scaler.joblib")

# ==========================================================
# LOAD DATASET
# ==========================================================
DATA_PATH = "Industrial_fault_detection.csv"

try:
    df = pd.read_csv(DATA_PATH)

    # ✅ Normalize column names
    df.columns = [col.strip().lower() for col in df.columns]

    # ✅ Rename important columns for frontend compatibility
    df = df.rename(columns={
        "temperature": "temperature",
        "vibration": "vibration",
        "pressure": "pressure",
        "flow_rate": "flow_rate",
        "fault_type": "fault_type"
    })

except Exception as e:
    print("Error loading dataset:", e)
    df = pd.DataFrame()


# ==========================================================
# FEATURE SELECTION
# ==========================================================
def get_feature_columns(dataframe):
    numeric_cols = dataframe.select_dtypes(include=[np.number]).columns.tolist()

    # ❌ Remove target column
    if "fault_type" in numeric_cols:
        numeric_cols.remove("fault_type")

    return numeric_cols


# ==========================================================
# ENDPOINT
# ==========================================================
@app.get("/predict")
def predict():
    if df.empty:
        return {"error": "Dataset not loaded properly"}

    feature_cols = get_feature_columns(df)

    X = df[feature_cols].values

    # ✅ Scale
    X_scaled = scaler.transform(X)

    # ✅ Predict
    preds = model.predict(X_scaled)
    scores = model.decision_function(X_scaled)

    df_copy = df.copy()

    # ✅ Add predictions
    df_copy["is_anomaly"] = preds == -1
    df_copy["score"] = scores

    # ✅ Include actual fault info (VERY USEFUL)
    if "fault_type" in df_copy.columns:
        df_copy["actual_fault"] = df_copy["fault_type"]

    total_anomalies = int((preds == -1).sum())

    return {
        "total_rows": len(df_copy),
        "total_anomalies_found": total_anomalies,
        "features_used": feature_cols,
        "results": df_copy.to_dict(orient="records")
    }
# ==========================================================
# LIVE STREAMING ENDPOINT
# ==========================================================
current_index = 0

@app.get("/predict-live")
def predict_live():
    global current_index

    try:
        if df.empty:
            return {"error": "Dataset not loaded properly"}

        feature_cols = get_feature_columns(df)

        row = df.iloc[current_index:current_index+1]
        current_index = (current_index + 1) % len(df)

        X = row[feature_cols].values
        X_scaled = scaler.transform(X)

        pred = model.predict(X_scaled)[0]
        score = model.decision_function(X_scaled)[0]

        result = row.to_dict(orient="records")[0]

        # ✅ FIX HERE
        result["is_anomaly"] = bool(pred == -1)
        result["score"] = float(score)

        # ✅ Convert numpy types
        for key, value in result.items():
            if isinstance(value, (np.generic,)):
                result[key] = value.item()

        return result

    except Exception as e:
        print("❌ ERROR:", e)
        return {"error": str(e)}