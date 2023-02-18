import { useState } from 'react';
import { useSetImageMutation, useUpdateImageMutation } from '../features/image/imageApiSlice';

function ImageForm(prop) {
  const [image, setImage] = useState('');
  const [uploadImage, { isLoading }] = useSetImageMutation();
  const [updateImage, { isLoading: isLoadingUpdate }] = useUpdateImageMutation();
  const { hideForm, setImageId, prevImageId } = prop;

  const submitImage = async (e) => {
    e.preventDefault();
    try {
      if (prevImageId) {
        const formData = new FormData();
        formData.append('id', prevImageId);
        formData.append('image', image);
        const result = await updateImage(formData).unwrap();
        setImageId(result.imageId);
      } else {
        const formData = new FormData();
        formData.set('image', image);
        const result = await uploadImage(formData).unwrap();
        setImageId(result.imageId);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleImage = (e) => setImage(e.target.files[0]);

  const content = (isLoading || isLoadingUpdate) ? <p>Loading...</p> : (
    <form onSubmit={submitImage}>
      {hideForm !== 'None' ? <button type="button" onClick={hideForm}>X</button> : ''}
      <label htmlFor="image">
        <input
          type="file"
          id="image"
          name="image"
          onChange={handleImage}
        />
      </label>
      <button onSubmit={submitImage} type="submit">Save</button>
    </form>
  );

  return content;
}

export default ImageForm;
