import { useState } from "react";
import "./App.css";
import Button from "./components/ui/Button";
import Input from "./components/ui/Input";
import type { IAgency } from "./types/agency";
import AgencyTabs from "./components/agency/AgencyTabs";
import POCForm from "./components/poc/POCForm";
import Tabs from "./components/poc/Tabs";

const initialAgency: IAgency = 
  {
    id: 1,
    agencyName: "Agency One",
    agencyType: "AOR",
    completionDate: new Date("2026-04"),
    notes: "This is a note for Agency One.",
    pocs: [
      {
        id: 1,
        name: "John Doe",
        namePrefix: "Mr.",
        email: "john.doe@example.com",
        countryCode: "+91",
        phoneNumber: 1234567890
      }
    ]
  };

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [agencies, setAgencies] = useState<IAgency[]>([{ ...initialAgency }]);
  const [isPOCExpanded, setIsPOCExpanded] = useState<boolean>(true);

  const [activeAgencyIndex, setActiveAgencyIndex] = useState<number>(0);
  const [activePOCIndex, setActivePOCIndex] = useState<number>(0);


  const activeAgency = agencies[activeAgencyIndex];
  const activePOC = activeAgency.pocs[activePOCIndex];


  const updateActiveAgency = (updates: Partial<IAgency>) => {
    const newAgencies = [...agencies];
    newAgencies[activeAgencyIndex] = { ...newAgencies[activeAgencyIndex], ...updates };
    setAgencies(newAgencies);
  };

  const updateActivePOC = (updates: Partial<IPOC>) => {
    const newAgencies = [...agencies];
    newAgencies[activeAgencyIndex] = { ...newAgencies[activeAgencyIndex], pocs: [...newAgencies[activeAgencyIndex].pocs] };
    newAgencies[activeAgencyIndex].pocs[activePOCIndex] = { ...newAgencies[activeAgencyIndex].pocs[activePOCIndex], ...updates };
    setAgencies(newAgencies);
  };

  const addAgency = () => {
    const newAgency: IAgency = {
      id: Math.random() * 1000, // Simple random ID generator
      agencyName: `Agency ${agencies.length + 1}`,
      agencyType: "AOR",
      completionDate: new Date(),
      notes: "",
      pocs: []
    };
    setAgencies([...agencies, newAgency]);
    setActiveAgencyIndex(agencies.length); 
    setActivePOCIndex(0);
    setErrors({});
  };

  const removeAgency = (index: number) => {
    const newAgencies = agencies.filter((_, i) => i !== index);
    setAgencies(newAgencies);
    if (activeAgencyIndex >= newAgencies.length) {
      setActiveAgencyIndex(newAgencies.length - 1);
    }
    setActivePOCIndex(0);
    setErrors({});
  }

  const removePOC = (index: number) => {
    const newAgencies = [...agencies];
    newAgencies[activeAgencyIndex] = { ...newAgencies[activeAgencyIndex], pocs: newAgencies[activeAgencyIndex].pocs.filter((_, i) => i !== index) };
    setAgencies(newAgencies);
    if (activePOCIndex >= newAgencies[activeAgencyIndex].pocs.length) {
      setActivePOCIndex(newAgencies[activeAgencyIndex].pocs.length - 1);
    }
    setErrors({});
  }

  const addPOC = () => {
    const newPOC: IPOC = {
      id: Math.random() * 1000, // Simple random ID generator
      namePrefix: "Mr.",
      name: `POC ${activeAgency.pocs.length + 1}`,
      email: "",
      countryCode: "",
      phoneNumber: undefined
    };
    const newAgencies = [...agencies];
    newAgencies[activeAgencyIndex] = { ...newAgencies[activeAgencyIndex], pocs: [...newAgencies[activeAgencyIndex].pocs, newPOC] };
    setAgencies(newAgencies);
    setActivePOCIndex(activeAgency.pocs.length);
    setErrors({});
  };

  if (isOpen) {
    return (
      <div>
        <h2>Click to Open Modal</h2>
        <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-gray-200 flex items-start justify-start flex-col gap-6 p-4"> 
      <div className="w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Agency Details</h2>
      </div>

      <AgencyTabs
        agencies={agencies}
        activeIndex={activeAgencyIndex}
        OnSelect={(index) => setActiveAgencyIndex(index)}
        OnAdd={addAgency}
        OnRemove={removeAgency}
      />


      {/*  Form */}
      {/* Agency Name, agency Type, completion Date, notes */}
      
      <Input
        label="Agency Name"
        value={activeAgency.agencyName}
        onChange={(e) => updateActiveAgency({ agencyName: e.target.value })}
        error={errors.agencyName}
        required
      />

      <div>
        <label className="block mb-2 text-sm font-medium text-gray-300">Agency Type *</label>
        {["AOR", "PERFORMANCE MARKETING", "SOCIAL MEDIA MARKETING", "OTHERS"].map((type) => (
          <label key={type} className="inline-flex items-center mr-4">
            <Button key={type} onClick={() => updateActiveAgency({ agencyType: type as any })} variant={activeAgency.agencyType !== type ? "primary" : "secondary"}>
              {type}
            </Button>
          </label>
        ))}
      </div>

      <Input
        label="Completion Date"
        type="month"
        value={activeAgency.completionDate.toISOString().split("T")[0]}
        onChange={(e) => updateActiveAgency({ completionDate: new Date(e.target.value) })}
        error={errors.completionDate}
        required
      />

      <div className="space-y-2 bg-gray-700 text-white border border-gray-200 rounded-lg px-4 py-3 focus:outline-none">

      <label className="block mb-2 text-sm font-medium text-gray-300">Notes</label>
      <textarea
        rows={4}
        value={activeAgency.notes}
        onChange={(e) => updateActiveAgency({ notes: e.target.value })}
        placeholder="Additional"
        />
        </div>
      

      <div>
        <button onClick={() => setIsPOCExpanded(!isPOCExpanded)}>
          {/* need to show arrows */}
          {isPOCExpanded ? "Hide POCs" : "Show POCs"}
        </button>
      </div>
      {
        isPOCExpanded && (
          <>
            <Tabs
            pocs={activeAgency.pocs}
            activeIndex={activePOCIndex}
            onSelect={setActivePOCIndex}
            onAdd={addPOC}
            onRemove={removePOC}
          />
            {
        activePOC && ( <POCForm poc={activePOC} onChange={updateActivePOC} />)
     }
          </>

          )}
      
      <div>
        <Button onClick={() => setIsOpen(false)}>Cancel</Button>
        <Button onClick={() => { /* handle save logic here */ }} variant="success">Save</Button>
      </div>
      

    </div>
  );
}

export default App;
