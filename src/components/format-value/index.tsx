import React from 'react';
import { NumericFormat } from 'react-number-format';

interface Props {
  value: number;
}

function FormatValue({value}: Props) {
  return (
    <NumericFormat
      value={value}
      displayType={'text'}
      thousandSeparator={true}
      prefix={'R$'}
      decimalSeparator='.'
      decimalScale={2}
      fixedDecimalScale={true}
    />
  );
}

export default FormatValue;