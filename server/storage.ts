import { type User, type InsertUser, type MenuItem, type InsertMenuItem, type Order, type InsertOrder, type Reservation, type InsertReservation } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  getUserByFirebaseUid(firebaseUid: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUserStripeCustomerId(id: string, stripeCustomerId: string): Promise<User>;

  // Menu operations
  getMenuItems(): Promise<MenuItem[]>;
  getMenuItemsByCategory(category: string): Promise<MenuItem[]>;
  getMenuItem(id: string): Promise<MenuItem | undefined>;
  createMenuItem(item: InsertMenuItem): Promise<MenuItem>;
  updateMenuItem(id: string, updates: Partial<MenuItem>): Promise<MenuItem>;

  // Order operations
  getOrder(id: string): Promise<Order | undefined>;
  getOrdersByUser(userId: string): Promise<Order[]>;
  createOrder(order: InsertOrder): Promise<Order>;
  updateOrderStatus(id: string, status: string): Promise<Order>;
  updateOrderStripePaymentIntent(id: string, paymentIntentId: string): Promise<Order>;

  // Reservation operations
  getReservation(id: string): Promise<Reservation | undefined>;
  getReservationsByUser(userId: string): Promise<Reservation[]>;
  createReservation(reservation: InsertReservation): Promise<Reservation>;
  updateReservationStatus(id: string, status: string): Promise<Reservation>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private menuItems: Map<string, MenuItem>;
  private orders: Map<string, Order>;
  private reservations: Map<string, Reservation>;

  constructor() {
    this.users = new Map();
    this.menuItems = new Map();
    this.orders = new Map();
    this.reservations = new Map();

    // Initialize with sample menu items
    this.initializeMenu();
  }

  private initializeMenu() {
    const items: MenuItem[] = [
      {
        id: "1",
        name: "Artisan Croissants",
        description: "Buttery, flaky pastries baked fresh daily",
        price: "4.50",
        category: "bakery",
        imageUrl: "https://images.unsplash.com/photo-1555507036-ab794f4421e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        available: true,
        ingredients: ["flour", "butter", "yeast", "eggs"],
        allergens: ["gluten", "eggs", "dairy"],
      },
      {
        id: "2",
        name: "Signature Latte",
        description: "Single-origin espresso with artistic foam",
        price: "5.25",
        category: "coffee",
        imageUrl: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        available: true,
        ingredients: ["espresso", "milk"],
        allergens: ["dairy"],
      },
      {
        id: "3",
        name: "Sourdough Loaf",
        description: "Traditional wild yeast fermentation",
        price: "8.00",
        category: "bakery",
        imageUrl: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        available: true,
        ingredients: ["flour", "water", "salt", "sourdough starter"],
        allergens: ["gluten"],
      },
      {
        id: "4",
        name: "Gourmet Sandwich",
        description: "Fresh ingredients on artisan bread",
        price: "12.50",
        category: "meals",
        imageUrl: "https://images.unsplash.com/photo-1553909489-cd47e0ef937f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        available: true,
        ingredients: ["bread", "turkey", "cheese", "lettuce", "tomato"],
        allergens: ["gluten", "dairy"],
      },
      {
        id: "5",
        name: "French Pastries",
        description: "Delicate macarons and éclairs",
        price: "6.75",
        category: "bakery",
        imageUrl: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        available: true,
        ingredients: ["almond flour", "eggs", "sugar", "cream"],
        allergens: ["eggs", "dairy", "nuts"],
      },
      {
        id: "6",
        name: "Premium Tea",
        description: "Curated selection of fine teas",
        price: "4.25",
        category: "beverages",
        imageUrl: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        available: true,
        ingredients: ["tea leaves", "water"],
        allergens: [],
      },
    ];

    items.forEach(item => this.menuItems.set(item.id, item));
  }

  // User operations
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.email === email);
  }

  async getUserByFirebaseUid(firebaseUid: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.firebaseUid === firebaseUid);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = {
      ...insertUser,
      id,
      stripeCustomerId: null,
      createdAt: new Date(),
    };
    this.users.set(id, user);
    return user;
  }

  async updateUserStripeCustomerId(id: string, stripeCustomerId: string): Promise<User> {
    const user = this.users.get(id);
    if (!user) throw new Error("User not found");
    
    const updatedUser = { ...user, stripeCustomerId };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  // Menu operations
  async getMenuItems(): Promise<MenuItem[]> {
    return Array.from(this.menuItems.values());
  }

  async getMenuItemsByCategory(category: string): Promise<MenuItem[]> {
    return Array.from(this.menuItems.values()).filter(item => item.category === category);
  }

  async getMenuItem(id: string): Promise<MenuItem | undefined> {
    return this.menuItems.get(id);
  }

  async createMenuItem(insertItem: InsertMenuItem): Promise<MenuItem> {
    const id = randomUUID();
    const item: MenuItem = { ...insertItem, id };
    this.menuItems.set(id, item);
    return item;
  }

  async updateMenuItem(id: string, updates: Partial<MenuItem>): Promise<MenuItem> {
    const item = this.menuItems.get(id);
    if (!item) throw new Error("Menu item not found");
    
    const updatedItem = { ...item, ...updates };
    this.menuItems.set(id, updatedItem);
    return updatedItem;
  }

  // Order operations
  async getOrder(id: string): Promise<Order | undefined> {
    return this.orders.get(id);
  }

  async getOrdersByUser(userId: string): Promise<Order[]> {
    return Array.from(this.orders.values()).filter(order => order.userId === userId);
  }

  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const id = randomUUID();
    const order: Order = {
      ...insertOrder,
      id,
      createdAt: new Date(),
      estimatedReady: new Date(Date.now() + 30 * 60 * 1000), // 30 minutes from now
    };
    this.orders.set(id, order);
    return order;
  }

  async updateOrderStatus(id: string, status: string): Promise<Order> {
    const order = this.orders.get(id);
    if (!order) throw new Error("Order not found");
    
    const updatedOrder = { ...order, status };
    this.orders.set(id, updatedOrder);
    return updatedOrder;
  }

  async updateOrderStripePaymentIntent(id: string, paymentIntentId: string): Promise<Order> {
    const order = this.orders.get(id);
    if (!order) throw new Error("Order not found");
    
    const updatedOrder = { ...order, stripePaymentIntentId: paymentIntentId };
    this.orders.set(id, updatedOrder);
    return updatedOrder;
  }

  // Reservation operations
  async getReservation(id: string): Promise<Reservation | undefined> {
    return this.reservations.get(id);
  }

  async getReservationsByUser(userId: string): Promise<Reservation[]> {
    return Array.from(this.reservations.values()).filter(reservation => reservation.userId === userId);
  }

  async createReservation(insertReservation: InsertReservation): Promise<Reservation> {
    const id = randomUUID();
    const reservation: Reservation = {
      ...insertReservation,
      id,
      createdAt: new Date(),
    };
    this.reservations.set(id, reservation);
    return reservation;
  }

  async updateReservationStatus(id: string, status: string): Promise<Reservation> {
    const reservation = this.reservations.get(id);
    if (!reservation) throw new Error("Reservation not found");
    
    const updatedReservation = { ...reservation, status };
    this.reservations.set(id, updatedReservation);
    return updatedReservation;
  }
}

export const storage = new MemStorage();
