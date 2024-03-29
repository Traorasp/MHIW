import { useState } from 'react';
import Skillsview from './SkillsView';
import ClassView from './ClassView';
import TitlesView from './TitlesView';
import TraitsView from './TraitsView';
import Spellsview from './SpellsView';
import RaceView from './RaceView';
import TalentsView from './TalentsView';

function Abilities(prop) {
  const {
    character, update, abilityOn, moveAbilityOn,
  } = prop;
  const [selection, setSelection] = useState(abilityOn);

  const changeSelection = (e) => {
    moveAbilityOn(e.target.textContent);
    setSelection(e.target.textContent);
  };

  const selectedView = () => {
    switch (selection) {
      case 'Skills':
        return <Skillsview character={character} update={update} />;
      case 'Class':
        return <ClassView character={character} update={update} />;
      case 'Titles':
        return <TitlesView character={character} update={update} />;
      case 'Race':
        return <RaceView character={character} update={update} />;
      case 'Talents':
        return <TalentsView character={character} update={update} />;
      case 'Magics':
        return <Spellsview character={character} update={update} />;
      case 'Traits':
        return <TraitsView character={character} update={update} />;
      default:
        return '';
    }
  };

  return (
    <div>
      <nav>
        <button type="button" onClick={changeSelection}>Skills</button>
        <button type="button" onClick={changeSelection}>Class</button>
        <button type="button" onClick={changeSelection}>Titles</button>
        <button type="button" onClick={changeSelection}>Traits</button>
        <button type="button" onClick={changeSelection}>Magics</button>
        <button type="button" onClick={changeSelection}>Race</button>
        <button type="button" onClick={changeSelection}>Talents</button>
      </nav>
      {selectedView()}
    </div>
  );
}

export default Abilities;
