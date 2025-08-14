import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { storage } from "@/server/storage"
import { insertContactSchema } from "@/shared/schema"

export async function GET() {
  try {
    const contacts = await storage.getContacts()
    return NextResponse.json(contacts)
  } catch (error) {
    console.error('Error fetching contacts:', error)
    return NextResponse.json(
      { error: 'Failed to fetch contacts' }, 
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = insertContactSchema.parse(body)
    
    const contact = await storage.createContact(validatedData)
    return NextResponse.json(contact, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.errors }, 
        { status: 400 }
      )
    }
    
    console.error('Error creating contact:', error)
    return NextResponse.json(
      { error: 'Failed to create contact' }, 
      { status: 500 }
    )
  }
}