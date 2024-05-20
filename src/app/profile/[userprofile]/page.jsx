import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import ProfileForm from "@/components/ProfileForm";

export default async function Page({ params }) {
  const data = await db.query(
    `SELECT * FROM posts WHERE profile_id = ${params.userprofile};`
  );
  console.log(data);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8 bg-white shadow-md rounded-lg">
        <ProfileForm />
        <h3 className="text-xl font-semibold mb-4 mt-6">User Posts</h3>
        <div className="space-y-4">
          {data.rows.map((post) => (
            <div key={post.id} className="p-4 border rounded-lg bg-gray-50">
              <p>{post.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
