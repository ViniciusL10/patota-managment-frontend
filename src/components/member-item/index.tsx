import React, {PropsWithChildren, useState} from 'react';
import {Member} from '../../models/Member';
import FormatValue from '../format-value';
import PaymentModal from '../payment-modal';
import {usePatota} from '../../contexts/PatotaContext';

export interface Props extends PropsWithChildren {
  member: Member;
  memberValue: number;
  paidClick: (member: Member) => void;
}

function MembersItem({member, memberValue, paidClick}: Props) {
  const {toggleGoalkeeper} = usePatota();
  const [showModal, setShowModal] = useState(false);

  const effectiveValue = member.isGoalkeeper ? memberValue / 2 : memberValue;

  const handleConfirmPayment = () => {
    setShowModal(false);
    paidClick(member);
  };

  const handleGoalkeeperToggle = () => {
    toggleGoalkeeper!(member.id, !member.isGoalkeeper);
  };

  return (
    <>
      <div className='member-item'>
        <span className='name'>
          {member.name}
          <button
            className={`goalkeeper-badge ${member.isGoalkeeper ? 'active' : ''}`}
            onClick={handleGoalkeeperToggle}
            title={member.isGoalkeeper ? 'Remover goleiro' : 'Marcar como goleiro'}
          >
            G
          </button>
        </span>
        <span className='value'>
          <FormatValue value={effectiveValue} />
        </span>
        <span className='paid paid-icon-container'>
          {member.paid ? <FiCheckCircle className='paid-icon' /> : <FiXCircle className='not-paid-icon' />}
        </span>
        {!member.paid && (
          <span className='button'>
            <Button text='Pagar' click={() => setShowModal(true)} />
          </span>
        )}
      </div>

      {showModal && (
        <PaymentModal
          memberName={member.name}
          value={effectiveValue}
          onConfirm={handleConfirmPayment}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}

export default MembersItem;
