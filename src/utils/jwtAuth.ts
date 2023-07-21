import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const generateToken = () => {

    // Create expiration time
    const options = { expiresIn: '3h' }

    // generate token for guest user
    return jwt.sign({ user: 'guest' }, `${process.env.SECRET_KEY}`, options);
}