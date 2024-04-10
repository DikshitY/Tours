import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

export const signUp = async (req, res) => {
  const { firstName, lastName, password, confirmPassword, email } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) return res.status(400).json({ success: false, message: 'User already exists.' });

    if (password !== confirmPassword)
      return res.status(400).json({ success: false, message: 'Passwords do not match.' });

    const hashedPassword = await bcrypt.hash(password, 8);

    const newUser = await User.create({ name: `${firstName} ${lastName}`, email, password: hashedPassword });

    const token = jwt.sign({ email: newUser.email, id: newUser._id.toString() }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(201).json({ result: newUser, token });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message, message: 'Try again.' });
  }
};

export const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser) return res.status(404).json({ success: false, message: 'User does not exist.' });

    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

    if (!isPasswordCorrect) return res.status(400).json({ success: false, message: 'Incorrect password or email.' });

    const token = jwt.sign({ email: existingUser.email, id: existingUser._id.toString() }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message, message: 'Try again.' });
  }
};
