"use client";

import React, { useState } from 'react';
import { AsyncButton } from './async-button';
import { useAsyncOperation } from '@/hooks/use-async-operation';
import ConcentricRingsLoader from './loading-animation-1';

export function LoadingDemo() {
  const [counter, setCounter] = useState(0);
  const { execute, isLoading } = useAsyncOperation({
    loadingText: 'Processing data...',
  });

  const handleAsyncOperation = async () => {
    await execute(async () => {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setCounter(prev => prev + 1);
    });
  };

  const handleDataFetch = async () => {
    await execute(async () => {
      await new Promise(resolve => setTimeout(resolve, 1500));
      // Simulate data fetching
      const data = { message: 'Data fetched successfully!', timestamp: new Date() };
      console.log(data);
    }, 'Fetching data...');
  };

  return (
    <div className="p-8 space-y-8 max-w-4xl mx-auto">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Loading States Demo</h2>
        <p className="text-muted-foreground mb-8">
          Comprehensive loading states for page transitions, form submissions, and async operations
        </p>
      </div>

      {/* Standalone Loader */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4">Standalone Loader</h3>
        <div className="flex items-center justify-center p-8 bg-muted/30 rounded-lg">
          <ConcentricRingsLoader size={80} color="#3b82f6" text="Loading demo..." />
        </div>
      </div>

      {/* Async Button Examples */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4">Async Buttons</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AsyncButton
            onClick={handleAsyncOperation}
            loadingText="Processing..."
            className="w-full"
          >
            Process Data (Counter: {counter})
          </AsyncButton>

          <AsyncButton
            onClick={handleDataFetch}
            loadingText="Fetching..."
            variant="outline"
            className="w-full"
          >
            Fetch Sample Data
          </AsyncButton>

          <AsyncButton
            onClick={async () => {
              await execute(async () => {
                await new Promise(resolve => setTimeout(resolve, 1000));
                alert('Action completed!');
              });
            }}
            loadingText="Saving..."
            variant="secondary"
            className="w-full"
          >
            Save Changes
          </AsyncButton>

          <AsyncButton
            onClick={async () => {
              await execute(async () => {
                await new Promise(resolve => setTimeout(resolve, 3000));
                throw new Error('This is a demo error');
              });
            }}
            loadingText="Uploading..."
            variant="destructive"
            className="w-full"
          >
            Simulate Error
          </AsyncButton>
        </div>
      </div>

      {/* Loading States */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4">Loading Variations</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <ConcentricRingsLoader size={60} color="#3b82f6" text="Small" />
            <p className="text-sm text-muted-foreground mt-2">Small Loader</p>
          </div>
          <div className="text-center">
            <ConcentricRingsLoader size={80} color="#10b981" text="Medium" />
            <p className="text-sm text-muted-foreground mt-2">Medium Loader</p>
          </div>
          <div className="text-center">
            <ConcentricRingsLoader size={100} color="#f59e0b" text="Large" />
            <p className="text-sm text-muted-foreground mt-2">Large Loader</p>
          </div>
        </div>
      </div>

      {/* Usage Instructions */}
      <div className="bg-muted/30 rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4">Usage Examples</h3>
        <div className="space-y-4 text-sm">
          <div>
            <h4 className="font-medium mb-2">1. Global Loading Provider:</h4>
            <code className="block bg-background border border-border rounded p-2 text-xs">
              {`import { LoadingProvider } from "@/components/ui/loading-provider";

// Wrap your app with LoadingProvider in layout.tsx
<LoadingProvider>
  {children}
</LoadingProvider>`}
            </code>
          </div>
          <div>
            <h4 className="font-medium mb-2">2. Async Button:</h4>
            <code className="block bg-background border border-border rounded p-2 text-xs">
              {`import { AsyncButton } from "@/components/ui/async-button";

<AsyncButton
  onClick={async () => await someAsyncFunction()}
  loadingText="Processing..."
>
  Submit
</AsyncButton>`}
            </code>
          </div>
          <div>
            <h4 className="font-medium mb-2">3. Custom Hook:</h4>
            <code className="block bg-background border border-border rounded p-2 text-xs">
              {`import { useAsyncOperation } from "@/hooks/use-async-operation";

const { execute, isLoading } = useAsyncOperation();
await execute(asyncFunction, "Custom loading text...");`}
            </code>
          </div>
        </div>
      </div>
    </div>
  );
}
