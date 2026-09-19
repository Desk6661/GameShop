import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMyOrders } from "../services/orderService";

function Orders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadOrders = async () => {
            try {
                const data = await getMyOrders();

                setOrders(data.orders);
            } catch (error) {
                console.error(error);

                setError("Failed to load orders");
            } finally {
                setLoading(false);
            }
        };

        loadOrders();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-zinc-950 p-8 text-zinc-400">
                Loading orders...
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-zinc-950 p-8 text-red-400">
                {error}
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-zinc-950 px-6 py-10 text-white">

            <div className="mx-auto max-w-5xl">

                <h1 className="text-4xl font-bold">
                    My Orders
                </h1>

                {orders.length === 0 ? (
                    <div className="mt-10 rounded-2xl border border-zinc-800 bg-zinc-900 p-10 text-center">

                        <p className="text-zinc-400">
                            You haven't placed any orders yet.
                        </p>

                        <Link
                            to="/"
                            className="mt-6 inline-block rounded-lg bg-white px-6 py-3 font-semibold text-black"
                        >
                            Browse Games
                        </Link>

                    </div>
                ) : (
                    <div className="mt-8 space-y-5">

                        {orders.map((order) => (
                            <div
                                key={order._id}
                                className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6"
                            >

                                <div className="flex flex-col justify-between gap-3 sm:flex-row">

                                    <div>
                                        <p className="text-sm text-zinc-500">
                                            Order
                                        </p>

                                        <p className="font-mono text-sm text-zinc-300">
                                            #{order._id}
                                        </p>
                                    </div>

                                    <div className="text-sm text-zinc-400">
                                        {new Date(
                                            order.createdAt
                                        ).toLocaleDateString()}
                                    </div>

                                </div>

                                <div className="my-5 border-t border-zinc-800" />

                                <div className="space-y-3">

                                    {order.items.map((item, index) => (
                                        <div
                                            key={`${order._id}-${index}`}
                                            className="flex items-center justify-between"
                                        >
                                            <div>
                                                <p className="font-medium">
                                                    {item.title}
                                                </p>

                                                <p className="text-sm text-zinc-500">
                                                    Quantity: {item.quantity}
                                                </p>
                                            </div>

                                            <p className="font-semibold">
                                                ₹
                                                {Math.round(
                                                    item.finalPrice *
                                                    item.quantity
                                                )}
                                            </p>
                                        </div>
                                    ))}

                                </div>

                                <div className="my-5 border-t border-zinc-800" />

                                <div className="flex items-center justify-between">

                                    <span
                                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                            order.status === "completed"
                                                ? "bg-green-500/10 text-green-400"
                                                : order.status === "cancelled"
                                                ? "bg-red-500/10 text-red-400"
                                                : "bg-yellow-500/10 text-yellow-400"
                                        }`}
                                    >
                                        {order.status}
                                    </span>

                                    <div className="text-right">
                                        <p className="text-sm text-zinc-500">
                                            Total
                                        </p>

                                        <p className="text-xl font-bold">
                                            ₹{Math.round(order.total)}
                                        </p>
                                    </div>

                                </div>

                            </div>
                        ))}

                    </div>
                )}

            </div>
        </div>
    );
}

export default Orders;