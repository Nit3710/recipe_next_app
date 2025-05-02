// import React from "react";

// interface Post {
//   userId: number;
//   id: number;
//   title: string;
//   body: string;
// }

// interface BlogProps {
//   posts: Post[];
// }

// const Blog: React.FC<BlogProps> = ({ posts }) => {
//   return (
//     <div>
//       <h1>Blog Posts</h1>
//       <ul>
//         {posts.map((post) => (
//           <li key={post.id}>
//             <h3>{post.title}</h3>
//             <p>{post.body}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export async function getStaticProps() {
//   const res = await fetch("https://jsonplaceholder.typicode.com/posts");
//   const posts: Post[] = await res.json();

//   return {
//     props: {
//       posts,
//     },
//   };
// }

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

type BlogProps = {
  posts: Post[];
};

const Blog = ({ posts }: BlogProps) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Blog Posts</h1>
      <div className="grid gap-6">
        {posts?.map((post) => (
          <div key={post.id} className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
            <p className="text-gray-600">{post.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  try {
    const data = await fetch("https://jsonplaceholder.typicode.com/posts");
    const posts = await data.json();

    return {
      props: {
        posts
      },
    };
  } catch (error) {
    console.error('Failed to fetch posts:', error);
    return {
      props: {
        posts: []
      }
    };
  }
}

export default Blog;

