import { ApiError } from '../../utils/ApiError.js';
import { ERRORS } from '../../utils/errors.constants.js';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

export interface IBdDivision {
  division: string;
  divisionbn: string;
  coordinates: string;
}

export interface IBdDistrictWithUpazilla {
  district: string;
  coordinates: string;
  upazilla: string[];
}

export interface IBdDistrictDetail {
  district: string;
  districtbn: string;
  coordinates: string;
  upazilla: string[];
}

interface ILocationDatasetDistrict {
  district: string;
  districtbn: string;
  coordinates: string;
  upazilla: string[];
}

interface ILocationDatasetDivision {
  division: string;
  divisionbn: string;
  coordinates: string;
  districts: ILocationDatasetDistrict[];
}

interface ILocationDataset {
  country: string;
  source: string;
  generatedAt: string;
  divisions: ILocationDatasetDivision[];
}

const LOCATION_DATA_PATH = join(process.cwd(), 'src', 'data', 'bangladesh-locations.json');

let locationsDataset: ILocationDataset | null = null;

const getLocationsDataset = (): ILocationDataset => {
  if (locationsDataset) {
    return locationsDataset;
  }

  try {
    const raw = readFileSync(LOCATION_DATA_PATH, 'utf-8');
    const sanitized = raw.replace(/^\uFEFF/, '');
    locationsDataset = JSON.parse(sanitized) as ILocationDataset;
    return locationsDataset;
  } catch {
    throw new ApiError(ERRORS.LOCATION_NOT_FOUND.code, ERRORS.LOCATION_NOT_FOUND.msg);
  }
};

const normalize = (value: string): string => value.trim().toLowerCase();

const findDivision = (divisionName: string): ILocationDatasetDivision => {
  const dataset = getLocationsDataset();
  const division = dataset.divisions.find(
    (item) => normalize(item.division) === normalize(divisionName)
  );

  if (!division) {
    throw new ApiError(ERRORS.LOCATION_NOT_FOUND.code, `Division not found: ${divisionName}`);
  }

  return division;
};

const findDistrict = (districtName: string): ILocationDatasetDistrict => {
  const dataset = getLocationsDataset();

  for (const division of dataset.divisions) {
    const district = division.districts.find(
      (item) => normalize(item.district) === normalize(districtName)
    );

    if (district) {
      return district;
    }
  }

  throw new ApiError(ERRORS.LOCATION_NOT_FOUND.code, `District not found: ${districtName}`);
};

/**
 * GET /divisions — all 8 divisions
 */
const getDivisions = async (): Promise<IBdDivision[]> => {
  const dataset = getLocationsDataset();

  return dataset.divisions.map((division) => ({
    division: division.division,
    divisionbn: division.divisionbn,
    coordinates: division.coordinates,
  }));
};


/**
 * GET /division/:name — districts + upazilas of a division
 */
const getDistrictsByDivision = async (
  divisionName: string
): Promise<IBdDistrictWithUpazilla[]> => {
  const division = findDivision(divisionName);

  return division.districts.map((district) => ({
    district: district.district,
    coordinates: district.coordinates,
    upazilla: district.upazilla,
  }));
};

/**
 * GET /district/:name — upazillas of a district
 */
const getUpazilasByDistrict = async (
  districtName: string
): Promise<IBdDistrictDetail[]> => {
  const district = findDistrict(districtName);

  return [
    {
      district: district.district,
      districtbn: district.districtbn,
      coordinates: district.coordinates,
      upazilla: district.upazilla,
    },
  ];
};

export const LocationService = {
  getDivisions,
  getDistrictsByDivision,
  getUpazilasByDistrict,
};
