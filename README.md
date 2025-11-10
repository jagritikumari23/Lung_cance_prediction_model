# CT Scan Analysis Application

A web-based application for analyzing CT scan images using deep learning. The application provides predictions for lung conditions (benign, malignant, or normal) and generates detailed analysis reports.

## Features

- Upload and analyze multiple CT scan images
- Real-time prediction results
- Detailed analysis with probability scores
- Z-score normalization
- Visualization of analysis trends
- PDF report generation
- User-friendly interface

## Tech Stack

### Backend
- Flask (Python web framework)
- TensorFlow (Deep learning)
- NumPy (Numerical computations)
- Matplotlib & Seaborn (Data visualization)
- ReportLab (PDF generation)

### Frontend
- React.js
- Material-UI
- React Dropzone

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/ct-scan-analysis.git
cd ct-scan-analysis
```

2. Create a virtual environment and activate it:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install backend dependencies:
```bash
pip install -r requirements.txt
```

4. Install frontend dependencies:
```bash
cd frontend
npm install
```

## Running the Application

1. Start the backend server:
```bash
python app.py
```

2. In a new terminal, start the frontend development server:
```bash
cd frontend
npm start
```

3. Open your browser and navigate to `http://localhost:3000`

## Project Structure

```
ct-scan-analysis/
├── app.py                 # Flask backend
├── requirements.txt       # Python dependencies
├── frontend/             # React frontend
│   ├── public/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.js
│   └── package.json
└── README.md
```

## API Endpoints

- `POST /api/predict` - Upload and analyze CT scan images
- `GET /api/analyses` - Get all analysis results
- `GET /api/analysis-plot` - Get analysis trend visualization
- `POST /api/generate-report` - Generate PDF report

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- TensorFlow team for the deep learning framework
- Flask team for the web framework
- React team for the frontend library 
