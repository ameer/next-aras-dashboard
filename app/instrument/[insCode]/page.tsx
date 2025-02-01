export const dynamicParams = false
export async function generateStaticParams() {
  return [
    { insCode: 'default' }
  ];
}
export default async function Page({
  params,
}: {
  params: Promise<{ insCode: string }>
}) {
  const insCode = (await params).insCode
  return <div>My Post: {insCode}</div>
}