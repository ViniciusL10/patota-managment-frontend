import React, {PropsWithChildren, ReactElement} from 'react';

interface Props extends PropsWithChildren {
  header?: ReactElement;
}

function Card(props: Props) {
  return (
    <div className='bg-white rounded-xl shadow-md overflow-hidden mb-6'>
      {props.header}
      <div className='content'>{props.children}</div>
    </div>
  );
}

export default Card;
