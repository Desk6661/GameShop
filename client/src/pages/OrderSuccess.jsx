import { Link } from "react-router-dom";

function OrderSuccess() {
    return (
        <div className="min-h-screen bg-zinc-950 px-6 py-16 text-white">

            <div className="mx-auto max-w-2xl text-center">

                <div className="text-6xl">
                    ✓
                </div>

                <h1 className="mt-6 text-4xl font-bold">
                    Order Placed!
                </h1>

                <p className="mt-4 text-zinc-400">
                    Your order has been created successfully.
                </p>

                <div className="mt-8 flex justify-center gap-4">

                    <Link
                        to="/"
                        className="rounded-lg bg-white px-6 py-3 font-semibold text-black"
                    >
                        Continue Shopping
                    </Link>

                    <Link
                        to="/profile"
                        className="rounded-lg border border-zinc-700 px-6 py-3 font-semibold text-white"
                    >
                        View Profile
                    </Link>

                </div>

            </div>

        </div>
    );
}

export default OrderSuccess;