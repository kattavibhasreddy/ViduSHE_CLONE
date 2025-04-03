import { users, type User, type InsertUser, contactMessages, type InsertContact, type ContactMessage, resources, type Resource, type InsertResource } from "@shared/schema";

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

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private contactMessages: Map<number, ContactMessage>;
  private resources: Map<number, Resource>;
  
  private currentUserId: number;
  private currentContactId: number;
  private currentResourceId: number;

  constructor() {
    this.users = new Map();
    this.contactMessages = new Map();
    this.resources = new Map();
    
    this.currentUserId = 1;
    this.currentContactId = 1;
    this.currentResourceId = 1;
    
    // Initialize with some sample resources
    this.addSampleResources();
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Contact operations
  async createContactMessage(message: InsertContact): Promise<ContactMessage> {
    const id = this.currentContactId++;
    const contactMessage: ContactMessage = { 
      ...message, 
      id, 
      createdAt: new Date().toISOString() 
    };
    this.contactMessages.set(id, contactMessage);
    return contactMessage;
  }
  
  async getContactMessages(): Promise<ContactMessage[]> {
    return Array.from(this.contactMessages.values());
  }
  
  // Resource operations
  async getResources(): Promise<Resource[]> {
    return Array.from(this.resources.values());
  }
  
  async getResourcesByCategory(category: string): Promise<Resource[]> {
    return Array.from(this.resources.values()).filter(
      (resource) => resource.category === category
    );
  }
  
  async getResourceById(id: number): Promise<Resource | undefined> {
    return this.resources.get(id);
  }
  
  async searchResources(query: string): Promise<Resource[]> {
    const lowercaseQuery = query.toLowerCase();
    return Array.from(this.resources.values()).filter(
      (resource) => 
        resource.title.toLowerCase().includes(lowercaseQuery) ||
        resource.description.toLowerCase().includes(lowercaseQuery) ||
        resource.content.toLowerCase().includes(lowercaseQuery)
    );
  }
  
  // Helper method to initialize sample resources
  private addSampleResources(): void {
    const sampleResources: Omit<Resource, "id">[] = [
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
    
    sampleResources.forEach(resource => {
      const id = this.currentResourceId++;
      this.resources.set(id, { ...resource, id });
    });
  }
}

export const storage = new MemStorage();
