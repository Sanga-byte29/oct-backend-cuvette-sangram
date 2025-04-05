import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './jobs.module.css';

export default function Jobs() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedSkills, setSelectedSkills] = useState([]);

    // Mock data for job listings
    const jobListings = [
        {
            id: 1,
            position: 'Frontend Developer',
            company: 'Snapchat',
            logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/c/c4/Snapchat_logo.svg/1200px-Snapchat_logo.svg.png',
            salary: '50,000',
            location: 'Delhi',
            workType: 'Office',
            jobType: 'Full time',
            skills: ['Frontend', 'CSS', 'JavaScript', 'HTML'],
            employeeCount: '11-50'
        },
        {
            id: 2,
            position: 'WordPress Developer',
            company: 'Acme Inc',
            logo: 'https://cdn-icons-png.flaticon.com/512/174/174881.png',
            salary: '25,000',
            location: 'Bangalore',
            workType: 'Remote',
            jobType: 'Full time',
            skills: ['CSS', 'HTML', 'WordPress'],
            employeeCount: '11-50'
        },
        {
            id: 3,
            position: 'Frontend Developer',
            company: 'Netflix',
            logo: 'https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/227_Netflix_logo-512.png',
            salary: '35,000',
            location: 'Mumbai',
            workType: 'Office',
            jobType: 'Full time',
            skills: ['Frontend', 'CSS', 'JavaScript', 'HTML'],
            employeeCount: '11-50'
        }
    ];
    const [jobs, setJobs] = useState(jobListings)
    // Available skills for filtering
    const availableSkills = ['Frontend', 'CSS', 'JavaScript', 'HTML', 'WordPress'];

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setFilteredJobs(() => jobListings.filter((job) => job.position.toLowerCase().includes(e.target.value.toLowerCase())))
        // setFilteredJobs((jobs) => jobs.position.includes(e.target.value))
    };

    const toggleSkill = (skill) => {
        if (selectedSkills.includes(skill)) {
            setSelectedSkills(selectedSkills.filter(s => s !== skill));
        } else {
            setSelectedSkills([...selectedSkills, skill]);
        }
    };

    const clearFilters = () => {
        setSelectedSkills([]);
        setFilteredJobs(jobListings);
    };

    const [filteredJobs, setFilteredJobs] = useState(jobs);

    const applyFilter = () => {
        if (selectedSkills.length === 0) {
            setFilteredJobs(jobListings);
            return;
        }
        const filtered = jobListings.filter(job =>
            selectedSkills.every(skill => job.skills.includes(skill))
        );
        setFilteredJobs(filtered);
    };
    const navigate = useNavigate()
    const handleLogout = () => {
        window.localStorage.clear()
        navigate("/login")
    }
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div className={styles.headerContent}>
                    <h1 className={styles.logo}>Jobfinder</h1>
                    <div className={styles.headerButtons}>
                        {window.localStorage.token ? <><p>User</p>
                            <button
                                onClick={handleLogout}
                                className={styles.skillsButton}>Logout</button>
                        </> : <>
                            <Link to="/login" className={styles.loginButton}>Login</Link>
                            <Link to="/register" className={styles.registerButton}>Register</Link>
                        </>}

                    </div>
                </div>
            </header>

            <main className={styles.main}>
                <div className={styles.searchContainer}>
                    <div className={styles.searchBox}>
                        <input
                            type="text"
                            placeholder="Type any job title"
                            className={styles.searchInput}
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                    </div>

                    <div className={styles.filterSection}>
                        <div className={styles.skillsDropdown}>
                            <button
                                className={styles.skillsButton}
                                onClick={() => document.getElementById('skillsMenu').classList.toggle(styles.show)}
                            >
                                Skills <span>▼</span>
                            </button>
                            <div id="skillsMenu" className={styles.dropdownContent}>
                                {availableSkills.map(skill => (
                                    <div key={skill} className={styles.skillItem}>
                                        <label className={styles.skillLabel}>
                                            <input
                                                type="checkbox"
                                                checked={selectedSkills.includes(skill)}
                                                onChange={() => toggleSkill(skill)}
                                                className={styles.skillCheckbox}
                                            />
                                            {skill}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className={styles.selectedFilters}>
                            {selectedSkills.map(skill => (
                                <div key={skill} className={styles.filterTag}>
                                    {skill}
                                    <button
                                        onClick={() => toggleSkill(skill)}
                                        className={styles.removeFilter}
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className={styles.filterButtons}>
                            <button onClick={applyFilter} className={styles.applyButton}>Apply Filter</button>
                            <button onClick={clearFilters} className={styles.clearButton}>Clear</button>
                        </div>
                    </div>
                </div>

                <div className={styles.jobListings}>
                    {filteredJobs.map(job => (
                        <div key={job.id} className={styles.jobCard}>
                            <div className={styles.jobCardLeft}>
                                <div className={styles.companyLogo}>
                                    <img src={job.logo} alt={`${job.company} logo`} />
                                </div>
                            </div>

                            <div className={styles.jobCardMiddle}>
                                <h3 className={styles.jobPosition}>{job.position}</h3>
                                <div className={styles.jobDetails}>
                                    <div className={styles.detailItem}>
                                        <span className={styles.detailIcon}>👥</span>
                                        <span>{job.employeeCount}</span>
                                    </div>
                                    <div className={styles.detailItem}>
                                        <span className={styles.detailIcon}>💰</span>
                                        <span>₹ {job.salary}</span>
                                    </div>
                                    <div className={styles.detailItem}>
                                        <span className={styles.detailIcon}>📍</span>
                                        <span>{job.location}</span>
                                    </div>
                                </div>

                                <div className={styles.jobTypeInfo}>
                                    <span className={styles.jobTypeTag}>{job.workType}</span>
                                    <span className={styles.jobTypeTag}>{job.jobType}</span>
                                </div>

                                <div className={styles.skillTags}>
                                    {job.skills.map(skill => (
                                        <span key={skill} className={styles.skillTag}>{skill}</span>
                                    ))}
                                </div>
                            </div>

                            <div className={styles.jobCardRight}>
                                <Link to={`/jobs/${job.id}`} className={styles.viewDetailsButton}>View details</Link>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}