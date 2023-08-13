export interface PlaceDetail {
  id?: number;
  title: string;
  address: string;
  category: string;
  telephone?: string;
  starts?: number;
  naver_reviewer_counts?: string;
  naver_stars?: string;
  thum_url?: string;
}

export interface PlaceCoordinates {
  latitude: number;
  longitude: number;
}

export interface PlaceInformation {
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
