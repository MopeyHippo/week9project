import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

export default async function Posts() {
  const { userId } = auth();

  const posts = await db.query(`SELECT
    posts.id,
    posts.content,
    profiles.username
  from
    posts
    inner join profiles on posts.profile_id = profiles.id;`);

  async function handleAddPost(formData) {
    "use server";
    const content = formData.get("content");
    const result = await db.query(
      `SELECT id FROM profiles WHERE clerk_id = '${userId}'`
    );
    const profileId = result.rows[0].id;

    await db.query(
      `INSERT INTO posts (profile_id, content) VALUES (${profileId}, '${content}')`
    );
    revalidatePath("/posts");
  }
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Posts</h2>
        <SignedIn>
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Create New Post</h3>
            <form action={handleAddPost} className="space-y-4">
              <textarea
                name="content"
                placeholder="What's happening?"
                className="w-full h-24 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              ></textarea>
              <button className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600">
                Submit
              </button>
            </form>
          </div>
        </SignedIn>
        <SignedOut>
          <p className="mb-6 text-red-500">You must be signed in to make a post</p>
          <SignInButton />
        </SignedOut>

        <h3 className="text-xl font-semibold mb-4">All Posts</h3>
        <div className="space-y-4">
          {posts.rows.map((post) => {
            return (
              <div key={post.id} className="p-4 border rounded-lg bg-gray-50">
                <h4 className="font-bold text-lg">{post.username} says...</h4>
                <p className="mt-2">{post.content}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
