import dotenv from 'dotenv';
import app from './app.js';
import connectDB from './db/index.js';
import Bytez from "bytez.js"
import AiPower from './utils/AiPower.js';

dotenv.config()

const port = process.env.PORT || 5000

connectDB()
.then(( ) => {

    app.get('/', async(req, res) => {
      const { error, output } = await AiPower("a random quote in 4 words about backend development and server side programming in a format of h4 tag with a random color witout any dark color and add a animation. and remove ```html ```")

      if(error){
        return res.send("Error fetching quote");
      }

      const htmlPage = `<!DOCTYPE html>
            <html lang="en">
            <head>
              <meta charset="UTF-8" />
              <title>ProfilesView API</title>
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />

              <style>
                :root {
                  --bg: #0b0f14;
                  --card: #111827;
                  --primary: #ff8225;
                  --secondary: #1f2937;
                  --text: #e5e7eb;
                  --muted: #9ca3af;
                  --success: #22c55e;
                }

                * {
                  margin: 0;
                  padding: 0;
                  box-sizing: border-box;
                  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont;
                }

                body {
                  background: radial-gradient(circle at top, #0f172a, var(--bg));
                  color: var(--text);
                  min-height: 100vh;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  padding: 24px;
                }

                .container {
                  max-width: 900px;
                  width: 100%;
                  background: linear-gradient(180deg, #0b1220, #020617);
                  border-radius: 18px;
                  padding: 40px;
                  border: 1px solid #1f2937;
                  box-shadow: 0 30px 80px rgba(0,0,0,0.6);
                }

                .badge {
                  display: inline-block;
                  padding: 6px 12px;
                  border-radius: 999px;
                  font-size: 12px;
                  font-weight: 600;
                  background: rgba(255,130,37,0.15);
                  color: var(--primary);
                  border: 1px solid rgba(255,130,37,0.3);
                  margin-bottom: 16px;
                }

                h1 {
                  font-size: 38px;
                  font-weight: 800;
                  letter-spacing: -0.5px;
                  margin-bottom: 10px;
                }

                h1 span {
                  color: var(--primary);
                }

                p {
                  color: var(--muted);
                  line-height: 1.7;
                  margin-bottom: 28px;
                  max-width: 700px;
                }

                .grid {
                  display: grid;
                  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
                  gap: 18px;
                  margin-bottom: 32px;
                }

                .card {
                  background: linear-gradient(180deg, #020617, #020617);
                  border: 1px solid #1f2937;
                  border-radius: 14px;
                  padding: 20px;
                  transition: transform 0.25s ease, border 0.25s ease;
                }

                .card:hover {
                  transform: translateY(-4px);
                  border-color: var(--primary);
                }

                .card h3 {
                  font-size: 16px;
                  margin-bottom: 8px;
                  color: #f9fafb;
                }

                .card p {
                  font-size: 14px;
                  margin: 0;
                  color: var(--muted);
                }

                .status {
                  display: flex;
                  align-items: center;
                  gap: 10px;
                  margin-top: 30px;
                  padding: 14px 18px;
                  border-radius: 12px;
                  background: rgba(34,197,94,0.12);
                  border: 1px solid rgba(34,197,94,0.3);
                  color: var(--success);
                  font-weight: 600;
                }

                footer {
                  margin-top: 36px;
                  padding-top: 20px;
                  border-top: 1px dashed #1f2937;
                  display: flex;
                  flex-wrap: wrap;
                  justify-content: space-between;
                  gap: 12px;
                  font-size: 13px;
                  color: var(--muted);
                }

                footer span {
                  color: var(--primary);
                  font-weight: 600;
                }

                @media (max-width: 600px) {
                  h1 {
                    font-size: 28px;
                  }
                  .container {
                    padding: 28px;
                  }
                }
              </style>
            </head>

            <body>
              <main class="container">
                <div class="badge">Backend Service</div>

                <h1>Profiles<span>View</span> API</h1>
                ${output.content}
                <p>
                  A developer-focused backend powering ProfilesView —  
                  a platform to share social profiles, coding identities, projects, and analytics  
                  through a single public profile.
                </p>

                <section class="grid">
                  <div class="card">
                    <h3>Authentication</h3>
                    <p>Secure user auth, account status control, and session handling.</p>
                  </div>

                  <div class="card">
                    <h3>Profiles</h3>
                    <p>Public developer profiles with SEO-friendly usernames and slugs.</p>
                  </div>

                  <div class="card">
                    <h3>Projects</h3>
                    <p>Showcase coding projects with tech stack, links, and stats.</p>
                  </div>

                  <div class="card">
                    <h3>Analytics</h3>
                    <p>Profile views, project views, link clicks, and traffic sources.</p>
                  </div>

                  <div class="card">
                    <h3>Connections</h3>
                    <p>Follow system for creators, developers, and collaborators.</p>
                  </div>

                  <div class="card">
                    <h3>Security</h3>
                    <p>Soft delete, rate limiting, abuse protection, and privacy-first design.</p>
                  </div>
                </section>

                <div class="status">
                  ● API Status: Online & Operational
                </div>

                <footer>
                  <div>
                    © <span>ProfilesView</span> • Backend Service
                  </div>
                  <div>
                    Built for developers • Designed for scale
                  </div>
                </footer>
              </main>
            </body>
            </html>`
      res.send(htmlPage);
    
    })

    app.post('/assistant', async(req, res) => {

      const { error, output } = await AiPower(req.body.message);
      
      console.log({reply: output.content});
      res.send({reply: output.content});
    })

    app.listen(port, () => {
        console.log(`Server is running on port: ${port}`);
    });
})
.catch((error) => {
    console.error(`Failed to connect to the database: ${error.message}`);
    process.exit(1);
});