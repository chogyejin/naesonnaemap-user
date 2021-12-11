import { atom } from 'recoil';

export interface IPlace {
  address_name: string;
  category_group_code: string;
  category_group_name: string;
  category_name: string;
  distance: string;
  id: string;
  phone: string;
  place_name: string;
  place_url: string;
  road_address_name: string;
  x: number;
  y: number;
}

export const countState = atom({
  key: 'countState', // 해당 atom의 고유 key
  default: 0, // 기본값
});

export const placesState = atom<IPlace[]>({
  key: 'placesState',
  default: [],
});
