type Props = {
  children?: React.ReactNode;
};

export function Main({ children }: Props) {
  return (
    <main className="w-full h-auto p-4">
      <div className="mx-auto w-full h-auto max-w-7xl flex items-center justify-between">
        {children}
      </div>
    </main>
  );
}
