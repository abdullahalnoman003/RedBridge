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

export const loadDivisions = async (axiosInstance) => {
  const res = await axiosInstance.get('/locations/divisions');
  return toArray(res?.data?.data);
};

export const loadDistrictsByDivision = async (axiosInstance, divisionName) => {
  const res = await axiosInstance.get(`/locations/districts/${encodeURIComponent(divisionName)}`);
  return toArray(res?.data?.data);
};

export const loadUpazilasByDistrict = async (axiosInstance, districtName) => {
  const res = await axiosInstance.get(`/locations/upazilas/${encodeURIComponent(districtName)}`);
  return extractUpazilas(res?.data?.data);
};
