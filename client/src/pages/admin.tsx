import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash2, Plus, Edit, Save, X, TrendingUp, TrendingDown } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

interface MarketData {
  id: number;
  cryptocurrency: string;
  price: string;
  priceChange24h: string;
  volume24h: string;
  marketCap: string;
  updatedAt: string;
}

interface EditingRate {
  cryptocurrency: string;
  price: string;
  priceChange24h: string;
  volume24h: string;
  marketCap: string;
}

export default function AdminPanel() {
  const [editingRate, setEditingRate] = useState<EditingRate | null>(null);
  const [newRate, setNewRate] = useState<EditingRate>({
    cryptocurrency: "",
    price: "",
    priceChange24h: "",
    volume24h: "",
    marketCap: "",
  });
  const [showAddForm, setShowAddForm] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Available cryptocurrencies from the user-side markets
  const availableCryptos = [
    { symbol: 'BTC', name: 'Bitcoin' },
    { symbol: 'ETH', name: 'Ethereum' },
    { symbol: 'ADA', name: 'Cardano' },
    { symbol: 'SOL', name: 'Solana' },
    { symbol: 'MATIC', name: 'Polygon' },
    { symbol: 'DOT', name: 'Polkadot' },
    { symbol: 'AVAX', name: 'Avalanche' },
    { symbol: 'LINK', name: 'Chainlink' },
  ];

  // Fetch all market data
  const { data: marketData, isLoading } = useQuery({
    queryKey: ["/api/admin/market-data"],
    queryFn: async () => {
      const response = await fetch("/api/admin/market-data");
      if (!response.ok) throw new Error("Failed to fetch market data");
      return response.json();
    },
  });

  // Create/Update mutation
  const createMutation = useMutation({
    mutationFn: async (data: EditingRate) => {
      const response = await fetch("/api/admin/market-data", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) throw new Error("Failed to create market data");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/market-data"] });
      toast({ title: "Success", description: "Custom rate created successfully" });
      setNewRate({
        cryptocurrency: "",
        price: "",
        priceChange24h: "",
        volume24h: "",
        marketCap: "",
      });
      setShowAddForm(false);
    },
    onError: () => {
      toast({ 
        title: "Error", 
        description: "Failed to create custom rate",
        variant: "destructive" 
      });
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: async ({ symbol, data }: { symbol: string; data: EditingRate }) => {
      const response = await fetch(`/api/admin/market-data/${symbol}`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) throw new Error("Failed to update market data");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/market-data"] });
      toast({ title: "Success", description: "Custom rate updated successfully" });
      setEditingRate(null);
    },
    onError: () => {
      toast({ 
        title: "Error", 
        description: "Failed to update custom rate",
        variant: "destructive" 
      });
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (symbol: string) => {
      const response = await fetch(`/api/admin/market-data/${symbol}`, { 
        method: "DELETE" 
      });
      if (!response.ok) throw new Error("Failed to delete market data");
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/market-data"] });
      toast({ title: "Success", description: "Custom rate deleted successfully" });
    },
    onError: () => {
      toast({ 
        title: "Error", 
        description: "Failed to delete custom rate",
        variant: "destructive" 
      });
    },
  });

  // Bulk update mutation
  const bulkUpdateMutation = useMutation({
    mutationFn: async (rates: EditingRate[]) => {
      const response = await fetch("/api/admin/bulk-update-rates", {
        method: "POST",
        body: JSON.stringify({ rates }),
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) throw new Error("Failed to bulk update rates");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/market-data"] });
      toast({ title: "Success", description: "Bulk update completed successfully" });
    },
    onError: () => {
      toast({ 
        title: "Error", 
        description: "Failed to perform bulk update",
        variant: "destructive" 
      });
    },
  });

  const handleEdit = (rate: MarketData) => {
    setEditingRate({
      cryptocurrency: rate.cryptocurrency,
      price: rate.price,
      priceChange24h: rate.priceChange24h,
      volume24h: rate.volume24h,
      marketCap: rate.marketCap,
    });
  };

  const handleSave = () => {
    if (editingRate) {
      updateMutation.mutate({
        symbol: editingRate.cryptocurrency,
        data: editingRate,
      });
    }
  };

  const handleCreate = () => {
    if (newRate.cryptocurrency && newRate.price) {
      createMutation.mutate(newRate);
    }
  };

  const handleDelete = (symbol: string) => {
    if (confirm(`Are you sure you want to delete ${symbol}?`)) {
      deleteMutation.mutate(symbol);
    }
  };

  const formatPrice = (price: string) => {
    const num = parseFloat(price);
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: num < 1 ? 6 : 2,
    }).format(num);
  };

  const formatPercentage = (change: string) => {
    const num = parseFloat(change);
    return `${num >= 0 ? '+' : ''}${num.toFixed(2)}%`;
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-6 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Panel</h1>
        <p className="text-gray-600">Manage custom cryptocurrency rates and pricing</p>
      </div>

      {/* Add New Rate Form */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Custom Rate Management
            <Button
              onClick={() => setShowAddForm(!showAddForm)}
              variant={showAddForm ? "outline" : "default"}
            >
              {showAddForm ? <X className="w-4 h-4 mr-2" /> : <Plus className="w-4 h-4 mr-2" />}
              {showAddForm ? "Cancel" : "Add New Rate"}
            </Button>
          </CardTitle>
          <CardDescription>
            Create and manage custom cryptocurrency rates that override market prices
          </CardDescription>
        </CardHeader>
        {showAddForm && (
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div>
                <Label htmlFor="new-crypto">Symbol</Label>
                <Select
                  value={newRate.cryptocurrency}
                  onValueChange={(value) => setNewRate({ ...newRate, cryptocurrency: value })}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select cryptocurrency..." />
                  </SelectTrigger>
                  <SelectContent>
                    {availableCryptos.map((crypto) => (
                      <SelectItem key={crypto.symbol} value={crypto.symbol}>
                        {crypto.symbol} - {crypto.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="new-price">Price ($)</Label>
                <Input
                  id="new-price"
                  type="number"
                  step="0.000001"
                  placeholder="0.00"
                  value={newRate.price}
                  onChange={(e) => setNewRate({ ...newRate, price: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="new-change">24h Change (%)</Label>
                <Input
                  id="new-change"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={newRate.priceChange24h}
                  onChange={(e) => setNewRate({ ...newRate, priceChange24h: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="new-volume">Volume 24h</Label>
                <Input
                  id="new-volume"
                  type="number"
                  placeholder="0"
                  value={newRate.volume24h}
                  onChange={(e) => setNewRate({ ...newRate, volume24h: e.target.value })}
                />
              </div>
              <div className="flex items-end">
                <Button
                  onClick={handleCreate}
                  disabled={!newRate.cryptocurrency || !newRate.price || createMutation.isPending}
                  className="w-full"
                >
                  {createMutation.isPending ? "Creating..." : "Create Rate"}
                </Button>
              </div>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Market Data Table */}
      <Card>
        <CardHeader>
          <CardTitle>Current Custom Rates</CardTitle>
          <CardDescription>
            All cryptocurrency rates currently active in the system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold">Symbol</th>
                  <th className="text-left py-3 px-4 font-semibold">Price</th>
                  <th className="text-left py-3 px-4 font-semibold">24h Change</th>
                  <th className="text-left py-3 px-4 font-semibold">Volume 24h</th>
                  <th className="text-left py-3 px-4 font-semibold">Market Cap</th>
                  <th className="text-left py-3 px-4 font-semibold">Last Updated</th>
                  <th className="text-left py-3 px-4 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {marketData?.map((rate: MarketData) => (
                  <tr key={rate.cryptocurrency} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <Badge variant="outline" className="font-semibold">
                        {rate.cryptocurrency}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      {editingRate?.cryptocurrency === rate.cryptocurrency ? (
                        <Input
                          type="number"
                          step="0.000001"
                          value={editingRate.price}
                          onChange={(e) => setEditingRate({ ...editingRate, price: e.target.value })}
                          className="w-32"
                        />
                      ) : (
                        <span className="font-semibold">{formatPrice(rate.price)}</span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      {editingRate?.cryptocurrency === rate.cryptocurrency ? (
                        <Input
                          type="number"
                          step="0.01"
                          value={editingRate.priceChange24h}
                          onChange={(e) => setEditingRate({ ...editingRate, priceChange24h: e.target.value })}
                          className="w-24"
                        />
                      ) : (
                        <span className={`flex items-center ${parseFloat(rate.priceChange24h) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {parseFloat(rate.priceChange24h) >= 0 ? 
                            <TrendingUp className="w-4 h-4 mr-1" /> : 
                            <TrendingDown className="w-4 h-4 mr-1" />
                          }
                          {formatPercentage(rate.priceChange24h)}
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      {editingRate?.cryptocurrency === rate.cryptocurrency ? (
                        <Input
                          type="number"
                          value={editingRate.volume24h}
                          onChange={(e) => setEditingRate({ ...editingRate, volume24h: e.target.value })}
                          className="w-32"
                        />
                      ) : (
                        <span>${parseFloat(rate.volume24h).toLocaleString()}</span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      {editingRate?.cryptocurrency === rate.cryptocurrency ? (
                        <Input
                          type="number"
                          value={editingRate.marketCap}
                          onChange={(e) => setEditingRate({ ...editingRate, marketCap: e.target.value })}
                          className="w-32"
                        />
                      ) : (
                        <span>${parseFloat(rate.marketCap).toLocaleString()}</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-500">
                      {new Date(rate.updatedAt).toLocaleString()}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        {editingRate?.cryptocurrency === rate.cryptocurrency ? (
                          <>
                            <Button
                              size="sm"
                              onClick={handleSave}
                              disabled={updateMutation.isPending}
                            >
                              <Save className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setEditingRate(null)}
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </>
                        ) : (
                          <>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleEdit(rate)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleDelete(rate.cryptocurrency)}
                              disabled={deleteMutation.isPending}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {(!marketData || marketData.length === 0) && (
              <div className="text-center py-8 text-gray-500">
                No custom rates configured. Add your first custom rate above.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}