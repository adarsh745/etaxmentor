'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import DocumentUploader from '@/components/DocumentUploader'

export default function DocumentUploadPage() {

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Link href="/dashboard/documents" className="inline-flex items-center text-purple-600 hover:text-purple-800 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Documents
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Upload Documents</h1>
          <p className="text-gray-600">Upload your tax documents securely. Supported formats: PDF, Images, Excel files (Max 10MB each)</p>
        </div>

        {/* Document Uploader Component */}
        <DocumentUploader 
          maxFiles={20}
          onUploadComplete={(files) => {
            console.log('Upload completed:', files)
          }}
        />
      </div>
    </div>
  )
}