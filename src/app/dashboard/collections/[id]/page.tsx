import EditCollectionPage from "./_components/EditCollectionPage";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  return <EditCollectionPage collectionId={resolvedParams.id} />;
}