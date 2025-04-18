'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Post } from '../../../types/board';
import Layout from '../../../components/Layout';
import { fetchPost, updatePost } from '../../../utils/api';
import { use } from 'react';

export default function EditPost({ params }: { params: Promise<{ id: string }> }) {
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!post) return;

        try {
            await updatePost(post.id, {
                title: post.title,
                content: post.content,
                author: post.author
            });
            router.push(`/posts/${post.id}`);
        } catch {
            setError('게시글 수정에 실패했습니다.');
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
            <div className="max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold mb-8">게시글 수정</h1>

                <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                            제목
                        </label>
                        <input
                            type="text"
                            id="title"
                            value={post.title}
                            onChange={(e) => setPost({ ...post, title: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-2">
                            작성자
                        </label>
                        <input
                            type="text"
                            id="author"
                            value={post.author}
                            onChange={(e) => setPost({ ...post, author: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                            내용
                        </label>
                        <textarea
                            id="content"
                            value={post.content}
                            onChange={(e) => setPost({ ...post, content: e.target.value })}
                            rows={10}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div className="flex gap-4">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            수정하기
                        </button>
                        <button
                            type="button"
                            onClick={() => router.back()}
                            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                        >
                            취소
                        </button>
                    </div>
                </form>
            </div>
        </Layout>
    );
} 