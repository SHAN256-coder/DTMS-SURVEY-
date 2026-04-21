# DTMS Survey - College Bus Management System Feedback Form

A beautiful, multi-step survey form for collecting feedback on the college bus management system at Dhaanish Ahmed College of Engineering. Built with React, Vite, and Google Sheets integration.

## 📋 Features

- ✅ 5-step progressive form with validation
- ✅ Responsive design (mobile & desktop)
- ✅ Auto-saves responses to Google Sheets
- ✅ Progress tracking & visual feedback
- ✅ Beautiful UI with smooth animations
- ✅ Ready to deploy on Vercel

## 🚀 Quick Setup

### 1. Create Google Sheets & Apps Script

**Step A: Create a Google Sheet**
1. Go to [sheets.google.com](https://sheets.google.com)
2. Create a new spreadsheet named "DTMS Survey Responses"
3. Copy the Sheet ID from the URL: `https://docs.google.com/spreadsheets/d/{SHEET_ID}/edit`
4. Keep this ID safe - you'll need it later

**Step B: Set up Google Apps Script**
1. Go to [script.google.com](https://script.google.com)
2. Create a new project
3. Copy the entire code from `GoogleAppsScript.gs` into the editor
4. Replace `YOUR_GOOGLE_SHEET_ID` with your actual sheet ID
5. Click "Save"
6. Click "Deploy" → "New Deployment"
7. Select type: **Web app**
8. Execute as: Your email address
9. Who has access: **Anyone**
10. Click "Deploy"
11. Copy the deployment URL (looks like: `https://script.google.com/macros/d/XXXXX/usercontent/exec`)

**Step C: Update App.jsx**
1. Open `src/App.jsx`
2. Find line with: `https://script.google.com/macros/d/YOUR_GOOGLE_SCRIPT_ID/usercontent/exec`
3. Replace `YOUR_GOOGLE_SCRIPT_ID` with the actual deployment URL you copied

### 2. Install Dependencies Locally

```bash
npm install
```

### 3. Test Locally

```bash
npm run dev
```

The survey will be available at `http://localhost:3000`

Test the form by filling it out and verifying responses appear in your Google Sheet.

## 📦 Deploy to Vercel

### Option A: Using Vercel CLI (Quickest)

```bash
npm install -g vercel
vercel login
vercel
```

Follow the prompts and your site will be live!

### Option B: Connect GitHub

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "Add New Project"
4. Select your repository
5. Click "Deploy"

### Option C: Manual Upload

1. Build the project:
```bash
npm run build
```
2. Zip the `dist` folder
3. Upload to Vercel or any static hosting

## 📝 Form Fields

**Section 1: Basic Details**
- Full Name (required)
- Department (required)
- Year of Study (required)
- Role (Student/Staff) (required)

**Section 2: Transport Usage**
- Do you use college bus? (required)
- How often? (conditional)
- Bus route/area (optional)

**Section 3: Current Issues**
- Problems faced (required - multi-select)
- Satisfaction rating 1-5 (required)

**Section 4: DTMS Features**
- Want mobile app? (required)
- Preferred features (optional - multi-select)
- Will DTMS help? (required)

**Section 5: Suggestions**
- Open feedback (optional)
- Summary preview

## 🔧 Customization

### Change Survey Questions
Edit the arrays at the top of `src/App.jsx`:
- `departments`
- `problemOptions`
- `featureOptions`
- `steps`

### Change Colors
Edit the CSS in the `css` variable at the bottom of `src/App.jsx`. Color scheme uses Tailwind palette.

### Change College Name
Search for "Dhaanish Ahmed College" in `src/App.jsx` and replace with your college name.

## 📊 View Responses

Your Google Sheet will automatically populate with responses:
- Open your Google Sheet
- Responses appear as new rows
- Export to CSV/Excel for analysis
- Create pivot tables & charts

## 🐛 Troubleshooting

**Form won't submit?**
- Check Google Apps Script deployment is set to "Anyone"
- Verify Script ID is correct in App.jsx
- Check browser console for errors (F12 → Console tab)

**Responses not appearing in Sheet?**
- Verify Google Sheet ID in Apps Script
- Make sure Google Sheet sharing is set appropriately
- Check Apps Script execution logs

**Build fails?**
- Delete `node_modules` and `dist` folders
- Run `npm install` again
- Try `npm run build`

## 📱 Browser Support

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- IE11: ❌ Not supported

## 📄 Project Structure

```
DTMS SURVEY/
├── src/
│   ├── App.jsx           # Main survey component
│   └── main.jsx          # React entry point
├── index.html            # HTML template
├── package.json          # Dependencies
├── vite.config.js        # Vite configuration
├── vercel.json           # Vercel configuration
├── GoogleAppsScript.gs   # Google Apps Script backend
└── README.md            # This file
```

## 🔐 Security Notes

- Google Apps Script is set to "Anyone" for form submissions
- No sensitive data is stored in the frontend
- All data goes directly to your Google Sheet
- Share your Sheet URL only with authorized people

## 📧 Support

For issues or questions:
1. Check browser console (F12) for errors
2. Verify Google Apps Script is deployed
3. Test with a simple form entry
4. Check Google Sheet has data before debugging

## 📄 License

This project is free to use and modify for your college's survey needs.

---

**Happy Surveying! 🚌**
