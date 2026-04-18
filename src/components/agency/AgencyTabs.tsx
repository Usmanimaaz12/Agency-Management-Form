import React from 'react'
import type { IAgency } from '../../types/agency'
import Button from '../ui/Button'
type AgencyTabsProps = {
    agencies: any[],
    activeIndex: number,
    OnSelect: (index: number) => void,
    OnAdd: () => void,
    OnRemove: (index: number) => void,
}
const AgencyTabs = ({
    agencies,
    activeIndex,
    OnSelect,
    OnAdd,
    OnRemove
}: AgencyTabsProps) => {
    console.log("🚀 ~ AgencyTabs ~ agencies:", agencies)
  return (
      <div className='flex items-center gap-2 text-white'>
          {agencies.map((agency : IAgency, index:number) => (
              <div key={agency.id} >
                  <Button variant={activeIndex === index ? "secondary" : "primary"} onClick={() => OnSelect(index)}>
                      AGENCY {index + 1}
                      {agencies.length > 1 && (
                          <span onClick={(e) => {
                                e.stopPropagation();
                              OnRemove(index)
                          }} className='ml-2 text-red-500 cursor-pointer'>X</span>
                      )}
                  </Button>
                  
              </div>
          ))}
          <Button onClick={OnAdd}>+ Add Agency</Button>
    </div>
  )
}

export default AgencyTabs
