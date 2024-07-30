const Account = require('../model/AccountSchema');

// Controller method to add a new account
exports.addAccount = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if an account with the given email or username already exists
        const existingAccount = await Account.findOne({ $or: [{ email }, { username }] });
        if (existingAccount) {
            return res.status(400).json({
                success: false,
                message: 'Account with this email or username already exists'
            });
        }

        // Create a new account instance
        const newAccount = new Account({ username, email, password });

        // Save the new account to the database
        const savedAccount = await newAccount.save();

        res.status(201).json({
            success: true,
            account: savedAccount
        });
    } catch (error) {
        console.error('Register Error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to register account'
        });
    }
};

// Login method
exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        // Find account by username and password
        const account = await Account.findOne({ username, password });
        if (account) {
            res.status(200).json({
                success: true,
                message: 'Login successful',
                account
            });
        } else {
            res.status(401).json({
                success: false,
                message: 'Invalid username or password'
            });
        }
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to login'
        });
    }
};


// Update account method
exports.updateAccount = async (req, res) => {
    const { id, username, email, password } = req.body;
    try {
        // Find and update the account
        const updatedAccount = await Account.findByIdAndUpdate(
            id,
            { username, email, password }, // Update only the provided fields
            { new: true, runValidators: true } // Return the updated document and run validators
        );

        if (!updatedAccount) {
            return res.status(404).json({
                success: false,
                message: 'Account not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Account updated successfully',
            account: updatedAccount
        });
    } catch (error) {
        console.error('Error updating account:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update account'
        });
    }
};
