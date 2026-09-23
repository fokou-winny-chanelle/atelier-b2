import { ResultsScreen } from "@/components/session/ResultsScreen";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <ResultsScreen sessionId={id} />;
}
