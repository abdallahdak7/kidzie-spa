import { base } from "./axios";

const signUpAsAnAdmin = async (createUser: ICreateUser) => {
  try {
    const res = await base.post("/auth/admin/sign-up", createUser);
    return [null, res.data];
  } catch (error) {
    return [[error.response?.data], null];
  }
};

const signUpAsAPartner = async (createUser: ICreateUser) => {
  try {
    const res = await base.post("/auth/partner/sign-up", createUser);
    return [null, res.data];
  } catch (error) {
    return [[error.response?.data], null];
  }
};

const signIn = async (signIn: ISignIn) => {
  try {
    const res = await base.post("/auth/sign-in", signIn);
    return [null, res.data];
  } catch (error) {
    return [[error?.response?.data], null];
  }
};

export { signUpAsAnAdmin, signUpAsAPartner, signIn };
