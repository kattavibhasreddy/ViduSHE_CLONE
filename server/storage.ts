import { users, type User, type InsertUser, contactMessages, type InsertContact, type ContactMessage, resources, type Resource, type InsertResource } from "@shared/schema";
import { db } from "./db";
import { eq, like, or } from "drizzle-orm";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Contact operations
  createContactMessage(message: InsertContact): Promise<ContactMessage>;
  getContactMessages(): Promise<ContactMessage[]>;
  
  // Resource operations
  getResources(): Promise<Resource[]>;
  getResourcesByCategory(category: string): Promise<Resource[]>;
  getResourceById(id: number): Promise<Resource | undefined>;
  searchResources(query: string): Promise<Resource[]>;
}

// DatabaseStorage implementation using PostgreSQL
export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }
  
  // Contact operations
  async createContactMessage(message: InsertContact): Promise<ContactMessage> {
    // Add the created timestamp
    const contactWithTimestamp = { 
      ...message, 
      createdAt: new Date().toISOString() 
    };
    
    const [contactMessage] = await db
      .insert(contactMessages)
      .values(contactWithTimestamp)
      .returning();
      
    return contactMessage;
  }
  
  async getContactMessages(): Promise<ContactMessage[]> {
    return db.select().from(contactMessages);
  }
  
  // Resource operations
  async getResources(): Promise<Resource[]> {
    return db.select().from(resources);
  }
  
  async getResourcesByCategory(category: string): Promise<Resource[]> {
    return db
      .select()
      .from(resources)
      .where(eq(resources.category, category));
  }
  
  async getResourceById(id: number): Promise<Resource | undefined> {
    const [resource] = await db
      .select()
      .from(resources)
      .where(eq(resources.id, id));
      
    return resource;
  }
  
  async searchResources(query: string): Promise<Resource[]> {
    const searchPattern = `%${query}%`;
    
    return db
      .select()
      .from(resources)
      .where(
        or(
          like(resources.title, searchPattern),
          like(resources.description, searchPattern),
          like(resources.content, searchPattern)
        )
      );
  }
}

// Initialize sample resources function to populate the database
export async function initializeSampleResources(): Promise<void> {
  // Check if resources already exist
  const existingResources = await db.select().from(resources).limit(1);
  
  if (existingResources.length === 0) {
    // Add sample resources
    const sampleResources = [
      {
        title: "Resume Building Guide",
        description: "A comprehensive guide to creating a standout resume that highlights your skills and experience effectively.",
        category: "career",
        content: "This guide provides detailed instructions on creating an effective resume...",
        url: "/resources/resume-building-guide"
      },
      {
        title: "Digital Literacy Basics",
        description: "Learn essential digital skills from using computers and smartphones to navigating the internet safely.",
        category: "technology",
        content: "This resource covers fundamental digital literacy skills including...",
        url: "/resources/digital-literacy-basics"
      },
      {
        title: "Business Planning Template",
        description: "A step-by-step guide to creating a comprehensive business plan for your new venture or existing business.",
        category: "entrepreneurship",
        content: "This business planning template walks you through every section needed...",
        url: "/resources/business-planning-template"
      },
      {
        title: "Online Learning Platforms",
        description: "A curated list of accessible learning platforms with courses specifically designed for women in technology.",
        category: "education",
        content: "This resource features learning platforms that offer courses relevant to women...",
        url: "/resources/online-learning-platforms"
      },
      {
        title: "Networking Tips for Introverts",
        description: "Practical strategies for building professional connections even if you identify as an introvert.",
        category: "career",
        content: "This guide provides networking strategies tailored for introverts...",
        url: "/resources/networking-for-introverts"
      }
    ];
    
    // Insert all resources at once
    await db.insert(resources).values(sampleResources);
  }
}

// Export the database storage instance
export const storage = new DatabaseStorage();
