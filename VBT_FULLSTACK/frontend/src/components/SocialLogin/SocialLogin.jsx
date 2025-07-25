import React from 'react';
import { useAuth } from '../../context/AuthContext';
import './SocialLogin.css';

export default function SocialLogin() {
  const { socialLogin } = useAuth();
  
  const handleSocialLogin = async (provider) => {
    console.log(`Login with ${provider}`);
    
    try {
      // Gerçek uygulamada, sosyal medya sağlayıcısının SDK'sını kullanarak
      // kullanıcı kimlik doğrulaması yapılır ve token alınır
      // Burada simüle ediyoruz
      
      // Simüle edilmiş sosyal medya kullanıcı bilgileri
      const socialUser = {
        email: `user@${provider}.com`,
        name: `${provider.charAt(0).toUpperCase() + provider.slice(1)} User`,
        provider: provider,
        socialLogin: true
      };
      
      // AuthContext içindeki socialLogin fonksiyonunu çağır
      await socialLogin(provider, socialUser);
      console.log(`${provider} login successful:`, socialUser);
    } catch (error) {
      console.error(`${provider} login failed:`, error);
      alert(`${provider} login failed. Please try again.`);
    }
  };

  return (
    <section className="social-login">
      <p className="social-login-text">or continue with</p>
      
      <div className="social-buttons">
        <button 
          className="social-btn facebook-btn"
          onClick={() => handleSocialLogin('facebook')}
          aria-label="Login with Facebook"
        >
          <img 
            src="https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-07-24/Rv6GDtef4B.png" 
            alt="Facebook"
            width="41"
            height="41"
          />
        </button>
        
        <button 
          className="social-btn apple-btn"
          onClick={() => handleSocialLogin('apple')}
          aria-label="Login with Apple"
        >
          <img 
            src="https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-07-24/7f2F808BkZ.png" 
            alt="Apple"
            width="41"
            height="41"
          />
        </button>
        
        <button 
          className="social-btn google-btn"
          onClick={() => handleSocialLogin('google')}
          aria-label="Login with Google"
        >
          <img 
            src="https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-07-24/nXH33yD7wy.png" 
            alt="Google"
            width="41"
            height="41"
          />
        </button>
      </div>
    </section>
  );
}
