import React, { useState, useEffect } from 'react';
import "./intake.css";
import { useAuth } from '../context/AuthContext';
import { authHeaders } from '../utils/auth';

function Intake() {
  const [form, setForm] = useState({
    companyName: '',
    email: '',
    phone: '',
    projectTitle: '',
    description: '',
    audience: '',
    technologies: {},
    stack: '',
    design: '',
    budget: '',
    timeline: '',
    thirdParty: '',
    approach: '',
    assets: '',
    postSupport: '',
    documents: [],
  });

  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    // Prefill email from authenticated user
    if (isAuthenticated && user) {
      const email = user.user_email || user.email || '';
      const maybeName = user.user_name || user.name || '';
      setForm(prev => ({ ...prev, email, companyName: prev.companyName || maybeName }));

      // Try to fetch registration to get a locked company name if present
      (async () => {
        try {
          const res = await fetch('http://localhost:5000/registration/me', {
            method: 'GET',
            headers: authHeaders()
          });
          const data = await res.json();
          if (res.ok && data.registered && data.registration) {
            setForm(prev => ({ ...prev, companyName: data.registration.company_name || prev.companyName }));
          }
        } catch (err) {
          console.error('Could not fetch registration for intake prefill', err);
        }
      })();
    }
  }, [isAuthenticated, user]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox' && name === 'technologies') {
      setForm(prev => ({
        ...prev,
        technologies: { ...prev.technologies, [value]: checked }
      }));
      return;
    }

    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleFile = (e) => {
    const files = Array.from(e.target.files);
    setForm(prev => ({ ...prev, documents: files }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      company_name: form.companyName,
      user_email: form.email,
      phone: form.phone,
      project_title: form.projectTitle,
      description: form.description,
      audience: form.audience,
      technologies: Object.keys(form.technologies).filter(k => form.technologies[k]),
      stack: form.stack,
      design_preference: form.design,
      budget: form.budget || 0,
      timeline: form.timeline || null,
      third_party: form.thirdParty || 'no',
      approach: form.approach,
      assets: form.assets,
      post_support: form.postSupport || 'no',
      document_paths: form.documents.map(d => d.name || String(d))
    };

    (async () => {
      try {
        const res = await fetch('http://localhost:5000/projects', {
          method: 'POST',
          headers: authHeaders(),
          body: JSON.stringify(payload)
        });
        const data = await res.json();
        if (res.ok) {
          alert('Project submitted successfully');
          // reset parts of the form but keep company/email/audience
          setForm(prev => ({ ...prev, phone: '', projectTitle: '', description: '', technologies: {}, stack: '', design: '', budget: '', timeline: '', thirdParty: 'no', approach: '', assets: '', postSupport: 'no', documents: [] }));
        } else {
          alert('Submission failed: ' + (data.error || JSON.stringify(data)));
        }
      } catch (err) {
        console.error('Submit error', err);
        alert('Submission error');
      }
    })();
  };

  const [options, setOptions] = useState([]);
  const [platforms, setPlatforms] = useState([]);

  useEffect(() => {
    // Fetch distinct target audience options from server
    (async () => {
      try {
        const res = await fetch('http://localhost:5000/postquestion/options', {
          method: 'GET',
          headers: authHeaders()
        });
        if (res.ok) {
          const data = await res.json();
          if (data && Array.isArray(data.options)) setOptions(data.options);
        }
      } catch (err) {
        console.error('Failed to load audience options', err);
      }
    })();

    // Fetch distinct platform/technology options from server
    (async () => {
      try {
        const res = await fetch('http://localhost:5000/postquestion/platforms', {
          method: 'GET',
          headers: authHeaders()
        });
        if (res.ok) {
          const data = await res.json();
          if (data && Array.isArray(data.options)) setPlatforms(data.options);
        }
      } catch (err) {
        console.error('Failed to load platform options', err);
      }
    })();

    // Fetch distinct framework options from server
    (async () => {
      try {
        const res = await fetch('http://localhost:5000/postquestion/frameworks', {
          method: 'GET',
          headers: authHeaders()
        });
        if (res.ok) {
          const data = await res.json();
          if (data && Array.isArray(data.options)) {
            // if stack is empty, prefer first framework as default
            setForm(prev => ({ ...prev, stack: prev.stack || (data.options[0] || '') }));
            setFrameworks(data.options);
          }
        }
      } catch (err) {
        console.error('Failed to load framework options', err);
      }
    })();
  }, []);

  const [frameworks, setFrameworks] = useState([]);
  const [designs, setDesigns] = useState([]);

  
    (async () => {
      try {
        const res = await fetch('http://localhost:5000/postquestion/designs', {
          method: 'GET',
          headers: authHeaders()
        });
        if (res.ok) {
          const data = await res.json();
          if (data && Array.isArray(data.options)) {
            setDesigns(data.options);
            setForm(prev => ({ ...prev, design: prev.design || (data.options[0] || '') }));
          }
        }
      } catch (err) {
        console.error('Failed to load design options', err);
      }
    })();

  const renderAudienceLabel = (raw) => {

    if (!raw) return '';
    const s = String(raw).replace(/[_-]/g, ' ').trim();
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  const normalize = (raw) => {
 
    if (raw === undefined || raw === null) return null;
    if (typeof raw !== 'string') return String(raw).trim();
    return raw.trim();
  };

  return (
    <div className="intake-page">
      <form className="intake-card" onSubmit={handleSubmit}>
        <h2>Project Intake Form</h2>

        <div className="row">
          <label>Company name</label>
          <input name="companyName" value={form.companyName} onChange={handleChange} required readOnly />
        </div>

        <div className="grid-2">
          <div className="row">
            <label>Email</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} required readOnly />
          </div>
          <div className="row">
            <label>Phone number</label>
            <input type="tel" name="phone" value={form.phone} onChange={handleChange} />
          </div>
        </div>

        <div className="row">
          <label>Project title</label>
          <input name="projectTitle" value={form.projectTitle} onChange={handleChange} required />
        </div>

        <div className="row">
          <label>Description</label>
          <textarea name="description" value={form.description} onChange={handleChange} rows={5} />
        </div>

        <fieldset>
          <legend>Target audience</legend>
          {options.length > 0 && (
            options.map((opt, i) => {

              const val = String(opt);
              const checked = normalize(form.audience) === normalize(val);
              return (
                <label key={i}><input type="radio" name="audience" value={val} checked={checked} onChange={handleChange} /> {renderAudienceLabel(opt)}</label>
              );
            })
          )}
        </fieldset>

        <fieldset>
          <legend>Technology (choose all that apply)</legend>
          {platforms.length > 0 && platforms.map((p, idx) => {
            const val = String(p);
            const checked = !!form.technologies[val];
            return (
              <label key={idx}>
                <input type="checkbox" name="technologies" value={val} checked={checked} onChange={handleChange} /> {val}
              </label>
            );
          })}
        </fieldset>

        <div className="row">
          <label>Preferred stack</label>
          <select name="stack" value={form.stack} onChange={handleChange}>
            {frameworks.length > 0 ? (
              frameworks.map((f, i) => <option key={i} value={String(f)}>{String(f)}</option>)
            ) : (
              <option value="">No frameworks available</option>
            )}
          </select>
        </div>

        <fieldset>
          <legend>Design preference</legend>
          {designs.length > 0 ? (
            designs.map((d, i) => {
              const val = String(d);
              return (
                <label key={i}><input type="radio" name="design" value={val} checked={form.design === val} onChange={handleChange} /> {val}</label>
              );
            })
          ) : (
            <label><input type="radio" name="design" value="" checked={!form.design} onChange={handleChange} /> No preference</label>
          )}
        </fieldset>

        <div className="grid-2">
          <div className="row">
            <label>Budget (Rupees)</label>
            <input name="budget" value={form.budget} onChange={handleChange} placeholder="e.g. 15000" />
          </div>
          <div className="row">
            <label>Timeline (target date)</label>
            <input type="date" name="timeline" value={form.timeline} onChange={handleChange} />
          </div>
        </div>

        <fieldset>
          <legend>Third-party integrations required?</legend>
          <label><input type="radio" name="thirdParty" value="yes" checked={form.thirdParty === 'yes'} onChange={handleChange} /> Yes</label>
          <label><input type="radio" name="thirdParty" value="no" checked={form.thirdParty === 'no'} onChange={handleChange} /> No</label>
        </fieldset>

        <fieldset>
          <legend>Development approach</legend>
          <label><input type="radio" name="approach" value="agile" checked={form.approach === 'agile'} onChange={handleChange} /> Agile</label>
          <label><input type="radio" name="approach" value="waterfall" checked={form.approach === 'waterfall'} onChange={handleChange} /> Waterfall</label>
          <label><input type="radio" name="approach" value="scrum" checked={form.approach === 'scrum'} onChange={handleChange} /> Scrum</label>
        </fieldset>

        <fieldset>
          <legend>Assets availability</legend>
          <label><input type="radio" name="assets" value="yes" checked={form.assets === 'yes'} onChange={handleChange} /> Yes</label>
          <label><input type="radio" name="assets" value="partially" checked={form.assets === 'partially'} onChange={handleChange} /> Partially</label>
          <label><input type="radio" name="assets" value="no" checked={form.assets === 'no'} onChange={handleChange} /> No</label>
        </fieldset>

        <fieldset>
          <legend>Post-launch support required?</legend>
          <label><input type="radio" name="postSupport" value="yes" checked={form.postSupport === 'yes'} onChange={handleChange} /> Yes</label>
          <label><input type="radio" name="postSupport" value="no" checked={form.postSupport === 'no'} onChange={handleChange} /> No</label>
        </fieldset>

        <div className="row">
          <label>Upload documents (specs, designs) — PDF, DOC, images</label>
          <input type="file" accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.zip" onChange={handleFile} multiple />
          {form.documents.length > 0 && (
            <ul className="files-list">
              {form.documents.map((f, i) => <li key={i}>{f.name}</li>)}
            </ul>
          )}
        </div>

        <div className="actions">
          <button type="submit" className="primary">Submit project</button>
          <button type="button" className="ghost" onClick={() => setForm(prev => ({ ...prev, phone: '', projectTitle: '', description: '', audience: prev.audience, technologies: {}, stack: 'MERN', design: 'minimal', budget: '', timeline: '', thirdParty: 'no', approach: 'agile', assets: 'no', postSupport: 'no', documents: [] }))}>Reset</button>
        </div>
      </form>
    </div>
  );
}

export default Intake;
