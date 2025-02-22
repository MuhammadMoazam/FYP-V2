import React, { useState } from 'react';
import useUser from '../../../components/Contexts/User/useUser';
import useApi from '../../../components/Contexts/API/useApi';
import './Components.css';
import ClipLoader from "react-spinners/ClipLoader";

const AccountDetails = () => {
    const { user, updateUserData } = useUser();
    const { updateUser } = useApi();
    const [formData, setFormData] = useState({
        email: user?.email || '',
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: '',
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const validateForm = () => {
        const newErrors = {};

        if (formData.newPassword && formData.newPassword.length < 6) {
            newErrors.newPassword = 'Password must be at least 6 characters long';
        }

        if (formData.newPassword && formData.newPassword !== formData.confirmNewPassword) {
            newErrors.confirmNewPassword = 'Passwords do not match';
        }

        if (formData.newPassword && !formData.currentPassword) {
            newErrors.currentPassword = 'Current password is required to set a new password';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
        setSuccessMessage('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsLoading(true);
        try {
            const updateData = {
                email: formData.email,
                currentPassword: formData.currentPassword,
                newPassword: formData.newPassword || undefined
            };

            const response = await updateUser(updateData);

            if (response.success) {
                updateUserData(response.user);
                setSuccessMessage('Account details updated successfully!');
                // Clear password fields
                setFormData(prev => ({
                    ...prev,
                    currentPassword: '',
                    newPassword: '',
                    confirmNewPassword: ''
                }));
            } else {
                setErrors({
                    submit: response.message || 'Failed to update account details'
                });
            }
        } catch (error) {
            setErrors({
                submit: 'An error occurred while updating your account details'
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="account-details">
            <h2>Account Details</h2>

            {successMessage && (
                <div className="success-message">
                    {successMessage}
                </div>
            )}

            {errors.submit && (
                <div className="error-message">
                    {errors.submit}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        disabled={isLoading}
                    />
                    {errors.email && (
                        <span className="error-text">{errors.email}</span>
                    )}
                </div>

                <div className="password-change-section">
                    <h3>Password Change</h3>
                    <div className="form-group">
                        <label htmlFor="currentPassword">Current password (leave blank to leave unchanged)</label>
                        <input
                            type="password"
                            id="currentPassword"
                            name="currentPassword"
                            value={formData.currentPassword}
                            onChange={handleInputChange}
                            disabled={isLoading}
                        />
                        {errors.currentPassword && (
                            <span className="error-text">{errors.currentPassword}</span>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="newPassword">New password (leave blank to leave unchanged)</label>
                        <input
                            type="password"
                            id="newPassword"
                            name="newPassword"
                            value={formData.newPassword}
                            onChange={handleInputChange}
                            disabled={isLoading}
                        />
                        {errors.newPassword && (
                            <span className="error-text">{errors.newPassword}</span>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirmNewPassword">Confirm new password</label>
                        <input
                            type="password"
                            id="confirmNewPassword"
                            name="confirmNewPassword"
                            value={formData.confirmNewPassword}
                            onChange={handleInputChange}
                            disabled={isLoading}
                        />
                        {errors.confirmNewPassword && (
                            <span className="error-text">{errors.confirmNewPassword}</span>
                        )}
                    </div>
                </div>

                <button className='submit-button' disabled={isLoading}> {
                    isLoading ? (<ClipLoader
                        color={'white'}
                        loading={isLoading}
                        size={30}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />) : 'Save Changes'
                } </button>
            </form>
        </div>
    );
};

export default AccountDetails;
