import React from 'react';
import { Skeleton } from "@/components/ui/skeleton";
import { PortfolioStore } from "@/app/segment/portfolio/store";
import { cn } from '@/lib/utils'; // Adjust the import path for your cn utility

interface LoadingWrapperProps {
  children: React.ReactNode;
  isRounded?: boolean;
}

const LoadingWrapper: React.FC<LoadingWrapperProps> = ({ children, isRounded = false }) => {
  const { is_loading } = PortfolioStore();

  return (
    <>
      {is_loading ? (
        <Skeleton className={cn("h-4 w-full", { 'rounded-full': isRounded })} />
      ) : (
        <>{children}</>
      )}
    </>
  );
};

export default LoadingWrapper;
