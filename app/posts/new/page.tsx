'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PostInput } from '../../types/board';
import Layout from '../../components/Layout';

export default function NewPost() {
    const router = useRouter();
    const [post, setPost] = useState<PostInput>({
        title: '',
        content: '',
        author: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: API 호출로 게시글 저장
        router.push('/');
    };

    return (
        <Layout>
            <div className="max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold mb-8">새 게시글 작성</h1>

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
                            작성하기
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