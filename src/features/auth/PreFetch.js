/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useGetEffectListMutation } from '../documentation/effects/effectApiSlice';
import { setDoc } from '../documentation/documentationSlice';

function PreFetch() {
  const dispatch = useDispatch();
  const [getEffects] = useGetEffectListMutation();

  const getDocumentation = async () => {
    const effects = await getEffects().unwrap();
    console.log(effects);
  };

  useEffect(() => {
    const list = async () => {
      getDocumentation();
    };

    list();
  }, []);

  return <Outlet />;
}

export default PreFetch;
