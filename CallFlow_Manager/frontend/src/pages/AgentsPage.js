import React, { useEffect, useState } from "react";
import api from '../services/api'; // Import your API service
import '../styles/tailwind.css';







const AgentPage = () => {
    const [agents, setAgents] = useState([]); // Ensure it's initialized as an empty array
    const [newAgent, setNewAgent] = useState({
        name: '',
        email: '',
        phone: '',
        status: '',
    });

    useEffect(() => {
        // Fetch agents
        api.get('agents/')
            .then(response => {
                // Ensure the response data is an array
                if (Array.isArray(response.data)) {
                    setAgents(response.data);
                } else {
                    console.error('Invalid data format received from the API');
                }
            })
            .catch(error => console.error('Error fetching agents:', error));
    }, []);

    // Handle form input changes
    const handleChange = (e) => {
        setNewAgent({
            ...newAgent,
            [e.target.name]: e.target.value,
        });
    };

    // Handle form submission (create new agent)
    const handleSubmit = (e) => {
        e.preventDefault();
        api.post('agents/', newAgent)
            .then(response => {
                setAgents([...agents, response.data]);
                setNewAgent({
                    name: '',
                    email: '',
                    phone: '',
                    status: '',
                });
            })
            .catch(error => console.error('Error creating agent:', error));
    };

    // Handle delete operation for agents
    const handleDelete = (id) => {
        api.delete(`agents/${id}/`)
            .then(() => {
                setAgents(agents.filter(agent => agent.id !== id));
            })
            .catch(error => console.error('Error deleting agent:', error));
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold">Agents</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
                {/* All Agents */}
                <div>
                    <h2 className="text-xl font-semibold mb-4">All Agents</h2>
                    <ul className="list-none p-0">
                        {/* Check if agents is an array before using map */}
                        {Array.isArray(agents) && agents.length > 0 ? (
                            agents.map(agent => (
                                <li key={agent.id} className="border p-4 mb-2 rounded shadow">
                                    <h3 className="font-bold">{agent.name}</h3>
                                    <p><strong>Email:</strong> {agent.email}</p>
                                    <p><strong>Phone:</strong> {agent.phone}</p>
                                    <p><strong>Status:</strong> {agent.status}</p>
                                    <button
                                        className="bg-red-500 text-white px-4 py-2 rounded mt-2"
                                        onClick={() => handleDelete(agent.id)}
                                    >
                                        Delete
                                    </button>
                                </li>
                            ))
                        ) : (
                            <p>No agents available.</p>
                        )}
                    </ul>
                </div>

                {/* Create New Agent Form */}
                <div>
                    <h2 className="text-xl font-semibold mb-4">Create New Agent</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <ul className="list-none p-0 space-y-4">
                            <li>
                                <input
                                    type="text"
                                    name="name"
                                    value={newAgent.name}
                                    onChange={handleChange}
                                    placeholder="Agent Name"
                                    className="p-2 border border-gray-300 rounded w-full"
                                />
                            </li>
                            <li>
                                <input
                                    type="email"
                                    name="email"
                                    value={newAgent.email}
                                    onChange={handleChange}
                                    placeholder="Agent Email"
                                    className="p-2 border border-gray-300 rounded w-full"
                                />
                            </li>
                            <li>
                                <input
                                    type="text"
                                    name="phone"
                                    value={newAgent.phone}
                                    onChange={handleChange}
                                    placeholder="Agent Phone"
                                    className="p-2 border border-gray-300 rounded w-full"
                                />
                            </li>
                            <li>
                                <select
                                    name="status"
                                    value={newAgent.status}
                                    onChange={handleChange}
                                    className="p-2 border border-gray-300 rounded w-full"
                                >
                                    <option value="">Select Status</option>
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                </select>
                            </li>
                        </ul>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-6 py-2 rounded w-full"
                        >
                            Create Agent
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AgentPage;
