import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../globalState/GlobalState";
import useForm from "./useForm";

import Error from "../Error";
// import Success from "../Success";

const Form = () => {
	const { user, isLoading, error, registerUser } = useContext(GlobalContext);
	// const [showSuccess, setShowSuccess] = useState(false);

	const init = {
		username: "",
		password: "",
		password2: "",
		email: "",
		agree: null,
		city: "",
		skills: [],
		description: "",
	};

	const validator = (values) => {
		const errors = {};

		if (!values.username) {
			errors.username = "Username is required!";
		}

		if (!values.password) {
			errors.password = "Password is required!";
		}

		if (!values.password2) {
			errors.password2 = "Repeat the password";
		}

		if (values.password2 && values.password !== values.password2) {
			errors.password2 = "Password is not the same!";
		}

		if (!values.city) {
			errors.city = "Select a city.";
		}

		return errors;
	};

	const onSubmit = (val) => {
		setTimeout(() => {
			setIsSubmitting(false);
		}, 1000);

		// resetForm();

		registerUser(val);
	};

	// useEffect(() => {
	// 	if (user) {
	// 		setShowSuccess(true);
	// 	}
	// }, [user]);

	const {
		values,
		errors,
		touched,
		isSubmitting,
		setIsSubmitting,
		dirty,
		resetForm,
		handleChange,
		handleChecked,
		handleBlur,
		handleSubmit,
	} = useForm({ init, validator, onSubmit });

	// console.log({ errors }, { dirty }, { touched }, { values });

	if (isLoading) {
		return (
			<p style={{ fontWeight: "bold", color: "orangered" }}>Loading...</p>
		);
	}

	return (
		<div>
			<h1>Register</h1>

			{error && <Error message={error} />}
			{/* {showSuccess && <Success message={"Successfully registered"} />} */}
			<form
				onSubmit={handleSubmit}
				style={{
					display: "flex",
					flexDirection: "column",
					gap: "10px",
				}}
			>
				<label htmlFor="username">
					<span>Username</span>
					<input
						type="text"
						name="username"
						value={values.username}
						onChange={handleChange}
						onBlur={handleBlur}
					/>
					{touched.username && errors.username && (
						<p style={{ color: "red" }}>{errors.username}</p>
					)}
				</label>

				<label htmlFor="password">
					<span>Password</span>
					<input
						type="text"
						name="password"
						value={values.password}
						onChange={handleChange}
						onBlur={handleBlur}
					/>
					{touched.password && errors.password && (
						<p style={{ color: "red" }}>{errors.password}</p>
					)}
				</label>

				<label htmlFor="password2">
					<span>Repeat password</span>
					<input
						type="text"
						name="password2"
						value={values.password2}
						onChange={handleChange}
						onBlur={handleBlur}
					/>
					{touched.password2 && errors.password2 && (
						<p style={{ color: "red" }}>{errors.password2}</p>
					)}
				</label>

				<div
					className="agree"
					style={{ display: "flex", alignItems: "center" }}
				>
					<h5>Agree?</h5>
					<label htmlFor="agree">
						<span>Yes</span>
						<input
							type="radio"
							name="agree"
							value={"yes"}
							onChange={handleChange}
							checked={values.agree === "yes"}
						/>
					</label>
					<label htmlFor="agree">
						<span>No</span>
						<input
							type="radio"
							name="agree"
							value={"no"}
							onChange={handleChange}
							checked={values.agree === "no"}
						/>
					</label>
				</div>

				<div>
					<select
						name="city"
						value={values.city}
						onChange={handleChange}
					>
						<option defaultValue={values.city} hidden>
							select a city...
						</option>
						<option value="ny">New York</option>
						<option value="dc">Washington</option>
						<option value="ch">Chicago</option>
					</select>
					{touched.city && errors.city && (
						<p style={{ color: "red" }}>{errors.city}</p>
					)}
				</div>

				<div
					style={{
						display: "flex",
						alignItems: "center",
						gap: "10px",
					}}
				>
					<h5>Skills:</h5>
					<label htmlFor="js">
						<span>JavaScript</span>
						<input
							type="checkbox"
							name="skills"
							value="js"
							checked={values?.skills?.includes("js")}
							onChange={(e) => handleChecked(e, true)}
						/>
					</label>

					<label htmlFor="html">
						<span>HTML</span>
						<input
							type="checkbox"
							name="skills"
							value="html"
							checked={values?.skills?.includes("html")}
							onChange={(e) => handleChecked(e, true)}
						/>
					</label>
				</div>

				<div>
					<textarea
						name="description"
						value={values.description}
						onChange={handleChange}
						cols="30"
						rows="10"
					></textarea>
				</div>

				<div>
					<button disabled={isSubmitting || dirty} type="submit">
						Register
					</button>
				</div>
			</form>
		</div>
	);
};

export default Form;
