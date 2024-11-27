import React, { useEffect, useState } from 'react';
import api from '../services/api';
import '../styles/tailwind.css';

const CampaignResultPage = () => {
    const [campaignResults, setCampaignResults] = useState([]);
    const [campaigns, setCampaigns] = useState([]);
    const [newResult, setNewResult] = useState({
        name: '',
        type: '',
        phone: '',
        cost: '',
        outcome: '',
        call_duration: '',
        recording: '',
        summary: '',
        transcription: '',
        campaign: '',
    });

    useEffect(() => {
        // Fetch campaign results
        api.get('campaign-results/')
            .then(response => setCampaignResults(response.data))
            .catch(error => console.error('Error fetching campaign results:', error));

        // Fetch campaigns for the campaign selection
        api.get('campaigns/')
            .then(response => setCampaigns(response.data))
            .catch(error => console.error('Error fetching campaigns:', error));
    }, []);

    // Handle form input changes
    const handleChange = (e) => {
        setNewResult({
            ...newResult,
            [e.target.name]: e.target.value,
        });
    };

    // Handle form submission (create new result)
    const handleSubmit = (e) => {
        e.preventDefault();
        api.post('campaign-results/', newResult)
            .then(response => {
                setCampaignResults([...campaignResults, response.data]);
                setNewResult({
                    name: '',
                    type: '',
                    phone: '',
                    cost: '',
                    outcome: '',
                    call_duration: '',
                    recording: '',
                    summary: '',
                    transcription: '',
                    campaign: '',
                });
            })
            .catch(error => console.error('Error creating campaign result:', error));
    };

    // Handle delete operation for campaign results
    const handleDelete = (id) => {
        api.delete(`campaign-results/${id}/`)
            .then(() => {
                setCampaignResults(campaignResults.filter(result => result.id !== id));
            })
            .catch(error => console.error('Error deleting campaign result:', error));
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-8">Campaign Results</h1>

            <div className="flex space-x-8">
                {/* All Campaign Results */}
                <div className="w-1/2">
                    <h2 className="text-xl font-semibold mb-4">All Campaign Results</h2>
                    <ul className="list-none p-0">
                        {campaignResults.map(result => (
                            <li key={result.id} className="border p-4 mb-4 rounded shadow">
                                <h3 className="font-bold">{result.name}</h3>
                                <p><strong>Outcome:</strong> {result.outcome}</p>
                                <p><strong>Campaign:</strong> {result.campaign.campaign_name}</p>
                                <button 
                                    className="bg-red-500 text-white px-4 py-2 rounded mt-2"
                                    onClick={() => handleDelete(result.id)}
                                >
                                    Delete
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Create New Campaign Result Form */}
                <div className="w-1/2">
                    <h2 className="text-xl font-semibold mb-4">Create New Campaign Result</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <ul className="list-none p-0 space-y-4">
                            <li>
                                <input 
                                    type="text" 
                                    name="name"
                                    value={newResult.name}
                                    onChange={handleChange}
                                    placeholder="Campaign Result Name"
                                    className="p-2 border border-gray-300 rounded w-full"
                                />
                            </li>
                            <li>
                                <input 
                                    type="text" 
                                    name="type"
                                    value={newResult.type}
                                    onChange={handleChange}
                                    placeholder="Result Type"
                                    className="p-2 border border-gray-300 rounded w-full"
                                />
                            </li>
                            <li>
                                <input 
                                    type="text" 
                                    name="phone"
                                    value={newResult.phone}
                                    onChange={handleChange}
                                    placeholder="Phone Number"
                                    className="p-2 border border-gray-300 rounded w-full"
                                />
                            </li>
                            <li>
                                <input 
                                    type="number" 
                                    name="cost"
                                    value={newResult.cost}
                                    onChange={handleChange}
                                    placeholder="Cost"
                                    className="p-2 border border-gray-300 rounded w-full"
                                />
                            </li>
                            <li>
                                <input 
                                    type="text" 
                                    name="outcome"
                                    value={newResult.outcome}
                                    onChange={handleChange}
                                    placeholder="Outcome"
                                    className="p-2 border border-gray-300 rounded w-full"
                                />
                            </li>
                            <li>
                                <input 
                                    type="text" 
                                    name="call_duration"
                                    value={newResult.call_duration}
                                    onChange={handleChange}
                                    placeholder="Call Duration"
                                    className="p-2 border border-gray-300 rounded w-full"
                                />
                            </li>
                            <li>
                                <input 
                                    type="text" 
                                    name="recording"
                                    value={newResult.recording}
                                    onChange={handleChange}
                                    placeholder="Recording URL"
                                    className="p-2 border border-gray-300 rounded w-full"
                                />
                            </li>
                            <li>
                                <textarea 
                                    name="summary"
                                    value={newResult.summary}
                                    onChange={handleChange}
                                    placeholder="Summary"
                                    className="p-2 border border-gray-300 rounded w-full"
                                />
                            </li>
                            <li>
                                <textarea 
                                    name="transcription"
                                    value={newResult.transcription}
                                    onChange={handleChange}
                                    placeholder="Transcription"
                                    className="p-2 border border-gray-300 rounded w-full"
                                />
                            </li>
                            <li>
                                <select
                                    name="campaign"
                                    value={newResult.campaign}
                                    onChange={handleChange}
                                    className="p-2 border border-gray-300 rounded w-full"
                                >
                                    <option value="">Select Campaign</option>
                                    {campaigns.map(campaign => (
                                        <option key={campaign.id} value={campaign.id}>
                                            {campaign.campaign_name}
                                        </option>
                                    ))}
                                </select>
                            </li>
                        </ul>
                        <button 
                            type="submit"
                            className="bg-blue-500 text-white px-6 py-2 rounded w-full"
                        >
                            Create Campaign Result
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CampaignResultPage;
