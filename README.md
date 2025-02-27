# Hackathon Management System

A **comprehensive platform** for managing hackathons, built with **React**, **Node.js**, and styled using **Tailwind CSS**. This system facilitates participant registration, team formation, judging, and overall event management.

---

## Authors

- **Rehan Sayyed** (Frontend) - [GitHub Profile](https://github.com/rsayyed591)  
- **Rehan Shah** (Backend) - [GitHub Profile](https://github.com/rehannn03)

---

## Features

- **User Authentication** - Login and registration with role-based access control.
- **Participant Management** - Includes registration, team formation, and check-in features.
- **Judge Assignment and Scoring System** - Efficient allocation of judges and score tracking.
- **Admin Dashboard** - Provides complete event oversight.
- **Responsive Design** - Built with Tailwind CSS for seamless usability across devices.

---

## Live Demo

The application is deployed and accessible at: [Hackathon Management System](https://err404-manager.vercel.app/)

---

## File Structure

```
└── rsayyed591-Hack-Management-Frontend/
    ├── README.md
    ├── .env
    ├── eslint.config.js
    ├── index.html
    ├── package.json
    ├── postcss.config.js
    ├── tailwind.config.js
    ├── vercel.json
    ├── vite.config.js
    ├── public/
    └── src/
        ├── App.jsx
        ├── index.css
        ├── main.jsx
        ├── components/
        │   ├── AutoComplete.jsx
        │   ├── GoBackButton.jsx
        │   ├── Loader.jsx
        │   └── ProtectedRoute.jsx
        ├── contexts/
        │   └── AuthContext.jsx
        ├── pages/
        │   ├── Hero.jsx
        │   ├── admin/
        │   │   ├── AddBulkUser.jsx
        │   │   ├── AddPS.jsx
        │   │   ├── AddTeam.jsx
        │   │   ├── AddUser.jsx
        │   │   ├── AdminDashboard.jsx
        │   │   ├── CheckIn.jsx
        │   │   ├── CheckInQR.jsx
        │   │   ├── CheckedInUsers.jsx
        │   │   ├── Dashboard.jsx
        │   │   ├── FoodQR.jsx
        │   │   ├── Participants.jsx
        │   │   └── Teams.jsx
        │   ├── auth/
        │   │   ├── Login.jsx
        │   │   └── RoleSelection.jsx
        │   ├── judge/
        │   │   ├── AssignedTeams.jsx
        │   │   ├── EditMarks.jsx
        │   │   ├── GiveMarks.jsx
        │   │   └── Judge.jsx
        │   ├── participant/
        │   │   ├── Certificate.jsx
        │   │   ├── CheckIn.jsx
        │   │   ├── Food.jsx
        │   │   ├── Participant.jsx
        │   │   ├── Photos.jsx
        │   │   └── ProblemStatement.jsx
        │   └── superadmin/
        │       ├── AddTeam.jsx
        │       ├── AddUser.jsx
        │       ├── AssignJudges.jsx
        │       ├── AssignedJudges.jsx
        │       ├── Dashboard.jsx
        │       ├── LeaderBoard.jsx
        │       ├── Participants.jsx
        │       ├── SuperAdminDashboard.jsx
        │       └── Teams.jsx
        └── services/
            └── api.js
```

---

## Installation

To set up the project locally, follow these steps:

### Prerequisites

- **Node.js** (v14 or higher)
- **npm** (v6 or higher)

### Steps

1. Clone the repository:
    ```bash
    git clone https://github.com/rsayyed591/Hack-Management-Frontend.git
    ```
2. Navigate to the project directory:
    ```bash
    cd Hack-Management-Frontend
    ```
3. Install dependencies:
    ```bash
    npm install
    ```
4. Create a `.env` file in the root directory and add necessary environment variables.
5. Start the development server:
    ```bash
    npm run dev
    ```

---

## Contributing

Contributions make the open-source community an amazing place to learn and grow. Any contributions you make are **greatly appreciated**.

### Steps to Contribute:

1. Fork the repository.
2. Create a feature branch:
    ```bash
    git checkout -b feature/YourFeature
    ```
3. Commit your changes:
    ```bash
    git commit -m 'Add YourFeature'
    ```
4. Push to the branch:
    ```bash
    git push origin feature/YourFeature
    ```
5. Open a pull request.

---

## License

This project is distributed under the **MIT License**. See the `LICENSE` file for details.

---

## Contact

- **Rehan Sayyed** - [LinkedIn](https://linkedin.com/in/rehan42) - rehansayyed591@gmail.com  
- **Project Repository** - [GitHub Repo](https://github.com/rsayyed591/Hack-Management-Frontend)

---

## Acknowledgements

- [React](https://reactjs.org)
- [Node.js](https://nodejs.org)
- [Tailwind CSS](https://tailwindcss.com)
- [Vercel](https://vercel.com)
- [GitHub](https://github.com)

Special thanks to **Rehan Shah** for developing the backend. Visit his GitHub profile: [rehannn03](https://github.com/rehannn03).

