# 🚀 DTMS Survey - Deployment Quick Reference

## ⚡ 5-Minute Setup

### Step 1: Google Sheet + Script (5 min)
```
1. sheets.google.com → New Sheet → Name: "DTMS Survey Responses"
2. Copy Sheet ID from URL
3. script.google.com → New Project
4. Paste GoogleAppsScript.gs code
5. Replace YOUR_GOOGLE_SHEET_ID with your Sheet ID
6. Deploy → Web App → Anyone access
7. Copy deployment URL
```

### Step 2: Update Code (1 min)
```
src/App.jsx → Replace YOUR_GOOGLE_SCRIPT_ID with deployment URL
```

### Step 3: Test Locally (2 min)
```
npm install
npm run dev
→ Open http://localhost:3000
→ Fill test form
→ Check Google Sheet for response
```

### Step 4: Deploy to Vercel (1 min)
```
npm install -g vercel
vercel login
vercel --prod
→ Live at your-project.vercel.app
```

## 📍 Key URLs to Save

- **Google Sheet ID**: `https://docs.google.com/spreadsheets/d/[SHEET_ID]/edit`
- **Apps Script Deployment**: `https://script.google.com/macros/d/[SCRIPT_ID]/usercontent/exec`
- **Live Survey**: `https://[your-project].vercel.app`

## 📋 What Gets Stored in Google Sheet

| Column | Data |
|--------|------|
| Timestamp | When submitted |
| Name | Student/Staff name |
| Department | CSE, ECE, etc |
| Year | 1st/2nd/3rd/4th |
| Role | Student or Staff |
| Uses Bus | Yes/No |
| Frequency | Daily/Occasionally/Rarely |
| Route | Bus area |
| Problems | Comma-separated issues |
| Satisfaction | 1-5 rating |
| Wants App | Yes/No |
| Features | Comma-separated preferences |
| DTMS Helps | Yes/No/Maybe |
| Suggestions | Open text feedback |

## 🔗 Share Survey Link

After Vercel deployment, share this link with students:
```
https://[your-project].vercel.app
```

## 📊 Analyze Responses

In Google Sheets:
- **Charts**: Insert → Chart
- **Pivot Tables**: Data → Pivot table
- **Filter**: Click column header → Filter
- **Export**: File → Download → CSV/Excel

## ✅ Verification Checklist

- [ ] Google Sheet created
- [ ] Apps Script deployed
- [ ] Script ID replaced in App.jsx
- [ ] Local test submitted successfully
- [ ] Response appears in Google Sheet
- [ ] Vercel deployment successful
- [ ] Survey link working
- [ ] Form validated on mobile

## 🆘 If Something Fails

**Form won't submit?**
- Check F12 Console for errors
- Verify Apps Script is "Anyone" access
- Test in incognito/private window

**No responses in Sheet?**
- Check Sheet exists
- Verify Sheet ID matches in Apps Script
- Check Apps Script execution logs

**Vercel deploy fails?**
- Delete node_modules: `rmdir /s node_modules`
- Reinstall: `npm install`
- Rebuild: `npm run build`

## 🎨 Customize Before Launch

1. Change college name in banner
2. Update survey questions in arrays
3. Adjust colors in CSS at bottom
4. Add/remove departments
5. Change success message

## 📱 Mobile Check

Test on phone:
- [ ] Form is readable
- [ ] Buttons are clickable
- [ ] No horizontal scrolling
- [ ] Response submits successfully

---

**Total time to live: ~10 minutes** ⏱️
