"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, X, Loader2, ExternalLink, RefreshCw } from "lucide-react";

import { customer, checkout } from "@/lib/auth-client";
import { useSearchParams } from "next/navigation";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { toast } from "sonner";

const PLAN_FEATURES = {
  free: [
    { name: "Up to 5 repositories", included: true },
    { name: "Up to 5 reviews per repository", included: true },
    { name: "Basic Code reviews", included: true },
    { name: "Community Support", included: true },
    { name: "Advanced analytics", included: false },
    { name: "Priority Support", included: false },
  ],
  pro: [
    { name: "Unlimited repositories", included: true },
    { name: "Unlimited reviews ", included: true },
    { name: "Advanced Code reviews", included: true },
    { name: "Email Support", included: true },
    { name: "Advanced analytics", included: true },
    { name: "Priority Support", included: true },
  ],
};

export default function SubscriptionPage() {
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [portalLoading, setPortalLoading] = useState(false);
  const [syncLoading, setSyncLoading] = useState(false);
  const searchParams = useSearchParams();
  const success = searchParams.get("success");
}
