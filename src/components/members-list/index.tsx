import React, {PropsWithChildren} from 'react';
import './index.scss';
import MembersItem from '../member-item';
import {Member} from '../../models/Member';
import Card from '../card';
import {usePatota} from '../../contexts/PatotaContext';

export interface Props extends PropsWithChildren {
  members: Member[];
  memberValue: number;
}

function MembersList(props: Props) {
  const {updateMemberPayment} = usePatota();

  const handleMemberPayment = async (member: Member) => {
    await updateMemberPayment!(member.id);
  };

  return (
    <Card
      header={
        <div className='members-list-header'>
          <span className='name'>Nome</span>
          <span className='value'>Valor</span>
          <span className='paid'>Pagou</span>
        </div>
      }
    >
      <div className='content'>
        {props.members.map((member, i) => (
          <MembersItem
            key={member.id}
            member={member}
            memberValue={props.memberValue}
            paidClick={handleMemberPayment}
          />
        ))}
      </div>
    </Card>
  );
}

export default MembersList;
