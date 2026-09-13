import axios from "axios";

function App() {
    const createUser = async () => {
        try {
            const response = await axios.post(
                "http://localhost:5000/api/test-user"
            );

            console.log("User created:", response.data);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div>
            <h1>GameShop</h1>

            <button onClick={createUser}>
                Create Test User
            </button>
        </div>
    );
}

export default App;