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

  // Signup route
  app.post('/api/auth/signup', async (req, res) => {
    try {
      const { email, password } = req.body;
      
      if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
      }

      if (password.length < 6) {
        return res.status(400).json({ message: "Password must be at least 6 characters" });
      }

      // Check if user already exists
      const existingUser = await storage.getUserByEmail(email);
      if (existingUser) {
        return res.status(400).json({ message: "User already exists with this email" });
      }

      // Create new user
      const userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const user = await storage.createUser({
        id: userId,
        email,
        password, // In production, this should be hashed
        firstName: null,
        lastName: null,
        profileImageUrl: null,
      });

      res.status(201).json({ message: "User created successfully", userId: user.id });
    } catch (error) {
      console.error("Signup error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Signin route
  app.post('/api/auth/signin', async (req, res) => {
    try {
      const { email, password } = req.body;
      
      if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
      }

      // Find user by email
      const user = await storage.getUserByEmail(email);
      if (!user || user.password !== password) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      // Create session
      (req as any).session.userId = user.id;
      (req as any).session.isAuthenticated = true;

      res.json({ 
        message: "Login successful", 
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName
        }
      });
    } catch (error) {
      console.error("Signin error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Logout route
  app.post('/api/auth/logout', (req, res) => {
    (req as any).session.destroy((err: any) => {
      if (err) {
        return res.status(500).json({ message: "Could not log out" });
      }
      res.json({ message: "Logout successful" });
    });
  });

  // Authentication routes - check both session and Replit auth
  app.get('/api/auth/user', async (req: any, res) => {
    try {
      // Check session-based auth first
      if (req.session && req.session.isAuthenticated && req.session.userId) {
        const user = await storage.getUser(req.session.userId);
        if (user) {
          return res.json(user);
        }
      }

      // Check if user is authenticated via Replit Auth
      if (req.isAuthenticated && req.isAuthenticated() && req.user) {
        const userId = req.user.claims.sub;
        const user = await storage.getUser(userId);
        if (user) {
          return res.json(user);
        }
      }
      
      // Return unauthorized for unauthenticated users
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
      
      const marketData = await storage.getMarketData(tradeData.cryptocurrency);
      if (!marketData) {
        res.status(400).json({ message: "Cryptocurrency not available. Please contact admin to add this cryptocurrency." });
        return;
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

  // Market data endpoint - serves only admin-controlled rates
  app.get("/api/market/:symbol", async (req, res) => {
    try {
      const symbol = req.params.symbol.toUpperCase();
      const marketData = await storage.getMarketData(symbol);
      
      if (!marketData) {
        res.status(404).json({ message: "Market data not found. Please add this cryptocurrency in the admin panel." });
        return;
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

  // Market data endpoint for trading components - serves only admin-controlled rates
  app.get("/api/market-data", async (req, res) => {
    try {
      const allMarketData = await storage.getAllMarketData();
      const markets = allMarketData.map(marketData => ({
        symbol: marketData.cryptocurrency,
        name: getAssetName(marketData.cryptocurrency),
        price: parseFloat(marketData.price),
        priceChange24h: parseFloat(marketData.priceChange24h),
        volume24h: parseFloat(marketData.volume24h || '1000000'),
        marketCap: parseFloat(marketData.marketCap || '10000000'),
      }));

      res.json(markets);
    } catch (error) {
      console.error("Error fetching market data:", error);
      res.status(500).json({ message: "Failed to fetch market data" });
    }
  });

  // Markets overview - serves only admin-controlled rates  
  app.get("/api/markets", async (req, res) => {
    try {
      const allMarketData = await storage.getAllMarketData();
      const markets = allMarketData.map(marketData => ({
        symbol: marketData.cryptocurrency,
        name: getAssetName(marketData.cryptocurrency),
        price: parseFloat(marketData.price),
        priceChange24h: parseFloat(marketData.priceChange24h),
        volume24h: parseFloat(marketData.volume24h || '1000000'),
        marketCap: parseFloat(marketData.marketCap || '10000000'),
      }));

      res.json(markets);
    } catch (error) {
      console.error("Error fetching markets:", error);
      res.status(500).json({ message: "Failed to fetch markets" });
    }
  });

  // Admin middleware - secure admin access
  const isAdmin = async (req: any, res: any, next: any) => {
    try {
      // Check for admin secret key in headers
      const adminKey = req.headers['x-admin-key'];
      const validAdminKey = process.env.ADMIN_SECRET_KEY || 'admin-secret-2024';
      
      if (adminKey === validAdminKey) {
        return next();
      }

      // Also allow authenticated users with admin role
      if (req.isAuthenticated && req.isAuthenticated() && req.user) {
        const userId = req.user.claims.sub;
        const user = await storage.getUser(userId);
        if (user && user.email === 'admin@chicksx.com') {
          return next();
        }
      }
      
      res.status(403).json({ message: "Admin access denied" });
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
      
      // Broadcast update to all connected clients
      if ((global as any).broadcastMarketUpdate) {
        (global as any).broadcastMarketUpdate(result);
      }
      
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
      
      // Broadcast update to all connected clients
      if ((global as any).broadcastMarketUpdate) {
        (global as any).broadcastMarketUpdate(result);
      }
      
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

  // Pesapal Payment Integration
  app.post('/api/payment/pesapal/initiate', async (req, res) => {
    try {
      const { amount, currency, email, firstName, lastName, phone } = req.body;
      
      if (!amount || !email || !firstName || !lastName) {
        return res.status(400).json({ error: { message: 'Missing required fields' } });
      }

      // Generate unique merchant reference
      const merchantReference = `TXN_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      // Pesapal API configuration
      const pesapalConsumerKey = process.env.PESAPAL_CONSUMER_KEY;
      const pesapalConsumerSecret = process.env.PESAPAL_CONSUMER_SECRET;
      const pesapalEnvironment = process.env.PESAPAL_ENVIRONMENT || 'sandbox'; // sandbox or live
      
      if (!pesapalConsumerKey || !pesapalConsumerSecret) {
        return res.status(500).json({ 
          error: { message: 'Payment gateway configuration missing' }
        });
      }

      // Pesapal authentication
      const authUrl = pesapalEnvironment === 'live' 
        ? 'https://pay.pesapal.com/v3/api/Auth/RequestToken'
        : 'https://cybqa.pesapal.com/pesapalv3/api/Auth/RequestToken';

      const authResponse = await fetch(authUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          consumer_key: pesapalConsumerKey,
          consumer_secret: pesapalConsumerSecret
        })
      });

      const authData = await authResponse.json();
      
      if (!authData.token) {
        throw new Error('Failed to authenticate with Pesapal');
      }

      // Submit order to Pesapal
      const orderUrl = pesapalEnvironment === 'live'
        ? 'https://pay.pesapal.com/v3/api/Transactions/SubmitOrderRequest'
        : 'https://cybqa.pesapal.com/pesapalv3/api/Transactions/SubmitOrderRequest';

      const orderData = {
        id: merchantReference,
        currency: currency.toUpperCase(),
        amount: parseFloat(amount),
        description: `Cryptocurrency purchase - ${amount} ${currency}`,
        callback_url: `${req.protocol}://${req.get('host')}/api/payment/pesapal/callback`,
        notification_id: merchantReference,
        billing_address: {
          email_address: email,
          phone_number: phone,
          country_code: 'KE', // Default to Kenya, can be made dynamic
          first_name: firstName,
          last_name: lastName
        }
      };

      const orderResponse = await fetch(orderUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${authData.token}`
        },
        body: JSON.stringify(orderData)
      });

      const orderResult = await orderResponse.json();

      if (orderResult.order_tracking_id && orderResult.redirect_url) {
        // Store transaction record
        const userId = req.session?.userId || 'guest';
        await storage.createTransaction({
          userId,
          type: 'buy',
          cryptocurrency: 'PENDING',
          amount: amount.toString(),
          fiatAmount: amount.toString(),
          price: '1',
          fee: '0',
          status: 'pending'
        });

        res.json({
          order_tracking_id: orderResult.order_tracking_id,
          merchant_reference: merchantReference,
          redirect_url: orderResult.redirect_url,
          status: 'success'
        });
      } else {
        throw new Error(orderResult.error?.message || 'Failed to create payment order');
      }
    } catch (error) {
      console.error('Pesapal payment error:', error);
      res.status(500).json({ 
        error: { message: error instanceof Error ? error.message : 'Payment processing failed' }
      });
    }
  });

  // Pesapal payment callback
  app.get('/api/payment/pesapal/callback', async (req, res) => {
    try {
      const { OrderTrackingId, OrderMerchantReference } = req.query;
      
      if (!OrderTrackingId) {
        return res.redirect('/?payment=failed');
      }

      // Verify payment status with Pesapal
      const pesapalEnvironment = process.env.PESAPAL_ENVIRONMENT || 'sandbox';
      const authUrl = pesapalEnvironment === 'live' 
        ? 'https://pay.pesapal.com/v3/api/Auth/RequestToken'
        : 'https://cybqa.pesapal.com/pesapalv3/api/Auth/RequestToken';

      const authResponse = await fetch(authUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          consumer_key: process.env.PESAPAL_CONSUMER_KEY,
          consumer_secret: process.env.PESAPAL_CONSUMER_SECRET
        })
      });

      const authData = await authResponse.json();
      
      if (authData.token) {
        const statusUrl = pesapalEnvironment === 'live'
          ? `https://pay.pesapal.com/v3/api/Transactions/GetTransactionStatus?orderTrackingId=${OrderTrackingId}`
          : `https://cybqa.pesapal.com/pesapalv3/api/Transactions/GetTransactionStatus?orderTrackingId=${OrderTrackingId}`;

        const statusResponse = await fetch(statusUrl, {
          headers: {
            'Authorization': `Bearer ${authData.token}`,
            'Accept': 'application/json'
          }
        });

        const statusData = await statusResponse.json();
        
        if (statusData.payment_status_description === 'Completed') {
          res.redirect('/?payment=success');
        } else {
          res.redirect('/?payment=failed');
        }
      } else {
        res.redirect('/?payment=failed');
      }
    } catch (error) {
      console.error('Payment callback error:', error);
      res.redirect('/?payment=failed');
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}