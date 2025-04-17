'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Post } from './types/board';
import Layout from './components/Layout';

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      title: '첫 번째 게시글',
      content: '안녕하세요!',
      author: '홍길동',
      createdAt: '2024-04-17',
      updatedAt: '2024-04-17'
    },
    {
      id: 2,
      title: '두 번째 게시글',
      content: '반갑습니다!',
      author: '김철수',
      createdAt: '2024-04-17',
      updatedAt: '2024-04-17'
    },
    {
      id: 3,
      title: '세 번째 게시글',
      content: '좋은 하루 되세요!',
      author: '이영희',
      createdAt: '2024-04-17',
      updatedAt: '2024-04-17'
    },
    {
      id: 4,
      title: '네 번째 게시글',
      content: '오늘도 화이팅!',
      author: '박민수',
      createdAt: '2024-04-17',
      updatedAt: '2024-04-17'
    },
    {
      id: 5,
      title: '다섯 번째 게시글',
      content: '즐거운 하루입니다.',
      author: '정수진',
      createdAt: '2024-04-17',
      updatedAt: '2024-04-17'
    },
    {
      id: 6,
      title: '여섯 번째 게시글',
      content: '행복한 하루 되세요!',
      author: '강지원',
      createdAt: '2024-04-17',
      updatedAt: '2024-04-17'
    },
    {
      id: 7,
      title: '일곱 번째 게시글',
      content: '새로운 소식입니다.',
      author: '조민재',
      createdAt: '2024-04-17',
      updatedAt: '2024-04-17'
    },
    {
      id: 8,
      title: '여덟 번째 게시글',
      content: '오늘의 이야기입니다.',
      author: '윤서연',
      createdAt: '2024-04-17',
      updatedAt: '2024-04-17'
    },
    {
      id: 9,
      title: '아홉 번째 게시글',
      content: '새로운 소식을 전합니다.',
      author: '임현우',
      createdAt: '2024-04-17',
      updatedAt: '2024-04-17'
    },
    {
      id: 10,
      title: '열 번째 게시글',
      content: '마지막 소식입니다.',
      author: '한미영',
      createdAt: '2024-04-17',
      updatedAt: '2024-04-17'
    },
    {
      id: 11,
      title: '열한 번째 게시글',
      content: '추가 소식입니다.',
      author: '송지훈',
      createdAt: '2024-04-17',
      updatedAt: '2024-04-17'
    }
  ]);

  // 현재 페이지의 게시글만 필터링
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(posts.length / postsPerPage);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">전체 게시글</h2>
        <Link
          href="/posts/new"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          글쓰기
        </Link>
      </div>

      <div className="bg-white shadow-md rounded-lg">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">번호</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">제목</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">작성자</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">작성일</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentPosts.map((post) => (
              <tr key={post.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">{post.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Link href={`/posts/${post.id}`} className="text-blue-600 hover:text-blue-800">
                    {post.title}
                  </Link>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{post.author}</td>
                <td className="px-6 py-4 whitespace-nowrap">{post.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 페이지네이션 */}
      <div className="flex justify-center mt-4">
        <nav className="flex items-center gap-1">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded border border-gray-300 disabled:opacity-50"
          >
            이전
          </button>
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index + 1}
              onClick={() => paginate(index + 1)}
              className={`px-3 py-1 rounded border ${currentPage === index + 1
                ? 'bg-blue-500 text-white'
                : 'border-gray-300 hover:bg-gray-100'
                }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded border border-gray-300 disabled:opacity-50"
          >
            다음
          </button>
        </nav>
      </div>
    </Layout>
  );
}
