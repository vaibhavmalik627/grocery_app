const fs = require('fs');
const { fetch, FormData } = require('undici');

(async () => {
  const loginSeller = async () => {
    const response = await fetch('http://localhost:5000/api/seller/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@gmail.com', password: 'admin123' }),
      credentials: 'include',
    });

    const data = await response.json();
    if (response.ok) {
      const cookies = response.headers.getSetCookie(); // getSetCookie returns array of cookie strings
      return cookies.join('; '); // join them into a single cookie string
    } else {
      throw new Error(data.message || 'Login failed');
    }
  };

  const addProduct = async (cookies) => {
    const formData = new FormData();
    formData.append('name', 'Test Product');
    formData.append('description', 'This is a test product for API testing.');
    formData.append('category', 'test-category');
    formData.append('price', '100');
    formData.append('offerPrice', '80');
    formData.append(
      'image',
      fs.createReadStream('./greencart_assets/amul_milk_image.png'),
      'amul_milk_image.png'
    );

    const response = await fetch('http://localhost:5000/api/product/add-product', {
      method: 'POST',
      headers: {
        Cookie: cookies,
        ...formData.getHeaders(),
      },
      body: formData,
    });

    const data = await response.json();
    if (response.ok) {
      console.log('✅ Product added successfully:', data);
    } else {
      console.error('❌ Failed to add product:', data);
    }
  };

  try {
    const cookies = await loginSeller();
    await addProduct(cookies);
  } catch (error) {
    console.error('🚨 Error:', error.message);
  }
})();

