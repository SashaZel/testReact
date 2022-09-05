import { Outlet, Link } from 'react-router-dom';

export function App() {
    return (
        <div>
            <h1>Hello Router World!</h1>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/search">Search</Link>
                    </li>
                    <li>
                        <Link to="/todo">Todo</Link>
                    </li>
                    <li>
                        <Link to="/news">News</Link>
                    </li>
                    <li>
                        <Link to="/game">Game</Link>
                    </li>
                    <li>
                        <Link to="/details">Details</Link>
                    </li>
                </ul>
            </nav>
            <Outlet />
        </div>
    );
}