

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Button, Modal, Box, TextField, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
// import '../styles/tailwind.css';

// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 400,
//   bgcolor: "background.paper",
//   p: 4,
// };

// const CampaignsPage = () => {
//   const [campaigns, setCampaigns] = useState([]);
//   const [agents, setAgents] = useState([]);
//   const [newCampaign, setNewCampaign] = useState({
//     campaign_name: "",
//     agent: "",
//     status: "Active",
//   });
//   const [openModal, setOpenModal] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [selectedCampaign, setSelectedCampaign] = useState(null);

//   // Fetch campaigns and agents
//   useEffect(() => {
//     // Fetch campaigns data
//     axios
//       .get("http://localhost:8000/api/campaigns/")
//       .then((response) => setCampaigns(response.data))
//       .catch((error) => console.error("Error fetching campaigns:", error));

//     // Fetch agents data
//     axios
//       .get("http://localhost:8000/api/agents/")
//       .then((response) => {
//         if (Array.isArray(response.data)) {
//           setAgents(response.data);
//         } else {
//           console.error("Invalid agents data:", response.data);
//           setAgents([]);
//         }
//       })
//       .catch((error) => console.error("Error fetching agents:", error));
//   }, []);

//   // Handle Add New Campaign
//   const handleAddCampaign = () => {
//     axios
//       .post("http://localhost:8000/api/campaigns/", newCampaign)
//       .then((response) => {
//         setCampaigns([...campaigns, response.data]);
//         setNewCampaign({ campaign_name: "", agent: "", status: "Active" });
//         setOpenModal(false);
//       })
//       .catch((error) => console.error("Error adding campaign:", error));
//   };

//   // Handle Edit Campaign
//   const handleEditCampaign = () => {
//     axios
//       .put(`http://localhost:8000/api/campaigns/${selectedCampaign.id}/`, newCampaign)
//       .then((response) => {
//         const updatedCampaigns = campaigns.map((campaign) =>
//           campaign.id === selectedCampaign.id ? response.data : campaign
//         );
//         setCampaigns(updatedCampaigns);
//         setOpenModal(false);
//         setIsEditing(false);
//         setNewCampaign({ campaign_name: "", agent: "", status: "Active" });
//       })
//       .catch((error) => console.error("Error editing campaign:", error));
//   };

//   // Handle Delete Campaign
//   const handleDeleteCampaign = (id) => {
//     axios
//       .delete(`http://localhost:8000/api/campaigns/${id}/`)
//       .then(() => {
//         setCampaigns(campaigns.filter((campaign) => campaign.id !== id));
//       })
//       .catch((error) => console.error("Error deleting campaign:", error));
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-6">Campaigns</h1>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
//         {/* All Campaigns */}
//         <div>
//           <h2 className="text-xl font-semibold mb-4">All Campaigns</h2>
//           <ul className="list-none p-0">
//             {Array.isArray(campaigns) && campaigns.length > 0 ? (
//               campaigns.map((campaign) => (
//                 <li key={campaign.id} className="border p-4 mb-2 rounded shadow">
//                   <h3 className="font-bold">{campaign.campaign_name}</h3>
//                   <p><strong>Status:</strong> {campaign.status}</p>
//                   <p><strong>Agent:</strong> {campaign.agent ? campaign.agent.agent_name : "No Agent Assigned"}</p>
//                   <div className="flex gap-2">
//                     <Button
//                       variant="contained"
//                       color="primary"
//                       onClick={() => {
//                         setIsEditing(true);
//                         setSelectedCampaign(campaign);
//                         setNewCampaign({
//                           campaign_name: campaign.campaign_name,
//                           agent: campaign.agent ? campaign.agent.id : "",
//                           status: campaign.status,
//                         });
//                         setOpenModal(true);
//                       }}
//                     >
//                       Edit
//                     </Button>
//                     <Button
//                       variant="contained"
//                       color="secondary"
//                       onClick={() => handleDeleteCampaign(campaign.id)}
//                     >
//                       Delete
//                     </Button>
//                   </div>
//                 </li>
//               ))
//             ) : (
//               <p>No campaigns available.</p>
//             )}
//           </ul>
//         </div>

//         {/* Add or Edit Campaign Form */}
//         <div>
//           <h2 className="text-xl font-semibold mb-4">{isEditing ? "Edit Campaign" : "Add Campaign"}</h2>
//           <Button variant="contained" color="primary" onClick={() => setOpenModal(true)}>
//             {isEditing ? "Edit Existing Campaign" : "Add New Campaign"}
//           </Button>
//         </div>
//       </div>

//       {/* Modal for Adding or Editing Campaign */}
//       <Modal open={openModal} onClose={() => setOpenModal(false)}>
//         <Box sx={style}>
//           <h2>{isEditing ? "Edit Campaign" : "Add Campaign"}</h2>
//           <TextField
//             label="Campaign Name"
//             value={newCampaign.campaign_name}
//             onChange={(e) => setNewCampaign({ ...newCampaign, campaign_name: e.target.value })}
//             fullWidth
//           />
//           <FormControl fullWidth className="mt-4">
//             <InputLabel>Agent</InputLabel>
//             <Select
//               value={newCampaign.agent}
//               onChange={(e) => setNewCampaign({ ...newCampaign, agent: e.target.value })}
//               disabled={agents.length === 0}  // Disable if no agents
//             >
//               {agents.length === 0 ? (
//                 <MenuItem disabled>No agents available</MenuItem>
//               ) : (
//                 agents.map((agent) => (
//                   <MenuItem key={agent.id} value={agent.id}>
//                     {agent.agent_name}
//                   </MenuItem>
//                 ))
//               )}
//             </Select>
//           </FormControl>
//           <TextField
//             label="Status"
//             value={newCampaign.status}
//             onChange={(e) => setNewCampaign({ ...newCampaign, status: e.target.value })}
//             fullWidth
//             className="mt-4"
//           />
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={isEditing ? handleEditCampaign : handleAddCampaign}
//             className="mt-4"
//           >
//             {isEditing ? "Save Changes" : "Add Campaign"}
//           </Button>
//         </Box>
//       </Modal>
//     </div>
//   );
// };

// export default CampaignsPage;


import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Modal, Box, TextField, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import '../styles/tailwind.css';

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  p: 4,
};

const CampaignsPage = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [agents, setAgents] = useState([]);
  const [newCampaign, setNewCampaign] = useState({
    campaign_name: "",
    agent: "",
    status: "Active",
  });
  const [openModal, setOpenModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);

  // Fetch campaigns and agents
  useEffect(() => {
    // Fetch campaigns data
    axios
      .get("http://localhost:8000/api/campaigns/")
      .then((response) => setCampaigns(response.data))
      .catch((error) => console.error("Error fetching campaigns:", error));

    // Fetch agents data
    axios
      .get("http://localhost:8000/api/agents/")
      .then((response) => {
        if (Array.isArray(response.data)) {
          setAgents(response.data);
        } else {
          console.error("Invalid agents data:", response.data);
          setAgents([]);
        }
      })
      .catch((error) => console.error("Error fetching agents:", error));
  }, []);

  // Handle Add New Campaign
  const handleAddCampaign = () => {
    axios
      .post("http://localhost:8000/api/campaigns/", newCampaign)
      .then((response) => {
        setCampaigns([...campaigns, response.data]);
        setNewCampaign({ campaign_name: "", agent: "", status: "Active" });
        setOpenModal(false);
      })
      .catch((error) => console.error("Error adding campaign:", error));
  };

  // Handle Edit Campaign
  const handleEditCampaign = () => {
    axios
      .put(`http://localhost:8000/api/campaigns/${selectedCampaign.id}/`, newCampaign)
      .then((response) => {
        const updatedCampaigns = campaigns.map((campaign) =>
          campaign.id === selectedCampaign.id ? response.data : campaign
        );
        setCampaigns(updatedCampaigns);
        setOpenModal(false);
        setIsEditing(false);
        setNewCampaign({ campaign_name: "", agent: "", status: "Active" });
      })
      .catch((error) => console.error("Error editing campaign:", error));
  };

  // Handle Delete Campaign
  const handleDeleteCampaign = (id) => {
    axios
      .delete(`http://localhost:8000/api/campaigns/${id}/`)
      .then(() => {
        setCampaigns(campaigns.filter((campaign) => campaign.id !== id));
      })
      .catch((error) => console.error("Error deleting campaign:", error));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Campaigns</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        {/* All Campaigns */}
        <div>
          <h2 className="text-xl font-semibold mb-4">All Campaigns</h2>
          <ul className="list-none p-0">
            {Array.isArray(campaigns) && campaigns.length > 0 ? (
              campaigns.map((campaign) => (
                <li key={campaign.id} className="border p-4 mb-2 rounded shadow">
                  <h3 className="font-bold">{campaign.campaign_name}</h3>
                  <p><strong>Status:</strong> {campaign.status}</p>
                  <p><strong>Agent:</strong> {campaign.agent ? campaign.agent.agent_name : "No Agent Assigned"}</p>
                  <div className="flex gap-2">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        setIsEditing(true);
                        setSelectedCampaign(campaign);
                        setNewCampaign({
                          campaign_name: campaign.campaign_name,
                          agent: campaign.agent ? campaign.agent.id : "",
                          status: campaign.status,
                        });
                        setOpenModal(true);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleDeleteCampaign(campaign.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </li>
              ))
            ) : (
              <p>No campaigns available.</p>
            )}
          </ul>
        </div>

        {/* Add or Edit Campaign Form */}
        <div>
          <h2 className="text-xl font-semibold mb-4">{isEditing ? "Edit Campaign" : "Add New Campaign"}</h2>
          <Button variant="contained" color="primary" onClick={() => setOpenModal(true)}>
            {isEditing ? "Edit Existing Campaign" : "Add New Campaign"}
          </Button>
        </div>
      </div>

      {/* Modal for Adding or Editing Campaign */}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box sx={style}>
          <h2 className="text-lg font-semibold mb-4">{isEditing ? "Edit Campaign" : "Add Campaign"}</h2>
          <TextField
            label="Campaign Name"
            value={newCampaign.campaign_name}
            onChange={(e) => setNewCampaign({ ...newCampaign, campaign_name: e.target.value })}
            fullWidth
            className="mb-4"
          />
          <FormControl fullWidth className="mb-4">
            <InputLabel>Agent</InputLabel>
            <Select
              value={newCampaign.agent}
              onChange={(e) => setNewCampaign({ ...newCampaign, agent: e.target.value })}
              disabled={agents.length === 0}  // Disable if no agents
            >
              {agents.length === 0 ? (
                <MenuItem disabled>No agents available</MenuItem>
              ) : (
                agents.map((agent) => (
                  <MenuItem key={agent.id} value={agent.id}>
                    {agent.agent_name}
                  </MenuItem>
                ))
              )}
            </Select>
          </FormControl>
          <TextField
            label="Status"
            value={newCampaign.status}
            onChange={(e) => setNewCampaign({ ...newCampaign, status: e.target.value })}
            fullWidth
            className="mb-4"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={isEditing ? handleEditCampaign : handleAddCampaign}
            fullWidth
          >
            {isEditing ? "Save Changes" : "Add Campaign"}
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default CampaignsPage;
