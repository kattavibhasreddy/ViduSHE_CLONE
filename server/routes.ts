import express, { type Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // API route prefix
  const apiRouter = express.Router();
  app.use("/api", apiRouter);

  // Contact form submission endpoint
  apiRouter.post("/contact", async (req, res) => {
    try {
      // Validate request body
      const contactData = insertContactSchema.parse(req.body);
      
      // Store contact message
      const contactMessage = await storage.createContactMessage(contactData);
      
      res.status(201).json({ 
        message: "Contact message submitted successfully",
        data: contactMessage
      });
    } catch (error) {
      if (error instanceof ZodError) {
        // Handle validation errors
        const validationError = fromZodError(error);
        res.status(400).json({ message: validationError.message });
      } else {
        // Handle other errors
        console.error("Error creating contact message:", error);
        res.status(500).json({ message: "Error submitting contact message" });
      }
    }
  });

  // Get resources endpoint
  apiRouter.get("/resources", async (req, res) => {
    try {
      const { category, search } = req.query;
      
      let resources;
      if (category && typeof category === 'string') {
        resources = await storage.getResourcesByCategory(category);
      } else if (search && typeof search === 'string') {
        resources = await storage.searchResources(search);
      } else {
        resources = await storage.getResources();
      }
      
      res.json(resources);
    } catch (error) {
      console.error("Error fetching resources:", error);
      res.status(500).json({ message: "Error fetching resources" });
    }
  });

  // Get resource by id endpoint
  apiRouter.get("/resources/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid resource ID" });
      }
      
      const resource = await storage.getResourceById(id);
      
      if (!resource) {
        return res.status(404).json({ message: "Resource not found" });
      }
      
      res.json(resource);
    } catch (error) {
      console.error("Error fetching resource:", error);
      res.status(500).json({ message: "Error fetching resource" });
    }
  });

  // Health check endpoint
  apiRouter.get("/health", (req, res) => {
    res.json({ status: "ok" });
  });

  const httpServer = createServer(app);
  return httpServer;
}
