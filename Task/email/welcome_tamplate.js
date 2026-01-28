const welcomeTemplate = (name) => {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <title>Welcome</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f4f6f8;
        padding: 20px;
      }
      .container {
        max-width: 600px;
        margin: auto;
        background: #ffffff;
        padding: 30px;
        border-radius: 8px;
      }
      h1 {
        color: #2c3e50;
      }
      p {
        color: #555;
        font-size: 15px;
        line-height: 1.6;
      }
      .btn {
        display: inline-block;
        margin-top: 20px;
        padding: 12px 20px;
        background: #007bff;
        color: #ffffff;
        text-decoration: none;
        border-radius: 5px;
      }
      .footer {
        margin-top: 30px;
        font-size: 12px;
        color: #999;
        text-align: center;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Welcome ${name} 🎉</h1>

      <p>
        Thank you for joining <b>Our Store</b>!  
        We are super excited to have you with us.
      </p>

      <p>
        Start shopping now and enjoy the best products at the best prices.
      </p>

      <a href="http://localhost:5173" class="btn">
        Start Shopping
      </a>

      <div class="footer">
        © ${new Date().getFullYear()} Our Store. All rights reserved.
      </div>
    </div>
  </body>
  </html>
  `;
};

export default welcomeTemplate;
