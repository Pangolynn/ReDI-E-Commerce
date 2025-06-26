import { Link } from "react-router";
export const NotFound = () => {
    return (
        <div className="container mx-auto">
            <h1 className="text-center mt-10 font-extrabold text-3xl">
                404 Page Not Found
            </h1>
            <h2 className="text-center mt-5">
                Sorry this page isn't available.
            </h2>
            <Link
                to="/"
                className="underline text--700 text-center mx-auto mt-5 block hover:text-sakura"
            >
                Go Back Home
            </Link>
        </div>
    );
};
