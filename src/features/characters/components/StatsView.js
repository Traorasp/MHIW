import ImageForm from '../../../component/imageForm';

function StatsView(prop) {
  const { character, url, imageChange } = prop;

  const statList = () => {
    let maxHealth = 0;
    let maxDefense = 0;

    return Object.entries(character.baseStats).map(([key, value]) => {
      if (key === 'maxHealth') {
        maxHealth = value;
        return '';
      }
      if (key === 'maxDefense') {
        maxDefense = value;
        return '';
      }
      let rate;
      if (key === 'currHealth' || key === 'defense') {
        rate = key === 'currHealth' ? `${value} / ${maxHealth}` : `${value} / ${maxDefense}`;
      }
      return (
        <div key={key}>
          {key !== 'currHealth' ? key.substring(0, 1).toUpperCase() + key.substring(1) : 'Health'}
          :
          {' '}
          {key === 'currHealth' || key === 'defense' ? rate : value}
        </div>
      );
    });
  };

  const statusList = () => (
    <div>
      <div>
        Extra:
      </div>
      <div>
        Status:
        {character.status.map((effect) => `${effect}.name`)}
      </div>
    </div>
  );

  return (
    <main className="grid grid-rows-2 grid-cols-5">
      <div id="stats" className="col-span-3 border-2 border-black  grid grid-rows-6 grid-cols-2">
        {statList()}
      </div>
      <div id="status" className="col-span-3 border-2 border-black">
        {statusList()}
      </div>
      <div className="row-start-1 row-span-2 col-start-4 col-span-2">
        <ImageForm hideForm="None" setImageId={imageChange} prevImageId={character.charImage} />
        {url ? <img className="object-cover" src={url} alt={character.firstName} /> : ''}
      </div>

    </main>
  );
}

export default StatsView;
