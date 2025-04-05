import { useState } from 'react';
import styles from './create.module.css';

export default function Create() {
    const [formData, setFormData] = useState({
        companyName: '',
        logoUrl: '',
        jobPosition: '',
        monthlySalary: '',
        jobType: 'Full-time',
        workLocation: 'Office',
        location: '',
        jobDescription: '',
        aboutCompany: '',
        skills: [],
        additionalInfo: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: Implement job creation logic
        console.log('Job creation:', formData);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSkillChange = (e) => {
        const value = e.target.value;
        if (value && !formData.skills.includes(value)) {
            setFormData(prev => ({
                ...prev,
                skills: [...prev.skills, value]
            }));
        }
    };

    const removeSkill = (skillToRemove) => {
        setFormData(prev => ({
            ...prev,
            skills: prev.skills.filter(skill => skill !== skillToRemove)
        }));
    };

    return (
        <div className={styles.container}>
            <section className={styles.formSection}>
                <h1 className={styles.title}>Add job description</h1>
                <p className={styles.subtitle}>Recruiter add job details here</p>

                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label htmlFor="companyName" className={styles.label}>Company Name</label>
                        <input
                            id="companyName"
                            type="text"
                            name="companyName"
                            placeholder="Enter your company name here"
                            className={styles.input}
                            value={formData.companyName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="logoUrl" className={styles.label}>Company Logo URL</label>
                        <input
                            id="logoUrl"
                            type="url"
                            name="logoUrl"
                            placeholder="Enter the link"
                            className={styles.input}
                            value={formData.logoUrl}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="jobPosition" className={styles.label}>Job Position</label>
                        <input
                            id="jobPosition"
                            type="text"
                            name="jobPosition"
                            placeholder="Enter job position"
                            className={styles.input}
                            value={formData.jobPosition}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="monthlySalary" className={styles.label}>Monthly Salary (₹)</label>
                        <input
                            id="monthlySalary"
                            type="number"
                            name="monthlySalary"
                            placeholder="Enter Amount in rupees"
                            className={styles.input}
                            value={formData.monthlySalary}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="jobType" className={styles.label}>Job Type</label>
                        <select
                            id="jobType"
                            name="jobType"
                            className={styles.input}
                            value={formData.jobType}
                            onChange={handleChange}
                            required
                        >
                            <option value="Full-time">Full-time</option>
                            <option value="Part-time">Part-time</option>
                            <option value="Contract">Contract</option>
                        </select>
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="workLocation" className={styles.label}>Work Location Type</label>
                        <select
                            id="workLocation"
                            name="workLocation"
                            className={styles.input}
                            value={formData.workLocation}
                            onChange={handleChange}
                            required
                        >
                            <option value="Office">Office</option>
                            <option value="Remote">Remote</option>
                            <option value="Hybrid">Hybrid</option>
                        </select>
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="location" className={styles.label}>Location</label>
                        <input
                            id="location"
                            type="text"
                            name="location"
                            placeholder="Enter Location"
                            className={styles.input}
                            value={formData.location}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="jobDescription" className={styles.label}>Job Description</label>
                        <textarea
                            id="jobDescription"
                            name="jobDescription"
                            placeholder="Type the job description"
                            className={styles.textarea}
                            value={formData.jobDescription}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="aboutCompany" className={styles.label}>About Company</label>
                        <textarea
                            id="aboutCompany"
                            name="aboutCompany"
                            placeholder="Type about your company"
                            className={styles.textarea}
                            value={formData.aboutCompany}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="skills" className={styles.label}>Required Skills</label>
                        <div className={styles.skillsContainer}>
                            <input
                                id="skills"
                                type="text"
                                placeholder="Enter the must have skills"
                                className={styles.input}
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        handleSkillChange(e);
                                        e.target.value = '';
                                    }
                                }}
                            />
                            <div className={styles.skillTags}>
                                {formData.skills.map((skill, index) => (
                                    <span key={index} className={styles.skillTag}>
                                        {skill}
                                        <button
                                            type="button"
                                            onClick={() => removeSkill(skill)}
                                            className={styles.removeSkill}
                                            aria-label={`Remove ${skill}`}
                                        >
                                            ×
                                        </button>
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="additionalInfo" className={styles.label}>Additional Information</label>
                        <input
                            id="additionalInfo"
                            type="text"
                            name="additionalInfo"
                            placeholder="Enter the additional information"
                            className={styles.input}
                            value={formData.additionalInfo}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={styles.buttonGroup}>
                        <button type="button" className={styles.cancelButton}>
                            Cancel
                        </button>
                        <button type="submit" className={styles.button}>
                            + Add Job
                        </button>
                    </div>
                </form>
            </section>

            <section className={styles.imageSection}>
                <h2 className={styles.imageTitle}>Recruiter add job details here</h2>
            </section>
        </div>
    );
}