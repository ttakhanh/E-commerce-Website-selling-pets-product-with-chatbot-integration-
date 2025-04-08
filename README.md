# 🐾 E-commerce Website Selling Pet Products with Chatbot Integration

Welcome to the official repository for our **E-commerce website** dedicated to selling pet products, fully integrated with an AI-powered **Rasa chatbot** to support customers in real-time. 🐶🐱💬

---

## 🚀 Features

- 🛍️ Browse and search pet products by category
- 🤖 Smart chatbot for product inquiries, support, and navigation
- 🧾 Order management with shopping cart and checkout
- 🛠️ Admin dashboard for product and order control
- 💳 Payment gateway integration (Paypal)

---

## 🧰 Tech Stack

| Component     | Technology           |
|---------------|----------------------|
| Frontend      | HTML, CSS, JavaScript / React (optional) |
| Backend       | Node.js     |
| Chatbot       | Rasa (NLP & Dialogue Management) |
| Database      | MongoDB  |
| Payment       | Paypal API    |

---

## 📦 Installation Guide

```bash
# Clone the repository
https://github.com/ttakhanh/E-commerce-Website-selling-pets-product-with-chatbot-integration-.git

# Move into the project folder
cd E-commerce-Website-selling-pets-product-with-chatbot-integration-

# (Optional) Create virtual environment
python -m venv chatbot_env
source chatbot_env/bin/activate  # or chatbot_env\Scripts\activate on Windows

# Install Python dependencies
pip install -r requirements.txt
```

---

## 🤖 Chatbot Preview

> Sample of integrated chatbot handling product queries:

![chatbot demo](screenshots/chatbot_demo.gif)

---

## 📂 Project Structure (simplified)

```
├── chatbot_env/
│   └── chatbot/              # Rasa project folder
│       ├── data/             # NLU training data
│       ├── domain.yml        # Intent & entity definitions
│       ├── actions.py        # Custom action server
│       └── ...
├── static/                  # Frontend static files
├── templates/               # HTML templates
├── manage.py / app.js       # Main server entry (Django or Node)
└── requirements.txt         # Python dependencies
```

---

## 🙋‍♂️ Contribution

We welcome contributions! Please fork this repo and submit a pull request. You can help by:
- Improving chatbot conversations (intents, responses)
- Adding new product features
- Fixing bugs or improving UI/UX

---


## 🔗 Links

- [Rasa Documentation](https://rasa.com/docs/)
- [Paypal Developer](https://developer.paypal.com/)
- [Momo Payment API](https://developers.momo.vn/)

---

> Made with ❤️ by Khanh

