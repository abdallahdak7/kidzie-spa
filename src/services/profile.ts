import { base } from "./axios";

const editAdminProfile = async (id: number, editProfile: IEditProfile) => {
  try {
    const res = await base.put(`/admin/profile/edit/${id}`, editProfile);
    return [null, res.data];
  } catch (error) {
    return [[error.response?.data?.message], null];
  }
};
const editPartnerProfile = async (id: number, editProfile: IEditProfile) => {
  try {
    const res = await base.put(`/partner/profile/edit/${id}`, editProfile);
    return [null, res.data];
  } catch (error) {
    return [[error.response?.data?.message], null];
  }
};

export { editAdminProfile, editPartnerProfile };
