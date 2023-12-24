import { useState } from "react";
import axios from "axios";

export default function SignUp() {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    async function signUpUser(ev) {
        ev.preventDefault();
        await axios.post('/signup', {
            username: formData.username,
            password: formData.password
        });
    }

    function handleChange(event) {
        const { name, value } = event.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }

    return (
        <div className="bg-blue-50 h-screen flex items-center">
            <form className="w-64 mx-auto" onSubmit={signUpUser}>
                <input
                    type="text"
                    placeholder="Username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="block w-full p-2 rounded-md m-2 border"
                />
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="block w-full p-2 rounded-md m-2 border"
                />
                <button
                    type="submit"
                    className="bg-blue-500 block w-full p-1 rounded-md m-2 border"
                >
                    Sign Up
                </button>
            </form>
        </div>
    );
}
