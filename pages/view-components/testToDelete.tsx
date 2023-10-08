import React, { useState } from 'react'
import FilterDropDown from '@modules/marketplace/component/CustomerDashboard/FilterDropDown'

const TestTestTest = () => {
    const [ filterBy, setFilterBy ] = useState<string>("item")
    const onChooseFilter = (filter: string) => {
        setFilterBy(filter)
    }
    console.log(filterBy)
  return (
    <div className='m-[3rem]'>
        <FilterDropDown onChooseFilter={onChooseFilter}/>
    </div>
  )
}

export default TestTestTest