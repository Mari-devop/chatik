# ∞ Eternal AI ∞
## Chat with AI-Powered Famous People

This application allows users to interact with famous personalities simulated by AI. The chat system is powered by the ChatGPT API, providing a unique experience where users can ask questions and receive responses as if they were conversing with historical or famous figures.

## Features

- **AI-Powered Chat**: Users can ask questions and receive answers as if they're chatting with famous personalities.
- **Subscription-Based Access**:
  - No registration: Access to suggested questions only.
  - Registered users: Ability to ask 5 questions.
  - Subscribers: Unlimited access with no restrictions.
- **User Account Management**: 
  - Ability to change email, password, phone and manage subscription.
  - Google authorization for simplified login and registration.
- **Google Sign-Up & Login**: Users can easily sign up and log in using their Google accounts.

## Tech Stack

- **React**: Frontend framework.
- **Vercel**: Hosting and deployment.
- **ChatGPT API**: Used for generating AI responses in the chat.
- **Google OAuth**: Used for authorization and authentication.
- **IndexedDB**: Local storage for managing user sessions and information.

## Getting Started

### Prerequisites
- Node.js (>=14.x)
- NPM or Yarn

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/your-repo-name.git
    cd your-repo-name
    ```

2. Install dependencies:
    ```bash
    npm install
    ```
    or
    ```bash
    yarn install
    ```

3. Create a `.env` file in the root directory and set the following environment variables:
    ```
    REACT_APP_CHATGPT_API_KEY=your_chatgpt_api_key
    REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id
    ```

### Running the Application

To run the app locally, use the following command:
```bash
npm start
