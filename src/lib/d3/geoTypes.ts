// geoTypes.ts

import type {
  Feature,
  FeatureCollection,
  MultiPolygon
} from "geojson";

/** 1) Regiões de Saúde (geojs-XX-health_regions.geojson) */
export interface RegionProps {
  /** nome da região de saúde */
  HREG_NAME:    string;
  /** identificador único da região de saúde */
  HREG_ID:  number;
  /** valor agregado em runtime */
  value?:  number;
}
export type RegionFeature = Feature<MultiPolygon, RegionProps>;
export type RegionCollection = FeatureCollection<MultiPolygon, RegionProps>;

/** 5) Macrorregiões de Saúde (geojs-XX-macro_regions.geojson) */
export interface MacroProps {
  /** nome da região de saúde */
  MACRO_NAME:    string;
  /** identificador único da região de saúde */
  MACRO_ID:  number;
  /** valor agregado em runtime */
  value?:  number;
}
export type MacroFeature = Feature<MultiPolygon, MacroProps>;
export type MacroCollection = FeatureCollection<MultiPolygon, MacroProps>;
