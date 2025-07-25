import axios from 'axios';

// API temel URL'si
const API_URL = 'http://localhost:5083/auth';

// Axios instance oluşturma
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// İstek interceptor'ı - her istekte token eklemek için
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Yanıt interceptor'ı - 401 hatalarını yakalamak için
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token geçersiz, kullanıcıyı çıkış yaptır
      localStorage.removeItem('token');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

// Auth servisleri
const authService = {
  // Kullanıcı kaydı (gerçek backend)
  register: async (userData) => {
    try {
      const response = await apiClient.post('/register', {
        email: userData.email,
        passwordHash: userData.password, // backend ile tam uyumlu
        name: userData.name // backend ile tam uyumlu
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Kayıt işlemi başarısız oldu' };
    }
  },

  // Kullanıcı girişi (gerçek backend)
  login: async (credentials) => {
    try {
      const response = await apiClient.post('/login', {
        email: credentials.email,
        passwordHash: credentials.password // backend ile tam uyumlu
      });
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Giriş başarısız oldu' };
    }
  },

  // Kullanıcı çıkışı
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // Opsiyonel: Backend'e logout isteği gönder
    // return apiClient.post('/logout');
  },

  // Mevcut kullanıcı bilgilerini al
  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    if (userStr) return JSON.parse(userStr);
    return null;
  },

  // Token kontrolü
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  }
};

export default authService;