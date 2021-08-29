import { useState } from "react";


const SystemAdminDashboard = () => {

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const openSidebar = () => {
        setSidebarOpen(true);
    }

    const closeSidebar = () => {
        setSidebarOpen(false);
    }

    return(
        <div className="containerAdmin">
            <h1>System Admin Dashboard</h1>
        </div>
    );
    
}

export default SystemAdminDashboard;