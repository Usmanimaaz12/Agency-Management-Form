import React from 'react'
import type { IPOC } from '../../types/agency'
import Button from '../ui/Button'

type TabsProps = {
    pocs: IPOC[],
    activeIndex: number,
    onSelect: (index: number) => void,
    onAdd: () => void,
    onRemove: (index: number) => void,
}
const Tabs = ({
    pocs,
    activeIndex,
    onSelect,
    onAdd,
    onRemove
}: TabsProps
) => {
  return (
    <div className='flex items-center gap-2 text-white'>
          {
              pocs.map((poc: IPOC, index: number) => (
                  <Button key={poc.id} variant={activeIndex === index ? "secondary" : "primary"} onClick={() => onSelect(index)}>
                      POC {index + 1}
                      {pocs.length > 1 && (
                          <span onClick={(e) => {
                              e.stopPropagation();
                              onRemove(index)
                          }} className='ml-2 text-red-500 cursor-pointer'>X</span>
                      )}
                  </Button>
              ))
              
          }
            <Button onClick={onAdd}>+ Add POC</Button>
    </div>
  )
}

export default Tabs
