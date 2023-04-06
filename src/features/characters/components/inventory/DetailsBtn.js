/* eslint-disable no-underscore-dangle */
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentToken } from '../../../auth/authSlice';
import DetailedCard from '../../../documentation/DetailedCard';
import { useGetImage } from '../../../image/getImage';

function DetailsBtn(prop) {
  const { id, listOf, data } = prop;
  const token = useSelector(selectCurrentToken);

  const [show, setShow] = useState(false);
  const [image, setImage] = useState('');
  let loading = false;

  const showDetails = () => setShow(!show);
  const ignoredKeys = ['_id', '__v', 'material', 'image', 'enchantments', 'subStats', 'name', 'type'];

  const getImageUrl = async (imageId) => {
    if (imageId === null || imageId === undefined) return '';
    return useGetImage(imageId, token)
      .then((res) => URL.createObjectURL(res.data));
  };

  const getImage = async () => {
    if (loading) return;
    loading = true;
    setImage(await getImageUrl(data.image));
    loading = false;
  };

  const getDetails = (info) => (
    <div className={info._id ? 'border-2 border-black' : ''} key={id + info}>
      {Object.entries(info).map(([key, value]) => {
        if (key >= 0 || value.length < 1 || ignoredKeys.find((ignore) => ignore === key)) {
          return '';
        }
        if (typeof value === 'object') {
          return getDetails(value);
        }
        return (
          <div key={key}>
            {key === 'name' ? '' : `${key.substring(0, 1).toUpperCase() + key.substring(1)} : `}
            {value}
          </div>
        );
      })}
    </div>
  );

  useEffect(() => {
    if (data.image) {
      getImage();
    }
  }, []);

  return (
    <div>
      {image !== '' ? (
        <img
          className="object-scale-down h-36 w-36"
          src={image}
          alt={data.name}
        />
      ) : ''}
      <button type="button" onClick={showDetails}>Details</button>
      {show ? (
        <div>
          {getDetails(data)}
          <DetailedCard id={id} count={0} listOf={listOf} />
        </div>
      ) : ''}
    </div>
  );
}

export default DetailsBtn;
