from flask import Flask, render_template, request, jsonify
import requests
from dotenv import load_dotenv
import os
from datetime import datetime

# Load environment variables
load_dotenv()
GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbygZ9JUkqmpNoOkVMKMO57Yb5ujWQYEcjJBKRH_bkH0oiyQ2erL7h75knpOLC3mxu6O/exec"



app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/submit_form', methods=['POST'])
def submit_form():
    try:
        form_data = request.json  # Ensure data is received in JSON format

        def safe_join(values):
            """Helper function to join list values safely, handling None values."""
            return ", ".join(filter(None, values)) if isinstance(values, list) else values

        # Mapping form inputs to Google Sheets columns
        data = {
            "Timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            "applicationDate": form_data.get("applicationDate", "NA"),
            "place": form_data.get("place", "NA"),
            "fullName": safe_join([form_data.get("firstName"), form_data.get("middleName"), form_data.get("lastName")]),
            "dateOfBirth": form_data.get("dob", "NA"),
            "email": form_data.get("email", "NA"),
            "currentAddress": safe_join([form_data.get("currentAddress"), form_data.get("currentCity"), form_data.get("currentState"), form_data.get("currentPin")]),
            "currentPhone": form_data.get("currentPhone", "NA"),
            "permanentAddress": safe_join([form_data.get("permanentAddress"), form_data.get("permanentCity"), form_data.get("permanentState"), form_data.get("permanentPin")]),
            "permanentPhone": form_data.get("permanentPhone", "NA"),
            "fatherName": form_data.get("fatherName", "NA"),
            "fatherEducation": form_data.get("fatherEducation", "NA"),
            "fatherAge": form_data.get("fatherAge", "NA"),
            "fatherOccupation": form_data.get("fatherOccupation", "NA"),
            "motherName": form_data.get("motherName", "NA"),
            "motherEducation": form_data.get("motherEducation", "NA"),
            "motherAge": form_data.get("motherAge", "NA"),
            "motherOccupation": form_data.get("motherOccupation", "NA"),
            "siblingName": safe_join(form_data.get("siblingName", [])),
            "siblingEducation": safe_join(form_data.get("siblingEducation", [])),
            "siblingAge": safe_join(form_data.get("siblingAge", [])),
            "siblingOccupation": safe_join(form_data.get("siblingOccupation", [])),
            "readLanguage": safe_join(form_data.get("readLanguage", [])),
            "writeLanguage": safe_join(form_data.get("writeLanguage", [])),
            "speakLanguage": safe_join(form_data.get("speakLanguage", [])),
            "personalStrengths": form_data.get("personalStrengths", "NA"),
            "personalImprovements": form_data.get("personalImprovements", "NA"),
            "careerObjectives": form_data.get("careerObjectives", "NA"),
            "jobExpectations": form_data.get("jobExpectations", "NA"),
            "otherNationality": form_data.get("otherNationality", "NA"),
            "workPermit": form_data.get("workPermit", "NA"),
            "passportNo": form_data.get("passportNo", "NA"),
            "passportValid": form_data.get("passportValid", "NA"),
            "visaDenial": form_data.get("visaDenial", "NA"),
            "overseasWork": form_data.get("overseasWork", "NA"),
            "countriesVisited": form_data.get("countriesVisited", "NA"),
            "attendedWipro": form_data.get("attendedWipro", "NA"),
            "wiproDivision": form_data.get("wiproDivision", "NA"),
            "wiproLocation": form_data.get("wiproLocation", "NA"),
            "wiproFriendName": form_data.get("wiproFriendName", "NA"),
            "wiproFriendLocation": form_data.get("wiproFriendLocation", "NA"),
            "majorIllness": form_data.get("majorIllness", "NA"),
            "illnessDetails": form_data.get("illnessDetails", "NA"),
            "otherCommitment": form_data.get("otherCommitment", "NA"),
        }

        # Send data to Google Sheets
        response = requests.post(GOOGLE_SCRIPT_URL, json=data)
        response.raise_for_status()  # Raise an error for non-200 status codes

        response_json = response.json()
        if response_json.get("status") == "success":
            return jsonify({"message": "Form data submitted successfully!"}), 200
        else:
            return jsonify({"error": response_json.get("message", "Unknown error occurred.")}), 500

    except requests.exceptions.RequestException as e:
        return jsonify({"error": f"Network error: {str(e)}"}), 500
    except Exception as e:
        return jsonify({"error": f"Unexpected error: {str(e)}"}), 500

if __name__ == '__main__':
     port = int(os.environ.get("PORT", 10000))  # Use Render-assigned PORT or default to 10000
    app.run(host="0.0.0.0", port=port, debug=True)
