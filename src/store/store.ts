import { useEffect, useState } from 'react';
import { atom, useRecoilState } from 'recoil';
import { recoilPersist } from 'recoil-persist';


const { persistAtom } = recoilPersist()

// const folderPathState = atom({
//   key: 'folderPath',
//   default: "",
//   effects_UNSTABLE: [persistAtom],
// })
const defaultValue = [{ id: 1 }]

export const recoilTest = atom<{ id: number }[]>({
  key: "recoilTest",
  default: defaultValue,
  effects_UNSTABLE: [persistAtom],
});

export function useSSR() {
  const [isInitial, setIsInitial] = useState(true);
  const [value, setValue] = useRecoilState(recoilTest);

  useEffect(() => {
    setIsInitial(false);
  }, []);

  return [isInitial ? defaultValue : value, setValue] as const;
}

