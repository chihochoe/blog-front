'use client';

import { useRouter } from 'next/navigation';
import { Post } from '../../types/board';
import Layout from '../../components/Layout';
import { use } from 'react';

export default function PostDetail({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    const resolvedParams = use(params);

    // TODO: API 호출로 게시글 데이터 가져오기
    const post: Post = {
        id: parseInt(resolvedParams.id),
        title: '첫 번째 게시글',
        content: '안녕하세요!',
        author: '홍길동',
        createdAt: '2024-04-17',
        updatedAt: '2024-04-17'
    };

    const handleDelete = () => {
        if (window.confirm('정말 삭제하시겠습니까?')) {
            // TODO: API 호출로 게시글 삭제
            router.push('/');
        }
    };

    return (
        <Layout>
            <div className="max-w-4xl mx-auto">
                <div className="bg-white shadow-md rounded-lg p-6">
                    <div className="border-b pb-4 mb-4">
                        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
                        <div className="flex justify-between text-gray-600 text-sm">
                            <div>
                                <span>작성자: {post.author}</span>
                                <span className="mx-2">|</span>
                                <span>작성일: {post.createdAt}</span>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => router.push(`/posts/${post.id}/edit`)}
                                    className="text-blue-600 hover:text-blue-800"
                                >
                                    수정
                                </button>
                                <button
                                    onClick={handleDelete}
                                    className="text-red-600 hover:text-red-800"
                                >
                                    삭제
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="prose max-w-none">
                        <p className="whitespace-pre-wrap">{post.content}</p>
                    </div>
                </div>

                <div className="mt-4">
                    <button
                        onClick={() => router.back()}
                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                    >
                        목록으로
                    </button>
                </div>
            </div>
        </Layout>
    );
} 