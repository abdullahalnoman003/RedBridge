export const MESSAGES = {
  user: {
    created: 'User created successfully',
    list: 'Users retrieved successfully',
    roleUpdated: 'User role updated successfully',
    updated: 'User updated successfully',
  },
  donor: {
    created: 'Donor profile created successfully. Awaiting admin approval.',
    list: 'Donors retrieved successfully',
    single: 'Donor retrieved successfully',
    updated: 'Donor profile updated successfully',
    deleted: 'Donor profile deleted successfully',
    approved: 'Donor approved successfully',
    rejected: 'Donor rejected successfully',
  },
  location: {
    fullTree: 'Full location tree retrieved successfully',
    divisions: 'Divisions retrieved successfully',
    districtsByDivision: (divisionName: string) =>
      `Districts of ${divisionName} retrieved successfully`,
    upazilasByDistrict: (districtName: string) =>
      `Upazilas of ${districtName} retrieved successfully`,
  },
} as const;
