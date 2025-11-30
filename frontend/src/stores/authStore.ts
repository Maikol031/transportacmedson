interface IUser {
    id: number
    role: string
}

let accessToken: string | null = null;
let userStore: IUser | null = null

export function setAccessToken(token: string) {
  accessToken = token;
}

export function getAccessToken() {
  return accessToken;
}


export function setUser(user: IUser) {
    userStore = user
}

export function getUser() {
    return userStore
}

export async function restoreSession(api: any) {
  try {
    const res = await api.get("/auth/refresh", { withCredentials: true });
    console.log(res)
    if (res.data.accessToken) {
      setAccessToken(res.data.accessToken);
    }

    if (res.data.user) {
      setUser(res.data.user);
    }

    return true;
  } catch (err) {
    console.warn("Nenhuma sessão ativa.");
    return false;
  }
}