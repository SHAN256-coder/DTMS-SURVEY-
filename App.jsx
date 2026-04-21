import { useState } from "react";

const departments = ["CSE", "ECE", "EEE", "MECH", "CIVIL", "Others"];

const problemOptions = [
  "Bus delay",
  "No proper timing updates",
  "Overcrowding",
  "Lack of communication",
  "Route issues",
  "Safety concerns",
  "Others",
];

const featureOptions = [
  "Live bus tracking (GPS)",
  "Bus arrival notifications",
  "Route details",
  "Driver contact info",
  "Emergency alert",
  "Seat availability",
];

const steps = [
  "Basic Details",
  "Transport Usage",
  "Current Issues",
  "DTMS Features",
  "Suggestions",
];

const GOOGLE_APPS_SCRIPT_URL =
  import.meta.env.VITE_GOOGLE_APPS_SCRIPT_URL ||
  "https://script.google.com/macros/s/AKfycbwZOFMseICzp-ypwYCrLJzJVHAhbXYwm50FRjgP4Nn52OaLVSCv0DW6IZH7uLphZKsO/exec";

function RadioGroup({ name, options, value, onChange }) {
  return (
    <div className="radio-group">
      {options.map((opt) => (
        <label key={opt} className={`radio-option ${value === opt ? "selected" : ""}`}>
          <input
            type="radio"
            name={name}
            value={opt}
            checked={value === opt}
            onChange={() => onChange(opt)}
          />
          <span className="radio-circle"></span>
          {opt}
        </label>
      ))}
    </div>
  );
}

function CheckboxGroup({ options, values, onChange }) {
  const toggle = (opt) => {
    if (values.includes(opt)) onChange(values.filter((v) => v !== opt));
    else onChange([...values, opt]);
  };
  return (
    <div className="radio-group">
      {options.map((opt) => (
        <label key={opt} className={`radio-option ${values.includes(opt) ? "selected" : ""}`}>
          <input
            type="checkbox"
            checked={values.includes(opt)}
            onChange={() => toggle(opt)}
          />
          <span className="check-box">{values.includes(opt) && "✓"}</span>
          {opt}
        </label>
      ))}
    </div>
  );
}

function LinearScale({ value, onChange }) {
  return (
    <div className="scale-wrap">
      <span className="scale-label">Very Poor</span>
      <div className="scale-dots">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            className={`scale-dot ${value === n ? "active" : ""}`}
            onClick={() => onChange(n)}
          >
            {n}
          </button>
        ))}
      </div>
      <span className="scale-label">Excellent</span>
    </div>
  );
}

export default function App() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    name: "",
    department: "",
    year: "",
    role: "",
    useBus: "",
    frequency: "",
    route: "",
    problems: [],
    satisfaction: null,
    wantApp: "",
    features: [],
    dtmsHelp: "",
    suggestions: "",
  });

  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const validateStep = () => {
    const e = {};
    if (step === 0) {
      if (!form.name.trim()) e.name = "Required";
      if (!form.department) e.department = "Required";
      if (!form.year) e.year = "Required";
      if (!form.role) e.role = "Required";
    }
    if (step === 1) {
      if (!form.useBus) e.useBus = "Required";
    }
    if (step === 2) {
      if (form.problems.length === 0) e.problems = "Select at least one";
      if (!form.satisfaction) e.satisfaction = "Required";
    }
    if (step === 3) {
      if (!form.wantApp) e.wantApp = "Required";
      if (!form.dtmsHelp) e.dtmsHelp = "Required";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (validateStep()) setStep((s) => s + 1);
  };
  const back = () => setStep((s) => s - 1);

  const submit = async () => {
    if (!validateStep()) return;
    
    setSubmitting(true);
    try {
      const payload = {
        name: form.name,
        department: form.department,
        year: form.year,
        role: form.role,
        useBus: form.useBus,
        frequency: form.frequency || "",
        route: form.route || "",
        problems: form.problems,
        satisfaction: form.satisfaction,
        wantApp: form.wantApp,
        features: form.features,
        dtmsHelp: form.dtmsHelp,
        suggestions: form.suggestions || "",
        timestamp: new Date().toISOString(),
      };

      await fetch(
        GOOGLE_APPS_SCRIPT_URL,
        {
          method: "POST",
          mode: "no-cors",
          body: JSON.stringify(payload)
        }
      );
      
      console.log("Data sent to Google Sheet");
      setSubmitted(true);
    } catch (error) {
      console.error("Error:", error);
      alert("Submission failed. Please check your internet or script deployment and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const progress = ((step) / (steps.length - 1)) * 100;

  if (submitted) {
    return (
      <>
        <style>{css}</style>
        <div className="page">
          <div className="card success-card">
            <div className="success-icon">🚌</div>
            <h2 className="success-title">Thank you, {form.name || "Respondent"}!</h2>
            <p className="success-sub">
              Your feedback has been recorded for the <strong>DTMS Project</strong>.<br />
              We'll use your insights to build a smarter transport system for Dhaanish Ahmed College.
            </p>
            <button className="btn-primary" onClick={() => { setSubmitted(false); setStep(0); setForm({ name:"",department:"",year:"",role:"",useBus:"",frequency:"",route:"",problems:[],satisfaction:null,wantApp:"",features:[],dtmsHelp:"",suggestions:"" }); }}>
              Submit Another Response
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{css}</style>
      <div className="page">
        {/* Header Banner */}
        <div className="banner">
          <div className="banner-icon">🚌</div>
          <div>
            <h1 className="banner-title">College Bus Management System Survey</h1>
            <p className="banner-sub">DTMS Project — Dhaanish Ahmed College of Engineering</p>
          </div>
        </div>

        {/* Progress */}
        <div className="progress-wrap">
          <div className="progress-bar" style={{ width: `${progress}%` }} />
        </div>

        {/* Step indicators */}
        <div className="steps-row">
          {steps.map((s, i) => (
            <div key={s} className={`step-chip ${i === step ? "active" : i < step ? "done" : ""}`}>
              <span className="step-num">{i < step ? "✓" : i + 1}</span>
              <span className="step-name">{s}</span>
            </div>
          ))}
        </div>

        {/* Form Card */}
        <div className="card">
          <div className="section-header">
            <span className="section-badge">Section {step + 1}</span>
            <h2 className="section-title">{steps[step]}</h2>
          </div>

          {/* SECTION 0: Basic Details */}
          {step === 0 && (
            <div className="fields">
              <div className="field">
                <label>Full Name <span className="req">*</span></label>
                <input className={errors.name ? "err" : ""} placeholder="Enter your name" value={form.name} onChange={e => set("name", e.target.value)} />
                {errors.name && <p className="err-msg">{errors.name}</p>}
              </div>
              <div className="field">
                <label>Department <span className="req">*</span></label>
                <select className={errors.department ? "err" : ""} value={form.department} onChange={e => set("department", e.target.value)}>
                  <option value="">-- Select Department --</option>
                  {departments.map(d => <option key={d}>{d}</option>)}
                </select>
                {errors.department && <p className="err-msg">{errors.department}</p>}
              </div>
              <div className="field">
                <label>Year of Study <span className="req">*</span></label>
                <RadioGroup name="year" options={["1st Year","2nd Year","3rd Year","4th Year"]} value={form.year} onChange={v => set("year", v)} />
                {errors.year && <p className="err-msg">{errors.year}</p>}
              </div>
              <div className="field">
                <label>You are a <span className="req">*</span></label>
                <RadioGroup name="role" options={["Student","Staff"]} value={form.role} onChange={v => set("role", v)} />
                {errors.role && <p className="err-msg">{errors.role}</p>}
              </div>
            </div>
          )}

          {/* SECTION 1: Transport Usage */}
          {step === 1 && (
            <div className="fields">
              <div className="field">
                <label>Do you use the college bus? <span className="req">*</span></label>
                <RadioGroup name="useBus" options={["Yes","No"]} value={form.useBus} onChange={v => set("useBus", v)} />
                {errors.useBus && <p className="err-msg">{errors.useBus}</p>}
              </div>
              {form.useBus === "Yes" && (
                <>
                  <div className="field">
                    <label>How often do you use it?</label>
                    <RadioGroup name="freq" options={["Daily","Occasionally","Rarely"]} value={form.frequency} onChange={v => set("frequency", v)} />
                  </div>
                  <div className="field">
                    <label>Your Bus Route / Area</label>
                    <input placeholder="e.g. Tambaram, Velachery…" value={form.route} onChange={e => set("route", e.target.value)} />
                  </div>
                </>
              )}
            </div>
          )}

          {/* SECTION 2: Current Issues */}
          {step === 2 && (
            <div className="fields">
              <div className="field">
                <label>What problems do you face? <span className="req">*</span></label>
                <CheckboxGroup options={problemOptions} values={form.problems} onChange={v => set("problems", v)} />
                {errors.problems && <p className="err-msg">{errors.problems}</p>}
              </div>
              <div className="field">
                <label>Rate your satisfaction with the current system <span className="req">*</span></label>
                <LinearScale value={form.satisfaction} onChange={v => set("satisfaction", v)} />
                {errors.satisfaction && <p className="err-msg">{errors.satisfaction}</p>}
              </div>
            </div>
          )}

          {/* SECTION 3: DTMS Features */}
          {step === 3 && (
            <div className="fields">
              <div className="field">
                <label>Would you like a mobile app for bus tracking? <span className="req">*</span></label>
                <RadioGroup name="wantApp" options={["Yes","No"]} value={form.wantApp} onChange={v => set("wantApp", v)} />
                {errors.wantApp && <p className="err-msg">{errors.wantApp}</p>}
              </div>
              <div className="field">
                <label>Which features would you prefer?</label>
                <CheckboxGroup options={featureOptions} values={form.features} onChange={v => set("features", v)} />
              </div>
              <div className="field">
                <label>Do you think DTMS will improve transport efficiency? <span className="req">*</span></label>
                <RadioGroup name="dtmsHelp" options={["Yes","No","Maybe"]} value={form.dtmsHelp} onChange={v => set("dtmsHelp", v)} />
                {errors.dtmsHelp && <p className="err-msg">{errors.dtmsHelp}</p>}
              </div>
            </div>
          )}

          {/* SECTION 4: Suggestions */}
          {step === 4 && (
            <div className="fields">
              <div className="field">
                <label>Any suggestions to improve the transport system?</label>
                <textarea
                  rows={5}
                  placeholder="Share your thoughts, ideas, or feedback here…"
                  value={form.suggestions}
                  onChange={e => set("suggestions", e.target.value)}
                />
              </div>
              <div className="summary-box">
                <h3>📋 Your Responses Summary</h3>
                <p><b>Name:</b> {form.name}</p>
                <p><b>Dept:</b> {form.department} | <b>Year:</b> {form.year} | <b>Role:</b> {form.role}</p>
                <p><b>Bus User:</b> {form.useBus} {form.frequency ? `(${form.frequency})` : ""}</p>
                <p><b>Issues:</b> {form.problems.join(", ") || "—"}</p>
                <p><b>Satisfaction:</b> {form.satisfaction}/5</p>
                <p><b>Wants App:</b> {form.wantApp} | <b>DTMS Helps:</b> {form.dtmsHelp}</p>
                <p><b>Preferred Features:</b> {form.features.join(", ") || "—"}</p>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="nav-row">
            {step > 0 && <button className="btn-secondary" onClick={back}>← Back</button>}
            <div style={{ flex: 1 }} />
            {step < steps.length - 1
              ? <button className="btn-primary" onClick={next}>Next →</button>
              : <button className="btn-submit" onClick={submit} disabled={submitting}>{submitting ? "Submitting..." : "Submit Survey ✓"}</button>
            }
          </div>
        </div>

        <p className="footer-note">DTMS Project · Dhaanish Ahmed College of Engineering · Chennai</p>
      </div>
    </>
  );
}

const css = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body { font-family: 'DM Sans', sans-serif; background: #f0f4ff; min-height: 100vh; }

  .page {
    max-width: 680px;
    margin: 0 auto;
    padding: 24px 16px 48px;
  }

  /* Banner */
  .banner {
    background: linear-gradient(135deg, #1a56db 0%, #0e3fb0 100%);
    border-radius: 16px 16px 0 0;
    padding: 28px 32px;
    display: flex;
    align-items: center;
    gap: 20px;
    box-shadow: 0 4px 24px rgba(26,86,219,0.25);
  }
  .banner-icon { font-size: 2.8rem; }
  .banner-title { color: #fff; font-size: 1.25rem; font-weight: 700; line-height: 1.3; }
  .banner-sub { color: rgba(255,255,255,0.75); font-size: 0.85rem; margin-top: 4px; }

  /* Progress */
  .progress-wrap {
    height: 5px;
    background: #dce4f7;
    border-radius: 0;
    overflow: hidden;
  }
  .progress-bar {
    height: 100%;
    background: linear-gradient(90deg, #38bdf8, #1a56db);
    transition: width 0.4s ease;
  }

  /* Step chips */
  .steps-row {
    display: flex;
    gap: 6px;
    padding: 14px 16px;
    background: #fff;
    border-bottom: 1px solid #e8eef8;
    overflow-x: auto;
    scrollbar-width: none;
  }
  .steps-row::-webkit-scrollbar { display: none; }
  .step-chip {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 5px 12px;
    border-radius: 20px;
    font-size: 0.78rem;
    font-weight: 500;
    color: #94a3b8;
    background: #f1f5fd;
    white-space: nowrap;
    transition: all 0.2s;
  }
  .step-chip.active { background: #dbeafe; color: #1a56db; font-weight: 700; }
  .step-chip.done { background: #dcfce7; color: #15803d; }
  .step-num {
    width: 20px; height: 20px;
    border-radius: 50%;
    background: currentColor;
    color: #fff;
    display: flex; align-items: center; justify-content: center;
    font-size: 0.7rem; font-weight: 700;
    flex-shrink: 0;
  }
  .step-chip.active .step-num { background: #1a56db; }
  .step-chip.done .step-num { background: #15803d; }
  .step-chip:not(.active) .step-num { background: #cbd5e1; color: #fff; }

  /* Card */
  .card {
    background: #fff;
    border-radius: 0 0 16px 16px;
    padding: 32px;
    box-shadow: 0 4px 24px rgba(0,0,0,0.06);
  }

  .section-header { margin-bottom: 28px; }
  .section-badge {
    display: inline-block;
    background: #eff6ff;
    color: #1a56db;
    font-size: 0.75rem;
    font-weight: 600;
    padding: 3px 10px;
    border-radius: 12px;
    margin-bottom: 8px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  .section-title { font-size: 1.35rem; font-weight: 700; color: #1e2d5a; }

  /* Fields */
  .fields { display: flex; flex-direction: column; gap: 24px; }
  .field { display: flex; flex-direction: column; gap: 8px; }
  .field label { font-size: 0.95rem; font-weight: 600; color: #334155; }
  .req { color: #ef4444; }

  input[type="text"], input:not([type]), select, textarea {
    width: 100%;
    padding: 10px 14px;
    border: 2px solid #e2e8f0;
    border-radius: 10px;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.95rem;
    color: #1e293b;
    background: #f8faff;
    outline: none;
    transition: border 0.2s;
  }
  input:focus, select:focus, textarea:focus { border-color: #1a56db; background: #fff; }
  input.err, select.err { border-color: #ef4444; }
  .err-msg { color: #ef4444; font-size: 0.8rem; margin-top: 2px; }

  /* Radio / Checkbox */
  .radio-group { display: flex; flex-direction: column; gap: 8px; }
  .radio-option {
    display: flex; align-items: center; gap: 12px;
    padding: 10px 14px;
    border: 2px solid #e2e8f0;
    border-radius: 10px;
    cursor: pointer;
    font-size: 0.93rem;
    color: #475569;
    transition: all 0.15s;
    background: #f8faff;
  }
  .radio-option:hover { border-color: #93c5fd; background: #eff6ff; }
  .radio-option.selected { border-color: #1a56db; background: #eff6ff; color: #1e2d5a; font-weight: 500; }
  .radio-option input { display: none; }
  .radio-circle {
    width: 18px; height: 18px; border-radius: 50%;
    border: 2px solid #cbd5e1;
    flex-shrink: 0;
    transition: all 0.15s;
    background: #fff;
    position: relative;
  }
  .radio-option.selected .radio-circle {
    border-color: #1a56db;
    background: #1a56db;
    box-shadow: inset 0 0 0 3px #fff;
  }
  .check-box {
    width: 18px; height: 18px; border-radius: 4px;
    border: 2px solid #cbd5e1;
    flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
    font-size: 0.75rem;
    color: #fff;
    background: #fff;
    transition: all 0.15s;
  }
  .radio-option.selected .check-box { background: #1a56db; border-color: #1a56db; }

  /* Linear Scale */
  .scale-wrap { display: flex; align-items: center; gap: 16px; flex-wrap: wrap; margin-top: 4px; }
  .scale-label { font-size: 0.8rem; color: #64748b; }
  .scale-dots { display: flex; gap: 10px; }
  .scale-dot {
    width: 42px; height: 42px;
    border-radius: 50%;
    border: 2px solid #e2e8f0;
    background: #f8faff;
    font-family: 'DM Mono', monospace;
    font-size: 0.95rem;
    font-weight: 600;
    color: #64748b;
    cursor: pointer;
    transition: all 0.15s;
  }
  .scale-dot:hover { border-color: #93c5fd; background: #eff6ff; color: #1a56db; }
  .scale-dot.active { background: #1a56db; border-color: #1a56db; color: #fff; transform: scale(1.1); box-shadow: 0 2px 10px rgba(26,86,219,0.3); }

  /* Summary Box */
  .summary-box {
    background: #f0f7ff;
    border: 1.5px solid #bfdbfe;
    border-radius: 12px;
    padding: 18px 20px;
    font-size: 0.88rem;
    color: #334155;
    line-height: 1.9;
  }
  .summary-box h3 { font-size: 0.95rem; color: #1a56db; margin-bottom: 10px; }
  .summary-box p b { color: #1e293b; }

  /* Navigation */
  .nav-row { display: flex; align-items: center; margin-top: 32px; gap: 12px; }
  .btn-primary, .btn-secondary, .btn-submit {
    padding: 11px 24px;
    border-radius: 10px;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.95rem;
    font-weight: 600;
    cursor: pointer;
    border: none;
    transition: all 0.2s;
  }
  .btn-primary { background: #1a56db; color: #fff; }
  .btn-primary:hover { background: #1540b0; transform: translateY(-1px); box-shadow: 0 4px 12px rgba(26,86,219,0.3); }
  .btn-secondary { background: #f1f5f9; color: #475569; border: 2px solid #e2e8f0; }
  .btn-secondary:hover { background: #e2e8f0; }
  .btn-submit { background: linear-gradient(135deg, #059669, #047857); color: #fff; padding: 11px 28px; }
  .btn-submit:hover { transform: translateY(-1px); box-shadow: 0 4px 14px rgba(5,150,105,0.35); }
  .btn-submit:disabled { opacity: 0.6; cursor: not-allowed; }

  /* Success */
  .success-card {
    border-radius: 16px !important;
    text-align: center;
    padding: 56px 32px !important;
    margin-top: 40px;
  }
  .success-icon { font-size: 4rem; margin-bottom: 16px; }
  .success-title { font-size: 1.6rem; font-weight: 700; color: #1e2d5a; margin-bottom: 12px; }
  .success-sub { color: #64748b; font-size: 0.95rem; line-height: 1.7; margin-bottom: 28px; }

  .footer-note { text-align: center; font-size: 0.78rem; color: #94a3b8; margin-top: 20px; }
`;
