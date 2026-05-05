// RecipeInfo.tsx
import React from 'react';
import Card from '../card';
import FormatValue from '../format-value';
import {Recipe} from '../../models/Recipe';
import {month} from '../../utils/months';

interface Props {
  recipe: Recipe;
}

function RecipeInfo({
  recipe: {payingMemebers, totalCost, totalMembers, valuePerMember, minimumValuePerMember},
}: Props) {
  const getHeader = () => {
    const currentMonth = new Date().getMonth();

    return (
      <div className='bg-blue-600 px-6 py-4'>
        <h2 className='text-xl font-semibold text-white'>Recibo Mensal</h2>
        <p className='text-blue-100'>
          {month[currentMonth]} de {new Date().getFullYear()}
        </p>
      </div>
    );
  };

  // Calcular o saldo
  const totalCollected = valuePerMember * payingMemebers;
  const balance = totalCollected - totalCost;
  const isNegativeBalance = balance < 0;

  return (
    <Card header={getHeader()}>
      <div className='p-6 space-y-4'>
        <div className='flex justify-between items-center'>
          <span className='text-gray-600'>Número de membros</span>
          <span className='font-semibold'>{totalMembers}</span>
        </div>

        <div className='flex justify-between items-center'>
          <span className='text-gray-600'>Valor mínimo por membro</span>
          <span className='font-semibold'>
            <FormatValue value={minimumValuePerMember} />
          </span>
        </div>

        <div className='flex justify-between items-center'>
          <span className='text-gray-600'>Pagantes</span>
          <span className='font-semibold'>{payingMemebers}</span>
        </div>

        <div className='flex justify-between items-center'>
          <span className='text-gray-600'>Total arrecadado</span>
          <span className='font-semibold'>
            <FormatValue value={totalCollected} />
          </span>
        </div>

        <div className='flex justify-between items-center border-t pt-4'>
          <span className='text-gray-700 font-medium'>Total</span>
          <span className='font-bold'>
            <FormatValue value={totalCost} />
          </span>
        </div>

        <div className={`flex justify-between items-center ${isNegativeBalance ? 'text-red-600' : 'text-green-600'}`}>
          <span className='font-medium'>Saldo</span>
          <span className='font-bold'>
            <FormatValue value={balance} />
          </span>
        </div>

      </div>
    </Card>
  );
}

export default RecipeInfo;
