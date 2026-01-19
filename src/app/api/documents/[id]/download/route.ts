import { NextRequest } from 'next/server'
import { handleDownload } from '../route'

// GET - Download document file
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  return handleDownload(request, { params })
}