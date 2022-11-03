import Link from 'next/link';

interface GetDataOutput {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}

export default async function Page() {
  const result = await getData();

  return (
    <div>
      <h1>{result.id}</h1>
      <Link href="/login">
        Login Link
      </Link>
    </div>
  )
}

async function getData(): Promise<GetDataOutput> {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
  const result = await response.json();

  return result;
}