// eslint-disable-next-line no-unused-vars
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import DocNav from './DocNav';
import AoeListPanel from '../features/documentation/aoes/AoeListPanel';

function Documentation() {
  const [selection, setSelection] = useState('AOE');

  const select = (e) => {
    setSelection(e.target.textContent);
  };

  useEffect(() => {

  }, [selection]);

  return (
    <div>
      <h1>{selection}</h1>
      <DocNav select={select} />
      <AoeListPanel />
    </div>
  );
}

export default Documentation;
