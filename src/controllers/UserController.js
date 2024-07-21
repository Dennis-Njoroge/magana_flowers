import jwt from 'jsonwebtoken';
import * as userRepository from '@/repositories/UserRepository';
import bcrypt from "bcryptjs";


export const createUser = async (req, res) => {
    try {
        const user = await userRepository.createUser(req.body);
        if (!user){
            res.status(400).json({
                success: false,
                message: "Account already exists. Please proceed with log in."
            })
        }
        res.status(201).json({ success: true, message: 'User registered successfully', });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export const getAllUsersHandler = async (req, res) => {
    try {
        const users = await userRepository.getUsers(req?.query);
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    let response = {
        success: false,
        message: '',
    }
    try {
        const user = await userRepository.searchUserByEmail(email);
        if (!user) {
            return res.status(404).json({ message: 'User not registered, proceed with registration' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        if (user.status !== 'active'){
            return res.status(400).json({
                ...response,
                message: "Account is pending activation. Please try again after 5 mins"
            })
        }

        const token = jwt.sign({ id: user.id, username: user?.username, userType: user?.user_type}, process.env.NEXT_PUBLIC_JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ success: true, message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

