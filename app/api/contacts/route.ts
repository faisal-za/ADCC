import { NextRequest, NextResponse } from 'next/server';
import { insertContactSchema } from '../../../lib/schema';

// In-memory storage for demo purposes
const contacts: any[] = [];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate the request body
    const validatedData = insertContactSchema.parse(body);
    
    // Add timestamp and ID
    const contact = {
      id: Date.now().toString(),
      ...validatedData,
      createdAt: new Date().toISOString(),
    };
    
    // Store the contact (in a real app, this would go to a database)
    contacts.push(contact);
    
    return NextResponse.json(
      { message: 'Contact submitted successfully', id: contact.id },
      { status: 201 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { message: 'Invalid form data', errors: error.message },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(contacts);
}