import React from 'react'
import type { IPOC } from '../../types/agency'
import Input from '../ui/Input'

type POCFormProps = {
    poc: IPOC,
    onChange: (updates: Partial<IPOC>) => void,
}
const POCForm = ({ poc, onChange }: POCFormProps) => {
  return (
      <div >
          <div>
              <label>POC Name *</label>
              <div className='flex gap-2'>
                  <div >
                      <select value={poc.namePrefix} onChange={(e) => onChange({ namePrefix: e.target.value })}>
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
          
          <div className='flex gap-2 space-y-2'>
              <Input
                  label="Country Code"    

                  value={poc.countryCode || ""}       
                  onChange={(e) => onChange({ countryCode: e.target.value })}
                  placeholder="Country Code"
              />  
              <Input  
                  label="Phone Number"    
                  type="number"   
                  value={poc.phoneNumber || ""}
                  onChange={(e) => onChange({ phoneNumber: Number(e.target.value) })}
                  placeholder="Phone Number"  
              />
          </div>
          
      
    </div>
  )
}

export default POCForm
