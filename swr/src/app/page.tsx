"use client";
import useSWR from 'swr';

export const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function HomePage() {
  const { data, error, isLoading } = useSWR(`https://jsonplaceholder.typicode.com/users/1`, fetcher,{refreshInterval:10000});

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Failed to fetch user data.</div>;
  }

  if (!data) {
    return <div>No user found.</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">User Info</h1>
      <p className="text-lg"><strong>Name:</strong> {data.name}</p>
      <p className="text-lg"><strong>Email:</strong> {data.email}</p>
      <p className="text-lg"><strong>Phone:</strong> {data.phone}</p>
      <p className="text-lg"><strong>Website:</strong> {data.website}</p>
    </div>
  );
}
