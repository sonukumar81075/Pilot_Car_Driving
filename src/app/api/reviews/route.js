export async function GET() {
    const res = await fetch("https://jsonplaceholder.typicode.com/todos", {
        // Optional: cache control if needed
        next: { revalidate: 60 }, // ISR-style caching for 60s
    });

    if (!res.ok) {
        return new Response("Failed to fetch todos", { status: 500 });
    }

    const reviews = await res.json();
    return Response.json(reviews);
}