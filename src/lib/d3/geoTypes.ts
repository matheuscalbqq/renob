// geoTypes.ts

import type {
  Feature,
  FeatureCollection,
  Polygon,
  MultiPolygon
} from "geojson";

/** 1) Polígono do Brasil (brazil.json) */
export interface BrazilProps {
  cartodb_id: number;
  created_at: string;
  name: string;
  updated_at: string;
}
export type BrazilFeature = Feature<MultiPolygon, BrazilProps>;
export type BrazilCollection = FeatureCollection<MultiPolygon, BrazilProps>;

/** 2) Estados do Brasil (br_states.json) */
export interface StateProps {
  Estado:   string;
  FID_Export: number;
  FID_estado: number;
  FK_macro: string;
  Homens:   number;
  Mulheres: number;
  PK_sigla: string;
  Rural:    number;
  SIGLA:    string;
  TX_Alfab: number;
  Total:    number;
  Urbana:   number;
  /** campo que vocês calculam em runtime */
  value?:   number;
}
export type StateFeature = Feature<MultiPolygon, StateProps>;
export type StateCollection = FeatureCollection<MultiPolygon, StateProps>;

/** 3) Municípios (geojs-XX-mun.json) */
export interface CityProps {
  description: string;
  id:          string;
  name:        string;
  /** idem: valor agregado em runtime */
  value?:      number;
}
export type CityFeature = Feature<Polygon | MultiPolygon, CityProps>;
export type CityCollection = FeatureCollection<Polygon | MultiPolygon, CityProps>;

/** 4) Regiões de Saúde (health_regions_XX.geojson) */
export interface RegionProps {
  /** id do estado que pertence */
  est_id:  number;
  /** nome da região de saúde */
  nome:    string;
  /** identificador único da região de saúde */
  reg_id:  number;
  /** valor agregado em runtime */
  value?:  number;
}
export type RegionFeature = Feature<MultiPolygon, RegionProps>;
export type RegionCollection = FeatureCollection<MultiPolygon, RegionProps>;
