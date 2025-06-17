import {
  users,
  holdings,
  transactions,
  marketData,
  type User,
  type UpsertUser,
  type Holding,
  type InsertHolding,
  type Transaction,
  type InsertTransaction,
  type MarketData,
  type InsertMarketData,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and } from "drizzle-orm";

// Interface for storage operations
export interface IStorage {
  // User operations
  // (IMPORTANT) these user operations are mandatory for Replit Auth.
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: UpsertUser): Promise<User>;
  upsertUser(user: UpsertUser): Promise<User>;
  
  // Holdings operations
  getUserHoldings(userId: string): Promise<Holding[]>;
  getHolding(userId: string, cryptocurrency: string): Promise<Holding | undefined>;
  upsertHolding(holding: InsertHolding): Promise<Holding>;
  
  // Transaction operations
  createTransaction(transaction: InsertTransaction): Promise<Transaction>;
  getUserTransactions(userId: string, limit?: number): Promise<Transaction[]>;
  
  // Market data operations
  getMarketData(cryptocurrency: string): Promise<MarketData | undefined>;
  getAllMarketData(): Promise<MarketData[]>;
  upsertMarketData(cryptocurrency: string, price: number, priceChange24h?: number): Promise<MarketData>;
  insertCustomMarketData(data: InsertMarketData): Promise<MarketData>;
  deleteMarketData(cryptocurrency: string): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  // (IMPORTANT) these user operations are mandatory for Replit Auth.

  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  }

  async createUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .returning();
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  // Holdings operations
  async getUserHoldings(userId: string): Promise<Holding[]> {
    return await db
      .select()
      .from(holdings)
      .where(eq(holdings.userId, userId))
      .orderBy(desc(holdings.balance));
  }

  async getHolding(userId: string, cryptocurrency: string): Promise<Holding | undefined> {
    const [holding] = await db
      .select()
      .from(holdings)
      .where(and(eq(holdings.userId, userId), eq(holdings.cryptocurrency, cryptocurrency)));
    return holding;
  }

  async upsertHolding(holdingData: InsertHolding): Promise<Holding> {
    const [holding] = await db
      .insert(holdings)
      .values(holdingData)
      .onConflictDoUpdate({
        target: [holdings.userId, holdings.cryptocurrency],
        set: {
          balance: holdingData.balance,
          averageCost: holdingData.averageCost,
          updatedAt: new Date(),
        },
      })
      .returning();
    return holding;
  }

  // Transaction operations
  async createTransaction(transactionData: InsertTransaction): Promise<Transaction> {
    const [transaction] = await db
      .insert(transactions)
      .values(transactionData)
      .returning();
    return transaction;
  }

  async getUserTransactions(userId: string, limit: number = 10): Promise<Transaction[]> {
    return await db
      .select()
      .from(transactions)
      .where(eq(transactions.userId, userId))
      .orderBy(desc(transactions.createdAt))
      .limit(limit);
  }

  // Market data operations
  async getMarketData(cryptocurrency: string): Promise<MarketData | undefined> {
    const [data] = await db
      .select()
      .from(marketData)
      .where(eq(marketData.cryptocurrency, cryptocurrency));
    return data;
  }

  async getAllMarketData(): Promise<MarketData[]> {
    return await db.select().from(marketData);
  }

  async upsertMarketData(cryptocurrency: string, price: number, priceChange24h: number = 0): Promise<MarketData> {
    const [data] = await db
      .insert(marketData)
      .values({
        cryptocurrency,
        price: price.toString(),
        priceChange24h: priceChange24h.toString(),
        volume24h: "0",
        marketCap: "0",
      })
      .onConflictDoUpdate({
        target: [marketData.cryptocurrency],
        set: {
          price: price.toString(),
          priceChange24h: priceChange24h.toString(),
          updatedAt: new Date(),
        },
      })
      .returning();
    return data;
  }

  async insertCustomMarketData(data: InsertMarketData): Promise<MarketData> {
    const [result] = await db
      .insert(marketData)
      .values({
        ...data,
        price: data.price.toString(),
        priceChange24h: data.priceChange24h?.toString() || "0",
        volume24h: data.volume24h?.toString() || "0",
        marketCap: data.marketCap?.toString() || "0",
      })
      .onConflictDoUpdate({
        target: [marketData.cryptocurrency],
        set: {
          price: data.price.toString(),
          priceChange24h: data.priceChange24h?.toString() || "0",
          volume24h: data.volume24h?.toString() || "0",
          marketCap: data.marketCap?.toString() || "0",
          updatedAt: new Date(),
        },
      })
      .returning();
    return result;
  }

  async deleteMarketData(cryptocurrency: string): Promise<void> {
    await db.delete(marketData).where(eq(marketData.cryptocurrency, cryptocurrency));
  }
}

// Temporary in-memory storage for development
class MemStorage implements IStorage {
  private users: Map<string, User> = new Map();
  private holdings: Map<string, Holding[]> = new Map();
  private transactions: Map<string, Transaction[]> = new Map();
  private marketData: Map<string, MarketData> = new Map();

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const users = Array.from(this.users.values());
    return users.find(user => user.email === email);
  }

  async createUser(userData: UpsertUser): Promise<User> {
    const user: User = {
      id: userData.id,
      email: userData.email || null,
      password: userData.password || null,
      firstName: userData.firstName || null,
      lastName: userData.lastName || null,
      profileImageUrl: userData.profileImageUrl || null,
      role: userData.role || "user",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.users.set(userData.id, user);
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const user: User = {
      id: userData.id,
      email: userData.email || null,
      password: userData.password || null,
      firstName: userData.firstName || null,
      lastName: userData.lastName || null,
      profileImageUrl: userData.profileImageUrl || null,
      role: userData.role || "user",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.users.set(userData.id, user);
    return user;
  }

  async getUserHoldings(userId: string): Promise<Holding[]> {
    return this.holdings.get(userId) || [];
  }

  async getHolding(userId: string, cryptocurrency: string): Promise<Holding | undefined> {
    const userHoldings = this.holdings.get(userId) || [];
    return userHoldings.find(h => h.cryptocurrency === cryptocurrency);
  }

  async upsertHolding(holdingData: InsertHolding): Promise<Holding> {
    const holding: Holding = {
      id: Math.floor(Math.random() * 1000000),
      userId: holdingData.userId,
      cryptocurrency: holdingData.cryptocurrency,
      balance: holdingData.balance || "0",
      averageCost: holdingData.averageCost || "0",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const userHoldings = this.holdings.get(holdingData.userId) || [];
    const existingIndex = userHoldings.findIndex(h => h.cryptocurrency === holdingData.cryptocurrency);
    
    if (existingIndex >= 0) {
      userHoldings[existingIndex] = holding;
    } else {
      userHoldings.push(holding);
    }
    
    this.holdings.set(holdingData.userId, userHoldings);
    return holding;
  }

  async createTransaction(transactionData: InsertTransaction): Promise<Transaction> {
    const transaction: Transaction = {
      id: Math.floor(Math.random() * 1000000),
      userId: transactionData.userId,
      type: transactionData.type,
      cryptocurrency: transactionData.cryptocurrency,
      amount: transactionData.amount || "0",
      fiatAmount: transactionData.fiatAmount || "0",
      price: transactionData.price || "0",
      fee: transactionData.fee || "0",
      status: transactionData.status || "completed",
      createdAt: new Date(),
    };

    const userTransactions = this.transactions.get(transactionData.userId) || [];
    userTransactions.unshift(transaction);
    this.transactions.set(transactionData.userId, userTransactions);
    return transaction;
  }

  async getUserTransactions(userId: string, limit: number = 10): Promise<Transaction[]> {
    const userTransactions = this.transactions.get(userId) || [];
    return userTransactions.slice(0, limit);
  }

  async getMarketData(cryptocurrency: string): Promise<MarketData | undefined> {
    return this.marketData.get(cryptocurrency);
  }

  async getAllMarketData(): Promise<MarketData[]> {
    return Array.from(this.marketData.values());
  }

  async upsertMarketData(cryptocurrency: string, price: number, priceChange24h: number = 0): Promise<MarketData> {
    const data: MarketData = {
      id: Math.floor(Math.random() * 1000000),
      cryptocurrency,
      price: price.toString(),
      priceChange24h: priceChange24h.toString(),
      volume24h: "0",
      marketCap: "0",
      updatedAt: new Date(),
    };
    this.marketData.set(cryptocurrency, data);
    return data;
  }

  async insertCustomMarketData(data: InsertMarketData): Promise<MarketData> {
    const marketDataEntry: MarketData = {
      id: Math.floor(Math.random() * 1000000),
      cryptocurrency: data.cryptocurrency,
      price: data.price.toString(),
      priceChange24h: data.priceChange24h?.toString() || "0",
      volume24h: data.volume24h?.toString() || "0",
      marketCap: data.marketCap?.toString() || "0",
      updatedAt: new Date(),
    };
    this.marketData.set(data.cryptocurrency, marketDataEntry);
    return marketDataEntry;
  }

  async deleteMarketData(cryptocurrency: string): Promise<void> {
    this.marketData.delete(cryptocurrency);
  }
}

export const storage = new DatabaseStorage();
