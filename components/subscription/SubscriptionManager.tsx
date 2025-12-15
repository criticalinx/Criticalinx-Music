'use client';

import { useState } from 'react';
import { SubscriptionCard } from './SubscriptionCard';
import { SUBSCRIPTION_PLANS } from '@/lib/stripe';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';

interface SubscriptionManagerProps {
  currentPlan?: string;
  onCancelSubscription?: () => void;
}

export function SubscriptionManager({
  currentPlan = 'free',
  onCancelSubscription,
}: SubscriptionManagerProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async (planType: string) => {
    setIsLoading(true);
    try {
      console.log(`Subscribing to ${planType}`);
    } catch (error) {
      console.error('Error subscribing:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {currentPlan !== 'free' && (
        <Card className="p-6 bg-secondary/30 border-border">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h3 className="font-semibold mb-1">Current Subscription</h3>
                <p className="text-sm text-muted-foreground">
                  You are currently on the <span className="font-medium text-foreground">{SUBSCRIPTION_PLANS[currentPlan as keyof typeof SUBSCRIPTION_PLANS]?.name}</span> plan.
                </p>
              </div>
            </div>
            {onCancelSubscription && (
              <Button variant="ghost" size="sm" onClick={onCancelSubscription}>
                Cancel Plan
              </Button>
            )}
          </div>
        </Card>
      )}

      <div className="grid md:grid-cols-3 gap-6">
        <SubscriptionCard
          planName={SUBSCRIPTION_PLANS.free.name}
          price={SUBSCRIPTION_PLANS.free.price}
          features={SUBSCRIPTION_PLANS.free.features}
          isCurrentPlan={currentPlan === 'free'}
        />
        <SubscriptionCard
          planName={SUBSCRIPTION_PLANS.basic.name}
          price={SUBSCRIPTION_PLANS.basic.price}
          features={SUBSCRIPTION_PLANS.basic.features}
          isCurrentPlan={currentPlan === 'basic'}
          onSubscribe={() => handleSubscribe('basic')}
        />
        <SubscriptionCard
          planName={SUBSCRIPTION_PLANS.premium.name}
          price={SUBSCRIPTION_PLANS.premium.price}
          features={SUBSCRIPTION_PLANS.premium.features}
          isCurrentPlan={currentPlan === 'premium'}
          isPopular
          onSubscribe={() => handleSubscribe('premium')}
        />
      </div>
    </div>
  );
}
