import { NextRequest, NextResponse } from 'next/server'
import { contactSchema } from '@/lib/validations'
import { prisma } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate input
    const validatedData = contactSchema.safeParse(body)
    
    if (!validatedData.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validatedData.error.flatten() },
        { status: 400 }
      )
    }
    
    const { name, email, phone, subject, message } = validatedData.data
    
    // Store contact submission
    const contact = await prisma.contactSubmission.create({
      data: {
        name,
        email,
        phone,
        subject,
        message,
      },
    })
    
    // TODO: Send email notification to admin
    // TODO: Send acknowledgment email to user
    
    return NextResponse.json(
      { 
        message: 'Thank you for contacting us! We will get back to you within 24 hours.',
        id: contact.id
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to submit contact form. Please try again.' },
      { status: 500 }
    )
  }
}

export async function GET() {
  // This could be used by admin to list all contact submissions
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
}
