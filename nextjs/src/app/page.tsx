import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Globe, Shield, Users, Key, Database, Clock, BookOpen, Brain, Zap, Archive, TrendingUp, Bookmark } from 'lucide-react';
import AuthAwareButtons from '@/components/AuthAwareButtons';
import HomePricing from "@/components/HomePricing";

export default function Home() {
  const productName = process.env.NEXT_PUBLIC_PRODUCTNAME;

  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Summaries',
      description: 'Automatically generate concise summaries of your saved content using advanced AI to extract key insights',
      color: 'text-blue-600'
    },
    {
      icon: TrendingUp,
      title: 'Strategic Takeaways',
      description: 'Get actionable insights and strategic recommendations from your content to stay ahead of trends',
      color: 'text-[#36893B]'
    },
    {
      icon: BookOpen,
      title: 'Content Feed',
      description: 'Organized, personalized feed of your saved content with intelligent categorization and search',
      color: 'text-purple-600'
    },
    {
      icon: Bookmark,
      title: 'URL Bookmarking',
      description: 'Save any URL with one click and let Supamind process and organize your content automatically',
      color: 'text-orange-600'
    },
    {
      icon: Archive,
      title: 'Knowledge Archive',
      description: 'Build your personal knowledge base that grows with you, searchable and always accessible',
      color: 'text-teal-600'
    },
    {
      icon: Zap,
      title: 'Real-time Processing',
      description: 'Instant content analysis and summarization as soon as you save new URLs to your collection',
      color: 'text-red-600'
    }
  ];

  const stats = [
    { label: 'Content Processed', value: '1M+' },
    { label: 'Active Users', value: '10K+' },
    { label: 'Time Saved', value: '500K+ hrs' },
    { label: 'Accuracy Rate', value: '99.5%' }
  ];

  return (
      <div className="min-h-screen">
        <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-sm z-50 border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <div className="flex-shrink-0">
                <Image 
                  src="/images/taxfix_logo.png" 
                  alt="Supamind Logo" 
                  width={120} 
                  height={40}
                  className="h-8 w-auto"
                />
              </div>
              <div className="hidden md:flex items-center space-x-8">
                <AuthAwareButtons variant="nav" />
              </div>
            </div>
          </div>
        </nav>

        <section className="relative pt-32 pb-24 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
                Supamind - stay on top of great content you come across
              </h1>
              <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
                Supamind is your AI-powered content assistant that transforms URLs into actionable insights. Save, summarize, and stay on top of the fast-paced world around you.
              </p>
              <div className="mt-10 flex gap-4 justify-center">
                <AuthAwareButtons />
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gradient-to-b from-white to-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-4xl font-bold text-primary-600">{stat.value}</div>
                    <div className="mt-2 text-sm text-gray-600">{stat.label}</div>
                  </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold">Transform Content Into Knowledge</h2>
              <p className="mt-4 text-xl text-gray-600">
                Powerful AI tools to help you consume and understand content efficiently
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                  <div
                      key={index}
                      className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                  >
                    <feature.icon className={`h-8 w-8 ${feature.color}`} />
                    <h3 className="mt-4 text-xl font-semibold">{feature.title}</h3>
                    <p className="mt-2 text-gray-600">{feature.description}</p>
                  </div>
              ))}
            </div>
          </div>
        </section>

        <HomePricing />

        <section className="py-24 bg-primary-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white">
              Ready to Master Your Content Consumption?
            </h2>
            <p className="mt-4 text-xl text-primary-100">
              Join thousands of knowledge workers who use Supamind to stay informed and ahead of the curve
            </p>
            <Link
                href="/auth/register"
                className="mt-8 inline-flex items-center px-6 py-3 rounded-lg bg-white text-primary-600 font-medium hover:bg-primary-50 transition-colors"
            >
              Start Your Knowledge Journey
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </section>

        <footer className="bg-gray-50 border-t border-gray-200">
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <h4 className="text-sm font-semibold text-gray-900">Product</h4>
                <ul className="mt-4 space-y-2">
                  <li>
                    <Link href="#features" className="text-gray-600 hover:text-gray-900">
                      Features
                    </Link>
                  </li>
                  <li>
                    <Link href="#pricing" className="text-gray-600 hover:text-gray-900">
                      Pricing
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-900">Resources</h4>
                <ul className="mt-4 space-y-2">
                  <li>
                    <Link href="https://github.com/Razikus/supabase-nextjs-template" className="text-gray-600 hover:text-gray-900">
                      Documentation
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-900">Legal</h4>
                <ul className="mt-4 space-y-2">
                  <li>
                    <Link href="/legal/privacy" className="text-gray-600 hover:text-gray-900">
                      Privacy
                    </Link>
                  </li>
                  <li>
                    <Link href="/legal/terms" className="text-gray-600 hover:text-gray-900">
                      Terms
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-200">
              <p className="text-center text-gray-600">
                © {new Date().getFullYear()} {productName}. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
  );
}