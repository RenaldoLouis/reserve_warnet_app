"use client"
import { SetStateAction, useState } from 'react';
import { signIn } from "next-auth/react";
import { useRouter } from 'next/navigation';

const LoginForm = () => {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleEmailChange = (e: { target: { value: SetStateAction<string>; }; }) => setEmail(e.target.value);
    const handlePasswordChange = (e: { target: { value: SetStateAction<string>; }; }) => setPassword(e.target.value);
    const clearInputs = () => {
        setEmail("");
        setPassword("");
        setError("");
    }

    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        signIn("credentials", {
            email,
            password,
            redirect: false
        })
            .then((res) => {
                console.log("res", res)
                if (res) {
                    if (res.error) {
                        setError(JSON.parse(res.error).message);
                    } else {
                        clearInputs();
                        router.push("/");
                    }
                } else {
                    // Handle the case where res is undefined
                    console.error("Sign-in response was undefined");
                }
            })
            .catch((e: any) => console.error(e));
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col space-y-12 w-full px-32"
        >
            <input
                type="text"
                value={email}
                onChange={handleEmailChange}
                placeholder="Enter your email address"
                className="border-b border-b-gray-200 hover:border-b-gray-500"
            />
            <input
                type="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="Enter your password"
                className="border-b border-b-gray-200 hover:border-b-gray-500"
            />
            <button
                type="submit"
                className="border rounded-lg px-6 py-2 bg-gray-100 hover:bg-gray-200 duration-300 uppercase text-sm"
            >
                Log in
            </button>
            {error &&
                <p className="text-red-500 font-bold text-center">
                    {error}
                </p>
            }
        </form>
    )
}

export default LoginForm;