import { useState, createContext } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [usernameErr, setUsernameErr] = useState('');
	const [emailErr, setEmailErr] = useState('');
	const [passwordErr, setPasswordErr] = useState('');
	const [confirmPasswordErr, setConfirmPasswordErr] = useState('');

	return (
		<AuthContext.Provider
			value={{
				username,
				setUsername,
				email,
				setEmail,
				password,
				setPassword,
				confirmPassword,
				setConfirmPassword,
				usernameErr,
				setUsernameErr,
				emailErr,
				setEmailErr,
				passwordErr,
				setPasswordErr,
				confirmPasswordErr,
				setConfirmPasswordErr
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export { AuthContext, AuthProvider };
