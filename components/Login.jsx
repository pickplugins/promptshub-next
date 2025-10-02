"use client";

import { useState } from "react";
import { useAuth } from "./auth-context";
import { useRouter } from "next/navigation";
import Spinner from "/components/Spinner";

export default function Login() {




	const { user, handleLogin, logging } = useAuth();
	const router = useRouter();

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const onSubmit = (e) => {
		//e.preventDefault();
		const success = handleLogin(username, password);

		// if (success) {
		// 	router.push("/"); // redirect after login
		// } else {
		// 	setError("Invalid username or password");
		// }
	};

	if (user) {
		return <p>You are already logged in as {user.name}</p>;
	}

	return (
		<form className="flex flex-col gap-3">
			{error && <p className="text-red-500">{error}</p>}

			<div className="mb-3">
				<label className="block mb-1">Username</label>
				<input
					type="text"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					className="w-full border p-2 rounded"
				/>
			</div>

			<div className="mb-3">
				<label className="block mb-1">Password</label>
				<input
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					className="w-full border p-2 rounded"
				/>
			</div>

			<div
				className="p-3 py-[5px] hover:bg-[#783009] bg-[#783009] text-white  cursor-pointer  rounded-sm  w-full flex gap-2 items-center justify-center"
				onClick={ev => {
					onSubmit()
				}}
			>
				<div>Login</div>


				{logging && <Spinner />}
			</div>

		</form>
	);
}
