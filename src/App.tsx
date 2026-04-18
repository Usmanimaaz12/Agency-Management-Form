import { useState } from "react";
import "./App.css";
import Button from "./components/ui/Button";
import Input from "./components/ui/Input";
import type { IAgency } from "./types/agency";
import AgencyTabs from "./components/agency/AgencyTabs";

const initialAgency: IAgency = 
  {
    id: 1,
    agencyName: "Agency One",
    agencyType: "AOR",
    completionDate: new Date("2024-12-31"),
    notes: "This is a note for Agency One.",
    pocs: [
      {
        id: 1,
        name: "John Doe",
        gender: "Male",
        email: "john.doe@example.com",
        countryCode: "US",
        phoneNumber: 1234567890
      }
    ]
  };

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [agencies, setAgencies] = useState<IAgency[]>([{ ...initialAgency }]);

  const [activeAgencyIndex, setActiveAgencyIndex] = useState<number>(0);
  const [activePOCIndex, setActivePOCIndex] = useState<number>(0);


  const activeAgency = agencies[activeAgencyIndex];
  const activePOC = activeAgency.pocs[activePOCIndex];


  const updateActiveAgency = (updates: Partial<IAgency>) => {
    const newAgencies = [...agencies];
    newAgencies[activeAgencyIndex] = { ...newAgencies[activeAgencyIndex], ...updates };
    setAgencies(newAgencies);
  };
  const updateActivePOC = (updates: Partial<IAgency>) => {
    const newAgencies = [...agencies];
    newAgencies[activeAgencyIndex] = { ...newAgencies[activeAgencyIndex], ...updates };
    setAgencies(newAgencies);
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
    <div className="min-h-screen bg-black text-gray-200 flex items-center justify-center"> 
      <div className="w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Agency Details</h2>
      </div>

      <AgencyTabs
        agencies={agencies}
        activeIndex={activeAgencyIndex}
        OnSelect={(index) => setActiveAgencyIndex(index)}
        OnAdd={() => {
          console.log("Add Agency");
        }}
        OnRemove={(index) => {
          console.log("Remove Agency", index);
        }}
      />

    </div>
  );
}

export default App;
