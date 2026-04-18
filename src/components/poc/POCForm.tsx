import React from "react";
import type { IPOC } from "../../types/agency";
import Input from "../ui/Input";

type POCFormProps = {
  poc: IPOC;
  onChange: (updates: Partial<IPOC>) => void;
};
const POCForm = ({ poc, onChange }: POCFormProps) => {
  return (
    <>
      <div className="w-full">
        <label>POC Name *</label>
        <div className="flex gap-0 border border-gray-200 rounded-lg ">
          <div className="w-12 bg-gray-700 text-white border border-gray-200">
            <select
              value={poc.namePrefix}
              onChange={(e) => onChange({ namePrefix: e.target.value })}
            >
              <option value="">Select Name Prefix</option>
              <option value="Mr.">Mr.</option>
              <option value="Ms.">Ms.</option>
            </select>
          </div>
          <Input
            value={poc.name}
            onChange={(e) => onChange({ name: e.target.value })}
            placeholder="Enter POC Name"
            error={!poc.name ? "Name is required" : undefined}
            className="w-full"
            required
          />
        </div>
      </div>

      <Input
        label="Email"
        type="email"
        value={poc.email || ""}
        onChange={(e) => onChange({ email: e.target.value })}
        placeholder="Enter POC Email"
      />

      <div className="flex gap-2 w-full">
        <Input
          label="Country Code"
          value={poc.countryCode || ""}
          onChange={(e) => onChange({ countryCode: e.target.value })}
          placeholder="Country Code"
          className="w-12"
        />
        <Input
          label="Phone Number"
          type="number"
          value={poc.phoneNumber || ""}
          onChange={(e) => onChange({ phoneNumber: Number(e.target.value) })}
          placeholder="Phone Number"
          className="w-full"
        />
      </div>
    </>
  );
};

export default POCForm;
