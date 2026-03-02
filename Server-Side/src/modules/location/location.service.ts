import { ApiError } from '../../utils/ApiError.js';

const BD_API_BASE = 'https://bdapis.com/api/v1.2';

interface BdApiStatus {
  code: number;
  message: string;
  date: string;
}

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

interface BdApiResponse<T> {
  status: BdApiStatus;
  data: T;
}

const fetchFromBdApi = async <T>(endpoint: string): Promise<T> => {
  try {
    const response = await fetch(`${BD_API_BASE}${endpoint}`);

    if (!response.ok) {
      throw new ApiError(
        response.status,
        `BD API request failed: ${response.statusText}`
      );
    }

    const json = (await response.json()) as BdApiResponse<T>;

    if (json.status.code !== 200) {
      throw new ApiError(502, `BD API returned error: ${json.status.message}`);
    }

    return json.data;
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(502, 'Failed to fetch data from BD API');
  }
};

/**
 * GET /divisions — all 8 divisions
 */
const getDivisions = async (): Promise<IBdDivision[]> => {
  return fetchFromBdApi<IBdDivision[]>('/divisions');
};

/**
 * GET /districts — all 64 districts
 */
const getDistricts = async (): Promise<IBdDistrictDetail[]> => {
  return fetchFromBdApi<IBdDistrictDetail[]>('/districts');
};

/**
 * GET /division/:name — districts + upazilas of a division
 */
const getDistrictsByDivision = async (
  divisionName: string
): Promise<IBdDistrictWithUpazilla[]> => {
  return fetchFromBdApi<IBdDistrictWithUpazilla[]>(
    `/division/${encodeURIComponent(divisionName)}`
  );
};

/**
 * GET /district/:name — upazillas of a district
 */
const getUpazilasByDistrict = async (
  districtName: string
): Promise<IBdDistrictDetail[]> => {
  return fetchFromBdApi<IBdDistrictDetail[]>(
    `/district/${encodeURIComponent(districtName)}`
  );
};

export const LocationService = {
  getDivisions,
  getDistricts,
  getDistrictsByDivision,
  getUpazilasByDistrict,
};
