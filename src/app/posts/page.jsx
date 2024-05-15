import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";

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
  }
  return (
    <div>
      <h2>Posts</h2>
      <SignedIn>
      <h3>Create New Post</h3>
      <form action={handleAddPost}>
        <textarea name="content" placeholder="New Post"></textarea>
        <button>Submit</button>
      </form>
      </SignedIn>
      <SignedOut>
        <p>You Must Be Signed In To Make A Post</p>
        <SignInButton />
      </SignedOut>

      <h3>All Posts</h3>
      <div className="posts">
        {posts.rows.map((post) => {
          return (
            <div key={post.id}>
                <h4>{post.username} says...</h4>
              <p>{post.content}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}