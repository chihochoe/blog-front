'use client';

import Link from 'next/link';
import { useAuth } from '../hooks/useAuth';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface LayoutProps {
    children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    const { isLoggedIn, isLoading, logout } = useAuth();
    const pathname = usePathname();
    const router = useRouter();

    // 로그인 페이지가 아닌데 로그인하지 않은 경우 로그인 페이지로 리다이렉트
    useEffect(() => {
        if (!isLoading && !isLoggedIn && pathname !== '/login') {
            router.push('/login');
        }
    }, [isLoggedIn, isLoading, pathname, router]);

    // 로그인 페이지인 경우 레이아웃 없이 렌더링
    if (pathname === '/login') {
        return <>{children}</>;
    }

    // 로딩 중이거나 로그인하지 않은 경우 로딩 화면 표시
    if (isLoading || !isLoggedIn) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
                    <p className="mt-4 text-gray-600">로딩 중...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col">
            {/* 상단 메뉴 */}
            <header className="bg-blue-600 text-white p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-2xl font-bold">게시판</h1>
                    <nav className="flex gap-4 items-center">
                        <Link href="/" className="hover:text-blue-200">홈</Link>
                        <button
                            onClick={logout}
                            className="hover:text-blue-200"
                        >
                            로그아웃
                        </button>
                    </nav>
                </div>
            </header>

            <div className="flex flex-1">
                {/* 왼쪽 메뉴 */}
                <aside className="w-64 bg-gray-100 p-4">
                    <nav className="space-y-2">
                        <h2 className="font-bold mb-4">메뉴</h2>
                        <Link href="/" className="block p-2 hover:bg-gray-200 rounded">
                            전체 게시글
                        </Link>
                        <Link href="/about" className="block p-2 hover:bg-gray-200 rounded">
                            소개
                        </Link>
                    </nav>
                </aside>

                {/* 본문 */}
                <main className="flex-1 p-4">
                    {children}
                </main>
            </div>
        </div>
    );
} 