import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export default function ProfileForm() {
    const { userId } = auth();

    async function handleUpdateProfile(formData) {
        "use server";
        const username = formData.get("username");
        const bio = formData.get("bio");

        await db.query(`UPDATE profiles SET username='${username}', bio='${bio}' WHERE clerk_id = '${userId}'`);
        revalidatePath("/");
    }

    return (
        <div className="p-4 border rounded-lg bg-gray-50 mb-6">
            <h2 className="text-2xl font-bold mb-4">Update Profile</h2>
            <p className="mb-4 text-gray-700">Welcome to Y, Please Add a Username!</p>
            <form action={handleUpdateProfile} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700" htmlFor="username">
                        Username
                    </label>
                    <input
                        name="username"
                        id="username"
                        placeholder="Username"
                        className="mt-1 p-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700" htmlFor="bio">
                        Bio
                    </label>
                    <textarea
                        name="bio"
                        id="bio"
                        rows="6"
                        placeholder="Tell us about yourself..."
                        className="mt-1 p-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    ></textarea>
                </div>
                <button className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600">
                    Submit
                </button>
            </form>
        </div>
    );
}