interface RoleWrapperProps {
  role: 'dj' | 'dx';
  children: React.ReactNode;
}

export const RoleWrapper = ({ role, children }: RoleWrapperProps) => {
  return (
    <div className="min-h-screen">
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <h1 className="text-xl font-semibold">
              Avocado Trace ({role === 'dj' ? 'TFC' : 'Supplier'})
            </h1>
          </div>
        </div>
      </header>
      <main>
        {children}
      </main>
    </div>
  );
}; 