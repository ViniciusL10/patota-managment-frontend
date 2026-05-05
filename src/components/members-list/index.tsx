// MembersList.tsx
import React, {PropsWithChildren} from 'react';
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
        <div className='flex items-center justify-between bg-blue-600 px-6 py-4'>
          <h2 className='text-xl font-semibold text-white'>Lista de Membros</h2>
        </div>
      }
    >
      <div className='overflow-x-auto'>
        <table className='w-full'>
          <thead className='bg-gray-50 border-b'>
            <tr>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Nome</th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Valor</th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Status</th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Ação</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-200'>
            {props.members.map((member, i) => (
              <MembersItem
                key={member.id}
                member={member}
                memberValue={props.memberValue}
                paidClick={handleMemberPayment}
              />
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

export default MembersList;
