# DTMS Survey - Setup Guide with Screenshots

## Complete Setup Instructions

### Phase 1: Google Sheets Setup (3 minutes)

#### 1.1 Create Google Sheet
1. Open [sheets.google.com](https://sheets.google.com)
2. Click **"+ Create"** or **"New"**
3. Select **"Blank spreadsheet"**
4. Name it: "DTMS Survey Responses"
5. Look at your URL bar - you'll see: `https://docs.google.com/spreadsheets/d/XXXXXXXXXXXXXXX/edit`
6. **Copy that long ID between `/d/` and `/edit`** - this is your SHEET_ID

Example:
```
https://docs.google.com/spreadsheets/d/1mV8kJ9pL2qR5sT9wX2zY4aB6cD8eF0gH/edit
                                        ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
                                        THIS IS YOUR SHEET_ID
```

### Phase 2: Google Apps Script Setup (3 minutes)

#### 2.1 Create Apps Script Project
1. Open [script.google.com](https://script.google.com)
2. Click **"+ Create"** or **"New"**
3. Name it: "DTMS Survey Backend"
4. You'll see an empty `Code.gs` file

#### 2.2 Add Script Code
1. Select ALL text in the file (Ctrl+A)
2. Delete it
3. Open the file: `GoogleAppsScript.gs` from this project
4. Copy ALL the code
5. Paste it into script.google.com
6. Find this line: `const sheetId = "YOUR_GOOGLE_SHEET_ID";`
7. Replace `YOUR_GOOGLE_SHEET_ID` with your actual Sheet ID (from Phase 1)

Example:
```javascript
// BEFORE:
const sheetId = "YOUR_GOOGLE_SHEET_ID";

// AFTER:
const sheetId = "1mV8kJ9pL2qR5sT9wX2zY4aB6cD8eF0gH";
```

#### 2.3 Deploy as Web App
1. Click **"Save"** (Ctrl+S)
2. Click the **"Deploy"** button (top right)
3. Click **"+ New Deployment"**
4. Click the gear icon next to "Select type"
5. Select **"Web app"**
6. Set:
   - **Execute as**: Your Google account email
   - **Who has access**: **Anyone** (important for CORS)
7. Click **"Deploy"**
8. A popup shows: "Deployment created"
9. **Copy the URL** - it looks like:
   ```
   https://script.google.com/macros/d/XXXXXXXXXXXXXXXXX/usercontent/exec
   ```

**Keep this URL saved!** This is your SCRIPT_URL.

### Phase 3: Update Survey App (2 minutes)

#### 3.1 Update Script URL
1. Open this file: `src/App.jsx`
2. Find the line with: `https://script.google.com/macros/d/YOUR_GOOGLE_SCRIPT_ID/usercontent/exec`
3. Replace `YOUR_GOOGLE_SCRIPT_ID` with your actual deployment ID (from Phase 2)

The line should look like:
```javascript
"https://script.google.com/macros/d/AKfycbzX1234567890/usercontent/exec"
```

### Phase 4: Test Locally (3 minutes)

#### 4.1 Install & Run
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

#### 4.2 Manual Test
1. Open http://localhost:3000
2. Fill in the form completely:
   - Enter any name
   - Select all required fields
   - Click "Next" through all steps
   - Click "Submit Survey"
3. You should see a success message
4. Open your Google Sheet - you should see a new row with your test data!

If it works → Proceed to Phase 5  
If it fails → Check troubleshooting section below

### Phase 5: Deploy to Vercel (2 minutes)

#### 5.1 Install Vercel CLI
```bash
npm install -g vercel
```

#### 5.2 Login to Vercel
```bash
vercel login
```

#### 5.3 Deploy
```bash
vercel --prod
```

Follow the prompts. At the end, Vercel will give you a live URL like:
```
https://dtms-survey.vercel.app
```

#### 5.4 Verify Live Version
1. Open the Vercel URL in your browser
2. Fill and submit a test form
3. Check if response appears in Google Sheet

### Phase 6: Share with Users (1 minute)

Your survey is now live! Share the Vercel URL with students:
```
https://your-project-name.vercel.app
```

---

## 🔍 Troubleshooting Guide

### Problem: Form won't submit

**Check 1: Browser Console**
1. Open the survey page
2. Press F12 (Developer Tools)
3. Click "Console" tab
4. Try submitting the form
5. Look for red error messages
6. Take a screenshot and check what it says

**Check 2: Apps Script Access**
1. Go back to script.google.com
2. Find your deployment
3. Check that "Who has access" is set to "**Anyone**" (not just you)
4. If it's not, click the deployment and change it

**Check 3: Script URL**
1. Open `src/App.jsx`
2. Find the fetch URL
3. Make sure it matches your Apps Script deployment URL exactly
4. No extra spaces or typos

### Problem: Response doesn't appear in Google Sheet

**Check 1: Sheet Exists**
1. Go to your Google Sheet
2. Make sure it's not empty (it should have headers)
3. Check if you can manually add a row

**Check 2: Script ID Matches**
1. Open your Apps Script
2. Check the line: `const sheetId = "..."`
3. Copy that ID
4. Go to your Google Sheet
5. Check the URL - does it contain the same ID?

**Check 3: Apps Script Logs**
1. Go to script.google.com
2. Open your project
3. Click "Executions" on the left
4. Look for your recent submission
5. Check if there are any errors listed

### Problem: Vercel deployment fails

**Solution:**
```bash
# Delete everything cached
rm -rf node_modules
rm -rf dist

# Reinstall
npm install

# Try building again
npm run build

# Deploy again
vercel --prod
```

### Problem: Survey works locally but not after Vercel deploy

This usually means the Script URL wasn't updated properly.

1. Open `src/App.jsx`
2. Check the fetch URL line
3. Verify it has your actual Script ID
4. Rebuild and redeploy

---

## ✅ Testing Checklist

- [ ] Google Sheet created and can be edited
- [ ] Apps Script deployed with "Anyone" access
- [ ] Script Sheet ID matches
- [ ] Survey URL in App.jsx updated
- [ ] `npm run dev` starts without errors
- [ ] Form loads at http://localhost:3000
- [ ] Can navigate through all 5 steps
- [ ] Form validates (try submitting empty form)
- [ ] Submit works and shows success screen
- [ ] Response appears in Google Sheet within 5 seconds
- [ ] Vercel deployment successful
- [ ] Live survey works end-to-end
- [ ] Mobile view looks good
- [ ] Different browser (if possible)

---

## 📞 Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| 403 Error on submit | Apps Script not set to "Anyone" |
| CORS Error | Deployment URL wrong or not public |
| Blank Sheet columns | Apps Script Sheet ID wrong |
| Can't find Script ID | It's in the deployment URL after `/d/` |
| Deploy command not found | Run: `npm install -g vercel` |
| Port 3000 already in use | Change vite.config.js port or `npm run dev -- --port 3001` |

---

## 🎯 Success Indicators

✅ Survey is working when:
1. Form loads with blue header and logo
2. Progress bar fills as you go through steps
3. Step indicators show 1, 2, 3, 4, 5
4. Submit button says "Submit Survey ✓"
5. Success page shows after submitting
6. New row appears in Google Sheet with all data

❌ Something's wrong if:
1. Form won't load
2. Submit button is grayed out
3. Error messages appear constantly
4. Data not going to Sheet
5. 404 errors in console

---

**You're all set! Happy surveying! 🚌**
