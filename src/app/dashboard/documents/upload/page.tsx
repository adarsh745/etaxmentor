'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import DocumentUploader from '@/components/DocumentUploader'
import styles from './page.module.css'

export default function DocumentUploadPage() {

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {/* Header */}
        <div className={styles.header}>
          <Link href="/dashboard/documents" className={styles.backLink}>
            <ArrowLeft className={styles.backIcon} />
            Back to Documents
          </Link>
          <h1 className={styles.title}>Upload Documents</h1>
          <p className={styles.description}>Upload your tax documents securely. Supported formats: PDF, Images, Excel files (Max 10MB each)</p>
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