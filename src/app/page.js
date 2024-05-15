import Image from "next/image";
import Header from "@/components/header";
import Footer from "@/components/footer";



export default function Home() {
  return (
    <main>
      <div>
        <Header />
        <div className="min-h-screen flex items-center justify-center bg-white text-black">
            <div className="text-center">
                <h1 className="text-4xl font-bold mb-4">Welcome to Y</h1>
                <p className="text-lg mb-2">The Social Media site that asks the important questions</p>
                <p className="text-lg mb-2">like Y, should i post this?</p>
                <p className="text-lg mb-2">Y would anybody care?</p>
                <p className="text-lg mb-2">Y am i telling Strangers about this?</p>
                <h2 className="text-2xl font-bold mt-4">Most importantly Y?</h2>
            </div>
        </div>
        <Footer />
      </div>
    </main>
  );
}
