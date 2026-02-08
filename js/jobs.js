
const jobList = document.getElementById("jobs");
const pagination = document.getElementById("pagination");

let currentPage = 1;
let totalPages = 22; // you can set this dynamically if API returns page_count

// Fetch and display jobs for a given page
async function fetchJobs(page) {
    const response = await fetch(
        `https://www.themuse.com/api/public/jobs?category=Software%20Engineering&page=${page}`
    );
    const data = await response.json();

    // Clear existing jobs
    jobList.innerHTML = "";

    data.results.forEach(job => {
        const col = document.createElement("div");
        col.className = "col-12 col-md-6 col-lg-4";

        col.innerHTML = `
                        <div class="card h-100">
                            <div class="card-body">
                            <h5 class="card-title">${job.name}</h5>
                            <h6 class="card-subtitle mb-2 text-muted">${job.company.name}</h6>
                            <p class="card-text">
                                Location: ${job.locations.length ? job.locations.map(l => l.name).join(", ") : "N/A"}
                            </p>
                            </div>
                        </div>
                        `;
        jobList.appendChild(col);
    });

    // Highlight current page in pagination
    updatePagination(page);
}

// Create pagination buttons
function createPagination(total) {
    pagination.innerHTML = "";

    for (let i = 1; i <= total; i++) {
        const li = document.createElement("li");
        li.className = `page-item ${i === currentPage ? "active" : ""}`;

        li.innerHTML = `<a class="page-link" href="#">${i}</a>`;

        li.addEventListener("click", (e) => {
            e.preventDefault();
            currentPage = i;
            fetchJobs(currentPage);
        });

        pagination.appendChild(li);
    }
}

// Update active page
function updatePagination(page) {
    const pages = pagination.querySelectorAll(".page-item");
    pages.forEach((li, index) => {
        li.classList.toggle("active", index + 1 === page);
    });
}

// Initialize
fetchJobs(currentPage);
createPagination(totalPages);





// // jobs.js - generates a list of job objects with company URLs
// (function(){
//     const companies = [
//         {name: 'Google', url: 'https://careers.google.com'},
//         {name: 'Microsoft', url: 'https://careers.microsoft.com'},
//         {name: 'Amazon', url: 'https://www.amazon.jobs'},
//         {name: 'Meta', url: 'https://www.metacareers.com'},
//         {name: 'Apple', url: 'https://www.apple.com/careers'},
//         {name: 'Netflix', url: 'https://jobs.netflix.com'},
//         {name: 'GitHub', url: 'https://github.com/about/careers'},
//         {name: 'GitLab', url: 'https://about.gitlab.com/jobs'},
//         {name: 'Automattic', url: 'https://automattic.com/work-with-us/'},
//         {name: 'Stripe', url: 'https://stripe.com/jobs'},
//         {name: 'Shopify', url: 'https://www.shopify.com/careers'},
//         {name: 'Atlassian', url: 'https://www.atlassian.com/company/careers'},
//         {name: 'Adobe', url: 'https://www.adobe.com/careers.html'},
//         {name: 'IBM', url: 'https://www.ibm.com/employment/'},
//         {name: 'Intel', url: 'https://jobs.intel.com'},
//         {name: 'Cisco', url: 'https://jobs.cisco.com'},
//         {name: 'Salesforce', url: 'https://www.salesforce.com/company/careers/'},
//         {name: 'Uber', url: 'https://www.uber.com/global/en/careers/'},
//         {name: 'Airbnb', url: 'https://careers.airbnb.com'},
//         {name: 'Zoom', url: 'https://careers.zoom.us'},
//         {name: 'Twilio', url: 'https://www.twilio.com/company/jobs'},
//         {name: 'Slack', url: 'https://slack.com/careers'},
//         {name: 'Notion', url: 'https://www.notion.so/careers'},
//         {name: 'Buffer', url: 'https://buffer.com/journey'},
//         {name: 'Zapier', url: 'https://zapier.com/jobs'},
//         {name: 'Basecamp', url: 'https://basecamp.com/about/jobs'},
//         {name: 'Toggl', url: 'https://toggl.com/jobs/'},
//         {name: 'Hotjar', url: 'https://careers.hotjar.com'},
//         {name: 'Red Hat', url: 'https://www.redhat.com/en/jobs'},
//         {name: 'Elastic', url: 'https://www.elastic.co/about/career-opportunities'},
//         {name: 'MongoDB', url: 'https://www.mongodb.com/careers'},
//         {name: 'PayPal', url: 'https://www.paypal.com/us/webapps/mpp/jobs'},
//         {name: 'Square', url: 'https://squareup.com/us/en/careers'},
//         {name: 'Coinbase', url: 'https://careers.coinbase.com'},
//         {name: 'LinkedIn', url: 'https://careers.linkedin.com'},
//         {name: 'Pinterest', url: 'https://careers.pinterest.com'},
//         {name: 'Snap', url: 'https://www.snap.com/en-US/jobs'},
//         {name: 'Spotify', url: 'https://www.spotifyjobs.com'},
//         {name: 'Dell', url: 'https://jobs.dell.com'},
//         {name: 'HP', url: 'https://jobs.hp.com'},
//         {name: 'Accenture', url: 'https://www.accenture.com/us-en/careers'},
//         {name: 'Capgemini', url: 'https://www.capgemini.com/careers/'},
//         {name: 'TCS', url: 'https://www.tcs.com/careers'},
//         {name: 'Infosys', url: 'https://www.infosys.com/careers'},
//         {name: 'Wipro', url: 'https://careers.wipro.com'},
//         {name: 'Cognizant', url: 'https://careers.cognizant.com'},
//         {name: 'Upwork', url: 'https://www.upwork.com/about/careers/'},
//         {name: 'Indeed', url: 'https://www.indeed.com/career'},
//         {name: 'Glassdoor', url: 'https://www.glassdoor.com/about/careers.htm'}
//     ];

//     const titles = [
//         'Frontend Developer','Backend Developer','Full Stack Engineer','Product Manager','Data Analyst',
//         'Data Scientist','UX Designer','UI Designer','Customer Success Manager','DevOps Engineer','QA Engineer',
//         'Mobile Engineer','Cloud Engineer','Site Reliability Engineer','Technical Writer','Marketing Manager',
//         'Sales Manager','Account Executive','HR Generalist','Recruiter'
//     ];

//     const locations = ['Remote','San Francisco, CA','New York, NY','London, UK','Berlin, Germany','Toronto, Canada','Remote - US','Remote - EU','Bangalore, India','Sydney, Australia'];
//     const types = ['Full-time','Part-time','Contract','Internship'];
//     const remotes = ['Remote','Hybrid','Onsite'];

//     // helper: random date within last N days
//     function randomDateWithin(days){
//         const now = Date.now();
//         const past = now - Math.floor(Math.random()*days*24*60*60*1000);
//         return new Date(past).toISOString();
//     }

//     // generate 120 job entries using companies and titles
//     const jobs = [];
//     for(let i=0;i<120;i++){
//         const comp = companies[i % companies.length];
//         const title = titles[i % titles.length];
//         const location = locations[i % locations.length];
//         const type = types[i % types.length];
//         const remote = remotes[i % remotes.length];
//         const id = i+1;
//         jobs.push({
//             id: id,
//             title: title,
//             company: comp.name,
//             companyUrl: comp.url,
//             // applyUrl points to a job-specific apply link (simulated)
//             applyUrl: comp.url.replace(/\/$/, '') + '/apply/' + id,
//             location: location,
//             type: type,
//             remote: remote,
//             datePosted: randomDateWithin(800), // up to ~2 years
//             description: `${title} at ${comp.name}. Work on real products, collaborate with distributed teams, and build scalable solutions.`
//         });
//     }

//     // expose to window
//     window.jobsData = jobs;
// })();
