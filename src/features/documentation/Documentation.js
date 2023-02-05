// eslint-disable-next-line no-unused-vars
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import DocNav from './DocNav';
import DocListPanel from './DocListPanel';

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
      <DocListPanel listOf={selection} />
    </div>
  );
}

export default Documentation;
