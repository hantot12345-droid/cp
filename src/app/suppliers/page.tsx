"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  Users,
  Search,
  Plus,
  Eye,
  Edit,
  Phone,
  Mail,
  MapPin,
  Star,
  Clock,
  DollarSign,
  Truck,
} from "lucide-react";
import { suppliers } from "@/lib/data";
import { Supplier } from "@/lib/types";
import Sidebar from "@/components/Sidebar";

export default function SuppliersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  // Filter suppliers
  const filteredSuppliers = suppliers.filter(supplier => 
    supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.contact.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const viewSupplier = (supplier: Supplier) => {
    setSelectedSupplier(supplier);
    setIsViewDialogOpen(true);
  };

  const supplierStats = {
    total: suppliers.length,
    active: suppliers.filter(s => s.status === 'active').length,
    avgRating: suppliers.reduce((sum, s) => sum + s.rating, 0) / suppliers.length,
    avgLeadTime: suppliers.reduce((sum, s) => sum + s.leadTime, 0) / suppliers.length
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar currentPage="suppliers" />

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-semibold text-gray-900">Supplier Management</h1>
            </div>

            <div className="flex items-center space-x-4">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Add Supplier
              </Button>
            </div>
          </div>
        </header>

        {/* Dashboard content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="mb-6">
            <p className="text-gray-600">Manage your parts suppliers and vendors</p>
          </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Suppliers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{supplierStats.total}</div>
              <p className="text-xs text-muted-foreground">Registered suppliers</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Suppliers</CardTitle>
              <Users className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{supplierStats.active}</div>
              <p className="text-xs text-muted-foreground">Currently active</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Rating</CardTitle>
              <Star className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{supplierStats.avgRating.toFixed(1)}</div>
              <p className="text-xs text-muted-foreground">Out of 5.0</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Lead Time</CardTitle>
              <Clock className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{supplierStats.avgLeadTime.toFixed(0)} days</div>
              <p className="text-xs text-muted-foreground">Average delivery</p>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Search Suppliers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search suppliers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Suppliers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSuppliers.map((supplier) => (
            <Card key={supplier.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{supplier.name}</CardTitle>
                    <div className="flex items-center mt-1">
                      {renderStars(supplier.rating)}
                      <span className="ml-2 text-sm text-gray-600">({supplier.rating})</span>
                    </div>
                  </div>
                  <Badge variant={supplier.status === 'active' ? 'default' : 'secondary'}>
                    {supplier.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <Mail className="w-4 h-4 mr-2" />
                    {supplier.contact.email}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Phone className="w-4 h-4 mr-2" />
                    {supplier.contact.phone}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    {supplier.address.city}, {supplier.address.state}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                  <div className="text-center">
                    <div className="flex items-center justify-center text-blue-600 mb-1">
                      <Clock className="w-4 h-4 mr-1" />
                    </div>
                    <div className="text-sm font-medium">{supplier.leadTime} days</div>
                    <div className="text-xs text-gray-500">Lead Time</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center text-green-600 mb-1">
                      <DollarSign className="w-4 h-4 mr-1" />
                    </div>
                    <div className="text-sm font-medium">${supplier.minimumOrder}</div>
                    <div className="text-xs text-gray-500">Min Order</div>
                  </div>
                </div>

                <div className="flex space-x-2 pt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => viewSupplier(supplier)}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View Supplier Dialog */}
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="max-w-3xl">
            {selectedSupplier && (
              <>
                <DialogHeader>
                  <DialogTitle className="flex items-center justify-between">
                    <span>{selectedSupplier.name}</span>
                    <Badge variant={selectedSupplier.status === 'active' ? 'default' : 'secondary'}>
                      {selectedSupplier.status}
                    </Badge>
                  </DialogTitle>
                  <DialogDescription>
                    Supplier details and performance metrics
                  </DialogDescription>
                </DialogHeader>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 py-4">
                  {/* Contact Information */}
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Contact Information</h4>
                      <div className="space-y-3">
                        <div className="flex items-center">
                          <Mail className="w-4 h-4 text-gray-400 mr-3" />
                          <div>
                            <div className="text-sm font-medium">{selectedSupplier.contact.email}</div>
                            <div className="text-xs text-gray-500">Email</div>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Phone className="w-4 h-4 text-gray-400 mr-3" />
                          <div>
                            <div className="text-sm font-medium">{selectedSupplier.contact.phone}</div>
                            <div className="text-xs text-gray-500">Phone</div>
                          </div>
                        </div>
                        {selectedSupplier.contact.website && (
                          <div className="flex items-center">
                            <div className="w-4 h-4 text-gray-400 mr-3">🌐</div>
                            <div>
                              <div className="text-sm font-medium text-blue-600">
                                {selectedSupplier.contact.website}
                              </div>
                              <div className="text-xs text-gray-500">Website</div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Address</h4>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-start">
                          <MapPin className="w-4 h-4 text-gray-400 mr-3 mt-0.5" />
                          <div className="text-sm">
                            {selectedSupplier.address.street}<br />
                            {selectedSupplier.address.city}, {selectedSupplier.address.state} {selectedSupplier.address.zipCode}<br />
                            {selectedSupplier.address.country}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Business Information */}
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Business Terms</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Payment Terms:</span>
                          <span className="text-sm font-medium">{selectedSupplier.paymentTerms}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Lead Time:</span>
                          <span className="text-sm font-medium">{selectedSupplier.leadTime} days</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Minimum Order:</span>
                          <span className="text-sm font-medium">${selectedSupplier.minimumOrder}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Performance</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Rating:</span>
                          <div className="flex items-center">
                            {renderStars(selectedSupplier.rating)}
                            <span className="ml-2 text-sm font-medium">({selectedSupplier.rating})</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Member Since:</span>
                          <span className="text-sm font-medium">
                            {new Date(selectedSupplier.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    {selectedSupplier.notes && (
                      <div>
                        <h4 className="font-medium text-gray-900 mb-3">Notes</h4>
                        <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                          <p className="text-sm text-gray-700">{selectedSupplier.notes}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex justify-end space-x-2 mt-6">
                  <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
                    Close
                  </Button>
                  <Button variant="outline">
                    <Truck className="w-4 h-4 mr-2" />
                    Create Purchase Order
                  </Button>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Supplier
                  </Button>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
        </main>
      </div>
    </div>
  );
}
