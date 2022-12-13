import { useState } from 'react';
import { useSetImageMutation } from '../features/image/imageApiSlice';

function ImageForm(prop) {
  const [image, setImage] = useState('');
  const [uploadImage, { isLoading }] = useSetImageMutation();
  const { hideForm, setImageId } = prop;

  const submitImage = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.set('image', image);
      const result = await uploadImage(formData).unwrap();
      setImageId(result.imageId);
    } catch (err) {
      console.error(err);
    }
  };

  const handleImage = (e) => setImage(e.target.files[0]);

  const content = isLoading ? <p>Loading...</p> : (
    <form onSubmit={submitImage}>
      <button type="button" onClick={hideForm}>X</button>
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
