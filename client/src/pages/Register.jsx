import axios from "axios";
import { useState } from "react";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        setError("");

        if (!name || !email || !password || !confirmPassword) {
            setError("Please fill in all fields.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            const response = await axios.post(
                "http://localhost:5000/api/auth/register",
                {
                    name,
                    email,
                    password
                }
            );

            console.log("Registration successful:", response.data);
        } catch (error) {
            console.error(
                "Registration failed:",
                error.response?.data || error.message
            );
        }
    };

    return (
        <div>
            <h1>Create your GameShop account</h1>

            {error && <p>{error}</p>}

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name</label>

                    <input
                        type="text"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    />
                </div>

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
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </div>

                <div>
                    <label>Confirm Password</label>

                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(event) => setConfirmPassword(event.target.value)}
                    />
                </div>

                <button type="submit">Create Account</button>
            </form>
        </div>
    );
}

export default Register;
