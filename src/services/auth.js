export const authService = {
    login: async (email, password) => {
      // Simulation d'appel API
      return new Promise((resolve) => {
        setTimeout(() => {
          if (email && password) {
            resolve({
              user: {
                id: 1,
                email,
                username: email.split('@')[0]
              },
              token: 'fake-jwt-token'
            });
          }
        }, 1000);
      });
    },
  
    register: async (email, password, username) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          if (email && password && username) {
            resolve({
              user: {
                id: 1,
                email,
                username
              },
              token: 'fake-jwt-token'
            });
          }
        }, 1000);
      });
    },
  
    logout: () => {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    }
  };