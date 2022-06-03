const api = {
  getUser: (token: string) =>
    fetch("/api/user", {
      method: "get",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => res.json()),

  setUsername: (token: string, username: string) =>
    fetch("/api/user", {
      method: "post",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username }),
    }).then((res) => res.json()),
};

export default api;
