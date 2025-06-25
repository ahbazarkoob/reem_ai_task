"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/components/ui/use-toast";
import {
  AlertCircle,
  CreditCard,
  Download,
  FileText,
  Package,
  Plus,
  RefreshCw,
  Shield,
  Star,
  Trash2,
  TrendingUp,
  Zap,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const paymentMethodSchema = z.object({
  cardholderName: z.string().min(2, { message: "Cardholder name is required" }),
  cardNumber: z
    .string()
    .min(13, { message: "Valid card number is required" })
    .max(19),
  expiryMonth: z.string().min(1, { message: "Expiry month is required" }),
  expiryYear: z.string().min(1, { message: "Expiry year is required" }),
  cvv: z.string().min(3, { message: "CVV is required" }).max(4),
  isDefault: z.boolean().default(false),
});

const billingAddressSchema = z.object({
  addressLine1: z.string().min(1, { message: "Address line 1 is required" }),
  addressLine2: z.string().optional(),
  city: z.string().min(1, { message: "City is required" }),
  state: z.string().min(1, { message: "State/Province is required" }),
  postalCode: z.string().min(1, { message: "Postal code is required" }),
  country: z.string().min(1, { message: "Country is required" }),
  sameAsCompany: z.boolean().default(false),
});

const taxInfoSchema = z.object({
  businessType: z.string().min(1, { message: "Business type is required" }),
  taxId: z.string().min(1, { message: "Tax ID is required" }),
  vatNumber: z.string().optional(),
  taxExempt: z.boolean().default(false),
});

export function BillingManagement() {
  const [activeTab, setActiveTab] = useState("subscription");
  const [isUpgrading, setIsUpgrading] = useState(false);
  const [isAddingPaymentMethod, setIsAddingPaymentMethod] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);

  const paymentMethodForm = useForm<z.infer<typeof paymentMethodSchema>>({
    resolver: zodResolver(paymentMethodSchema),
    defaultValues: {
      cardholderName: "",
      cardNumber: "",
      expiryMonth: "",
      expiryYear: "",
      cvv: "",
      isDefault: false,
    },
  });

  const billingAddressForm = useForm<z.infer<typeof billingAddressSchema>>({
    resolver: zodResolver(billingAddressSchema),
    defaultValues: {
      addressLine1: "123 Business Ave",
      addressLine2: "Suite 200",
      city: "San Francisco",
      state: "CA",
      postalCode: "94107",
      country: "United States",
      sameAsCompany: true,
    },
  });

  const taxInfoForm = useForm<z.infer<typeof taxInfoSchema>>({
    resolver: zodResolver(taxInfoSchema),
    defaultValues: {
      businessType: "corporation",
      taxId: "12-3456789",
      vatNumber: "",
      taxExempt: false,
    },
  });

  function onPaymentMethodSubmit(values: z.infer<typeof paymentMethodSchema>) {
    toast({
      title: "Payment method added",
      description: "Your payment method has been successfully added.",
    });
    setIsAddingPaymentMethod(false);
    console.log(values);
  }

  function onBillingAddressSubmit(
    values: z.infer<typeof billingAddressSchema>
  ) {
    toast({
      title: "Billing address updated",
      description: "Your billing address has been successfully updated.",
    });
    console.log(values);
  }

  function onTaxInfoSubmit(values: z.infer<typeof taxInfoSchema>) {
    toast({
      title: "Tax information updated",
      description: "Your tax information has been successfully updated.",
    });
    console.log(values);
  }

  function handleUpgrade(plan: string) {
    toast({
      title: "Subscription upgraded",
      description: `Your subscription has been upgraded to the ${plan} plan.`,
    });
    setIsUpgrading(false);
  }

  function handleCancelSubscription() {
    toast({
      title: "Subscription cancelled",
      description:
        "Your subscription has been cancelled and will end at the billing period.",
      variant: "destructive",
    });
    setIsCancelling(false);
  }

  const currentPlan = {
    name: "Professional",
    price: "$99",
    billingCycle: "monthly",
    nextBillingDate: "June 22, 2025",
    status: "active",
    features: [
      "10 AI agents",
      "50,000 calls per month",
      "Advanced analytics",
      "Email & phone support",
      "Custom voice options",
      "API access",
    ],
    limits: {
      agents: { used: 6, total: 10 },
      calls: { used: 32500, total: 50000 },
      storage: { used: 45, total: 100 },
      campaigns: { used: 8, total: 20 },
    },
  };

  const availablePlans = [
    {
      id: "starter",
      name: "Starter",
      price: "$49",
      billingCycle: "monthly",
      description:
        "Perfect for small businesses just getting started with AI calling.",
      features: [
        "3 AI agents",
        "10,000 calls per month",
        "Basic analytics",
        "Email support",
        "Standard voice options",
        "No API access",
      ],
      recommended: false,
    },
    {
      id: "professional",
      name: "Professional",
      price: "$99",
      billingCycle: "monthly",
      description: "Ideal for growing businesses with moderate call volumes.",
      features: [
        "10 AI agents",
        "50,000 calls per month",
        "Advanced analytics",
        "Email & phone support",
        "Custom voice options",
        "API access",
      ],
      recommended: false,
      current: true,
    },
    {
      id: "business",
      name: "Business",
      price: "$299",
      billingCycle: "monthly",
      description: "For businesses with high call volumes and advanced needs.",
      features: [
        "Unlimited AI agents",
        "250,000 calls per month",
        "Enterprise analytics",
        "Priority support",
        "Custom voice & script development",
        "Advanced API access",
        "Dedicated account manager",
      ],
      recommended: true,
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: "Custom",
      billingCycle: "annual",
      description:
        "Custom solutions for large organizations with specific requirements.",
      features: [
        "Unlimited everything",
        "Custom implementation",
        "24/7 dedicated support",
        "On-premise options",
        "Custom integrations",
        "SLA guarantees",
      ],
      recommended: false,
    },
  ];

  const paymentMethods = [
    {
      id: "pm_1",
      type: "Visa",
      last4: "4242",
      expiry: "04/2026",
      isDefault: true,
    },
    {
      id: "pm_2",
      type: "Mastercard",
      last4: "5555",
      expiry: "08/2025",
      isDefault: false,
    },
  ];

  const invoices = [
    {
      id: "INV-2025-0512",
      date: "May 12, 2025",
      amount: "$99.00",
      status: "Paid",
      description: "Professional Plan - Monthly",
    },
    {
      id: "INV-2025-0412",
      date: "April 12, 2025",
      amount: "$99.00",
      status: "Paid",
      description: "Professional Plan - Monthly",
    },
    {
      id: "INV-2025-0312",
      date: "March 12, 2025",
      amount: "$99.00",
      status: "Paid",
      description: "Professional Plan - Monthly",
    },
    {
      id: "INV-2025-0212",
      date: "February 12, 2025",
      amount: "$99.00",
      status: "Paid",
      description: "Professional Plan - Monthly",
    },
    {
      id: "INV-2025-0112",
      date: "January 12, 2025",
      amount: "$99.00",
      status: "Paid",
      description: "Professional Plan - Monthly",
    },
  ];

  return (
    <Tabs
      defaultValue="subscription"
      value={activeTab}
      onValueChange={setActiveTab}
      className="space-y-6"
    >
      <TabsList className="grid grid-cols-4 w-full max-w-3xl">
        <TabsTrigger
          value="subscription"
          className="data-[state=active]:text-primary/80 text-gray-500 data-[state=active]:bg-gray-100"
        >
          Subscription
        </TabsTrigger>
        <TabsTrigger
          value="payment"
          className="data-[state=active]:text-primary/80 text-gray-500 data-[state=active]:bg-gray-100"
        >
          Payment Methods
        </TabsTrigger>
        <TabsTrigger
          value="invoices"
          className="data-[state=active]:text-primary/80 text-gray-500 data-[state=active]:bg-gray-100"
        >
          Invoices
        </TabsTrigger>
        <TabsTrigger
          value="usage"
          className="data-[state=active]:text-primary/80 text-gray-500 data-[state=active]:bg-gray-100"
        >
          Usage & Limits
        </TabsTrigger>
      </TabsList>

      {/* Subscription Tab */}
      <TabsContent value="subscription" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Current Plan</CardTitle>
            <CardDescription>
              Your current subscription plan and details.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-bold">
                    {currentPlan.name} Plan
                  </h3>
                  <Badge
                    variant="outline"
                    className="bg-green-50 text-green-700 hover:bg-green-50 border-green-200"
                  >
                    Active
                  </Badge>
                </div>
                <p className="text-muted-foreground mt-1">
                  {currentPlan.price} / {currentPlan.billingCycle} · Next
                  billing on {currentPlan.nextBillingDate}
                </p>
              </div>
              <div className="flex gap-2">
                <Dialog open={isUpgrading} onOpenChange={setIsUpgrading}>
                  <DialogTrigger asChild>
                    <Button>
                      <TrendingUp className="h-4 w-4 mr-2" />
                      Upgrade Plan
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl">
                    <DialogHeader>
                      <DialogTitle>Upgrade Your Plan</DialogTitle>
                      <DialogDescription>
                        Choose the plan that best fits your business needs.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-4">
                      {availablePlans
                        .filter(
                          (plan) => plan.id !== "starter" && !plan.current
                        )
                        .map((plan) => (
                          <Card
                            key={plan.id}
                            className={`border ${
                              plan.recommended ? "border-primary" : ""
                            }`}
                          >
                            <CardHeader className="pb-2">
                              {plan.recommended && (
                                <Badge className="w-fit mb-2">
                                  <Star className="h-3 w-3 mr-1" /> Recommended
                                </Badge>
                              )}
                              <CardTitle>{plan.name}</CardTitle>
                              <div className="flex items-end gap-1">
                                <span className="text-2xl font-bold">
                                  {plan.price}
                                </span>
                                <span className="text-muted-foreground">
                                  /{plan.billingCycle}
                                </span>
                              </div>
                              <CardDescription className="mt-1">
                                {plan.description}
                              </CardDescription>
                            </CardHeader>
                            <CardContent className="pb-2">
                              <ul className="space-y-2">
                                {plan.features.map((feature, i) => (
                                  <li key={i} className="flex items-start">
                                    <Zap className="h-4 w-4 mr-2 text-primary mt-0.5" />
                                    <span className="text-sm">{feature}</span>
                                  </li>
                                ))}
                              </ul>
                            </CardContent>
                            <CardFooter>
                              <Button
                                className="w-full"
                                onClick={() => handleUpgrade(plan.name)}
                                variant={
                                  plan.recommended ? "default" : "outline"
                                }
                              >
                                Upgrade to {plan.name}
                              </Button>
                            </CardFooter>
                          </Card>
                        ))}
                    </div>
                    <DialogFooter>
                      <Button
                        variant="outline"
                        onClick={() => setIsUpgrading(false)}
                      >
                        Cancel
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <AlertDialog open={isCancelling} onOpenChange={setIsCancelling}>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline">Cancel Subscription</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you sure you want to cancel?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        Your subscription will remain active until the end of
                        the current billing period on{" "}
                        {currentPlan.nextBillingDate}. After that, your account
                        will be downgraded to the free plan with limited
                        features.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Keep Subscription</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleCancelSubscription}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        Cancel Subscription
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h4 className="font-medium">Plan Features</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentPlan.features.map((feature, i) => (
                  <div key={i} className="flex items-center">
                    <Shield className="h-4 w-4 mr-2 text-primary" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h4 className="font-medium">Billing Cycle</h4>
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="monthly"
                    name="billing-cycle"
                    className="h-4 w-4 text-primary"
                    defaultChecked={currentPlan.billingCycle === "monthly"}
                  />
                  <label htmlFor="monthly" className="text-sm font-medium">
                    Monthly Billing
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="annual"
                    name="billing-cycle"
                    className="h-4 w-4 text-primary"
                    defaultChecked={currentPlan.billingCycle === "annual"}
                  />
                  <label
                    htmlFor="annual"
                    className="text-sm font-medium flex items-center"
                  >
                    Annual Billing
                    <Badge
                      variant="outline"
                      className="ml-2 bg-green-50 text-green-700 hover:bg-green-50 border-green-200"
                    >
                      Save 20%
                    </Badge>
                  </label>
                </div>
                <Button variant="outline" size="sm" className="w-fit">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Change Billing Cycle
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Available Plans</CardTitle>
            <CardDescription>
              Compare all available subscription plans.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px]">Feature</TableHead>
                    {availablePlans.map((plan) => (
                      <TableHead key={plan.id} className="text-center">
                        {plan.name}
                        {plan.current && (
                          <Badge variant="outline" className="ml-2">
                            Current
                          </Badge>
                        )}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Price</TableCell>
                    {availablePlans.map((plan) => (
                      <TableCell
                        key={`${plan.id}-price`}
                        className="text-center"
                      >
                        {plan.price}/{plan.billingCycle.substring(0, 2)}
                      </TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">AI Agents</TableCell>
                    <TableCell className="text-center">3</TableCell>
                    <TableCell className="text-center">10</TableCell>
                    <TableCell className="text-center">Unlimited</TableCell>
                    <TableCell className="text-center">Unlimited</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Monthly Calls</TableCell>
                    <TableCell className="text-center">10,000</TableCell>
                    <TableCell className="text-center">50,000</TableCell>
                    <TableCell className="text-center">250,000</TableCell>
                    <TableCell className="text-center">Unlimited</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Analytics</TableCell>
                    <TableCell className="text-center">Basic</TableCell>
                    <TableCell className="text-center">Advanced</TableCell>
                    <TableCell className="text-center">Enterprise</TableCell>
                    <TableCell className="text-center">Custom</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Support</TableCell>
                    <TableCell className="text-center">Email</TableCell>
                    <TableCell className="text-center">Email & Phone</TableCell>
                    <TableCell className="text-center">Priority</TableCell>
                    <TableCell className="text-center">
                      24/7 Dedicated
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">API Access</TableCell>
                    <TableCell className="text-center">
                      <AlertCircle className="h-4 w-4 text-destructive mx-auto" />
                    </TableCell>
                    <TableCell className="text-center">
                      <Shield className="h-4 w-4 text-primary mx-auto" />
                    </TableCell>
                    <TableCell className="text-center">
                      <Shield className="h-4 w-4 text-primary mx-auto" />
                    </TableCell>
                    <TableCell className="text-center">
                      <Shield className="h-4 w-4 text-primary mx-auto" />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Custom Voice</TableCell>
                    <TableCell className="text-center">
                      <AlertCircle className="h-4 w-4 text-destructive mx-auto" />
                    </TableCell>
                    <TableCell className="text-center">
                      <Shield className="h-4 w-4 text-primary mx-auto" />
                    </TableCell>
                    <TableCell className="text-center">
                      <Shield className="h-4 w-4 text-primary mx-auto" />
                    </TableCell>
                    <TableCell className="text-center">
                      <Shield className="h-4 w-4 text-primary mx-auto" />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Actions</TableCell>
                    {availablePlans.map((plan) => (
                      <TableCell
                        key={`${plan.id}-action`}
                        className="text-center"
                      >
                        {plan.current ? (
                          <Badge>Current Plan</Badge>
                        ) : (
                          <Button
                            variant={
                              plan.id === "starter" ? "outline" : "default"
                            }
                            size="sm"
                            onClick={() => {
                              if (plan.id === "starter") {
                                setIsCancelling(true);
                              } else {
                                setIsUpgrading(true);
                              }
                            }}
                          >
                            {plan.id === "starter" ? "Downgrade" : "Upgrade"}
                          </Button>
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Payment Methods Tab */}
      <TabsContent value="payment" className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle>Payment Methods</CardTitle>
                <CardDescription>
                  Manage your payment methods and billing address.
                </CardDescription>
              </div>
              <Dialog
                open={isAddingPaymentMethod}
                onOpenChange={setIsAddingPaymentMethod}
              >
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Payment Method
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Payment Method</DialogTitle>
                    <DialogDescription>
                      Add a new credit card or debit card to your account.
                    </DialogDescription>
                  </DialogHeader>
                  <Form {...paymentMethodForm}>
                    <form
                      onSubmit={paymentMethodForm.handleSubmit(
                        onPaymentMethodSubmit
                      )}
                      className="space-y-4 py-4"
                    >
                      <FormField
                        control={paymentMethodForm.control}
                        name="cardholderName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Cardholder Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={paymentMethodForm.control}
                        name="cardNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Card Number</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="4242 4242 4242 4242"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-3 gap-4">
                        <FormField
                          control={paymentMethodForm.control}
                          name="expiryMonth"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Expiry Month</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="MM" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {Array.from({ length: 12 }, (_, i) => {
                                    const month = i + 1;
                                    return (
                                      <SelectItem
                                        key={month}
                                        value={month
                                          .toString()
                                          .padStart(2, "0")}
                                      >
                                        {month.toString().padStart(2, "0")}
                                      </SelectItem>
                                    );
                                  })}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={paymentMethodForm.control}
                          name="expiryYear"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Expiry Year</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="YY" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {Array.from({ length: 10 }, (_, i) => {
                                    const year = new Date().getFullYear() + i;
                                    return (
                                      <SelectItem
                                        key={year}
                                        value={year.toString()}
                                      >
                                        {year}
                                      </SelectItem>
                                    );
                                  })}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={paymentMethodForm.control}
                          name="cvv"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>CVV</FormLabel>
                              <FormControl>
                                <Input placeholder="123" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={paymentMethodForm.control}
                        name="isDefault"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">
                                Set as default payment method
                              </FormLabel>
                              <FormDescription>
                                This card will be used for all future payments
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <DialogFooter>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setIsAddingPaymentMethod(false)}
                        >
                          Cancel
                        </Button>
                        <Button type="submit">Add Payment Method</Button>
                      </DialogFooter>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Your Payment Methods</h3>
              <div className="space-y-4">
                {paymentMethods.map((method) => (
                  <div
                    key={method.id}
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 border rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-8 bg-slate-100 rounded flex items-center justify-center">
                        <CreditCard className="h-5 w-5 text-slate-600" />
                      </div>
                      <div>
                        <div className="font-medium">
                          {method.type} •••• {method.last4}
                          {method.isDefault && (
                            <Badge variant="outline" className="ml-2">
                              Default
                            </Badge>
                          )}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Expires {method.expiry}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {!method.isDefault && (
                        <Button variant="outline" size="sm">
                          Set as Default
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-destructive"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Billing Address</h3>
              <Form {...billingAddressForm}>
                <form
                  onSubmit={billingAddressForm.handleSubmit(
                    onBillingAddressSubmit
                  )}
                  className="space-y-4"
                >
                  <FormField
                    control={billingAddressForm.control}
                    name="sameAsCompany"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">
                            Use company address
                          </FormLabel>
                          <FormDescription>
                            Use the same address as your company profile
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  {!billingAddressForm.watch("sameAsCompany") && (
                    <div className="space-y-4">
                      <FormField
                        control={billingAddressForm.control}
                        name="addressLine1"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Address Line 1</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={billingAddressForm.control}
                        name="addressLine2"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Address Line 2 (Optional)</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <FormField
                          control={billingAddressForm.control}
                          name="city"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>City</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={billingAddressForm.control}
                          name="state"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>State/Province</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={billingAddressForm.control}
                          name="postalCode"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Postal Code</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={billingAddressForm.control}
                        name="country"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Country</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a country" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="United States">
                                  United States
                                </SelectItem>
                                <SelectItem value="Canada">Canada</SelectItem>
                                <SelectItem value="United Kingdom">
                                  United Kingdom
                                </SelectItem>
                                <SelectItem value="Australia">
                                  Australia
                                </SelectItem>
                                <SelectItem value="Germany">Germany</SelectItem>
                                <SelectItem value="France">France</SelectItem>
                                <SelectItem value="Japan">Japan</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}

                  <Button type="submit">Update Billing Address</Button>
                </form>
              </Form>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Tax Information</h3>
              <Form {...taxInfoForm}>
                <form
                  onSubmit={taxInfoForm.handleSubmit(onTaxInfoSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={taxInfoForm.control}
                    name="businessType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Business Type</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select business type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="individual">
                              Individual / Sole Proprietor
                            </SelectItem>
                            <SelectItem value="llc">LLC</SelectItem>
                            <SelectItem value="partnership">
                              Partnership
                            </SelectItem>
                            <SelectItem value="corporation">
                              Corporation
                            </SelectItem>
                            <SelectItem value="nonprofit">
                              Non-Profit
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={taxInfoForm.control}
                    name="taxId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tax ID / EIN</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={taxInfoForm.control}
                    name="vatNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>VAT Number (if applicable)</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={taxInfoForm.control}
                    name="taxExempt"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">
                            Tax Exempt
                          </FormLabel>
                          <FormDescription>
                            Mark your organization as tax exempt (documentation
                            may be required)
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <Button type="submit">Update Tax Information</Button>
                </form>
              </Form>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Invoices Tab */}
      <TabsContent value="invoices" className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle>Invoices & Payment History</CardTitle>
                <CardDescription>
                  View and download your past invoices.
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Invoices</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export All
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableCaption>A list of your recent invoices.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell className="font-medium">{invoice.id}</TableCell>
                    <TableCell>{invoice.date}</TableCell>
                    <TableCell>{invoice.amount}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          invoice.status === "Paid"
                            ? "bg-green-50 text-green-700 hover:bg-green-50 border-green-200"
                            : invoice.status === "Pending"
                            ? "bg-yellow-50 text-yellow-700 hover:bg-yellow-50 border-yellow-200"
                            : "bg-red-50 text-red-700 hover:bg-red-50 border-red-200"
                        }
                      >
                        {invoice.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{invoice.description}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        <FileText className="h-4 w-4 mr-2" />
                        View
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Usage & Limits Tab */}
      <TabsContent value="usage" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Usage & Limits</CardTitle>
            <CardDescription>
              Monitor your current usage and plan limits.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">AI Agents</h3>
                  <span className="text-sm text-muted-foreground">
                    {currentPlan.limits.agents.used} /{" "}
                    {currentPlan.limits.agents.total} used
                  </span>
                </div>
                <Progress
                  value={
                    (currentPlan.limits.agents.used /
                      currentPlan.limits.agents.total) *
                    100
                  }
                />
                <p className="text-sm text-muted-foreground">
                  You are currently using {currentPlan.limits.agents.used} out
                  of your {currentPlan.limits.agents.total} available AI agents.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Monthly Calls</h3>
                  <span className="text-sm text-muted-foreground">
                    {currentPlan.limits.calls.used.toLocaleString()} /{" "}
                    {currentPlan.limits.calls.total.toLocaleString()} used
                  </span>
                </div>
                <Progress
                  value={
                    (currentPlan.limits.calls.used /
                      currentPlan.limits.calls.total) *
                    100
                  }
                />
                <p className="text-sm text-muted-foreground">
                  You have used {currentPlan.limits.calls.used.toLocaleString()}{" "}
                  out of your {currentPlan.limits.calls.total.toLocaleString()}{" "}
                  monthly calls. Resets on June 22, 2025.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Storage (GB)</h3>
                  <span className="text-sm text-muted-foreground">
                    {currentPlan.limits.storage.used} /{" "}
                    {currentPlan.limits.storage.total} GB used
                  </span>
                </div>
                <Progress
                  value={
                    (currentPlan.limits.storage.used /
                      currentPlan.limits.storage.total) *
                    100
                  }
                />
                <p className="text-sm text-muted-foreground">
                  You are using {currentPlan.limits.storage.used} GB out of your{" "}
                  {currentPlan.limits.storage.total} GB storage allocation.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Active Campaigns</h3>
                  <span className="text-sm text-muted-foreground">
                    {currentPlan.limits.campaigns.used} /{" "}
                    {currentPlan.limits.campaigns.total} used
                  </span>
                </div>
                <Progress
                  value={
                    (currentPlan.limits.campaigns.used /
                      currentPlan.limits.campaigns.total) *
                    100
                  }
                />
                <p className="text-sm text-muted-foreground">
                  You have {currentPlan.limits.campaigns.used} active campaigns
                  out of your limit of {currentPlan.limits.campaigns.total}.
                </p>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Additional Resources</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">
                      Need More Calls?
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Purchase additional call packs without upgrading your
                      plan.
                    </p>
                    <Button variant="outline" className="w-full">
                      <Package className="h-4 w-4 mr-2" />
                      Buy Call Pack
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Add Storage</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Increase your storage capacity for call recordings and
                      data.
                    </p>
                    <Button variant="outline" className="w-full">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Storage
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Upgrade Plan</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Need more of everything? Upgrade to a higher tier plan.
                    </p>
                    <Button
                      className="w-full"
                      onClick={() => setIsUpgrading(true)}
                    >
                      <TrendingUp className="h-4 w-4 mr-2" />
                      Upgrade
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Usage History</h3>
              <div className="h-[300px] border rounded-md p-4 flex items-center justify-center">
                <p className="text-muted-foreground">
                  Usage chart will be displayed here
                </p>
              </div>
              <div className="flex justify-end">
                <Select defaultValue="30">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Time period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7">Last 7 days</SelectItem>
                    <SelectItem value="30">Last 30 days</SelectItem>
                    <SelectItem value="90">Last 90 days</SelectItem>
                    <SelectItem value="365">Last year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
