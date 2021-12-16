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

export const placesState = atom<IPlace[]>({
  key: 'placesState',
  default: [],
});

export interface ILocation {
  myLat: number;
  myLng: number;
}

export const locationState = atom<ILocation>({
  key: 'locationState',
  default: {
    myLat: 37.574515,
    myLng: 126.97693,
  },
});
