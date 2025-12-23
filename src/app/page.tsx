export default function Home() {
  return (
    <main className="flex min-h-screen flex-col justify-center items-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* App name text : */}
        <div className="text-center space-y-2">
          <h1 className="text-5xl font-bold tracking-tight text-green-500">
            {">"}AfterTen
          </h1>

          <p className="text-zinc-500 text-sm">
            A private, secure & self-destructing chat room.
          </p>
        </div>
      </div>
    </main>
  );
}
