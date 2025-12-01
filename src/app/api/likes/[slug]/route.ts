import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { hashIp } from "@/lib/hashIp";

export async function GET(
    req: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await params;
        const client = await clientPromise;
        const db = client.db("blog");

        // Get user IP
        const ip =
            req.headers.get("x-forwarded-for")?.split(",")[0] ||
            req.headers.get("x-real-ip") ||
            "0.0.0.0";

        const userHash = hashIp(ip);

        const post = await db.collection("likes").findOne({ slug });

        const likesByUser = post?.likesByUser ?? {};
        const total = Object.values(likesByUser).reduce(
            (a: number, b: any) => a + (Number(b) || 0),
            0
        );
        const userLikes = likesByUser[userHash] ?? 0;

        return NextResponse.json({
            total,
            userLikes,
        });
    } catch (error) {
        console.error("Error fetching likes:", error);
        return NextResponse.json(
            { error: "Failed to fetch likes" },
            { status: 500 }
        );
    }
}

export async function POST(
    req: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await params;
        const client = await clientPromise;
        const db = client.db("blog");

        // Get user IP (works on Vercel too)
        const ip =
            req.headers.get("x-forwarded-for")?.split(",")[0] ||
            req.headers.get("x-real-ip") ||
            "0.0.0.0";

        const userHash = hashIp(ip);

        const post = await db.collection("likes").findOne({ slug });

        const userLikes = post?.likesByUser?.[userHash] ?? 0;

        if (userLikes >= 16) {
            return NextResponse.json(
                { message: "limit-reached" },
                { status: 403 }
            );
        }

        await db.collection("likes").updateOne(
            { slug },
            {
                $setOnInsert: { slug },
                $inc: {
                    [`likesByUser.${userHash}`]: 1,
                },
            },
            { upsert: true }
        );

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error updating likes:", error);
        return NextResponse.json(
            { error: "Failed to update likes" },
            { status: 500 }
        );
    }
}
