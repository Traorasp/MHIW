import ImageForm from '../../../component/imageForm';

function InformationView(prop) {
  const { character, url, iconChange } = prop;

  return (
    <div className="grid grid-rows-[8] grid-cols-2">
      <div className="row-span-2">
        <ImageForm hideForm="None" setImageId={iconChange} prevImageId={character.charIcon} />
        { url
          ? (
            <img
              className="object-scale-down h-36 w-36"
              src={url}
              alt={`${character.firstName} icon`}
            />
          ) : ''}
      </div>
      <div>
        Fullname:
        {' '}
        {`${character.firstName} ${character.lastName}`}
      </div>
      <div>
        Titles:
        {' '}
        {character.titles.map((info) => info.name)}
      </div>
      <div>
        Level:
        {' '}
        {character.level}
      </div>
      <div>
        Class:
        {' '}
        {character.class.map((info) => info.name)}
      </div>
      <div>
        Magic:
        {' '}
        {character.magics.map((info) => info.name)}
      </div>
      <div>
        Talent:
        {' '}
        {character.talents.map((info) => info.name)}
      </div>
      <div>
        Race:
        {' '}
        {character.race ? character.race.name : ''}
      </div>
      <div>
        Nationality:
        {' '}
        {character.nationality}
      </div>
      <div>
        Gender:
        {' '}
        {character.gender}
      </div>
      <div>
        Age:
        {' '}
        {character.age}
      </div>
      <div>
        Description:
        {' '}
        {character.description}
      </div>
      <div className="row-start-[8]">
        Background:
        {' '}
        {character.background}
      </div>
    </div>
  );
}

export default InformationView;
