import NodeMap from "@/components/NodeMap";
import Navigation from "@/components/Navigation";

export const metadata = {
  title: "mapa — bratzche journal",
};

export default function Mapa() {
  return (
    <>
      <Navigation />
      <main className="h-screen bg-negro overflow-hidden">
        <NodeMap />
      </main>
    </>
  );
}
