const BD_API_BASE = 'https://bdapis.com/api/v1.2';

const toArray = (value) => (Array.isArray(value) ? value : []);

const extractUpazilas = (payload) => {
  const items = toArray(payload);

  if (items.length > 0 && typeof items[0] === 'string') {
    return items;
  }

  return items
    .flatMap((item) => item?.upazila || item?.upazilla || item?.upazillas || [])
    .filter(Boolean);
};

const fetchBdApi = async (path) => {
  const response = await fetch(`${BD_API_BASE}${path}`);
  if (!response.ok) {
    throw new Error(`BD API request failed with status ${response.status}`);
  }

  const json = await response.json();
  if (json?.status?.code !== 200) {
    throw new Error(json?.status?.message || 'BD API returned non-200 status code');
  }

  return toArray(json?.data);
};

export const loadDivisions = async (axiosInstance) => {
  try {
    const res = await axiosInstance.get('/locations/divisions');
    return toArray(res?.data?.data);
  } catch {
    return fetchBdApi('/divisions');
  }
};

export const loadDistrictsByDivision = async (axiosInstance, divisionName) => {
  try {
    const res = await axiosInstance.get(`/locations/districts/${encodeURIComponent(divisionName)}`);
    return toArray(res?.data?.data);
  } catch {
    return fetchBdApi(`/division/${encodeURIComponent(divisionName)}`);
  }
};

export const loadUpazilasByDistrict = async (axiosInstance, districtName) => {
  try {
    const res = await axiosInstance.get(`/locations/upazilas/${encodeURIComponent(districtName)}`);
    return extractUpazilas(res?.data?.data);
  } catch {
    const districtData = await fetchBdApi(`/district/${encodeURIComponent(districtName)}`);
    return extractUpazilas(districtData);
  }
};
