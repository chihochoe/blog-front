'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Post } from '../../types/board';
import Layout from '../../components/Layout';
import { fetchPost, deletePost } from '../../utils/api';
import { use } from 'react';

export default function PostDetail({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    const [post, setPost] = useState<Post | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const resolvedParams = use(params);

    useEffect(() => {
        const loadPost = async () => {
            try {
                const data = await fetchPost(parseInt(resolvedParams.id));
                setPost(data);
                setIsLoading(false);
            } catch {
                setError('게시글을 불러오는데 실패했습니다.');
                setIsLoading(false);
            }
        };

        loadPost();
    }, [resolvedParams.id]);

    const handleDelete = async () => {
        if (window.confirm('정말 삭제하시겠습니까?')) {
            try {
                await deletePost(parseInt(resolvedParams.id));
                router.push('/');
            } catch {
                setError('게시글 삭제에 실패했습니다.');
            }
        }
    };

    if (isLoading) {
        return (
            <Layout>
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            </Layout>
        );
    }

    if (error) {
        return (
            <Layout>
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            </Layout>
        );
    }

    if (!post) {
        return (
            <Layout>
                <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
                    게시글을 찾을 수 없습니다.
                </div>
            </Layout>
        );
    }

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