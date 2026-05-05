import React, {useState} from 'react';
import {MdClose, MdContentCopy, MdCheck} from 'react-icons/md';
import FormatValue from '../format-value';
import './index.scss';

const PIX_KEY = '04720140998';

interface Props {
  memberName: string;
  value: number;
  onConfirm: () => void;
  onClose: () => void;
}

function PaymentModal({memberName, value, onConfirm, onClose}: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(PIX_KEY);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className='modal-overlay' onClick={onClose}>
      <div className='modal-container' onClick={(e) => e.stopPropagation()}>
        <button className='modal-close' onClick={onClose}>
          <MdClose size={22} />
        </button>

        <h2 className='modal-title'>Pagamento PIX</h2>
        <p className='modal-subtitle'>
          {memberName} · <FormatValue value={value} />
        </p>

        <img
          className='qrcode-image'
          src={`${process.env.PUBLIC_URL}/Image_20260505_15750_533 PM.jpeg`}
          alt='QR Code PIX'
        />

        <div className='pix-key-container'>
          <span className='pix-key-label'>Chave PIX</span>
          <div className='pix-key-row'>
            <span className='pix-key-value'>{PIX_KEY}</span>
            <button className='copy-button' onClick={handleCopy}>
              {copied ? <MdCheck size={18} /> : <MdContentCopy size={18} />}
              {copied ? 'Copiado!' : 'Copiar'}
            </button>
          </div>
        </div>

        <button className='confirm-button' onClick={onConfirm}>
          Já paguei
        </button>
      </div>
    </div>
  );
}

export default PaymentModal;
