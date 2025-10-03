import { Link } from 'react-router-dom';

export default function NotFound() {
    return (
        <div>
            <h1>Page Not Found</h1>
            <p>Sorry, the page you are looking for does not exist.</p>
            <Link to="/">Go back to the Home Page</Link>
        </div>
    );
}