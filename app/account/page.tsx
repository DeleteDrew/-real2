"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import { cancelSubscription } from "@/lib/stripe"
import { useToast } from "@/hooks/use-toast"

export default function AccountPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [subscription, setSubscription] = useState({
    active: true,
    currentPeriodEnd: new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString(),
  })
  const { toast } = useToast()

  const handleCancelSubscription = async () => {
    if (!confirm("Are you sure you want to cancel your subscription?")) {
      return
    }

    setIsLoading(true)
    try {
      await cancelSubscription("mock_subscription_id")
      setSubscription({
        ...subscription,
        active: false,
      })
      toast({
        title: "Subscription Cancelled",
        description: "Your subscription has been cancelled successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to cancel subscription. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b">
        <div className="container flex h-16 items-center">
          <Link href="/dashboard" className="flex items-center gap-2 text-sm font-medium">
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
        </div>
      </header>
      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-2xl space-y-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tighter">Account</h1>
              <p className="text-gray-500">Manage your account and subscription</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Your personal information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Name</p>
                    <p>John Doe</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Email</p>
                    <p>john@example.com</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" asChild>
                  <Link href="/account/edit">Edit Profile</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Subscription</CardTitle>
                <CardDescription>Manage your subscription plan</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-md border p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Monthly Plan</p>
                      <p className="text-sm text-gray-500">$0.99 per month</p>
                    </div>
                    <div
                      className={`rounded-full px-2 py-1 text-xs font-medium ${subscription.active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                    >
                      {subscription.active ? "Active" : "Cancelled"}
                    </div>
                  </div>
                  {subscription.active && (
                    <div className="mt-4 text-sm text-gray-500">
                      Your subscription will renew on {new Date(subscription.currentPeriodEnd).toLocaleDateString()}
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-2 sm:flex-row sm:justify-between sm:space-x-2 sm:space-y-0">
                {subscription.active ? (
                  <Button variant="destructive" onClick={handleCancelSubscription} disabled={isLoading}>
                    {isLoading ? "Processing..." : "Cancel Subscription"}
                  </Button>
                ) : (
                  <Button asChild>
                    <Link href="/payment">Reactivate Subscription</Link>
                  </Button>
                )}
                <Button variant="outline" asChild>
                  <Link href="/billing">Billing History</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Security</CardTitle>
                <CardDescription>Manage your account security</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Password</p>
                    <p>••••••••</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Last Updated</p>
                    <p>{new Date().toLocaleDateString()}</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" asChild>
                  <Link href="/account/password">Change Password</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
      <footer className="border-t py-6">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <p className="text-sm text-gray-500">© {new Date().getFullYear()} LearnAI. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/terms" className="text-sm text-gray-500 hover:underline">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm text-gray-500 hover:underline">
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
