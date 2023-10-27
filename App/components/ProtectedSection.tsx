import React from 'react';
import useAuth from '../hooks/useAuth';

interface ProtectedSectionProps {
  roles: string[];
}

export default function ProtectedSection(props: React.PropsWithChildren<ProtectedSectionProps>) {
  const { hasAnyRole } = useAuth();
  return <>{hasAnyRole(props.roles) && props.children}</>;
}
