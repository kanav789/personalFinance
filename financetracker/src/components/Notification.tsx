import React, { useEffect, useState } from "react";

interface NotificationProps {
    message: string;
    duration?: number; // in milliseconds (optional, default: 3000ms)
    onClose?: () => void; // optional callback when notification closes
}

const Notification: React.FC<NotificationProps> = ({ message, duration = 3000, onClose }) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
            if (onClose) onClose();
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    if (!visible) return null;

    return (
        <div
            style={{
                position: "fixed",
                top: "30px",
                right: "30px",
                background: "black",
                color: "#fff",
                padding: "16px 24px",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                zIndex: 9999,
                minWidth: "200px",
                fontSize: "16px",
            }}
        >
            {message}
        </div>
    );
};

export default Notification;
