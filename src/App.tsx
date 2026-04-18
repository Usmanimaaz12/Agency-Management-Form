import { useState } from "react";
import "./App.css";
import Button from "./components/ui/Button";
import Input from "./components/ui/Input";
import type { IAgency } from "./types/agency";
import AgencyTabs from "./components/agency/AgencyTabs";
import POCForm from "./components/poc/POCForm";
import Tabs from "./components/poc/Tabs";

const initialAgency: IAgency = {
  id: 1,
  agencyName: "Agency One",
  agencyType: "AOR",
  completionDate: "2026-04",
  notes: "This is a note for Agency One.",
  pocs: [
    {
      id: 1,
      name: "John Doe",
      namePrefix: "Mr.",
      email: "john.doe@example.com",
      countryCode: "+91",
      phoneNumber: 1234567890,
    },
  ],
};

function App() {
  const storedAgencies = localStorage.getItem("agencies");
  const [agencies, setAgencies] = useState<IAgency[]>(
    storedAgencies ? JSON.parse(storedAgencies) : [{ ...initialAgency }],
  );
  const [isOpen, setIsOpen] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isPOCExpanded, setIsPOCExpanded] = useState<boolean>(true);

  const [activeAgencyIndex, setActiveAgencyIndex] = useState<number>(0);
  const [activePOCIndex, setActivePOCIndex] = useState<number>(0);

  const activeAgency = agencies[activeAgencyIndex];
  const activePOC = activeAgency.pocs[activePOCIndex];

  const updateActiveAgency = (updates: Partial<IAgency>) => {
    const newAgencies = [...agencies];
    newAgencies[activeAgencyIndex] = {
      ...newAgencies[activeAgencyIndex],
      ...updates,
    };
    setAgencies(newAgencies);
  };

  const updateActivePOC = (updates: Partial<IPOC>) => {
    const newAgencies = [...agencies];
    newAgencies[activeAgencyIndex] = {
      ...newAgencies[activeAgencyIndex],
      pocs: [...newAgencies[activeAgencyIndex].pocs],
    };
    newAgencies[activeAgencyIndex].pocs[activePOCIndex] = {
      ...newAgencies[activeAgencyIndex].pocs[activePOCIndex],
      ...updates,
    };
    setAgencies(newAgencies);
  };

  const addAgency = () => {
    const newAgency: IAgency = {
      id: Math.random() * 1000, // Simple random ID generator
      agencyName: ``,
      agencyType: "AOR",
      completionDate: "2026-04",
      notes: "",
      pocs: [],
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
  };

  const removePOC = (index: number) => {
    const newAgencies = [...agencies];
    newAgencies[activeAgencyIndex] = {
      ...newAgencies[activeAgencyIndex],
      pocs: newAgencies[activeAgencyIndex].pocs.filter((_, i) => i !== index),
    };
    setAgencies(newAgencies);
    if (activePOCIndex >= newAgencies[activeAgencyIndex].pocs.length) {
      setActivePOCIndex(newAgencies[activeAgencyIndex].pocs.length - 1);
    }
    setErrors({});
  };

  const addPOC = () => {
    const newPOC: IPOC = {
      id: Math.random() * 1000, // Simple random ID generator
      namePrefix: "Mr.",
      name: `POC ${activeAgency.pocs.length + 1}`,
      email: "",
      countryCode: "",
      phoneNumber: undefined,
    };
    const newAgencies = [...agencies];
    newAgencies[activeAgencyIndex] = {
      ...newAgencies[activeAgencyIndex],
      pocs: [...newAgencies[activeAgencyIndex].pocs, newPOC],
    };
    setAgencies(newAgencies);
    setActivePOCIndex(activeAgency.pocs.length);
    setErrors({});
  };

  const isError = Object.keys(errors).length > 0;
  const hasChanges = JSON.stringify(agencies) !== storedAgencies;

  const handleSave = () => {
    const errs = validateAgency(activeAgency);
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      localStorage.setItem("agencies", JSON.stringify(agencies));
      setIsOpen(false);
    }
  };

  const validateAgency = (agency: IAgency) => {
    const errors: { [key: string]: string } = {};
    if (!agency.agencyName.trim()) {
      errors.agencyName = "Agency Name is required.";
    } else if (agency.agencyName.length < 2 || agency.agencyName.length > 50) {
      errors.agencyName = "Agency Name must be between 2 and 50 characters.";
    } else if (
      agencies.some(
        (a, index) =>
          a.agencyName === agency.agencyName && index !== activeAgencyIndex,
      )
    ) {
      errors.agencyName = "Agency Name must be unique.";
    }

    if (!agency.agencyType) {
      errors.agencyType = "Agency Type is required.";
    }

    const completionDate = new Date(agency.completionDate + "-01");
    const today = new Date();

    if (!agency.completionDate) {
      errors.completionDate = "Completion Date is required.";
    } else if (
      completionDate < new Date(today.getFullYear(), today.getMonth(), 1)
    ) {
      errors.completionDate = "Completion Date cannot be in the past.";
    }

    if (agency.notes.length > 250 || agency.notes.length < 10) {
      errors.notes = "Notes must be between 10 and 250 characters.";
    }

    return errors;
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
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-h-[90vh] overflow-y-scroll bg-black text-gray-200 flex items-start flex-col gap-6 p-4 max-w-2xl border-0 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Agency Details</h2>

        <div
          className={`${isError ? "border-2 border-red-500 rounded-sm" : ""} w-max-content `}
        >
          <AgencyTabs
            agencies={agencies}
            activeIndex={activeAgencyIndex}
            OnSelect={(index) => setActiveAgencyIndex(index)}
            OnAdd={addAgency}
            OnRemove={removeAgency}
          />
        </div>

        {/*  Form */}
        {/* Agency Name, agency Type, completion Date, notes */}

        <Input
          label="Agency Name"
          value={activeAgency.agencyName}
          onChange={(e) => updateActiveAgency({ agencyName: e.target.value })}
          error={errors.agencyName}
          className="w-full"
          required
        />

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-300">
            Agency Type *
          </label>
          <div className="flex gap-2 flex-wrap">
            {" "}
            {[
              "AOR",
              "PERFORMANCE MARKETING",
              "SOCIAL MEDIA MARKETING",
              "OTHERS",
            ].map((type) => (
              <label key={type} className="inline-flex items-center mr-4">
                <Button
                  key={type}
                  onClick={() =>
                    updateActiveAgency({ agencyType: type as any })
                  }
                  variant={
                    activeAgency.agencyType !== type ? "primary" : "secondary"
                  }
                >
                  {type}
                </Button>
              </label>
            ))}
          </div>
        </div>

        <Input
          label="Completion Date"
          type="month"
          value={activeAgency.completionDate || ""}
          onChange={(e) =>
            updateActiveAgency({ completionDate: e.target.value })
          }
          error={errors.completionDate}
          required
        />

        <div className="w-full space-y-2 bg-gray-700 text-white border border-gray-200 rounded-lg px-4 py-3 focus:outline-none">
          <label className="block mb-2 text-sm font-medium text-gray-300">
            Notes
          </label>
          <textarea
            rows={4}
            value={activeAgency.notes}
            onChange={(e) => updateActiveAgency({ notes: e.target.value })}
            placeholder="Additional notes about the agency..."
            className="w-full"
          />
          {errors.notes && (
            <p className="mt-2 text-sm text-red-600">{errors.notes}</p>
          )}
        </div>

        <div>
          <button onClick={() => setIsPOCExpanded(!isPOCExpanded)}>
            {/* need to show arrows */}
            {isPOCExpanded ? "Hide POCs" : "Show POCs"}
          </button>
        </div>
        {isPOCExpanded && (
          <>
            <div
              className={`${isError ? "border-2 border-red-500 rounded-sm" : ""} w-max-content `}
            >
              <Tabs
                pocs={activeAgency.pocs}
                activeIndex={activePOCIndex}
                onSelect={setActivePOCIndex}
                onAdd={addPOC}
                onRemove={removePOC}
              />
            </div>
            {activePOC && (
              <POCForm poc={activePOC} onChange={updateActivePOC} />
            )}
          </>
        )}

        <div className="flex gap-2 w-full">
          <Button
            onClick={() => setIsOpen(false)}
            variant="secondary"
            className="w-full"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            variant="success"
            disabled={!hasChanges}
            className="w-full"
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}

export default App;
