import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import styles from './jobDetail.module.css';

export default function JobDetail() {
    const { id } = useParams();

    // Mock data for job details
    const jobDetail = {
        id: 2,
        position: 'WordPress Development',
        company: 'Adyaka Infosec Private Limited',
        logo: 'https://cdn-icons-png.flaticon.com/512/174/174881.png',
        salary: '25,000',
        location: 'Bangalore, India',
        workType: 'Remote',
        jobType: 'Full Time',
        duration: '6 Months',
        employeeCount: '11-50',
        skills: ['CSS', 'HTML', 'WordPress'],
        aboutCompany: 'We provide technology-based services to help businesses and organizations achieve their goals. We offer a wide range of services, including software development, system integration, network and security services, cloud computing, and data analytics. Our primary focus is on leveraging technology to streamline business processes, improve productivity, and enhance overall efficiency.',
        jobDescription: 'We are looking for a responsible PHP/WordPress/Laravel/Shopify Developer. He/She will be liable for managing services and therefore the interchange of knowledge between the server and the users. The candidate\'s primary focus is going to be the event of all server-side logic, definition, and maintenance of the central database and ensuring high performance and responsiveness to requests from the front end.',
        responsibilities: [
            'Work on the development of theme customization, liquid programming language, and corresponding apps',
            'Implement system integrations that are crucial to our success',
            'Contribute to the development of HTML/CSS/JavaScript and standard web technologies integral to building seamless multi-channel experiences',
            'Work on speed optimization and making a mobile-friendly website'
        ],
        additionalInfo: 'Stipend structure: This is a performance-based internship. In addition to the minimum-assured stipend, you will also be paid a performance-linked incentive (₹ 2500 per design).'
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div className={styles.headerContent}>
                    <h1 className={styles.logo}>Jobfinder</h1>
                    <div className={styles.headerButtons}>
                        {window.localStorage.getItem("token") ? <>User</> : <> <Link to="/login" className={styles.loginButton}>Login</Link>
                            <Link to="/register" className={styles.registerButton}>Register</Link></>}

                    </div>
                </div>
            </header>

            <main className={styles.main}>
                <div className={styles.jobDetailCard}>
                    <div className={styles.jobHeader}>
                        <div className={styles.companyLogo}>
                            <img src={jobDetail.logo} alt={`${jobDetail.company} logo`} />
                        </div>
                        <div className={styles.jobTitleSection}>
                            <h1 className={styles.jobTitle}>{jobDetail.position}</h1>
                            <p className={styles.companyName}>{jobDetail.company}</p>
                        </div>
                    </div>

                    <div className={styles.jobInfo}>
                        <div className={styles.infoItem}>
                            <span className={styles.infoIcon}>💰</span>
                            <div className={styles.infoContent}>
                                <span className={styles.infoLabel}>Stipend</span>
                                <span className={styles.infoValue}>₹ {jobDetail.salary}/month</span>
                            </div>
                        </div>
                        <div className={styles.infoItem}>
                            <span className={styles.infoIcon}>⏱️</span>
                            <div className={styles.infoContent}>
                                <span className={styles.infoLabel}>Duration</span>
                                <span className={styles.infoValue}>{jobDetail.duration}</span>
                            </div>
                        </div>
                        <div className={styles.infoItem}>
                            <span className={styles.infoIcon}>📍</span>
                            <div className={styles.infoContent}>
                                <span className={styles.infoLabel}>Location</span>
                                <span className={styles.infoValue}>{jobDetail.location}</span>
                            </div>
                        </div>
                    </div>

                    <div className={styles.jobTypeInfo}>
                        <span className={styles.jobTypeTag}>{jobDetail.workType}</span>
                        <span className={styles.jobTypeTag}>{jobDetail.jobType}</span>
                    </div>

                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>About company</h2>
                        <p className={styles.sectionText}>{jobDetail.aboutCompany}</p>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>About the job/internship</h2>
                        <p className={styles.sectionText}>{jobDetail.jobDescription}</p>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Skill(s) required</h2>
                        <div className={styles.skillTags}>
                            {jobDetail.skills.map(skill => (
                                <span key={skill} className={styles.skillTag}>{skill}</span>
                            ))}
                        </div>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Selected intern's day-to-day responsibilities include:</h2>
                        <ul className={styles.responsibilitiesList}>
                            {jobDetail.responsibilities.map((responsibility, index) => (
                                <li key={index} className={styles.responsibilityItem}>{responsibility}</li>
                            ))}
                        </ul>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Additional Information</h2>
                        <p className={styles.sectionText}>{jobDetail.additionalInfo}</p>
                    </section>
                </div>
            </main>
        </div>
    );
}