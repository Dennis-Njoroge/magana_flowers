import jwt from 'jsonwebtoken';
import * as userRepository from '@/repositories/UserRepository';
import bcrypt from "bcryptjs";
import {PASSWORD_ACTIONS} from "@/utils/constants";


export const createUserHandler = async (req, res) => {
    try {
        const user = await userRepository.createUser(req.body);
        if (!user){
            res.status(400).json({
                success: false,
                message: "Account already exists."
            })
        }
        res.status(201).json({ success: true, message: 'User registered successfully', });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export const updateUserHandler = async (req, res) => {
    try {
        if (!Boolean(req.body)){
            return res.status(400).json({ error: "Invalid payload supplied!"})
        }
        const user = await userRepository.updateUser(req.query.id, req.body);
        if (!user){
            res.status(404).json({
                success: false,
                message: "User not found"
            })
        }
        res.status(201).json({ success: true, message: 'User details updated successfully', });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
export const approveUserHandler = async (req, res) => {
    try {
        if (!req.body?.status){
            return res.status(400).json({ error: "Status is required"})
        }
        const user = await userRepository.updateUser(req.query.id, req.body);
        if (!user){
            res.status(404).json({
                success: false,
                message: "User not found"
            })
        }
        res.status(201).json({ success: true, message: 'User status updated successfully', });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
export const changeResetPasswordHandler = async (req, res) => {
    try {

        if (!req.body.action || (req.body.action !== PASSWORD_ACTIONS.FORGOT && req.body.action !== PASSWORD_ACTIONS.CHANGE && req.body.action !== PASSWORD_ACTIONS.RESET ) ){
            return res.status(400).json({ error: 'No/invalid action provided.' });
        }

        // if (!req.body.password){
        //     return res.status(400).json({ error: 'No password provided.' });
        // }

        const user = await userRepository.searchUserByEmail(req.body.email);
        if (!user){
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        if (req.body.action === PASSWORD_ACTIONS.CHANGE){
            if (!req.body.current_password){
                return res.status(400).json({ error: 'No current password provided.' });
            }
            const isMatch = await bcrypt.compare(req.body.current_password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Current password is invalid!' });
            }
        }

        const newPassword = req.body.action === PASSWORD_ACTIONS.RESET ? '12345678' : req.body.password

        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(newPassword, salt);

        const updatedUser = await userRepository.updateUser(user.id, { password });
        if (!updatedUser){
            return res.status(400).json({ user: updatedUser, message: 'An error occurred while updating password.' });
        }

        res.status(201).json({ success: true, message: 'Password updated successfully', });
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

export const getUserHandler = async (req, res) => {
    try {
        const user = await userRepository.getUser(req?.query.id);
        res.status(200).json(user);
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

