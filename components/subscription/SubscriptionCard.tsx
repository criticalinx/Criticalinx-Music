'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';
import { formatCurrency } from '@/lib/stripe';

interface SubscriptionCardProps {
  planName: string;
  price: number;
  features: string[];
  isCurrentPlan?: boolean;
  onSubscribe?: () => void;
  isPopular?: boolean;
}

export function SubscriptionCard({
  planName,
  price,
  features,
  isCurrentPlan = false,
  onSubscribe,
  isPopular = false,
}: SubscriptionCardProps) {
  return (
    <Card className={`relative p-8 ${isPopular ? 'border-primary border-2' : 'border-border'}`}>
      {isPopular && (
        <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white">
          Most Popular
        </Badge>
      )}

      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold mb-2">{planName}</h3>
        <div className="mb-1">
          <span className="text-4xl font-bold">{formatCurrency(price)}</span>
          {price > 0 && <span className="text-muted-foreground">/month</span>}
        </div>
      </div>

      <ul className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Check className="h-3 w-3 text-primary" />
            </div>
            <span className="text-sm text-muted-foreground">{feature}</span>
          </li>
        ))}
      </ul>

      <Button
        className="w-full"
        variant={isCurrentPlan ? 'outline' : isPopular ? 'default' : 'outline'}
        disabled={isCurrentPlan}
        onClick={onSubscribe}
      >
        {isCurrentPlan ? 'Current Plan' : 'Subscribe'}
      </Button>
    </Card>
  );
}
