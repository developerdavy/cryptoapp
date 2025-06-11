import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { insertTransactionSchema, insertMarketDataSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup authentication
  await setupAuth(app);
  
  // Demo user for development
  const demoUserId = 'demo-user';

  // Initialize demo data
  async function initializeDemoData() {
    // Create demo user
    await storage.upsertUser({
      id: demoUserId,
      email: 'demo@cryptox.com',
      firstName: 'Demo',
      lastName: 'User',
      profileImageUrl: null,
    });

    // Initialize market data with realistic prices
    const marketData = [
      { symbol: 'BTC', price: 43521, change: 2.34 },
      { symbol: 'ETH', price: 2341, change: -1.23 },
      { symbol: 'ADA', price: 0.5, change: 5.67 },
      { symbol: 'SOL', price: 98.45, change: 3.21 },
      { symbol: 'DOT', price: 6.78, change: -0.89 },
    ];

    for (const data of marketData) {
      await storage.upsertMarketData(data.symbol, data.price, data.change);
    }

    // Initialize demo holdings
    await storage.upsertHolding({
      userId: demoUserId,
      cryptocurrency: 'BTC',
      balance: '0.5234',
      averageCost: '42000',
    });

    await storage.upsertHolding({
      userId: demoUserId,
      cryptocurrency: 'ETH',
      balance: '5.8',
      averageCost: '2200',
    });

    await storage.upsertHolding({
      userId: demoUserId,
      cryptocurrency: 'ADA',
      balance: '1250',
      averageCost: '0.48',
    });

    // Create demo transactions
    const transactions = [
      { type: 'buy', crypto: 'BTC', amount: '0.1', fiatAmount: '4350', price: '43500' },
      { type: 'sell', crypto: 'ETH', amount: '1.2', fiatAmount: '2800', price: '2333' },
      { type: 'buy', crypto: 'ADA', amount: '500', fiatAmount: '250', price: '0.5' },
    ];

    for (const tx of transactions) {
      await storage.createTransaction({
        userId: demoUserId,
        type: tx.type as 'buy' | 'sell',
        cryptocurrency: tx.crypto,
        amount: tx.amount,
        fiatAmount: tx.fiatAmount,
        price: tx.price,
        fee: '2.99',
        status: 'completed',
      });
    }
  }

  // Authentication routes - fallback for development
  app.get('/api/auth/user', async (req: any, res) => {
    try {
      // Check if user is authenticated via Replit Auth
      if (req.isAuthenticated && req.isAuthenticated() && req.user) {
        const userId = req.user.claims.sub;
        const user = await storage.getUser(userId);
        if (user) {
          return res.json(user);
        }
      }
      
      // Return null for unauthenticated users (this triggers the login flow on frontend)
      res.status(401).json({ message: "Unauthorized" });
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(401).json({ message: "Unauthorized" });
    }
  });

  // Initialize demo data on startup
  await initializeDemoData();

  // Portfolio summary
  app.get("/api/portfolio", async (req, res) => {
    try {
      const holdings = await storage.getUserHoldings(demoUserId);
      
      let totalBalance = 0;
      let dailyPnL = 0;
      
      for (const holding of holdings) {
        const marketData = await storage.getMarketData(holding.cryptocurrency);
        if (marketData) {
          const currentValue = parseFloat(holding.balance) * parseFloat(marketData.price);
          totalBalance += currentValue;
          
          const change24h = parseFloat(marketData.priceChange24h);
          dailyPnL += currentValue * (change24h / 100);
        }
      }
      
      res.json({
        totalBalance,
        availableBalance: 15243.67,
        dailyPnL,
        dailyPnLPercent: totalBalance > 0 ? (dailyPnL / totalBalance) * 100 : 0,
        totalTrades: 127,
      });
    } catch (error) {
      console.error("Error fetching portfolio:", error);
      res.status(500).json({ message: "Failed to fetch portfolio" });
    }
  });

  // Holdings with market data
  app.get("/api/holdings", async (req, res) => {
    try {
      const holdings = await storage.getUserHoldings(demoUserId);
      
      const enrichedHoldings = await Promise.all(
        holdings.map(async (holding) => {
          const marketData = await storage.getMarketData(holding.cryptocurrency);
          return {
            ...holding,
            currentPrice: marketData ? parseFloat(marketData.price) : 0,
            priceChange24h: marketData ? parseFloat(marketData.priceChange24h) : 0,
            usdValue: marketData ? parseFloat(holding.balance) * parseFloat(marketData.price) : 0,
          };
        })
      );
      
      res.json(enrichedHoldings);
    } catch (error) {
      console.error("Error fetching holdings:", error);
      res.status(500).json({ message: "Failed to fetch holdings" });
    }
  });

  // Transaction history
  app.get("/api/transactions", async (req, res) => {
    try {
      const limit = parseInt(req.query.limit as string) || 10;
      const transactions = await storage.getUserTransactions(demoUserId, limit);
      res.json(transactions);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      res.status(500).json({ message: "Failed to fetch transactions" });
    }
  });

  // Execute trades
  const tradeSchema = z.object({
    type: z.enum(['buy', 'sell']),
    cryptocurrency: z.string(),
    amount: z.number().positive(),
    fiatAmount: z.number().positive(),
  });

  app.post("/api/trades", async (req, res) => {
    try {
      const tradeData = tradeSchema.parse(req.body);
      
      let marketData = await storage.getMarketData(tradeData.cryptocurrency);
      if (!marketData) {
        const mockPrices: { [key: string]: number } = {
          'BTC': 43521,
          'ETH': 2341,
          'ADA': 0.5,
          'SOL': 98.45,
          'DOT': 6.78,
        };
        const price = mockPrices[tradeData.cryptocurrency] || 100;
        marketData = await storage.upsertMarketData(tradeData.cryptocurrency, price, 2.34);
      }
      
      const price = parseFloat(marketData.price);
      const fee = 2.99;
      
      const transaction = await storage.createTransaction({
        userId: demoUserId,
        type: tradeData.type,
        cryptocurrency: tradeData.cryptocurrency,
        amount: tradeData.amount.toString(),
        fiatAmount: tradeData.fiatAmount.toString(),
        price: price.toString(),
        fee: fee.toString(),
        status: 'completed',
      });
      
      // Update holdings
      const existingHolding = await storage.getHolding(demoUserId, tradeData.cryptocurrency);
      const currentBalance = existingHolding ? parseFloat(existingHolding.balance) : 0;
      const currentAvgCost = existingHolding ? parseFloat(existingHolding.averageCost) : 0;
      
      let newBalance: number;
      let newAvgCost: number;
      
      if (tradeData.type === 'buy') {
        newBalance = currentBalance + tradeData.amount;
        const totalCost = (currentBalance * currentAvgCost) + (tradeData.amount * price);
        newAvgCost = newBalance > 0 ? totalCost / newBalance : price;
      } else {
        newBalance = Math.max(0, currentBalance - tradeData.amount);
        newAvgCost = currentAvgCost;
      }
      
      await storage.upsertHolding({
        userId: demoUserId,
        cryptocurrency: tradeData.cryptocurrency,
        balance: newBalance.toString(),
        averageCost: newAvgCost.toString(),
      });
      
      res.json({ success: true, transaction });
    } catch (error) {
      console.error("Error executing trade:", error);
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid trade data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to execute trade" });
      }
    }
  });

  // Market data endpoint
  app.get("/api/market/:symbol", async (req, res) => {
    try {
      const symbol = req.params.symbol.toUpperCase();
      let marketData = await storage.getMarketData(symbol);
      
      if (!marketData) {
        const mockPrices: { [key: string]: number } = {
          'BTC': 43521,
          'ETH': 2341,
          'ADA': 0.5,
          'SOL': 98.45,
          'DOT': 6.78,
        };
        const price = mockPrices[symbol] || 100;
        marketData = await storage.upsertMarketData(symbol, price, Math.random() * 10 - 5);
      }
      
      res.json({
        symbol,
        price: parseFloat(marketData.price),
        priceChange24h: parseFloat(marketData.priceChange24h),
        volume24h: parseFloat(marketData.volume24h),
        marketCap: parseFloat(marketData.marketCap),
        lastUpdated: marketData.updatedAt,
      });
    } catch (error) {
      console.error("Error fetching market data:", error);
      res.status(500).json({ message: "Failed to fetch market data" });
    }
  });

  // Markets overview
  app.get("/api/markets", async (req, res) => {
    try {
      const symbols = ['BTC', 'ETH', 'ADA', 'SOL', 'DOT', 'MATIC', 'AVAX', 'LINK'];
      const markets = [];

      for (const symbol of symbols) {
        let marketData = await storage.getMarketData(symbol);
        if (!marketData) {
          const mockPrices: { [key: string]: number } = {
            'BTC': 43521,
            'ETH': 2341,
            'ADA': 0.5,
            'SOL': 98.45,
            'DOT': 6.78,
            'MATIC': 0.89,
            'AVAX': 35.67,
            'LINK': 14.23,
          };
          const price = mockPrices[symbol] || Math.random() * 1000;
          const change = Math.random() * 20 - 10; // -10% to +10%
          marketData = await storage.upsertMarketData(symbol, price, change);
        }

        markets.push({
          symbol,
          name: getAssetName(symbol),
          price: parseFloat(marketData.price),
          priceChange24h: parseFloat(marketData.priceChange24h),
          volume24h: parseFloat(marketData.volume24h || '1000000'),
          marketCap: parseFloat(marketData.marketCap || '10000000'),
        });
      }

      res.json(markets);
    } catch (error) {
      console.error("Error fetching markets:", error);
      res.status(500).json({ message: "Failed to fetch markets" });
    }
  });

  // Admin middleware
  const isAdmin = async (req: any, res: any, next: any) => {
    try {
      if (req.isAuthenticated && req.isAuthenticated() && req.user) {
        const userId = req.user.claims.sub;
        const user = await storage.getUser(userId);
        if (user && user.role === 'admin') {
          return next();
        }
      }
      // For demo purposes, allow access to admin routes
      return next();
    } catch (error) {
      console.error("Admin check error:", error);
      res.status(403).json({ message: "Admin access required" });
    }
  };

  // Admin Routes for Custom Rate Management

  // Get all market data for admin panel
  app.get("/api/admin/market-data", isAdmin, async (req, res) => {
    try {
      const marketData = await storage.getAllMarketData();
      res.json(marketData);
    } catch (error) {
      console.error("Error fetching admin market data:", error);
      res.status(500).json({ message: "Failed to fetch market data" });
    }
  });

  // Create or update custom market data
  app.post("/api/admin/market-data", isAdmin, async (req, res) => {
    try {
      const marketDataInput = insertMarketDataSchema.parse(req.body);
      const result = await storage.insertCustomMarketData(marketDataInput);
      res.status(201).json(result);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid market data", errors: error.errors });
      } else {
        console.error("Error creating market data:", error);
        res.status(500).json({ message: "Failed to create market data" });
      }
    }
  });

  // Update specific market data
  app.put("/api/admin/market-data/:symbol", isAdmin, async (req, res) => {
    try {
      const symbol = req.params.symbol.toUpperCase();
      const updateData = insertMarketDataSchema.parse({
        ...req.body,
        cryptocurrency: symbol
      });
      const result = await storage.insertCustomMarketData(updateData);
      res.json(result);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid market data", errors: error.errors });
      } else {
        console.error("Error updating market data:", error);
        res.status(500).json({ message: "Failed to update market data" });
      }
    }
  });

  // Delete market data
  app.delete("/api/admin/market-data/:symbol", isAdmin, async (req, res) => {
    try {
      const symbol = req.params.symbol.toUpperCase();
      await storage.deleteMarketData(symbol);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting market data:", error);
      res.status(500).json({ message: "Failed to delete market data" });
    }
  });

  // Bulk update rates endpoint
  app.post("/api/admin/bulk-update-rates", isAdmin, async (req, res) => {
    try {
      const { rates } = req.body;
      if (!Array.isArray(rates)) {
        return res.status(400).json({ message: "Rates must be an array" });
      }

      const results = [];
      for (const rate of rates) {
        const marketDataInput = insertMarketDataSchema.parse(rate);
        const result = await storage.insertCustomMarketData(marketDataInput);
        results.push(result);
      }

      res.json({ message: "Bulk update completed", results });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid market data", errors: error.errors });
      } else {
        console.error("Error bulk updating rates:", error);
        res.status(500).json({ message: "Failed to bulk update rates" });
      }
    }
  });

  function getAssetName(symbol: string): string {
    const names: { [key: string]: string } = {
      'BTC': 'Bitcoin',
      'ETH': 'Ethereum',
      'ADA': 'Cardano',
      'SOL': 'Solana',
      'DOT': 'Polkadot',
      'MATIC': 'Polygon',
      'AVAX': 'Avalanche',
      'LINK': 'Chainlink',
    };
    return names[symbol] || symbol;
  }

  const httpServer = createServer(app);
  return httpServer;
}