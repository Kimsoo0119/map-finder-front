export interface PlaceCoordinates {
  latitude: number;
  longitude: number;
}

export interface PlaceDetail {
  address: string;
  id: number;
  title: string;
  telephone: string;
  stars: string;
  naver_reviewer_counts: string;
  naver_stars: string;
  thum_url: string;
  is_init: boolean;
  naver_place_id?: string;
  region: {
    district: string;
    administrative_district: string;
  };
  place_category: {
    main: string;
    sub: string;
  };
  operatingHours: string;
}

export interface SearchedPlace {
  address: string;
  category: string;
  mapX: string;
  mapY: string;
  id: number;
  title: string;
  telephone: string;
  stars: string;
  naver_reviewer_counts: string;
  naver_stars: string;
  thum_url: string;
  is_init: boolean;
  naver_place_id?: string;
  region: {
    district: string;
    administrative_district: string;
  };
  place_category: {
    main: string;
    sub: string;
  };
}
