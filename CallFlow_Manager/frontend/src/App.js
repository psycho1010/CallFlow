import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AgentsPage from "./pages/AgentsPage";
import CampaignsPage from "./pages/CampaignsPage";
import CampaignResultPage from './pages/CampaignResultPage';

function App() {
    return (
        <Router>
            <div>
                <nav>
                    <a href="/agents">Agents</a> | <a href="/campaigns">Campaigns</a> | <a href="/campaign-results">Campaign Results</a>
                </nav>
                <Routes>
                    <Route path="/agents" element={<AgentsPage />} />
                    <Route path="/campaigns" element={<CampaignsPage />} />
                    <Route path="/campaign-results" element={<CampaignResultPage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
