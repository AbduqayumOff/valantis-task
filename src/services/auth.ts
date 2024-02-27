import instance from "../configs/axios";

const AuthService = {
  async userLogin(user: any) {
    return instance({
      method: "POST",
      headers: { "Content-Type": "application/json" },
      url: "/auth/login",
      data: JSON.stringify(user),
    });
  },
  async aboutMe() {
    return instance({
      method: "get",
      url: "/auth/me",
    });
  },
};

export default AuthService;
