import pandas as pd
import numpy as np
from sklearn.ensemble import IsolationForest
from sklearn.preprocessing import StandardScaler
import joblib

# Load dataset
df = pd.read_csv("Industrial_fault_detection.csv")

# Normalize column names
df.columns = [col.strip().lower() for col in df.columns]

# Remove label column
if "fault_type" in df.columns:
    df = df.drop(columns=["fault_type"])

# Keep only numeric data
df = df.select_dtypes(include=[np.number])

# Features
X = df.values

# Scale
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# Train model
model = IsolationForest(
    contamination=0.05,
    random_state=42
)

model.fit(X_scaled)

# Save
joblib.dump(model, "model.joblib")
joblib.dump(scaler, "scaler.joblib")

print("✅ Model retrained and saved successfully!")