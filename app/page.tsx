import BarChart from "@/components/viz/BarChart";

export default function Home() {
  const data = [
    { label: 'A', value: 10 },
    { label: 'B', value: 20 },
    { label: 'C', value: 15 },
    { label: 'D', value: 25 },
    { label: 'E', value: 30 },
  ];

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex mb-10">
        <h1 className="text-4xl font-bold">D3.js Visualization Project</h1>
      </div>

      <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-md dark:bg-zinc-800">
        <h2 className="text-2xl font-semibold mb-6 text-center">Sample Bar Chart</h2>
        <BarChart data={data} />
      </div>
    </main>
  );
}
