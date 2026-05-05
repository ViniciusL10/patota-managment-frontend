import React from 'react';
import {MdChevronLeft, MdChevronRight} from 'react-icons/md';
import {usePatota} from '../../contexts/PatotaContext';
import {month} from '../../utils/months';
import './index.scss';

function MonthFilter() {
  const {selectedMonth, selectedYear, isCurrentMonth, goToPreviousMonth, goToNextMonth} = usePatota();

  const monthName = month[(selectedMonth ?? 1) - 1];

  return (
    <div className='month-filter'>
      <button className='arrow' onClick={goToPreviousMonth}>
        <MdChevronLeft size={24} />
      </button>
      <span className='label'>
        {monthName} {selectedYear}
      </span>
      <button className='arrow' onClick={goToNextMonth} disabled={isCurrentMonth}>
        <MdChevronRight size={24} />
      </button>
    </div>
  );
}

export default MonthFilter;
