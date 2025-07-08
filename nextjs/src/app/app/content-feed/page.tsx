"use client";

import React, { useState, useEffect } from 'react';
import { createSPAClient } from '@/lib/supabase/client';
import { useGlobal } from '@/lib/context/GlobalContext';
import { Loader2, RefreshCw } from 'lucide-react';

interface ContentSummary {
    id: number;
    title: string;
    short_description: string | null;
    website_name: string;
    category: string[];
    image_url: string | null;
    publishing_date: string | null;
    web_url: string | null;
    summary: string | null;
    created_at: string;
}

export default function ContentFeedPage() {
    const [content, setContent] = useState<ContentSummary[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { user } = useGlobal();

    const fetchContent = async (isRefresh = false) => {
        try {
            if (isRefresh) {
                setRefreshing(true);
                setError(null);
            }
            
            const client = createSPAClient();
            
            console.log('User state:', user);
            console.log('User authenticated:', !!user);
            console.log('Attempting to fetch content...');
            
            // Fetch content ordered by creation date
            const { data, error } = await client
                .from('submitted_content_summaries')
                .select('*')
                .order('created_at', { ascending: false })
                .limit(10);

            if (error) {
                console.error('Error fetching content:', error);
                console.error('Error details:', JSON.stringify(error, null, 2));
                setError(`Failed to load content: ${error.message || error.details || 'Unknown error'}`);
                return;
            }

            console.log('Content fetched successfully:', data);
            setContent(data || []);
        } catch (err) {
            console.error('Error:', err);
            setError('Failed to load content');
        } finally {
            setLoading(false);
            if (isRefresh) {
                setRefreshing(false);
            }
        }
    };

    const handleRefresh = () => {
        fetchContent(true);
    };

    useEffect(() => {
        fetchContent();
    }, []);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    if (loading) {
        return (
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-gray-900">Content Feed</h1>
                    <button
                        onClick={handleRefresh}
                        disabled={true}
                        className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <RefreshCw className="h-4 w-4" />
                        <span>Refresh</span>
                    </button>
                </div>
                
                <div className="flex items-center justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-gray-600" />
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-gray-900">Content Feed</h1>
                    <button
                        onClick={handleRefresh}
                        disabled={refreshing}
                        className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
                        <span>{refreshing ? 'Refreshing...' : 'Refresh'}</span>
                    </button>
                </div>
                
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-red-700">{error}</p>
                </div>
            </div>
        );
    }

    if (content.length === 0) {
        return (
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-gray-900">Content Feed</h1>
                    <button
                        onClick={handleRefresh}
                        disabled={refreshing}
                        className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
                        <span>{refreshing ? 'Refreshing...' : 'Refresh'}</span>
                    </button>
                </div>
                
                <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                    <div className="p-8 text-center">
                        <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 5c7.18 0 13 5.82 13 13M6 11a7 7 0 017 7m-6 0a1 1 0 11-2 0 1 1 0 012 0z" />
                            </svg>
                        </div>
                        <h2 className="text-lg font-medium text-gray-900 mb-2">No Content Available</h2>
                        <p className="text-gray-500">There are no published content summaries to display at this time.</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">Content Feed</h1>
                <button
                    onClick={handleRefresh}
                    disabled={refreshing}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
                    <span>{refreshing ? 'Refreshing...' : 'Refresh'}</span>
                </button>
            </div>
            
            <div className="space-y-4">
                {content.map((item) => (
                    <div key={item.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="flex flex-col lg:flex-row">
                            {/* Image Section */}
                            <div className="w-full lg:w-80 h-64 lg:h-64 flex-shrink-0">
                                {item.image_url ? (
                                    <img
                                        src={item.image_url}
                                        alt={item.title}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600 relative overflow-hidden">
                                        {/* Placeholder for tech/AI overlay pattern */}
                                        <div className="absolute inset-0 opacity-20">
                                            <div className="absolute top-4 left-4 text-white text-xs font-mono">
                                                01010101
                                            </div>
                                            <div className="absolute top-8 right-6 text-white text-xs font-mono">
                                                110110
                                            </div>
                                            <div className="absolute bottom-6 left-6 text-white text-xs font-mono">
                                                001100
                                            </div>
                                            {/* Connection lines pattern */}
                                            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 320 256">
                                                <defs>
                                                    <pattern id={`dots-${item.id}`} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                                                        <circle cx="10" cy="10" r="1" fill="rgba(255,255,255,0.3)" />
                                                    </pattern>
                                                </defs>
                                                <rect width="100%" height="100%" fill={`url(#dots-${item.id})`} />
                                                <path d="M50 50 L100 80 L150 60 L200 90" stroke="rgba(255,255,255,0.4)" strokeWidth="1" fill="none" />
                                                <circle cx="50" cy="50" r="3" fill="rgba(255,255,255,0.6)" />
                                                <circle cx="100" cy="80" r="3" fill="rgba(255,255,255,0.6)" />
                                                <circle cx="150" cy="60" r="3" fill="rgba(255,255,255,0.6)" />
                                                <circle cx="200" cy="90" r="3" fill="rgba(255,255,255,0.6)" />
                                            </svg>
                                        </div>
                                        {/* Silhouette placeholder */}
                                        <div className="absolute right-4 bottom-0 w-32 h-48 bg-gradient-to-t from-black/30 to-transparent rounded-t-full"></div>
                                    </div>
                                )}
                            </div>
                            
                            {/* Content Section */}
                            <div className="flex-1 p-6 lg:p-8">
                                <div className="h-full flex flex-col justify-between">
                                    <div>
                                        <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-3 lg:mb-4 leading-tight">
                                            {item.title}
                                        </h2>
                                        <p className="text-gray-600 text-sm lg:text-base leading-relaxed">
                                            {item.short_description || item.summary || 'No description available.'}
                                        </p>
                                    </div>
                                    
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-4 lg:mt-6 pt-4 border-t border-gray-100 space-y-2 sm:space-y-0">
                                        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-1 sm:space-y-0">
                                            <span className="text-sm font-medium text-gray-900">{item.website_name}</span>
                                            <span className="text-sm text-gray-500">{item.publishing_date ? formatDate(item.publishing_date) : formatDate(item.created_at)}</span>
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            {item.category && item.category.length > 0 ? item.category.join(' | ') : 'No categories'}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
} 