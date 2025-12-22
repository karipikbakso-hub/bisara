import { notFound } from 'next/navigation';

interface SystemOperatorPageProps {
  params: {
    systemId: string;
  };
}

// Simple routing for operator pages
export default async function SystemOperatorPage({ params }: SystemOperatorPageProps) {
  const { systemId } = await params;

  // For now, we'll hardcode the routing
  if (systemId === 'wazfun') {
    // Import and render WAZFUN operator
    const WazfunOperator = (await import('@/systems/wazfun/pages/operator')).default;
    return <WazfunOperator />;
  }

  // System not found
  notFound();
}

export async function generateMetadata({ params }: SystemOperatorPageProps) {
  const { systemId } = await params;

  if (systemId === 'wazfun') {
    return {
      title: 'WAZFUN - Operator Panel',
      description: 'Operator control panel for WAZFUN laundry system',
    };
  }

  return {
    title: 'System Not Found',
  };
}
