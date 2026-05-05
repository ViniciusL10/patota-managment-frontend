import React from 'react';
import Loading from '../../components/loading';
import MembersList from '../../components/members-list';
import MonthFilter from '../../components/month-filter';
import {usePatota} from '../../contexts/PatotaContext';
import './index.scss';

function HomeScreen() {
  const {patota, loading} = usePatota();

  return (
    <div className={`home-screen ${loading && 'content-loading'}`}>
      <div className='loading'>
        <Loading loading={loading!} />
      </div>
      <div className='page-content'>
        <MonthFilter />
        <div className='members-list'>
          <MembersList members={patota?.members || []} memberValue={patota?.valuePerMember || 0} />
        </div>
      </div>
    </div>
  );
}

export default HomeScreen;
