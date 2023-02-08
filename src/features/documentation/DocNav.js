function DocNav(prop) {
  const { select } = prop;

  return (
    <nav className="border-black border-2 flex flex-row justify-around">
      <button type="button" onClick={select}>AOEs</button>
      <button type="button" onClick={select}>Effects</button>
      <button type="button" onClick={select}>Enchants</button>
      <button type="button" onClick={select}>Items</button>
      <button type="button" onClick={select}>Magics</button>
      <button type="button" onClick={select}>Materials</button>
      <button type="button" onClick={select}>Races</button>
      <button type="button" onClick={select}>Spells</button>
      <button type="button" onClick={select}>Skills</button>
      <button type="button" onClick={select}>Talents</button>
      <button type="button" onClick={select}>Titles</button>
    </nav>
  );
}

export default DocNav;
