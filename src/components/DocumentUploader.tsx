'use client'

import { useState, useCallback, useRef } from 'react'
import { 
  Upload, X, File, FileText, FileImage, FileSpreadsheet,
  AlertCircle, CheckCircle2, RefreshCw, Plus, Eye
} from 'lucide-react'
import { 
  Button, Card, CardContent, Progress, Badge, Input, Label,
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
  Alert, AlertDescription
} from '@/components/ui'
import { 
  validateFile, formatFileSize, documentTypeLabels, 
  FINANCIAL_YEARS, getFileIcon
} from '@/lib/document-utils'

interface UploadFile {
  id: string
  file: File
  progress: number
  status: 'pending' | 'uploading' | 'success' | 'error'
  error?: string
  documentId?: string
  type?: string
  financialYear?: string
}

interface DocumentUploaderProps {
  onUploadComplete?: (files: UploadFile[]) => void
  maxFiles?: number
  defaultType?: string
  defaultYear?: string
  showTypeSelector?: boolean
  showYearSelector?: boolean
}

export default function DocumentUploader({
  onUploadComplete,
  maxFiles = 10,
  defaultType = '',
  defaultYear = '',
  showTypeSelector = true,
  showYearSelector = true,
}: DocumentUploaderProps) {
  const [files, setFiles] = useState<UploadFile[]>([])
  const [uploading, setUploading] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFiles = useCallback((newFiles: FileList | null) => {
    if (!newFiles) return

    const validFiles: UploadFile[] = []
    const errors: string[] = []

    for (let i = 0; i < newFiles.length; i++) {
      const file = newFiles[i]
      
      // Check file limit
      if (files.length + validFiles.length >= maxFiles) {
        errors.push(`Maximum ${maxFiles} files allowed`)
        break
      }

      // Validate file
      const validation = validateFile(file)
      if (!validation.valid) {
        errors.push(`${file.name}: ${validation.error}`)
        continue
      }

      validFiles.push({
        id: `${Date.now()}-${i}`,
        file,
        progress: 0,
        status: 'pending',
        type: defaultType,
        financialYear: defaultYear,
      })
    }

    setFiles(prev => [...prev, ...validFiles])

    if (errors.length > 0) {
      // Show errors to user (you might want to use a toast or alert here)
      console.error('File validation errors:', errors)
    }
  }, [files.length, maxFiles, defaultType, defaultYear])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    handleFiles(e.dataTransfer.files)
  }, [handleFiles])

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
  }, [])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }, [])

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id))
  }

  const updateFileMetadata = (id: string, field: 'type' | 'financialYear', value: string) => {
    setFiles(prev => prev.map(f => f.id === id ? { ...f, [field]: value } : f))
  }

  const uploadFile = async (fileItem: UploadFile): Promise<void> => {
    const formData = new FormData()
    formData.append('file', fileItem.file)
    formData.append('type', fileItem.type || defaultType)
    
    if (fileItem.financialYear || defaultYear) {
      const year = fileItem.financialYear || defaultYear
      formData.append('financialYear', year)
      // Calculate assessment year
      const [startYear] = year.split('-')
      const assessmentYear = `${parseInt(startYear) + 1}-${(parseInt(startYear) + 2).toString().slice(-2)}`
      formData.append('assessmentYear', assessmentYear)
    }

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      
      xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable) {
          const progress = Math.round((e.loaded / e.total) * 100)
          setFiles(prev => prev.map(f => 
            f.id === fileItem.id ? { ...f, progress, status: 'uploading' } : f
          ))
        }
      })

      xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
          try {
            const response = JSON.parse(xhr.responseText)
            setFiles(prev => prev.map(f => 
              f.id === fileItem.id 
                ? { ...f, status: 'success', progress: 100, documentId: response.document?.id } 
                : f
            ))
            resolve()
          } catch (error) {
            setFiles(prev => prev.map(f => 
              f.id === fileItem.id 
                ? { ...f, status: 'error', error: 'Invalid response from server' } 
                : f
            ))
            reject(error)
          }
        } else {
          const errorMessage = xhr.status === 413 ? 'File too large' : `Upload failed (${xhr.status})`
          setFiles(prev => prev.map(f => 
            f.id === fileItem.id 
              ? { ...f, status: 'error', error: errorMessage } 
              : f
          ))
          reject(new Error(errorMessage))
        }
      })

      xhr.addEventListener('error', () => {
        setFiles(prev => prev.map(f => 
          f.id === fileItem.id 
            ? { ...f, status: 'error', error: 'Network error' } 
            : f
        ))
        reject(new Error('Network error'))
      })

      xhr.open('POST', '/api/documents')
      xhr.send(formData)
    })
  }

  const uploadAllFiles = async () => {
    const pendingFiles = files.filter(f => f.status === 'pending')
    if (pendingFiles.length === 0) return

    setUploading(true)

    // Upload files sequentially to avoid overwhelming the server
    for (const file of pendingFiles) {
      try {
        await uploadFile(file)
      } catch (error) {
        console.error('Upload failed:', error)
      }
    }

    setUploading(false)
    
    // Call completion callback if provided
    if (onUploadComplete) {
      onUploadComplete(files)
    }
  }

  const getFileIconComponent = (mimeType: string) => {
    const iconType = getFileIcon(mimeType)
    switch (iconType) {
      case 'image': return <FileImage className="w-5 h-5 text-purple-500" />
      case 'spreadsheet': return <FileSpreadsheet className="w-5 h-5 text-green-500" />
      case 'pdf': return <FileText className="w-5 h-5 text-red-500" />
      default: return <File className="w-5 h-5 text-gray-500" />
    }
  }

  const successCount = files.filter(f => f.status === 'success').length
  const errorCount = files.filter(f => f.status === 'error').length
  const allCompleted = files.length > 0 && files.every(f => f.status === 'success' || f.status === 'error')

  return (
    <div className="space-y-6">
      {/* Upload Zone */}
      <Card>
        <CardContent className="p-8">
          <div
            className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
              dragActive 
                ? 'border-purple-400 bg-purple-50' 
                : 'border-gray-300 hover:border-purple-400'
            }`}
            onDrop={handleDrop}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
          >
            <Upload className={`w-16 h-16 mx-auto mb-4 ${dragActive ? 'text-purple-500' : 'text-gray-400'}`} />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {dragActive ? 'Drop files here' : 'Drag and drop files here'}
            </h3>
            <p className="text-gray-500 mb-6">
              Or click to browse and select files from your device<br />
              <span className="text-sm">Maximum {maxFiles} files, 10MB each. Supported: PDF, Images, Excel</span>
            </p>
            
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept=".pdf,.jpg,.jpeg,.png,.xls,.xlsx"
              onChange={(e) => handleFiles(e.target.files)}
              className="hidden"
            />
            
            <Button 
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="bg-purple-600 hover:bg-purple-700"
              disabled={files.length >= maxFiles}
            >
              <Plus className="w-4 h-4 mr-2" />
              {files.length >= maxFiles ? 'Maximum files reached' : 'Select Files'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Default Settings */}
      {files.length > 0 && (showTypeSelector || showYearSelector) && (
        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4">Default Settings (Applied to all files)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {showTypeSelector && (
                <div>
                  <Label>Default Document Type</Label>
                  <Select value={defaultType} onValueChange={(value) => {
                    // Update all files that don't have a specific type set
                    setFiles(prev => prev.map(f => ({ ...f, type: f.type || value })))
                  }}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select document type" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(documentTypeLabels).map(([value, label]) => (
                        <SelectItem key={value} value={value}>{label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
              
              {showYearSelector && (
                <div>
                  <Label>Default Financial Year</Label>
                  <Select value={defaultYear} onValueChange={(value) => {
                    // Update all files that don't have a specific year set
                    setFiles(prev => prev.map(f => ({ ...f, financialYear: f.financialYear || value })))
                  }}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select financial year (optional)" />
                    </SelectTrigger>
                    <SelectContent>
                      {FINANCIAL_YEARS.map((year) => (
                        <SelectItem key={year.value} value={year.value}>{year.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* File List */}
      {files.length > 0 && (
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold">Files to Upload ({files.length})</h3>
              <div className="flex items-center space-x-3">
                <Button
                  onClick={uploadAllFiles}
                  disabled={uploading || files.every(f => f.status !== 'pending')}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  {uploading ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4 mr-2" />
                      Upload All
                    </>
                  )}
                </Button>
                
                {allCompleted && successCount > 0 && (
                  <Button variant="outline" onClick={() => window.location.href = '/dashboard/documents'}>
                    <Eye className="w-4 h-4 mr-2" />
                    View Documents
                  </Button>
                )}
              </div>
            </div>

            <div className="space-y-4">
              {files.map((fileItem) => (
                <div key={fileItem.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center flex-1 min-w-0">
                      {getFileIconComponent(fileItem.file.type)}
                      <div className="ml-3 flex-1 min-w-0">
                        <p className="font-medium text-gray-900 truncate">
                          {fileItem.file.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {formatFileSize(fileItem.file.size)}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {fileItem.status === 'success' && (
                        <Badge className="bg-green-100 text-green-800">
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          Success
                        </Badge>
                      )}
                      {fileItem.status === 'error' && (
                        <Badge className="bg-red-100 text-red-800">
                          <AlertCircle className="w-3 h-3 mr-1" />
                          Failed
                        </Badge>
                      )}
                      {fileItem.status === 'uploading' && (
                        <Badge className="bg-blue-100 text-blue-800">
                          <RefreshCw className="w-3 h-3 mr-1 animate-spin" />
                          Uploading
                        </Badge>
                      )}
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(fileItem.id)}
                        disabled={fileItem.status === 'uploading'}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* File-specific settings */}
                  {fileItem.status === 'pending' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                      {showTypeSelector && (
                        <Select 
                          value={fileItem.type || ''} 
                          onValueChange={(value) => updateFileMetadata(fileItem.id, 'type', value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Document type" />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.entries(documentTypeLabels).map(([value, label]) => (
                              <SelectItem key={value} value={value}>{label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                      
                      {showYearSelector && (
                        <Select 
                          value={fileItem.financialYear || ''} 
                          onValueChange={(value) => updateFileMetadata(fileItem.id, 'financialYear', value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Financial year" />
                          </SelectTrigger>
                          <SelectContent>
                            {FINANCIAL_YEARS.map((year) => (
                              <SelectItem key={year.value} value={year.value}>{year.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    </div>
                  )}

                  {/* Progress bar */}
                  {fileItem.status === 'uploading' && (
                    <Progress value={fileItem.progress} className="mb-3" />
                  )}

                  {/* Error message */}
                  {fileItem.error && (
                    <Alert className="border-red-200">
                      <AlertCircle className="w-4 h-4" />
                      <AlertDescription className="text-red-700">
                        {fileItem.error}
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Upload Summary */}
      {allCompleted && (
        <Card className="border-green-200">
          <CardContent className="p-6 text-center">
            <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Upload Complete!</h3>
            <p className="text-gray-600 mb-4">
              Successfully uploaded {successCount} document{successCount !== 1 ? 's' : ''}.
              {errorCount > 0 && ` ${errorCount} upload${errorCount !== 1 ? 's' : ''} failed.`}
            </p>
            <div className="flex justify-center space-x-3">
              <Button onClick={() => window.location.href = '/dashboard/documents'}>
                <Eye className="w-4 h-4 mr-2" />
                View Documents
              </Button>
              <Button 
                variant="outline"
                onClick={() => setFiles([])}
              >
                Upload More
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}