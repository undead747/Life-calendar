import React from 'react';

interface ToggleSwitchProps {
    isChecked: boolean;
    onToggle: (state: boolean) => void;
}

const ToggleSwitch = ({ isChecked, onToggle }: ToggleSwitchProps) => {
    const handleChange = () => {
        onToggle(!isChecked);
    };

    return (
        <label className="flex items-center cursor-pointer">
            <div
                className={`relative w-14 h-8 rounded-full shadow-inner transition-colors duration-300 ${
                    isChecked ? 'bg-gray-800' : 'bg-gray-200'
                }`}
            >
                <div
                    className={`dot absolute w-6 h-6 bg-white rounded-full shadow-md top-1 left-1 transition-transform duration-300 ease-in-out ${
                        isChecked ? 'translate-x-6' : ''
                    }`}
                ></div>
            </div>
            <input
                type="checkbox"
                checked={isChecked}
                onChange={handleChange}
                className="hidden"
            />
        </label>
    );
};

export default ToggleSwitch;
