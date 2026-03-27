import { ApiError } from '../../utils/ApiError.js';
import { ERRORS } from '../../utils/errors.constants.js';

const BD_API_BASE = 'https://bdapis.com/api/v1.2';
const CACHE_TTL_MS = 10 * 60 * 1000;

interface CacheEntry<T> {
  expiresAt: number;
  value: T;
}

const locationCache = new Map<string, CacheEntry<unknown>>();

const getCached = <T>(key: string): T | null => {
  const entry = locationCache.get(key);

  if (!entry) {
    return null;
  }

  if (Date.now() > entry.expiresAt) {
    locationCache.delete(key);
    return null;
  }

  return entry.value as T;
};

const setCached = <T>(key: string, value: T): T => {
  locationCache.set(key, {
    value,
    expiresAt: Date.now() + CACHE_TTL_MS,
  });

  return value;
};

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
  const cacheKey = endpoint;
  const cached = getCached<T>(cacheKey);

  if (cached) {
    return cached;
  }

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
      throw new ApiError(ERRORS.BD_API_ERROR.code, `BD API returned error: ${json.status.message}`);
    }

    return setCached(cacheKey, json.data);
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(ERRORS.BD_API_ERROR.code, ERRORS.BD_API_ERROR.msg);
  }
};

/**
 * GET /divisions — all 8 divisions
 */
const getDivisions = async (): Promise<IBdDivision[]> => {
  return fetchFromBdApi<IBdDivision[]>('/divisions');
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
  getDistrictsByDivision,
  getUpazilasByDistrict,
};
