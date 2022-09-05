import { Link } from "react-router-dom";
import { App } from "../app/App";

export function NotFound() {
    return (
        <div>
            <h1>404 = PAGE NOT FOUND</h1>
            <Link to="/" element={<App />}>Home</Link>
        </div>
        
    );
}