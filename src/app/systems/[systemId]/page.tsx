import { notFound } from 'next/navigation';

interface SystemPageProps {
  params: {
    systemId: string;
  };
}

// Simple routing for now - expand this later for full dynamic loading
export default async function SystemPage({ params }: SystemPageProps) {
  const { systemId } = await params;

  // For now, we'll hardcode the routing
  // In production, this would dynamically load systems
  if (systemId === 'wazfun') {
    // Import and render WAZFUN dashboard
    const WazfunDashboard = (await import('@/systems/wazfun/pages/dashboard')).default;
    return <WazfunDashboard />;
  }

  // System not found
  notFound();
}

export async function generateMetadata({ params }: SystemPageProps) {
  const { systemId } = await params;

  if (systemId === 'wazfun') {
    return {
      title: 'WAZFUN - Laundry Self-Service',
      description: 'Self-service laundry monitoring system with real-time machine status',
    };
  }

  return {
    title: 'System Not Found',
  };
}

// Pre-generate static paths for known systems
export async function generateStaticParams() {
  return [
    { systemId: 'wazfun' },
  ];
}
