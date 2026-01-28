const welcomeThankuhTemplate = (name, amount) => {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <title>Welcome & Thank You</title>
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
      h2 {
        color: #27ae60;
      }
      p {
        color: #555;
        font-size: 15px;
        line-height: 1.6;
      }
      .amount {
        font-size: 18px;
        font-weight: bold;
        color: #000;
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
        Thank you for joining <b>Our Store</b>.  
        We’re excited to have you with us!
      </p>

      <h2>Thank You for Shopping With Us 🙏</h2>

      <p class="amount">
        Total Shopping Amount: ₹${amount}
      </p>

      <p>
        Because you shopped above ₹3000, you are now one of our valued customers 💙
      </p>

      <a href="http://localhost:5173/orders" class="btn">
        View Your Orders
      </a>

      <div class="footer">
        © ${new Date().getFullYear()} Our Store. All rights reserved.
      </div>
    </div>
  </body>
  </html>
  `;
};

export default welcomeThankuhTemplate;
