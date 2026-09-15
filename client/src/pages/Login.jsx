import { useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

function Login() {
    const { login } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        setError("");
        setSuccess("");

        if (!email || !password) {
            setError("Please enter your email and password.");
            return;
        }

        try {
            const response = await api.post("/auth/login", {
                email,
                password
            });

            const { token, user } = response.data;

            login(user, token);

            setSuccess("Login successful!");

            console.log("Logged in user:", user);
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Something went wrong. Please try again."
            );
        }
    };

    return (
        <div>
            <h1>Login to GameShop</h1>

            {error && <p>{error}</p>}
            {success && <p>{success}</p>}

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email</label>

                    <input
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </div>

                <div>
                    <label>Password</label>

                    <input
                        type="password"
                        value={password}
                        onChange={(event) =>
                            setPassword(event.target.value)
                        }
                    />
                </div>

                <button type="submit">
                    Login
                </button>
            </form>

            <button
                type="button"
                onClick={async () => {
                    try {
                        const response = await api.get("/auth/me");

                        console.log("Protected response:", response.data);
                    } catch (error) {
                        console.error(
                            "Protected request failed:",
                            error.response?.data
                        );
                    }
                }}
            >
                Test Authentication
            </button>
        </div>
    );
}

export default Login;